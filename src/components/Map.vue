<template>
    <div>
        <div id="map" />
        <Search
            id="search"
            @toLnglat="panTo($event)"
            @fitBounds="fitBounds($event)"
        />
    </div>
</template>

<script>
import Search from './Search.vue';

import { Map, NavigationControl, Popup, GeolocateControl } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import bbox from '@turf/bbox';

import { getFreqSourcesLayers } from '../loader';

import sightseeing from '../assets/sightseeing.json';
import convenience from '../assets/convenience.json';

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

const conveniencePaint = {
    'circle-radius': ['interpolate', ['linear'], ['zoom'], 7, 1, 12, 4],
    'circle-stroke-color': '#ffffff',
    'circle-stroke-width': ['interpolate', ['linear'], ['zoom'], 9, 0, 12, 1],
};

const initMap = () => {
    const map = new Map({
        container: 'map',
        center: [142.9819, 40.3981],
        maxBounds: [139, 40, 150, 46],
        zoom: 6,
        maxZoom: 17,
        customAttribution: `<a href='https://github.com/hokkaido-bus-map/hokkaido-bus-map.github.io' target='_blank'>ソースコード・データ出典</a>`,
        style: {
            version: 8,
            glyphs: 'https://glyphs.geolonia.com/{fontstack}/{range}.pbf',
            sources: {
                background: {
                    type: 'raster',
                    tiles: [
                        'https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png',
                    ],
                    tileSize: 256,
                    attribution: '地理院タイル',
                    maxzoom: 18,
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
                convenience: {
                    type: 'geojson',
                    data: convenience,
                },
            },
            layers: [
                {
                    id: 'background',
                    type: 'raster',
                    source: 'background',
                    minzoom: 0,
                    maxzoom: 18,
                    paint: {
                        'raster-opacity': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            10,
                            0.9,
                            13,
                            0.4,
                        ],
                    },
                },
                ...[
                    ...kitamiFreq.layers,
                    ...abashiriFreq.layers,
                    ...abashirishisetsumeguriFreq.layers,
                    ...akanFreq.layers,
                    ...kitamimemanbetsuairportFreq.layers,
                    ...takushokuFreq.layers,
                    ...tokachiFreq.layers,
                ].sort((_, b) => {
                    if (b.type === 'circle') return -1;
                    if (b.type === 'symbol') return -1;
                    else return 1;
                }),
                {
                    id: 'convenience-seven',
                    type: 'circle',
                    source: 'convenience',
                    minzoom: 5,
                    paint: {
                        ...conveniencePaint,
                        'circle-color': '#ee2222',
                    },
                    filter: ['==', ['get', 'brand'], 'セブンイレブン'],
                },
                {
                    id: 'convenience-secoma',
                    type: 'circle',
                    source: 'convenience',
                    minzoom: 5,
                    paint: { ...conveniencePaint, 'circle-color': '#ff9900' },
                    filter: ['==', ['get', 'brand'], 'セイコーマート'],
                },
                {
                    id: 'convenience-lawson',
                    type: 'circle',
                    source: 'convenience',
                    minzoom: 5,
                    paint: { ...conveniencePaint, 'circle-color': '#3333cc' },
                    filter: ['==', ['get', 'brand'], 'ローソン'],
                },
                {
                    id: 'convenience-famima',
                    type: 'circle',
                    source: 'convenience',
                    minzoom: 5,
                    paint: { ...conveniencePaint, 'circle-color': '#33cc33' },
                    filter: ['==', ['get', 'brand'], 'ファミリーマート'],
                },
                {
                    id: 'convenience-text',
                    type: 'symbol',
                    source: 'convenience',
                    minzoom: 14,
                    layout: {
                        'text-field': ['get', 'brand'],
                        'text-font': ['Noto Sans CJK JP Regular'],
                        'text-size': 8,
                        'text-offset': [0, 0.4],
                        'text-anchor': 'top',
                    },
                    paint: {
                        'text-halo-width': 1.5,
                        'text-halo-color': '#ffffff',
                    },
                },
                {
                    id: 'sightseeing',
                    type: 'circle',
                    source: 'sightseeing',
                    paint: {
                        'circle-color': '#ffdd00',
                        'circle-stroke-color': '#333333',
                        'circle-stroke-width': 1,
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
                        'text-size': 11,
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
    map.addControl(new NavigationControl(), 'top-left');
    map.addControl(
        new GeolocateControl({
            showUserLocation: true,
            trackUserLocation: true,
        }),
        'top-left',
    );
    return map;
};

export default {
    name: 'Map',
    components: { Search },
    data() {
        return {
            map: null,
        };
    },
    mounted: function() {
        const map = initMap();
        const onclick = (e) => {
            new Popup()
                .setLngLat(e.features[0].geometry.coordinates)
                .setHTML(
                    `
                <span><span style='font-weight:600'><a href='https://www.google.com/search?q=${e.features[0].properties['施設名/名称']}' target='_blank'>${e.features[0].properties['施設名/名称']} - Google検索</a></span><br />
                <span>〒${e.features[0].properties['郵便番号']}<br />${e.features[0].properties['住所']}</span>
                `,
                )
                .setMaxWidth('600px')
                .addTo(map);
        };
        const onmouseenter = () => (map.getCanvas().style.cursor = 'pointer');
        const onmouseleave = () => (map.getCanvas().style.cursor = '');
        map.on('click', 'sightseeing', onclick);
        map.on('mouseenter', 'sightseeing', onmouseenter);
        map.on('mouseleave', 'sightseeing', onmouseleave);
        this.map = map;
    },
    methods: {
        panTo: function(lnglat) {
            this.map.easeTo({ center: lnglat, zoom: 14 });
        },
        fitBounds: function(results) {
            const featurecollection = {
                type: 'FeatureCollection',
                features: results.map((result) => {
                    return {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: result.item.lnglat,
                        },
                    };
                }),
            };
            const bounds = bbox(featurecollection);
            this.map.fitBounds(bounds, { padding: 50 });
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
    height: calc(100vh - 50px);
}
#search {
    position: absolute;
    left: 48px;
    top: 48px;
}
</style>
