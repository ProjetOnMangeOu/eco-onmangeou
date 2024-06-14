import clsx from "clsx";
import { useRoomContext } from "./Room";

const PeersList = () => {

  const peers = useRoomContext().peers;
  const self = useRoomContext().self;
  const masterId = useRoomContext().masterPeerId;
  const roomState = useRoomContext().roomState;

  return (
    <div>
      <h2 className="text-blue-800 font-semibold">Room State : {roomState}</h2>
      <h2 className="text-blue-800 font-semibold">Me : {self?.name} ({self?.id})</h2>
      <h2 className="text-green-800 font-semibold">Connected Peers :</h2>
      <ul>
          {peers.map((peer, index) => (
            <li key={`${peer.id}-${index}`} className={clsx(self?.id === masterId ? 'text-geen-400' : 'text-neutral-800')} >{peer.name} ({peer.id})</li>
          ))}
      </ul>
      <h2 className="text-red-800 font-semibold">Master : {masterId}</h2>
    </div>
  )
}

export default PeersList