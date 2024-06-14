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
  masterPeerId: string | null;
}>({
  room: null,
  roomState: RoomState.Waiting,
  setRoomState: () => {},
  peers: [],
  self: null,
  masterPeerId: null
});

export const useRoomContext = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error('useRoomContext must be used within a Room');
  }
  return context;
};

const Room = ({ sessionId, children }: { sessionId: string; children: ReactNode }) => {
  const [myRandomName, setMyRandomName] = useState<string>('');

  // P2P States
  const [roomState, setRoomState] = useState<RoomState>(RoomState.Waiting);
  const [peers, setPeers] = useState<Peer[]>([]);
  const [masterPeerId, setMasterPeerId] = useState<string | null>(null);

  // Room setup
  const config: BaseRoomConfig & RelayConfig = { appId: 'onmangeou' };
  const room = joinRoom(config, sessionId);
  
  // Room actions
  const [sendRoomState, getRoomState] = room.makeAction('room-state');
  const [sendMaster, getMaster] = room.makeAction('master');
  const [sendName, getName] = room.makeAction('name');

  // Methods
  const chooseMaster = (peersList: string[]) => {
    console.log('peers', peersList);
    const randomPeer = peersList[Math.floor(Math.random() * peersList.length)];
    setMasterPeerId(randomPeer);
    sendMaster({ masterId: randomPeer });
  };

  const changeRoomState = (state: RoomState) => {
    setRoomState(state);
    sendRoomState({ state, setterId: selfId });
  }

  // Room listeners
  room.onPeerJoin(peerId => {
    console.log('[Event] peer join : ', peerId);

    if (roomState !== RoomState.Waiting && masterPeerId !== null) {
      sendMaster({ masterId: masterPeerId });
      sendRoomState({ state: roomState, setterId: selfId });
      return; // Don't add new peers if the session is already started
    }

    setPeers(peers => [...peers, { id: peerId, name: '...' }]);
    sendName({ name: myRandomName });
    
    if (masterPeerId === null && roomState === RoomState.Waiting) {
      const allPeersId = peers.map(peer => peer.id);
      allPeersId.push(peerId, selfId);
      chooseMaster(allPeersId);
    }
  });

  room.onPeerLeave(peerId => {
    console.log('[Event] peer leave : ', peerId);

    setPeers(peers => peers.filter(peer => peer.id !== peerId));

    if(masterPeerId === peerId) {
      setMasterPeerId(null);
      setRoomState(RoomState.Waiting);
      chooseMaster(peers.map(peer => peer.id));
    }
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

  getMaster((data) => {
    console.log('[Event] master : ', data);

    const masterData = data as { masterId: string };
    if (masterPeerId !== masterData.masterId) {
      setMasterPeerId(masterData.masterId);
      sendMaster({ masterId: masterData.masterId });
    }
  });

  getRoomState((data) => {
    console.log('[Event] room state : ', data);

    const roomStateData = data as { state: RoomState, setterId: string };
    if(roomStateData.setterId !== masterPeerId && masterPeerId) return;
    setRoomState(roomStateData.state);
  });

  useEffect(() => {
    setMyRandomName(uniqueNamesGenerator({
      dictionaries: [animals],
      style: 'capital'
    }));
  }, []);

  return (
    <RoomContext.Provider value={{
      room,
      roomState,
      setRoomState: changeRoomState,
      peers,
      self: { id: selfId, name: myRandomName },
      masterPeerId
    }}>
      {children}
    </RoomContext.Provider>
  );
};

export default Room;
