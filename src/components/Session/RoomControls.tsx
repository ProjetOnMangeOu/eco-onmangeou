import { RoomState, useRoomContext } from "./Room";

const RoomControls = () => {

    const peers = useRoomContext().peers;
    const roomState = useRoomContext().roomState;
    const setRoomState = useRoomContext().setRoomState;

    const startSession = () => {
        if (roomState === RoomState.Waiting && peers.length > 0) {
            setRoomState(RoomState.Playing);
        }
    };

    const stopSession = () => {
        if (roomState === RoomState.Playing) {
            setRoomState(RoomState.Finished);
        }
    };

    return (
        <div className="flex flex-wrap justify-between gap-4 border-2 border-neutral-800 rounded-md p-4">
            <button
                className="px-2 py-1 rounded-full bg-green-400 min-w-24 disabled:cursor-not-allowed"
                onClick={startSession}
                disabled={roomState !== RoomState.Waiting}
            >
                Start
            </button>
            <button
                className="px-2 py-1 rounded-full bg-red-400 min-w-24 disabled:cursor-not-allowed"
                onClick={stopSession}
                disabled={roomState !== RoomState.Playing}
            >
                Stop
            </button>
        </div>
    );
};

export default RoomControls;