<template>
    <div class="container">
        <h1>404</h1>
        <h1>Page Not Found</h1>
    </div>
</template>
<script>
    export default{
        mounted(){
            setTimeout(() => {
                this.$router.push("/");
            }, 3000);
        }
    }
</script>
<style scoped>
.container {
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
}
</style>