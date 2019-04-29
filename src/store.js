import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // todo - fetch these items from github etc., use a single item as default state (empty view)
    galleryItems: [
      {
        path: 'dot-css',
        name: 'dot.css',
        url: 'https://eliranmal.github.io/dot.css/',
      },
      {
        path: 'cinematic',
        name: 'cinematic',
        url: 'https://cinematic-8d9a1mf4w.now.sh/',
      },
      {
        path: 'pumpernickel',
        name: 'pumpernickel',
        url: '',
      },
    ],
  },
  getters: {

    getGalleryItemByPath: ({ galleryItems }) => (path) => {
      return galleryItems.find(item => item.path === path);
    },
    getGalleryItemIndexByPath: ({ galleryItems }) => (path) => {
      return galleryItems.findIndex(item => item.path === path);
    },
    getPrevGalleryItemIndexByPath: (
      { galleryItems },
      { getGalleryItemIndexByPath },
    ) => (currPath) => {
      return (getGalleryItemIndexByPath(currPath) - 1 + galleryItems.length) % galleryItems.length;
    },
    getNextGalleryItemIndexByPath: (
      { galleryItems },
      { getGalleryItemIndexByPath },
    ) => (currPath) => {
      return (getGalleryItemIndexByPath(currPath) + 1) % galleryItems.length;
    },
    getPrevGalleryItemByPath: (
      { galleryItems },
      { getPrevGalleryItemIndexByPath },
    ) => (currPath) => {
      return galleryItems[getPrevGalleryItemIndexByPath(currPath)];
    },
    getNextGalleryItemByPath: (
      { galleryItems },
      { getNextGalleryItemIndexByPath },
    ) => (currPath) => {
      return galleryItems[getNextGalleryItemIndexByPath(currPath)];
    },

  },

  mutations: {},
  actions: {},
});
