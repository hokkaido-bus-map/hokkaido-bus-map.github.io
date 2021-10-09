<template>
    <div id="map" />
</template>

<script>
import { Map } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const initMap = () => {
    const map = new Map({
        container: 'map',
        center: [142.9819, 40.3981],
        zoom: 6,
        style: {
            version: 8,
            sources: {
                OSM: {
                    type: 'raster',
                    tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
                    tileSize: 256,
                    attribution:
                        'Map data &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                },
            },
            layers: [
                {
                    id: 'OSM',
                    type: 'raster',
                    source: 'OSM',
                    minzoom: 0,
                    maxzoom: 18,
                },
            ],
        },
    });
    return map;
};

export default {
    name: 'Map',
    mounted: function() {
        initMap();
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
    height: 100vh;
}
</style>
