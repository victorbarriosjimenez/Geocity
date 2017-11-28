export interface Continent { 
    name?:  string;
    apiEndpoint?: string;
    lat?: number;
    lng?: number;
    image?: string;
    isContinentSelected?:boolean;
}
export const continents: Continent[] = [
    { name: "America del Norte", apiEndpoint: "northamerica", lat: 38.946686 ,lng: -105.7335457, image: "https://firebasestorage.googleapis.com/v0/b/geocity-app.appspot.com/o/northamerica.jpg?alt=media&token=be2b3206-e272-47f5-8dc6-9a95c11eeae7", isContinentSelected: false },
    { name: "America del Sur", apiEndpoint:"southamerica", lat: -24.34485 ,lng: -54.9432754, image:"https://firebasestorage.googleapis.com/v0/b/geocity-app.appspot.com/o/southamrica.jpg?alt=media&token=ff502818-dfac-4bce-808b-9998387289e4", isContinentSelected: false },
    { name: "America Central", apiEndpoint:"centralamerica", lat: 11.85118 ,lng: -93.7573247, image:"https://firebasestorage.googleapis.com/v0/b/geocity-app.appspot.com/o/centralamerica.jpg?alt=media&token=ec48b02d-162f-43c3-9a2b-b4fd5fa972f1", isContinentSelected: false },    
    { name: "Africa", apiEndpoint:"africa", lat: 7.9138448 ,lng: 30.1305855, image: "https://firebasestorage.googleapis.com/v0/b/geocity-app.appspot.com/o/africa.jpg?alt=media&token=33b695be-25ec-4ebd-8c60-7aa756bb4258", isContinentSelected: false },
    { name: "Asia", apiEndpoint:"asia", lat: 48.66157 ,lng: 95.4402243, image: "https://firebasestorage.googleapis.com/v0/b/geocity-app.appspot.com/o/asia.jpg?alt=media&token=9678ed34-365c-4a9f-9126-e76e4ee12617" , isContinentSelected: false },
    { name: "Europa" , apiEndpoint:"europe", lat: 52.5429145 ,lng: 4.4419949, image: "https://firebasestorage.googleapis.com/v0/b/geocity-app.appspot.com/o/europe.jpg?alt=media&token=5a0a0f6a-7479-410f-aa9e-e9815ce29ebb" , isContinentSelected: false },
    { name: "Oceania", apiEndpoint:"oceania", lat: -27.5842607 ,lng: 112.8734463, image: "https://firebasestorage.googleapis.com/v0/b/geocity-app.appspot.com/o/oceania.jpg?alt=media&token=d313ae87-f9d0-4034-82f1-4632e7a6626d" , isContinentSelected: false }
]; 