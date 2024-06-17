import { TbMapPinFilled } from "react-icons/tb";
import { useRoomContext } from "./Room";

const SelfGeo = () => {

    const geoLocation = useRoomContext().geoLocation;
    const setGeoLocation = useRoomContext().setGeoLocation;
    const searchDistance = useRoomContext().searchDistance;
    const changeSearchDistance = useRoomContext().changeSearchDistance;

    const handleLatitudeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newLatitude = parseFloat(event.target.value);
        setGeoLocation({lat: isNaN(newLatitude) ? 0 : newLatitude, long: geoLocation.long});
    };

    const handleLongitudeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newLongitude = parseFloat(event.target.value);
        setGeoLocation({lat: geoLocation.lat, long: isNaN(newLongitude) ? 0 : newLongitude});
    };

    const handleSearchDistanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDistance = parseInt(event.target.value);
        changeSearchDistance(isNaN(newDistance) ? 0 : newDistance);
    };

    return (
        <form className="w-full flex flex-col gap-3 items-center bg-primary-400 border-2 border-primary-300 p-4 rounded-xl">
            <h3 className="flex items-center gap-2">
                <TbMapPinFilled />
                <span>Localisation</span>
            </h3>
            <div className="flex flex-wrap gap-3">
                <div className="flex gap-2 justify-center items-center">
                    <label>Latitude : </label>
                    <input
                        className="rounded-full border-neutral-400 bg-primary-300 p-2 w-24 text-center"
                        value={geoLocation.lat}
                        onChange={handleLatitudeChange}
                    />
                </div>
                <div className="flex gap-2 justify-center items-center">
                    <label>Longitude : </label>
                    <input
                        className="rounded-full border-neutral-400 bg-primary-300 p-2 w-24 text-center"
                        value={geoLocation.long}
                        onChange={handleLongitudeChange}
                    />
                </div>
            </div>
            <div className="w-full flex flex-col gap-3 xs:items-center">
                <label>Distance de recherche : <span className="tabular-nums">{(searchDistance/1000).toFixed(1)}</span> km</label>
                <input
                    type="range" min="1000" max="10000" step="100"
                    value={searchDistance}
                    onChange={handleSearchDistanceChange}
                    className="w-full max-w-52"
                />
            </div>
            
        </form>
    );
};

export default SelfGeo;