import { useMemo } from "react";
import { useRoomContext } from "./Room";

const Results = () => {

    const likedRestaurants = useRoomContext().likedRestaurants;

    const votes = useMemo(() => {
        const votes: { [key: string]: number } = {};
        likedRestaurants.forEach((restaurant) => {
            if (votes[restaurant.documentId]) {
                votes[restaurant.documentId] += 1;
            } else {
                votes[restaurant.documentId] = 1;
            }
        });
        return votes;
    }, [likedRestaurants]);

    return (
        <>
            <h2 className="text-xl font-bold">Results</h2>
            <ul>
                {Object.keys(votes).map((restaurantId) => (
                    <li key={restaurantId}>
                        {likedRestaurants.find((res) => res.documentId === restaurantId)?.name} : {votes[restaurantId]}
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Results;