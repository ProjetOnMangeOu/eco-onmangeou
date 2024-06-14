import { useSearchParams } from "react-router-dom";
import PeersList from "../components/Session/PeersList";
import Room from "../components/Session/Room";
import RoomControls from "../components/Session/RoomControls";

const Session = () => {

    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("id");

    if (!sessionId) {
        return <div>Session id not found</div>
    }

    return (
        <>
            <div>Session : {sessionId}</div>
            <Room sessionId={sessionId}>
                <PeersList />
                <RoomControls />
            </Room>
        </>
    )
}

export default Session