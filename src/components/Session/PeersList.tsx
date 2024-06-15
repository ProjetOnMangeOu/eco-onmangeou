import { useRoomContext } from "./Room";

const PeersList = () => {

  const peers = useRoomContext().peers;
  const self = useRoomContext().self;

  return (
    <div className="flex flex-col border-2 border-neutral-800 rounded-md p-4">
      <h2 className="text-blue-800 font-semibold">Me : {self?.name} ({self?.id})</h2>
      <h2 className="text-green-800 font-semibold">Connected Peers :</h2>
      <ul>
        {peers.map((peer, index) => (
          <li key={`${peer.id}-${index}`} className='text-geen-400'>{peer.name} ({peer.id})</li>
        ))}
      </ul>
    </div>
  );
};

export default PeersList;