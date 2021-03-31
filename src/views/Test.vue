<template>
    <div>   
        <test></test>
        <!-- <test-table></test-table> -->
    </div>
    
</template>

<script>
import Test from '../components/Request/RequestFirewall.vue'
import TestTable from '../components/Request/TestTable.vue'
export default {
    components:{
        'test':Test,
        'test-table':TestTable
    }
}
</script>

<style>

</style>