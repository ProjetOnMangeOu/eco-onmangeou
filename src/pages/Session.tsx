import { useSearchParams } from "react-router-dom";
import Room from "../components/Session/Room";
import RoomContent from "../components/Session/RoomContent";
import PeersList from "../components/Session/PeersList";
import RoomControls from "../components/Session/RoomControls";

const Session = () => {

    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("id");

    return (
        <main className="layout max-w-screen-lg flex gap-3 flex-auto flex-col px-4 py-6 relative">
            {sessionId === null && <h2>Session not found</h2>}
            {sessionId !== null && (
                <>
                    <div className="w-full max-w-screen-md flex flex-auto flex-col gap-6">
                        <Room sessionId={sessionId}>
                            <RoomContent />
                            <RoomControls />
                            <PeersList />
                        </Room>
                    </div>
                </>
            )}
        </main>
    );
};

export default Session;