import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { BaseRoomConfig, RelayConfig, Room as TrysteroRoom, joinRoom, selfId } from "trystero/nostr";
import { animals, uniqueNamesGenerator } from "unique-names-generator";

export type Peer = {
  id: string;
  name: string;
};

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
}>({
  room: null,
  roomState: RoomState.Waiting,
  setRoomState: () => {},
  peers: [],
  self: null,
});

export const useRoomContext = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error('useRoomContext must be used within a Room');
  }
  return context;
};

// TODO: Remove the master logic and let all peers decide the room state
// NOTE: When choosing a restaurant on each peer, each peer maintain it's own state, so when I choose a restaurant I notify the other peers and they update their state

const Room = ({ sessionId, children }: { sessionId: string; children: ReactNode }) => {
  const [myRandomName, setMyRandomName] = useState<string>('');

  // P2P States
  const [roomState, setRoomState] = useState<RoomState>(RoomState.Waiting);
  const [peers, setPeers] = useState<Peer[]>([]);

  // Room setup
  const config: BaseRoomConfig & RelayConfig = { appId: 'onmangeou' };
  const room = joinRoom(config, sessionId);
  
  // Room actions
  const [sendRoomState, getRoomState] = room.makeAction('room-state');
  const [sendName, getName] = room.makeAction('name');

  // Methods
  const changeRoomState = (state: RoomState) => {
    setRoomState(state);
    sendRoomState({ state });
  }

  // Room listeners
  room.onPeerJoin(peerId => {
    console.log('[Event] peer join : ', peerId);

    if (roomState !== RoomState.Waiting) {
      return; // Don't add new peers if the session is already started
    }

    setPeers(peers => [...peers, { id: peerId, name: '...' }]);
    sendName({ name: myRandomName })
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

  useEffect(() => {
    setMyRandomName(uniqueNamesGenerator({
      dictionaries: [animals],
      style: 'capital'
    }));
  }, []);

  useEffect(() => {
    console.log("Checking empty room");
    if (peers.length <= 0 && roomState !== RoomState.Waiting) {
      console.log("Empty room, resetting room state");
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
    }}>
      {children}
    </RoomContext.Provider>
  );
};

export default Room;
