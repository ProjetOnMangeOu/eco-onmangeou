import { Restaurant } from "../lib/restaurants";

const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => {
    return (
        <div className="flex w-fit flex-col rounded-md overflow-hidden bg-neutral-600 text-neutral-50">
            <img
                className="max-w-full object-cover aspect-[2/3] max-h-96 rounded-md"
                src={restaurant.image}
                alt={restaurant.name + ' image'}
            />
            <div className="p-4">
                <h3 className="text-lg font-bold">{restaurant.name}</h3>
                {restaurant.restaurantType.map((type, index) => (
                    <span key={`${type}-${index}`} className="text-neutral-300">{type}</span>
                ))}
                <p className="text-neutral-300">{restaurant.googleMapRating}</p>
                <p className="text-neutral-300">{restaurant.calculatedDistance} m</p>
            </div>
        </div>
    );
};

export default RestaurantCard;