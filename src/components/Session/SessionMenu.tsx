import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const SessionMenu = () => {
  const [sessionId, setSessionId] = useState<string>('');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };
  
  useEffect(() => {
    setSessionId(uuidv4());
  }, []);

  return (
    <div className='flex flex-col items-start gap-4 rounded-lg border-2 border-neutral-400 p-4'>
      <label>Session ID:</label>
      <input
        type="text"
        className='w-full p-2 rounded-lg text-neutral-900'
        value={sessionId}
        onChange={(e) => setSessionId(e.target.value)}
      />
      <button
        className='bg-neutral-400 px-4 py-2 w-full rounded-lg text-neutral-900'
        onClick={() => copyToClipboard(sessionId)}
      >
        Copy
      </button>
      <button
        className='bg-neutral-400 px-4 py-2 w-full rounded-lg text-neutral-900'
        onClick={() => setSessionId(uuidv4())}
      >Generate New Session ID</button>
      <Link
        className='text-center w-full bg-neutral-400 px-4 py-2 rounded-lg text-neutral-900'
        to={`/session?id=${sessionId}`}
      >Join Session</Link>
    </div>
  );
};

export default SessionMenu;