import { RoomState, useRoomContext } from "./Room";

const RoomControls = () => {

    const peers = useRoomContext().peers;
    const roomState = useRoomContext().roomState;
    const setRoomState = useRoomContext().setRoomState;
    const likedRestaurants = useRoomContext().likedRestaurants;

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
        <div className="w-full flex flex-wrap gap-4">
            <button
                className='flex-1 bg-green-500 transition-all duration-300 hover:bg-green-400 hover:shadow-lg px-4 py-2 rounded-xl flex justify-center items-center gap-1 disabled:cursor-not-allowed'
                onClick={startSession}
                disabled={roomState !== RoomState.Waiting}
            >
                Commencer
            </button>
            <button
                className='flex-1 bg-secondary-500 transition-all duration-300 hover:bg-secondary-400 hover:shadow-lg px-4 py-2 rounded-xl flex justify-center items-center gap-1 disabled:cursor-not-allowed'
                onClick={stopSession}
                disabled={roomState !== RoomState.Playing || likedRestaurants.length < 1}
            >
                Finir
            </button>
        </div>
    );
};

export default RoomControls;