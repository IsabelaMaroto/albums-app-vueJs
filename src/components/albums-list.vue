<template>
    <h2 class="title">Álbuns</h2>

    <div class="loader">
        <loader-type v-if="isLoading"></loader-type>
    </div>
    
    <div 
    v-for="(album, index) in List" :key="index" 
    @click="selectAlbum(album.id)"
    class="listAlbum"
    >
        <li>
            <a>{{ album.title }}</a>
        </li>
    </div>
</template>

<script>
import {getAlbumsList} from "../service/albums-service.js";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import LoaderType from '../components/loader-type.vue';

export default{
    components: {
        LoaderType,
    },
    setup(){
        const List = ref([]);
        const router = useRouter();
        const isLoading = ref(false);

        onMounted(()=>{
            isLoading.value = true;
            getAlbumsList().then(resp => {
                /* console.log(resp); */
                List.value = resp
            }).finally(()=>{
                isLoading.value = false;
            })
        });

        const selectAlbum = id => router.push({ name: "album", params: {id}});
        return{ List, selectAlbum, isLoading};
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
.listAlbum{
    background-color: #0A122A;
}
.listAlbum:hover{
    filter: brightness(2);
    cursor: pointer;
}
.listAlbum li{
    list-style:none;
    padding: 2rem;
    border-bottom: 1px solid;
}
.listAlbum li a{
    text-transform: capitalize;
}
.loader{
    display: flex;
    justify-content: center;
    margin: 1rem 0;
}
</style>