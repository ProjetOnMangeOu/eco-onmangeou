import { useMemo } from "react";
import { useRoomContext } from "./Room";
import RestaurantCard from "../RestaurantCard";

const Winner = () => {

    const likedRestaurants = useRoomContext().likedRestaurants;

    const winner = useMemo(() => {
        const votes: { [key: string]: number } = {};
        likedRestaurants.forEach((restaurant) => {
            if (votes[restaurant.documentId]) {
                votes[restaurant.documentId] += 1;
            } else {
                votes[restaurant.documentId] = 1;
            }
        });

        const winnerId = Object.keys(votes).reduce((a, b) => votes[a] > votes[b] ? a : b);
        return likedRestaurants.find((restaurant) => restaurant.documentId === winnerId);
    }, [likedRestaurants]);

    return (
        <div className="w-full flex flex-col justify-center items-center gap-6">
            <h3 className="text-center">Et le gagnant est ...</h3>
            <RestaurantCard restaurant={winner!} />
        </div>
    );
};

export default Winner;