<template>
    <h2 class="title">Fotos</h2>

    <div class="buttonBack">
        <button @click="back" >Voltar</button>
    </div>

    <div class="loader">
        <loader-type v-if="isLoading"></loader-type>
    </div>

    <div class="container">
        <div v-if="info">
            <div 
            v-for="(imagem, index) in info" :key="index"
            class="item"
            >
                <img :src="imagem.thumbnailUrl"/>
                <p>{{imagem.title}}</p>
            </div>
        </div>
    </div>
    
</template>

<script>
    import {useRouter, useRoute} from "vue-router";
    import { onMounted, ref } from "vue";
    import { getAlbum} from "@/service/albums-service.js";
    import LoaderType from '../components/loader-type.vue';

    export default{
        components: {
           LoaderType,
        },
        setup(){
            const router = useRouter(); 
            const route = useRoute();
            const info = ref(null);
            const isLoading = ref(false);
            const listAlbuns = ref(null);

            onMounted(()=>{
                isLoading.value = true;

                getAlbum(route.params.id).then( resp => {
                    console.log(resp)
                    info.value = resp;
                }).finally(()=>{
                    isLoading.value = false;
                })
            });

            const back = () => router.replace("/");
            

            return{isLoading, info, back, listAlbuns};
        }
    }
</script>

<style scoped>
.title{
    text-align: center;
    background-color:#698F3F;
    padding: 1rem 0;
    margin: 0;
}
.container{
   padding: 1rem 2rem;
}
.item{
    border-bottom: 1px solid;
    padding: 1rem 0;
}
.item img , .item p{
    display: flex;
    justify-content: center;
    margin: 1rem auto;
    text-align: center;
}
.buttonBack{
    display: flex;
    justify-content: end;
    margin: 1rem 1rem;
}
.buttonBack button{
    padding: 0.5rem 1rem;
}
.buttonBack button:hover{
    cursor: pointer;
}
.loader{
    display: flex;
    justify-content: center;
}
</style>