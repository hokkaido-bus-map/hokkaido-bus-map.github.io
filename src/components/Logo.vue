<template>
    <header id="wrapper">
        <img src="/header.png" />
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
    background-color: #fff;
    color: #ddd;
    padding: 4px;
}
</style>
