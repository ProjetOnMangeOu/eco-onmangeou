import ChooseRestaurants from "./ChooseRestaurants";
import Results from "./Results";
import { RoomState, useRoomContext } from "./Room";
import SelfGeo from "./SelfGeo";
import Winner from "./Winner";

const RoomContent = () => {

    const roomState = useRoomContext().roomState;
    const peers = useRoomContext().peers;

    return (
        <div className="flex flex-col flex-wrap border-2 border-neutral-800 rounded-md p-4">
            {roomState === RoomState.Waiting && peers.length <= 0 && (
                <>
                    <h2 className="text-xl font-bold">Waiting other people to start</h2>
                    <SelfGeo />
                </>
            )}

            {roomState === RoomState.Waiting && peers.length >= 1 && (
                <>
                    <h2 className="text-xl font-bold">Ready to start</h2>
                    <SelfGeo />
                </>
            )}

            {roomState === RoomState.Playing && (
                <>
                    <h2 className="text-xl font-bold">Playing</h2>
                    <ChooseRestaurants />
                    <Results />
                </>
            )}

            {roomState === RoomState.Finished && (
                <>
                    <h2 className="text-xl font-bold">Session finished</h2>
                    <Winner />
                    {/* Display the winner */}
                </>
            )}
        </div>
    );
};

export default RoomContent;