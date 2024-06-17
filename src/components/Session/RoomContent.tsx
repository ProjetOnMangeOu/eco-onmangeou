import ChooseRestaurants from "./ChooseRestaurants";
import { RoomState, useRoomContext } from "./Room";
import SelfGeo from "./SelfGeo";
import Winner from "./Winner";

const RoomContent = () => {

    const roomState = useRoomContext().roomState;
    const peers = useRoomContext().peers;
    const likedRestaurants = useRoomContext().likedRestaurants;

    return (
        <>
            {roomState === RoomState.Waiting && <SelfGeo />}
            <div className="lg:col-start-2 lg:col-span-2 flex flex-auto gap-6 flex-wrap w-full justify-center">
                {roomState === RoomState.Waiting && peers.length <= 0 && (<h3 className="text-xl font-bold">En attente d'autres personnes...</h3>)}

                {roomState === RoomState.Waiting && peers.length >= 1 && (<h3 className="text-xl font-bold">Prêt à commencer !</h3>)}

                {roomState === RoomState.Playing && <ChooseRestaurants />}

                {roomState === RoomState.Finished && likedRestaurants.length >= 1 && (
                    <>
                        <h3 className="text-xl font-bold">Session terminée</h3>
                        <Winner />
                    </>
                )}
            </div>
        </>
    );
};

export default RoomContent;