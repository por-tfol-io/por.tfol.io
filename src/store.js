import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({

  state: {
    watermarkIconName: null,
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
    topics: [
      {
        name: 'drive',
        icon: 'magnifier',
        text: [
          `curiosity is what drives me, and learning is what i love and do best.`,
          `i'm always on the search for new things to discover.`,
        ],
      },
      {
        name: 'skills',
        icon: 'code',
        text: [
          `i do web and full-stack development. language agnostic, but excel in javascript.`,
          `enthusiastic about functional programming, cloud computing, software architecture and design, quantum computing, IOT...`,
          `absolutely fascinated by design and user experience.`,
        ],
      },
      {
        name: 'sharing',
        icon: 'heart-pulse',
        text: [
          `i have the privilege to share the things i learn with amazing people who share back.`,
          'along the path, i had mentored developers, conducted seminars and courses, hosted technology events and instructed hackathons.',
          // 'open source is important to me (and so is open science/data). i advocate its premise where ever i go, and regularly contribute to open source projects.',
          'open source is important to me (and so is open science/data).',
        ],
      },
    ],
  },

  getters: {

    galleryItemPaths({ galleryItems }) {
      return galleryItems.map(item => item.path);
    },

    getGalleryItem: ({ galleryItems }) => (path) => {
      return galleryItems.find(item => item.path === path);
    },

    getGalleryItemIndex: ({ galleryItems }) => (path) => {
      return galleryItems.findIndex(item => item.path === path);
    },

    getPrevGalleryItemIndex: (
      { galleryItems },
      { getGalleryItemIndex },
    ) => (currPath) => {
      return (getGalleryItemIndex(currPath) - 1 + galleryItems.length) % galleryItems.length;
    },

    getNextGalleryItemIndex: (
      { galleryItems },
      { getGalleryItemIndex },
    ) => (currPath) => {
      return (getGalleryItemIndex(currPath) + 1) % galleryItems.length;
    },

    getPrevGalleryItem: (
      { galleryItems },
      { getPrevGalleryItemIndex },
    ) => (currPath) => {
      return galleryItems[getPrevGalleryItemIndex(currPath)];
    },

    getNextGalleryItem: (
      { galleryItems },
      { getNextGalleryItemIndex },
    ) => (currPath) => {
      return galleryItems[getNextGalleryItemIndex(currPath)];
    },


    getTopic: ({ topics }) => (topicName) => {
      return topics.find(t => t.name === topicName);
    },

    getTopicIndex: ({ topics }) => (topicName) => {
      return topics.findIndex(t => t.name === topicName);
    },

    getNextTopic: (
      { topics },
      { getTopicIndex },
    ) => (topicName, isCyclic) => {
      const currIndex = getTopicIndex(topicName);
      const nextIndex = isCyclic ? (currIndex + 1) % topics.length : currIndex + 1;
      return topics[nextIndex];
    },

    getTopicPropValue: (state, { getTopic }) => (topicName, propKey) => {
      let propValue;
      const data = getTopic(topicName);
      if (data) {
        propValue = data[propKey]; // eslint-disable-line
      }
      return propValue;
    },

  },

  mutations: {

    updateWatermarkIconName(state, { watermarkIconName }) {
      state.watermarkIconName = watermarkIconName; // eslint-disable-line no-param-reassign
    },

  },

  actions: {},

});
