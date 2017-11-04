export interface Continent { 
    name:  string;
    apiEndpoint: string;
    lat?: number;
    lon?: number;
    image?: string;
}
export const continents: Continent[] = [
    { name: "America del Norte", apiEndpoint: "northamerica" , image: "http://www.learner.org/jnorth/images/graphics/maps/North_A_satellite_orth_NASA.jpg" },
    { name: "America del Sur", apiEndpoint:"southamerica", image:"https://openi.nlm.nih.gov/imgs/512/167/4385904/PMC4385904_biodiversity_data_journal-3-e4178-g001_a.png" },
    { name: "Africa", apiEndpoint:"africa", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Africa_satellite_orthographic.jpg/534px-Africa_satellite_orthographic.jpg" },
    { name: "Asia", apiEndpoint:"asia", image: "http://www.gifex.com/images/0X0/2009-11-18-11138/Asia-satellite-map.jpg"  },
    { name: "Europa" , apiEndpoint:"europe", image: "http://www.gifex.com/images/0X0/2010-02-21-11784/Satellite-photograph-of-Europe-2005.jpg" },
    { name: "Oceania", apiEndpoint:"australia", image: "http://gpsworld.com/wp-content/uploads/2016/08/australia-O.jpg" }
]; 