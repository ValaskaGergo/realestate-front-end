import AnlibreedersUtility from './utilities/anlibreeders.utility'
import mapboxgl from "mapbox-gl/dist/mapbox-gl"
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

const utility = new AnlibreedersUtility();

class AnlibreedersMap {
    loadAnlibreedersMap() {
        const loadMap = {

            fullPageMap: function () {
                if (!mapboxgl.supported()) {
                    // alert("NOT SUPPORTED")
                } else {
                    // Start Load Map
                    mapboxgl.accessToken = process.env.MAPBOX_TOKEN;
                    let map = new mapboxgl.Map({
                        container: 'full-page-map',
                        style: 'mapbox://styles/anlideveloper/clioi10vt003i01p796eo3o0z',
                        // style: 'mapbox://styles/anlideveloper/clioic8wp00oy01pgcs8l8bvg',
                        zoom: 6,
                        minZoom: 0,
                        maxZoom: 20,
                        center: [
                            19.040236,
                            47.497913
                        ],
                        //pitch: 60,
                        antialias: true,
                        projection: 'globe'
                    });
                    // End Load Map

                    let geocoder = new MapboxGeocoder({
                        accessToken: mapboxgl.accessToken,
                        types: 'country,region,place,postcode,locality,neighborhood'
                    });

                    geocoder.addTo('#full-page-geocoder');

                    const results = document.getElementById('full-page-result');

                    geocoder.on('result', (e) => {
                        results.innerText = JSON.stringify(e.result, null, 2);
                    });

                    geocoder.on('clear', () => {
                        results.innerText = '';
                    });

                    // Start Atmosphere
                    map.on('style.load', () => {
                        map.setFog({
                            color: 'rgb(0, 0, 0)',
                            'high-color': 'rgba(145,210,255,0.2)',
                            'horizon-blend': 0.02,
                            'space-color': 'rgb(0, 0, 0)',
                            'star-intensity': 0.6
                        });
                    });
                    // End Atmosphere
                }
            },

            initializ: function () {
                loadMap.fullPageMap()
            }

        };

        $(function () {
            //loadMap.initializ()
        });
    }
}

export let anlibreedersMap = new AnlibreedersMap();