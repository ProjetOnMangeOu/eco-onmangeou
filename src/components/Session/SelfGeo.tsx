import { useRoomContext } from "./Room";

const SelfGeo = () => {

    const geoLocation = useRoomContext().geoLocation;
    const setGeoLocation = useRoomContext().setGeoLocation;

    const handleLatitudeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newLatitude = parseFloat(event.target.value);
        setGeoLocation({lat: isNaN(newLatitude) ? 0 : newLatitude, long: geoLocation.long});
    };

    const handleLongitudeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newLongitude = parseFloat(event.target.value);
        setGeoLocation({lat: geoLocation.lat, long: isNaN(newLongitude) ? 0 : newLongitude});
    };

    return (
        <>
            <div>
                <label>Latitude: </label>
                <input
                type="number"
                value={geoLocation.lat}
                onChange={handleLatitudeChange}
                />
            </div>
            <div>
                <label>Longitude: </label>
                <input
                type="number"
                value={geoLocation.long}
                onChange={handleLongitudeChange}
                />
            </div>
        </>
    );
};

export default SelfGeo;