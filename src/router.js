import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import GalleryIndex from './views/GalleryIndex.vue';
import GalleryView from './views/GalleryView.vue';
import Contact from './views/Contact.vue';
import store from './store';

Vue.use(Router);

const { galleryItemPaths } = store.getters;

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about/:topic(drive|skills|sharing)',
      name: 'about',
      component: About,
      props: true,
      meta: {
        fgColor: [105, 170, 197], // base color
        bgColor: [34, 38, 37], // background color
      },
    },
    {
      path: '/about/*',
      redirect: '/about',
    },
    {
      path: '/about',
      redirect: '/about/drive',
    },
    {
      path: `/gallery/:viewPath(${galleryItemPaths.join('|')})`,
      component: GalleryView,
      name: 'gallery',
      props: true,
    },
    {
      path: '/gallery/*',
      redirect: '/gallery',
    },
    {
      path: '/gallery',
      component: GalleryIndex,
      // consider route level code-splitting for the gallery
      // component: () => import(/* webpackChunkName: "wat" */ './views/Wat.vue'),
      meta: {
        fgColor: [242, 235, 220], // content color
        bgColor: [105, 170, 197], // base color
      },
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact,
      meta: {
        fgColor: [140, 20, 30], // accent 2 color
        bgColor: [242, 235, 220], // content color
      },
    },
  ],
});
