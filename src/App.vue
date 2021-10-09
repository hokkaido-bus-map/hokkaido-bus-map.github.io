<template>
    <div id="wrapper">
        <Header />
        <Map />
    </div>
</template>

<script>
import Header from './components/Header.vue';
import Map from './components/Map.vue';

export default {
    name: 'App',
    components: {
        Map,
        Header,
    },
};
</script>
