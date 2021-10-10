const getId = (prefix) => {
    return {
        freq: `${prefix}Freq`,
        freqText: `${prefix}FreqText`,
        freqStops: `${prefix}FreqStops`,
        freqStopsText: `${prefix}FreqStopsText`,
    };
};

export const getFreqSourcesLayers = (freqGeojson, freqStopsGeojson, prefix) => {
    return {
        sources: getFreqSources(freqGeojson, freqStopsGeojson, prefix),
        layers: getFreqLayers(prefix),
    };
};

const getFreqSources = (freqGeojson, freqStopsGeojson, prefix) => {
    const { freq, freqStops } = getId(prefix);
    return {
        [freq]: {
            type: 'geojson',
            data: freqGeojson,
        },
        [freqStops]: {
            type: 'geojson',
            data: freqStopsGeojson,
        },
    };
};

const getFreqLayers = (prefix) => {
    const { freq, freqText, freqStops, freqStopsText } = getId(prefix);
    return [
        {
            id: freq,
            type: 'line',
            source: freq,
            paint: {
                'line-color': '#22aa22',
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
            id: freqStops,
            type: 'circle',
            source: freqStops,
            minzoom: 11,
            paint: {
                'circle-radius': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    10,
                    2,
                    16,
                    6,
                ],
                'circle-color': '#fff',
                'circle-stroke-color': '#333',
                'circle-stroke-width': 1,
            },
        },
        {
            id: freqStopsText,
            type: 'symbol',
            source: freqStops,
            minzoom: 14,
            layout: {
                'text-field': ['get', 'similar_stop_name'],
                'text-font': ['Noto Sans CJK JP Regular'],
                'text-size': 12,
                'text-offset': [0.5, -0.1],
                'text-anchor': 'left',
            },
            paint: {
                'text-halo-width': 1.5,
                'text-halo-color': '#ffffff',
            },
        },
        {
            id: freqText,
            type: 'symbol',
            source: freq,
            minzoom: 14,
            layout: {
                'symbol-placement': 'line-center',
                'text-field': ['get', 'frequency'],
                'text-font': ['Noto Sans CJK JP Regular'],
                'text-size': 12,
                'text-offset': [0, -1],
                'text-ignore-placement': true,
            },
            paint: {
                'text-halo-width': 1.5,
                'text-halo-color': '#ffffff',
            },
        },
    ];
};
