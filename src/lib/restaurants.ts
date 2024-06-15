import { Query } from "appwrite";
import { GeoLocation } from "../components/Session/Room";
import { databases } from "./appwrite";
import { calculateBoundingBox, calculateDistance } from "./utils";

export interface Restaurant {
    documentId: string;
    name: string;
    address: string;
    lat: number;
    long: number;
    phone: string;
    googleMapRating: number;
    image: string;
    gmapLink: string;
    website: string;
    calculatedDistance: number;
    restaurantType: string[];
}


const fetchRestaurants = async ({ geoLocation, radius }: { geoLocation: GeoLocation, radius: number }): Promise<Restaurant[]> => {
    const boundingBox = calculateBoundingBox(geoLocation, radius);

    const results = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        [
            Query.greaterThanEqual('lat', boundingBox.minLat),
            Query.lessThanEqual('lat', boundingBox.maxLat),
            Query.greaterThanEqual('long', boundingBox.minLong),
            Query.lessThanEqual('long', boundingBox.maxLong),
        ]
    );

    console.log('results : ', results);
    return results.documents.map((doc) => {
        return {
            documentId: doc.$id,
            name: doc.name,
            address: doc.address,
            lat: doc.lat,
            long: doc.long,
            phone: doc.phone,
            googleMapRating: doc.googleMapRating,
            image: doc.image,
            gmapLink: doc.gmapLink,
            website: doc.website,
            calculatedDistance: (
                Math.round(calculateDistance(geoLocation, { lat: doc.lat, long: doc.long }) / 100) * 100
            ),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            restaurantType: doc.restaurantTypes.map((type: any) => type.name),
        };
    });
};

export default fetchRestaurants;