import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { BaseRoomConfig, RelayConfig, Room as TrysteroRoom, joinRoom, selfId } from "trystero/nostr";
import { animals, uniqueNamesGenerator } from "unique-names-generator";
import { Restaurant } from "../../lib/restaurants";

export type Peer = {
  id: string;
  name: string;
};

export type GeoLocation = {
  lat: number;
  long: number;
};

export type LikedRestaurants = {
  id: string;
  name: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export enum RoomState {
  Waiting = 'waiting',
  Playing = 'playing',
  Finished = 'finished'
}

const RoomContext = createContext<{
  room: TrysteroRoom | null;
  roomState: RoomState;
  setRoomState: (state: RoomState) => void;
  peers: Peer[];
  self: Peer | null;
  geoLocation: GeoLocation;
  setGeoLocation: (geo: GeoLocation) => void;
  likedRestaurants: Restaurant[];
  likeARestaurant: (restaurant: Restaurant) => void;
  searchDistance: number;
  changeSearchDistance: (distance: number) => void;
}>({
  room: null,
  roomState: RoomState.Waiting,
  setRoomState: () => {},
  peers: [],
  self: null,
  geoLocation: { lat: 50.6292, long: 3.0573 },
  setGeoLocation: () => { },
  likedRestaurants: [],
  likeARestaurant: () => {},
  searchDistance: 2500,
  changeSearchDistance: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useRoomContext = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error('useRoomContext must be used within a Room');
  }
  return context;
};

// NOTE: When choosing a restaurant on each peer, each peer maintain it's own state, so when I choose a restaurant I notify the other peers and they update their state

const Room = ({ sessionId, children }: { sessionId: string; children: ReactNode }) => {
  const [myRandomName, setMyRandomName] = useState<string>('');
  const [geoLocation, setGeoLocation] = useState<GeoLocation>({ lat: 50.6292, long: 3.0573 });

  // P2P States
  const [roomState, setRoomState] = useState<RoomState>(RoomState.Waiting);
  const [peers, setPeers] = useState<Peer[]>([]);
  const [likedRestaurants, setLikedRestaurants] = useState<Restaurant[]>([]);
  const [searchDistance, setSearchDistance] = useState<number>(2500); // [meters]

  // Room setup
  const config: BaseRoomConfig & RelayConfig = {
    appId: 'onmangeou', rtcConfig: {
      iceServers: [
        {
          urls: "turn:eu.relay.metered.ca:80",
          username: import.meta.env.VITE_METEREDCA_TURN_USERNAME,
          credential: import.meta.env.VITE_METEREDCA_TURN_credential,
        },
        {
          urls: "turn:eu.relay.metered.ca:80?transport=tcp",
          username: import.meta.env.VITE_METEREDCA_TURN_USERNAME,
          credential: import.meta.env.VITE_METEREDCA_TURN_credential,
        },
        {
          urls: "turn:eu.relay.metered.ca:443",
          username: import.meta.env.VITE_METEREDCA_TURN_USERNAME,
          credential: import.meta.env.VITE_METEREDCA_TURN_credential,
        },
        {
          urls: "turns:eu.relay.metered.ca:443?transport=tcp",
          username: import.meta.env.VITE_METEREDCA_TURN_USERNAME,
          credential: import.meta.env.VITE_METEREDCA_TURN_credential,
        },
      ]
    }
  };
  const room = joinRoom(config, sessionId);
  
  // Room actions
  const [sendRoomState, getRoomState] = room.makeAction('room-state');
  const [sendName, getName] = room.makeAction('name');
  const [sendLikedRestaurant, getLikedRestaurant] = room.makeAction('liked-place');
  const [sendSearchDistance, getSearchDistance] = room.makeAction('distance');

  // Methods
  const changeRoomState = (state: RoomState) => {
    setRoomState(state);
    sendRoomState({ state });
  };

  const getGeoLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        // Success
        (position) => {
          setGeoLocation({ lat: position.coords.latitude, long: position.coords.longitude });
        },
        // Error
        (error) => {
          console.error('[Geo] Error', error);
        }
      );
    } else {
      console.log('[Geo] Is not available');
    }
  };

  const likeARestaurant = (restaurant: Restaurant) => {
    setLikedRestaurants((prevState) => [...prevState, restaurant]);
    sendLikedRestaurant({ ...restaurant });
  };

  const changeSearchDistance = (distance: number) => {
    setSearchDistance(distance);
    sendSearchDistance({ distance });
  };

  // Room listeners
  room.onPeerJoin(peerId => {
    console.log('[Event] peer join : ', peerId);

    if (roomState !== RoomState.Waiting) {
      return; // Don't add new peers if the session is already started
    }

    setPeers(peers => [...peers, { id: peerId, name: '...' }]);
    // add some delay to avoid ignoring the message if the peer is not yet in the list
    setTimeout(() => {
      sendName({ name: myRandomName });
      if(searchDistance !== 2500) sendSearchDistance({ distance: searchDistance });
    }, 100);
  });

  room.onPeerLeave(peerId => {
    console.log('[Event] peer leave : ', peerId);

    setPeers(peers => peers.filter(peer => peer.id !== peerId));
  });

  getName((data, peerId) => {
    console.log('[Event] peer name : ', peerId, data);

    const nameData = data as { name: string };
    setPeers(peers => {
      const peerIndex = peers.findIndex(peer => peer.id === peerId);
      if (peerIndex !== -1) {
        const updatedPeers = [...peers];
        updatedPeers[peerIndex].name = nameData.name;
        return updatedPeers;
      }
      return peers;
    });
  });

  getRoomState((data, peerId) => {
    console.log('[Event] room state : ', data);

    const roomStateData = data as { state: RoomState, setterId: string };
    if(!peers.find((peer) => peer.id === peerId)) return; // Ignore messages from unknown peers
    setRoomState(roomStateData.state);
  });

  getLikedRestaurant((data, peerId) => {
    console.log('[Event] liked restaurant : ', data);

    const likedRestaurantData = data as unknown as Restaurant;
    if(!peers.find((peer) => peer.id === peerId)) return; // Ignore likes from unknown peers
    setLikedRestaurants((prevState) => [...prevState, likedRestaurantData]);
  });

  getSearchDistance((data, peerId) => {
    console.log('[Event] search distance : ', data);

    const distanceData = data as { distance: number };
    if (!peers.find((peer) => peer.id === peerId)) return; // Ignore messages from unknown peers
    console.log('Setting search distance to : ', distanceData.distance);
    setSearchDistance(distanceData.distance);
  });

  // Initial setup
  useEffect(() => {
    getGeoLocation();
    setMyRandomName(uniqueNamesGenerator({
      dictionaries: [animals],
      style: 'capital'
    }));

    return () => {
      if (room) {
        console.log('Leaving room');
        room.leave();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (peers.length <= 0 && roomState !== RoomState.Waiting) {
      setRoomState(RoomState.Finished);
    }
  }, [peers, roomState]);

  return (
    <RoomContext.Provider value={{
      room,
      roomState,
      setRoomState: changeRoomState,
      peers,
      self: { id: selfId, name: myRandomName },
      geoLocation,
      setGeoLocation,
      likedRestaurants,
      likeARestaurant,
      searchDistance,
      changeSearchDistance
    }}>
      {children}
    </RoomContext.Provider>
  );
};

export default Room;
