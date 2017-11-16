export interface Continent { 
    name?:  string;
    apiEndpoint?: string;
    lat?: number;
    lng?: number;
    image?: string;
    isContinentSelected?:boolean;
}
export const continents: Continent[] = [
    { name: "America del Norte", apiEndpoint: "northamerica", lat: 38.946686 ,lng: -105.7335457, image: "https://firebasestorage.googleapis.com/v0/b/geocity-app.appspot.com/o/northamerica.jpg?alt=media&token=a3a9cd68-0ee8-4bde-b07e-4ef0a5fa5188", isContinentSelected: false },
    { name: "America del Sur", apiEndpoint:"southamerica", lat: -24.34485 ,lng: -54.9432754, image:"https://firebasestorage.googleapis.com/v0/b/geocity-app.appspot.com/o/southamerica.jpg?alt=media&token=74024623-f503-4f38-8617-5462dcc20397", isContinentSelected: false },
    { name: "Africa", apiEndpoint:"africa", lat: 7.9138448 ,lng: 30.1305855, image: "https://firebasestorage.googleapis.com/v0/b/geocity-app.appspot.com/o/africa.jpg?alt=media&token=44696a31-2fbb-44c3-8e36-0b1529087d08", isContinentSelected: false },
    { name: "Asia", apiEndpoint:"asia", lat: 48.66157 ,lng: 95.4402243, image: "https://firebasestorage.googleapis.com/v0/b/geocity-app.appspot.com/o/asia.jpg?alt=media&token=4fd6f3ef-c188-4617-a3b0-897ff2bb95c8" , isContinentSelected: false },
    { name: "Europa" , apiEndpoint:"europe", lat: 52.5429145 ,lng: 4.4419949, image: "https://firebasestorage.googleapis.com/v0/b/geocity-app.appspot.com/o/europe.jpg?alt=media&token=07673342-97e7-431b-bbe5-ab78535df7b2" , isContinentSelected: false },
    { name: "Oceania", apiEndpoint:"oceania", lat: -27.5842607 ,lng: 112.8734463, image: "https://firebasestorage.googleapis.com/v0/b/geocity-app.appspot.com/o/oceania.jpg?alt=media&token=4af4dbcc-6bd6-44f5-bba0-8deb8731d3ba" , isContinentSelected: false }
]; 