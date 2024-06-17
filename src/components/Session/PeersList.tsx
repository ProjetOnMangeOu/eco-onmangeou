import { useRoomContext } from "./Room";
import { TbUser, TbUserBolt } from "react-icons/tb";

const PeersList = () => {

  const peers = useRoomContext().peers;
  const self = useRoomContext().self;

  return (
    <div className="flex gap-3 flex-col items-center border-2 border-primary-300 bg-primary-400 rounded-xl p-4">
      <h3>Membres de la session :</h3>
      <div className="flex gap-2 items-center">
        <TbUser className="w-6 h-6" />
        <p>Moi : {self?.name}</p>
      </div>
      <ul>
        {peers.map((peer, index) => (
          <li key={`${peer.id}-${index}`} className='flex gap-2 items-center'>
            <TbUserBolt className="w-6 h-6" />
            {peer.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PeersList;