<template>
    <div id="map" />
</template>

<script>
import { Map } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

import { getFreqSourcesLayers } from '../loader';

import kitamiFreqGeojson from '../assets/busdata/kitami/frequency.json';
import kitamiFreqStopsGeojson from '../assets/busdata/kitami/frequency_stops.json';
import abashiriFreqGeojson from '../assets/busdata/abashiri/frequency.json';
import abashiriFreqStopsGeojson from '../assets/busdata/abashiri/frequency_stops.json';
import akanFreqGeojson from '../assets/busdata/akan/frequency.json';
import akanFreqStopsGeojson from '../assets/busdata/akan/frequency_stops.json';
import memanbetsuFreqGeojson from '../assets/busdata/memanbetsu/frequency.json';
import memanbetsuFreqStopsGeojson from '../assets/busdata/memanbetsu/frequency_stops.json';
import takushokuFreqGeojson from '../assets/busdata/takushoku/frequency.json';
import takushokuFreqStopsGeojson from '../assets/busdata/takushoku/frequency_stops.json';
import tokachiFreqGeojson from '../assets/busdata/tokachi/frequency.json';
import tokachiFreqStopsGeojson from '../assets/busdata/tokachi/frequency_stops.json';

const kitamiFreq = getFreqSourcesLayers(
    kitamiFreqGeojson,
    kitamiFreqStopsGeojson,
    'kitami',
);
const abashiriFreq = getFreqSourcesLayers(
    abashiriFreqGeojson,
    abashiriFreqStopsGeojson,
    'abashiri',
);
const akanFreq = getFreqSourcesLayers(
    akanFreqGeojson,
    akanFreqStopsGeojson,
    'akan',
);
const memanbetsuFreq = getFreqSourcesLayers(
    memanbetsuFreqGeojson,
    memanbetsuFreqStopsGeojson,
    'memanbetsu',
);
const takushokuFreq = getFreqSourcesLayers(
    takushokuFreqGeojson,
    takushokuFreqStopsGeojson,
    'takushoku',
);
const tokachiFreq = getFreqSourcesLayers(
    tokachiFreqGeojson,
    tokachiFreqStopsGeojson,
    'tokachi',
);

const initMap = () => {
    const map = new Map({
        container: 'map',
        center: [142.9819, 40.3981],
        zoom: 6,
        style: {
            version: 8,
            glyphs: 'https://glyphs.geolonia.com/{fontstack}/{range}.pbf',
            sources: {
                OSM: {
                    type: 'raster',
                    tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
                    tileSize: 256,
                    attribution:
                        'Map data &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                },
                ...kitamiFreq.sources,
                ...abashiriFreq.sources,
                ...akanFreq.sources,
                ...memanbetsuFreq.sources,
                ...takushokuFreq.sources,
                ...tokachiFreq.sources,
            },
            layers: [
                {
                    id: 'OSM',
                    type: 'raster',
                    source: 'OSM',
                    minzoom: 0,
                    maxzoom: 18,
                },
                ...kitamiFreq.layers,
                ...abashiriFreq.layers,
                ...akanFreq.layers,
                ...memanbetsuFreq.layers,
                ...takushokuFreq.layers,
                ...tokachiFreq.layers,
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
