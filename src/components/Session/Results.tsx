import { useMemo } from "react";
import { useRoomContext } from "./Room";

const Results = () => {

    const likedRestaurants = useRoomContext().likedRestaurants;

    const votes = useMemo(() => {
        const votes: { [key: string]: number } = {};
        likedRestaurants.forEach((restaurant) => {
            if (votes[restaurant.id]) {
                votes[restaurant.id] += 1;
            } else {
                votes[restaurant.id] = 1;
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
                        {likedRestaurants.find((res) => res.id === restaurantId)?.name} : {votes[restaurantId]}
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Results;