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
        <>
            <h2>And the winner is ...</h2>
            <RestaurantCard restaurant={winner!} />
        </>
    );
};

export default Winner;