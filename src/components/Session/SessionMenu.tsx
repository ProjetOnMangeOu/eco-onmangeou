import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { TbArrowCapsule, TbClipboard } from "react-icons/tb";

const SessionMenu = () => {
  const [sessionId, setSessionId] = useState<string>('');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };
  
  useEffect(() => {
    setSessionId(uuidv4());
  }, []);

  return (
    <div className='w-full max-w-sm flex flex-col items-start gap-4 rounded-xl border-2 border-primary-300 p-4 bg-primary-400 shadow-2xl'>

      <div className='flex flex-col gap-2'>
        <h4 className='font-semibold text-center'>Commencer une session</h4>
        <p className='text-center'>Entrez votre identifiant de session ou générez-en un nouveau.</p>
      </div>


      <input
        type="text"
        className='w-full p-2 rounded-lg border-2 border-primary-300'
        value={sessionId}
        onChange={(e) => setSessionId(e.target.value)}
      />

      <span className='w-full flex gap-4'>
        <button
          className='bg-secondary-500 transition-all duration-300 hover:bg-secondary-400 hover:shadow-lg px-4 py-2 w-full rounded-xl flex justify-center items-center gap-1'
          onClick={() => copyToClipboard(sessionId)}
        >
          <TbClipboard className='w-6 h-6' />
          Copier
        </button>
        <button
          className='bg-secondary-500 transition-all duration-300 hover:bg-secondary-400 hover:shadow-lg px-4 py-2 w-full rounded-xl flex justify-center items-center gap-1'
          onClick={() => setSessionId(uuidv4())}
        ><TbArrowCapsule className='w-6 h-6' />Session ID</button>
      </span>
      
      <Link
        className='bg-accent-500 transition-all duration-300 hover:bg-accent-400 hover:shadow-lg px-4 py-2 w-full rounded-xl flex justify-center items-center gap-1'
        to={`/session?id=${sessionId}`}
      >Rejoindre la session</Link>
    </div>
  );
};

export default SessionMenu;