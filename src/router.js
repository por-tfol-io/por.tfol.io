import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Gallery from './views/Gallery.vue';
import Contact from './views/Contact.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {
        fgColor: [105, 170, 197], // base color
        bgColor: [34, 38, 37], // background color
      },
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: Gallery,
      // consider route level code-splitting for the gallery
      // component: () => import(/* webpackChunkName: "wat" */ './views/Wat.vue'),
      meta: {
        fgColor: [242, 235, 220], // content color
        bgColor: [105, 170, 197], // base color
      },
      children: [
        {
          path: 'dot-css',
          name: 'dot.css',
          meta: {
            url: 'https://eliranmal.github.io/dot.css/',
          },
        },
        {
          path: 'cinematic',
          name: 'cinematic',
          meta: {
            url: 'https://cinematic-8d9a1mf4w.now.sh/',
          },
        },
        {
          path: 'foo-bar',
          name: 'foo bar',
          meta: {
            url: '',
          },
        },
        {
          path: 'pumpernickel',
          name: 'pumpernickel',
          meta: {
            url: '',
          },
        },
        {
          path: 'wat',
          name: 'wat',
          meta: {
            url: '',
          },
        },
      ],
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
