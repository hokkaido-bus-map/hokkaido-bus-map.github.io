<template>
    <div>
        <input
            type="text"
            id="search-input"
            placeholder="地域、市町村、施設名で検索"
            v-model="query"
            @change="searchShisetsu"
        />
        <div id="result-box" v-show="results.length > 0">
            <div v-for="result in results" :key="result.item.name">
                <a
                    class="result-anchor"
                    href="#"
                    @click="$emit('toLnglat', result.item.lnglat)"
                >
                    {{ result.item.name }} </a
                ><br />
            </div>
        </div>
    </div>
</template>
<script>
import Fuse from 'fuse.js';
import sightseeing from '../assets/sightseeing.json';

const items = sightseeing.features.map((feature) => {
    return {
        name: feature.properties['施設名/名称'],
        terms: [feature.properties['地域名'], feature.properties['市町村名']],
        lnglat: [
            feature.properties['座標(lon)'],
            feature.properties['座標(lat)'],
        ],
    };
});
const fuse = new Fuse(items, {
    threshold: 0.3,
    keys: ['name', 'terms'],
    shouldSort: true,
});
export default {
    name: 'Search',
    data() {
        return {
            query: '',
            results: [],
        };
    },
    methods: {
        searchShisetsu: function() {
            this.results = fuse.search(this.query);

            if (this.results.length == 0) return;

            this.$emit('fitBounds', this.results);
        },
    },
};
</script>
<style scoped>
#result-box {
    background-color: #fff;
    padding: 4px;
    margin-top: 2px;
    max-height: 240px;
    width: 180px;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
    overflow-y: auto;
    border: 1px solid #666;
}
.result-anchor {
    font-size: 0.8rem;
}
#search-input {
    width: 182px;
}
</style>
