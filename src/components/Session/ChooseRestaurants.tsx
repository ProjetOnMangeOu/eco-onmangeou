import { useMemo, useState } from "react";
import { RoomState, useRoomContext } from "./Room";
import RestaurantCard from "../RestaurantCard";
import thumbDown from "../../assets/thumb-down-dynamic-color.avif";
import thumbUp from "../../assets/thumb-up-dynamic-color.avif";
import { TbAlertCircle } from "react-icons/tb";

const ChooseRestaurants = () => {
    const [displayedRestaurantIndex, setDisplayedRestaurantIndex] = useState<number>(0);

    const roomState = useRoomContext().roomState;
    const likeARestaurant = useRoomContext().likeARestaurant;

    const restaurantList = useMemo(() => {
        if (roomState !== RoomState.Playing) return [];
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
                image: 'https://picsum.photos/500',
                gmapLink: 'https://www.google.com/maps',
                website: 'https://www.sygix.fr',
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
        <div className="w-full grid grid-cols-2 gap-6">
            {restaurantList[displayedRestaurantIndex] && (
                <>
                    <button
                        className="justify-self-end order-1 p-2 rounded-full bg-secondary-500 hover:bg-secondary-400 w-fit transition-all duration-300 hover:shadow-xl"
                        onClick={() => nextRestaurant(false)}
                    >
                        <img src={thumbDown} alt="dislike" className="w-12 h-12" />
                    </button>
                    <div className="col-span-2 w-full flex justify-center">
                        <RestaurantCard restaurant={restaurantList[displayedRestaurantIndex]} />
                    </div>
                    <button
                        className="justify-self-start order-2 p-2 rounded-full bg-secondary-500 hover:bg-secondary-400 marker:w-fit transition-all duration-300 hover:shadow-xl"
                        onClick={() => nextRestaurant()}
                    >
                        <img src={thumbUp} alt="like" className="w-12 h-12" />
                    </button>
                </>
            )}
            {!restaurantList[displayedRestaurantIndex] && (
                <>
                    <div className="col-span-2 text-center flex flex-col items-center">
                        <TbAlertCircle className="w-8 h-8" />
                        <h2>Plus de restaurant disponible dans cette zone 😅</h2>
                    </div>
                </>
            )}
        </div>
    );
};

export default ChooseRestaurants;