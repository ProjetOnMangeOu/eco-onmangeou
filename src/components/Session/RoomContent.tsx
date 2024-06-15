import RestaurantCard from "../RestaurantCard";
import { RoomState, useRoomContext } from "./Room";
import SelfGeo from "./SelfGeo";

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
                    <RestaurantCard />
                    {/* Add live results component here */}
                </>
            )}

            {roomState === RoomState.Finished && (
                <>
                    <h2 className="text-xl font-bold">Session finished</h2>
                    {/* Display the winner */}
                </>
            )}
        </div>
    );
};

export default RoomContent;