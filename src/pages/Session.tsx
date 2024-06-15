import { useSearchParams } from "react-router-dom";
import Room from "../components/Session/Room";
import RoomContent from "../components/Session/RoomContent";
import PeersList from "../components/Session/PeersList";
import RoomControls from "../components/Session/RoomControls";

const Session = () => {

    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("id");

    if (!sessionId) {
        return <div>Session id not found</div>;
    }

    return (
        <main className="flex flex-auto gap-6 flex-col items-center px-4">
            <p className="text-center">Session : {sessionId}</p>
            <div className="w-full max-w-screen-md flex flex-col gap-6">
                <Room sessionId={sessionId}>
                    <PeersList />
                    <RoomContent />
                    <RoomControls />
                </Room>
            </div>
        </main>
    );
};

export default Session;