import { useMemo, useState } from "react";
import { RoomState, useRoomContext } from "./Room";
import RestaurantCard from "../RestaurantCard";

const ChooseRestaurants = () => {
    const [displayedRestaurantIndex, setDisplayedRestaurantIndex] = useState<number>(0);

    const roomState = useRoomContext().roomState;
    const likeARestaurant = useRoomContext().likeARestaurant;

    const restaurantList = useMemo(() => {
        if (roomState !== RoomState.Playing) return [];
        console.log('Fetching restaurants...');
        // Fetch the restaurants here
        const fakeRestaurants = [];
        for (let i = 1; i <= 10; i++) {
            fakeRestaurants.push({
                documentId: i.toString(),
                name: `Restaurant ${i}`,
                address: `Address ${i}`,
                lat: 0,
                long: 0,
                phone: '123456789',
                googleMapRating: 4.5,
                image: 'https://via.placeholder.com/150',
                gmapLink: 'https://www.google.com/maps',
                website: 'https://www.google.com',
                calculatedDistance: i * 100,
                restaurantType: ['type1', 'type2'],
            });
        }
        return fakeRestaurants;
    }, [roomState]);

    const nextRestaurant = (liked = true) => {
        if (liked) {
            likeARestaurant(restaurantList[displayedRestaurantIndex]);
            setDisplayedRestaurantIndex((state) => state + 1);
            return;
        }
        setDisplayedRestaurantIndex((state) => state + 1);
    };

    return (
        <div>
            {restaurantList[displayedRestaurantIndex] && (
                <>
                    <RestaurantCard restaurant={restaurantList[displayedRestaurantIndex]} />
                    <button
                        className="px-2 py-1 rounded-full bg-green-400 min-w-24 disabled:cursor-not-allowed"
                        onClick={() => nextRestaurant(false)}
                    >
                        dislike
                    </button>
                    <button
                        className="px-2 py-1 rounded-full bg-red-400 min-w-24 disabled:cursor-not-allowed"
                        onClick={() => nextRestaurant()}
                    >
                        Like
                    </button>
                </>
            )}
            {!restaurantList[displayedRestaurantIndex] && (
                <h2 className="text-xl font-bold">No more restaurants</h2>
            )}
        </div>
    );
};

export default ChooseRestaurants;