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
            id: freqText,
            type: 'symbol',
            source: freq,
            minzoom: 11,
            layout: {
                'symbol-placement': 'line-center',
                'text-field': ['get', 'frequency'],
                'text-font': ['Noto Sans CJK JP Regular'],
                'text-size': 12,
                'text-offset': [0, -1],
            },
            paint: {
                'text-halo-width': 1.5,
                'text-halo-color': '#ffffff',
            },
        },
        {
            id: freqStops,
            type: 'circle',
            source: freqStops,
            paint: {
                'circle-radius': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    1,
                    0.5,
                    5,
                    2,
                    10,
                    3,
                    16,
                    5,
                ],
                'circle-stroke-color': '#ffffff',
                'circle-stroke-width': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    10,
                    0,
                    15,
                    2,
                ],
            },
        },
        {
            id: freqStopsText,
            type: 'symbol',
            source: freqStops,
            minzoom: 11,
            layout: {
                'text-field': ['get', 'similar_stop_name'],
                'text-font': ['Noto Sans CJK JP Regular'],
                'text-size': 10,
                'text-offset': [0, 1],
            },
            paint: {
                'text-halo-width': 1.5,
                'text-halo-color': '#ffffff',
            },
        },
    ];
};
