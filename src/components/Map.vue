<template>
    <div id="map" />
</template>

<script>
import { Map } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

import kitamiFreq from '../assets/busdata/kitami/frequency.json';
import kitamiFreqStops from '../assets/busdata/kitami/frequency_stops.json';

const initMap = () => {
    const map = new Map({
        container: 'map',
        center: [142.9819, 40.3981],
        zoom: 6,
        style: {
            version: 8,
            glyphs: 'https://mierune.github.io/fonts/{fontstack}/{range}.pbf',
            sources: {
                OSM: {
                    type: 'raster',
                    tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
                    tileSize: 256,
                    attribution:
                        'Map data &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                },
                kitamiFreq: {
                    type: 'geojson',
                    data: kitamiFreq,
                },
                kitamiFreqStops: {
                    type: 'geojson',
                    data: kitamiFreqStops,
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
                {
                    id: 'kitamiFreq',
                    type: 'line',
                    source: 'kitamiFreq',
                    paint: {
                        'line-color': '#009900',
                        'line-width': [
                            'interpolate',
                            ['linear'],
                            ['get', 'frequency'],
                            1,
                            0.1,
                            10,
                            5,
                            100,
                            10,
                        ],
                    },
                },
                {
                    id: 'kitamiFreqText',
                    type: 'symbol',
                    source: 'kitamiFreq',
                    layout: {
                        'symbol-placement': 'line-center',
                        'text-field': ['get', 'frequency'],
                        'text-font': ['Noto Sans CJK JP Regular'],
                        'text-size': 14,
                        'text-offset': [0, -1],
                    },
                },
                {
                    id: 'kitamiFreqStops',
                    type: 'circle',
                    source: 'kitamiFreqStops',
                    paint: {
                        'circle-radius': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            1,
                            1,
                            5,
                            2,
                            10,
                            3,
                            16,
                            4,
                        ],
                    },
                },
                {
                    id: 'kitamiFreqStopsText',
                    type: 'symbol',
                    source: 'kitamiFreqStops',
                    minzoom: 11,
                    layout: {
                        'text-field': ['get', 'similar_stop_name'],
                        'text-font': ['Noto Sans CJK JP Regular'],
                        'text-size': 14,
                        'text-offset': [0, 1],
                    },
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
