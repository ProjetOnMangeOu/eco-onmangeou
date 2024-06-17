import { Restaurant } from "../lib/restaurants";
import starColor from "../assets/star-dynamic-color.avif";
import starClay from "../assets/star-dynamic-clay.avif";
import { TbMapPinFilled } from "react-icons/tb";

const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => {
    return (
        <div className="flex w-full max-w-xs flex-col gap-3 rounded-2xl overflow-hidden bg-primary-400 shadow-2xl p-4">
            <img
                className="w-full object-cover aspect-[2/3] rounded-2xl"
                src={restaurant.image}
                alt={restaurant.name + ' image'}
            />
            <div className="flex flex-wrap items-center gap-3">
                <h3>{restaurant.name}</h3>
                {restaurant.restaurantType.map((type, index) => (
                    <span className="px-4 py-1 bg-primary-300 rounded-full" key={`${type}-${index}`}>{type}</span>
                ))}
            </div>
            <div>
                <div className="flex items-center gap-1">
                    {
                        Array.from({ length: 5 }).map((_, index) => (
                            <img key={index} src={index < Math.round(restaurant.googleMapRating) ? starColor : starClay} alt="star icon" className="w-6 h-6" />
                        ))
                    }
                    <p>{restaurant.googleMapRating}</p>
                </div>
                <div className="flex items-center gap-1">
                    <TbMapPinFilled className="w-6 h-6" />
                    <p>{(restaurant.calculatedDistance/1000).toFixed(1)} km </p>
                </div>
            </div>
        </div>
    );
};

export default RestaurantCard;