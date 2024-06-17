import { useSearchParams } from "react-router-dom";
import Room from "../components/Session/Room";
import RoomContent from "../components/Session/RoomContent";
import PeersList from "../components/Session/PeersList";
import RoomControls from "../components/Session/RoomControls";
import Results from "../components/Session/Results";

const Session = () => {

    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("id");

    return (
        <main className="layout flex gap-3 flex-auto flex-col px-4 py-6 relative">
            {sessionId === null && <h2>Session non trouvée 😭</h2>}
            {sessionId !== null && (
                <>
                    <div className="w-full max-w-screen-xl grid grid-cols-1 lg:grid-cols-4 gap-6">
                        <Room sessionId={sessionId}>
                            <div className="flex flex-col gap-6">
                                <PeersList />
                                <RoomControls />
                            </div>
                            <RoomContent />
                            
                            <Results />
                        </Room>
                    </div>
                </>
            )}
        </main>
    );
};

export default Session;