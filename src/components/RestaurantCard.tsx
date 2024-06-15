const RestaurantCard = () => {
    return (
        <div className="flex w-fit flex-col rounded-md overflow-hidden bg-neutral-600 text-neutral-50">
            <img
                className="max-w-full object-cover aspect-[2/3] max-h-96 rounded-md"
                src="https://i.pinimg.com/564x/08/ae/aa/08aeaa4905270ce09bc7006c59af99fd.jpg"
                alt="KFC restaurant"
            />
            <div className="p-4">
                <h3 className="text-lg font-bold">KFC</h3>
                <p className="text-neutral-300">Fastfood</p>
                <p className="text-neutral-300">4.5 stars</p>
                <p className="text-neutral-300">1.4km</p>
            </div>
        </div>
    );
};

export default RestaurantCard;