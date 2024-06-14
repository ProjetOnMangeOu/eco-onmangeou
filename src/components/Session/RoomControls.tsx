import { RoomState, useRoomContext } from "./Room";

const RoomControls = () => {

    const masterId = useRoomContext().masterPeerId;
    const self = useRoomContext().self;
    const roomState = useRoomContext().roomState;
    const setRoomState = useRoomContext().setRoomState;

    const startSession = () => {
        if(self?.id === masterId && roomState === RoomState.Waiting) {
            setRoomState(RoomState.Playing);
        }
    }

    return (
        <>
            <button className="px-2 py-1 rounded-full border-2 border-neutral-800 min-w-24" onClick={startSession}>Start</button>
        </>
    )
}

export default RoomControls