import { Restaurant } from "../lib/restaurants";

const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => {
    return (
        <div className="flex w-full max-w-xs flex-col rounded-2xl overflow-hidden bg-primary-400 shadow-2xl">
            <img
                className="w-full object-cover aspect-[2/3] rounded-2xl"
                src={restaurant.image}
                alt={restaurant.name + ' image'}
            />
            <div className="pt-4 px-4 pb-3 flex flex-wrap items-center gap-3">
                <h3>{restaurant.name}</h3>
                {restaurant.restaurantType.map((type, index) => (
                    <span className="px-4 py-1 bg-primary-300 rounded-full" key={`${type}-${index}`}>{type}</span>
                ))}
            </div>
            <div className="pb-4 px-4">
                <div className="flex items-center gap-1">
                    <p>{restaurant.googleMapRating}</p>
                    {
                        Array.from({ length: 5 }).map((_, index) => (
                            <img key={index} src={index < Math.round(restaurant.googleMapRating) ? "./src/assets/star-dynamic-color.avif" : "./src/assets/star-dynamic-clay.avif"} alt="star icon" className="w-6 h-6" />
                        ))
                    }
                </div>
                <p>{(restaurant.calculatedDistance/1000).toFixed(1)} km</p>
            </div>
        </div>
    );
};

export default RestaurantCard;