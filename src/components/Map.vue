<template>
    <div id="map" />
</template>

<script>
import { Map } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

import { getFreqSourcesLayers } from '../loader';

import sightseeing from '../assets/sightseeing.json';
import kitamiFreqGeojson from '../assets/busdata/kitami/frequency.json';
import kitamiFreqStopsGeojson from '../assets/busdata/kitami/frequency_stops.json';
import kitamimemanbetsuairportFreqGeojson from '../assets/busdata/kitamimemanbetsuairport/frequency.json';
import kitamimemanbetsuairportFreqStopsGeojson from '../assets/busdata/kitamimemanbetsuairport/frequency_stops.json';
import abashiriFreqGeojson from '../assets/busdata/abashiri/frequency.json';
import abashiriFreqStopsGeojson from '../assets/busdata/abashiri/frequency_stops.json';
import abashirishisetsumeguriFreqGeojson from '../assets/busdata/abashirishisetsumeguri/frequency.json';
import abashirishisetsumeguriFreqStopsGeojson from '../assets/busdata/abashirishisetsumeguri/frequency_stops.json';
import akanFreqGeojson from '../assets/busdata/akan/frequency.json';
import akanFreqStopsGeojson from '../assets/busdata/akan/frequency_stops.json';
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
const abashirishisetsumeguriFreq = getFreqSourcesLayers(
    abashirishisetsumeguriFreqGeojson,
    abashirishisetsumeguriFreqStopsGeojson,
    'abashirishisetsumeguri',
);
const akanFreq = getFreqSourcesLayers(
    akanFreqGeojson,
    akanFreqStopsGeojson,
    'akan',
);
const kitamimemanbetsuairportFreq = getFreqSourcesLayers(
    kitamimemanbetsuairportFreqGeojson,
    kitamimemanbetsuairportFreqStopsGeojson,
    'kitamimemanbetsuairport',
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
        maxBounds: [139, 40, 150, 46],
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
                ...abashirishisetsumeguriFreq.sources,
                ...akanFreq.sources,
                ...kitamimemanbetsuairportFreq.sources,
                ...takushokuFreq.sources,
                ...tokachiFreq.sources,
                sightseeing: {
                    type: 'geojson',
                    data: sightseeing,
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
                ...kitamiFreq.layers,
                ...abashiriFreq.layers,
                ...abashirishisetsumeguriFreq.layers,
                ...akanFreq.layers,
                ...kitamimemanbetsuairportFreq.layers,
                ...takushokuFreq.layers,
                ...tokachiFreq.layers,
                {
                    id: 'sightseeing',
                    type: 'circle',
                    source: 'sightseeing',
                    paint: {
                        'circle-color': '#ff9900',
                        'circle-stroke-color': '#ffffff',
                        'circle-stroke-width': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            6,
                            1,
                            15,
                            2,
                        ],
                        'circle-radius': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            6,
                            4,
                            10,
                            5,
                            15,
                            6,
                        ],
                    },
                },
                {
                    id: 'sightseeingText',
                    type: 'symbol',
                    source: 'sightseeing',
                    minzoom: 7,
                    layout: {
                        'text-field': ['get', '施設名/名称'],
                        'text-font': ['Noto Sans CJK JP Regular'],
                        'text-size': 10,
                        'text-offset': [0, 0.5],
                        'text-anchor': 'top',
                    },
                    paint: {
                        'text-halo-width': 1.5,
                        'text-halo-color': '#ffffff',
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
