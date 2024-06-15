import { GeoLocation } from "../components/Session/Room";

// Function to calculate bounding box for a given geolocation and radius in km
export function calculateBoundingBox(location: GeoLocation, radius: number) {
    const latRadian = location.lat * (Math.PI / 180);
    const degLatKm = 110.574235;
    const degLongKm = 110.572833 * Math.cos(latRadian);
    const deltaLat = radius / degLatKm;
    const deltaLong = radius / degLongKm;

    return {
        minLat: location.lat - deltaLat,
        maxLat: location.lat + deltaLat,
        minLong: location.long - deltaLong,
        maxLong: location.long + deltaLong,
    };
}

// Function to calculate distance between two geolocations in meters
export function calculateDistance(location1: GeoLocation, location2: GeoLocation) {
    const R = 6371e3; // Radius of the earth in meters
    const lat1Rad = location1.lat * (Math.PI / 180);
    const lat2Rad = location2.lat * (Math.PI / 180);
    const deltaLat = (location2.lat - location1.lat) * (Math.PI / 180);
    const deltaLon = (location2.long - location1.long) * (Math.PI / 180);

    const a = 
        Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(lat1Rad) * Math.cos(lat2Rad) *
        Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in meters
    return distance;
}