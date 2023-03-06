import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import AlbumsList from './components/albums-list.vue';
import AlbumsDetail from './components/albums-detail.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: "/", component: AlbumsList},
        {path: "/albums/:id", name: "album", component: AlbumsDetail}
    ]
});

const app = createApp(App);
app.use(router);
app.mount('#app');
