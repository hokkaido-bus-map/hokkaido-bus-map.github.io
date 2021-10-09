<template>
    <header id="wrapper">
        <span id="title">Hokkaido Bus map</span>
        <span id="subtitle">
            - オープンデータによるバス運行頻度・コンビニ・観光地の地図
        </span>
    </header>
</template>
<script>
export default {
    name: 'Header',
};
</script>
<style scoped>
#wrapper {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background-color: #333;
    color: #ddd;
    padding: 4px;
}
#title {
    font-weight: 600;
    font-size: 1.4rem;
    margin: 0 0 0 4px;
}
#subtitle {
    font-size: 1rem;
}
</style>
