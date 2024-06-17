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
        <div className="w-full p-4 flex flex-col items-center gap-3 bg-primary-400 border-2 border-primary-300 rounded-xl">
            <h3 className="">Top 5 des restaurants</h3>
            <ol className="w-full flex flex-col gap-2">
                {
                    Object.keys(votes)
                        .sort((a, b) => votes[b] - votes[a])
                        .slice(0, 5)
                        .map((restaurantId) => {
                            const restaurant = likedRestaurants.find((res) => res.documentId === restaurantId);
                            return (
                                <li key={restaurantId}>
                                    <a href={restaurant?.website ?? restaurant?.gmapLink} title={restaurant?.name} className="flex-auto flex justify-between transition-colors duration-300 hover:bg-primary-300 rounded-full px-4 py-2">
                                        <p>{restaurant?.name}</p>
                                        <p>{votes[restaurantId]} vote{votes[restaurantId] > 1 && 's'} </p>
                                    </a>
                                </li>
                            );
                        })
                }
            </ol>
        </div>
    );
};

export default Results;