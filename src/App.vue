<template>
  <ColorAnimator
    id="app"
    :foregroundColor="fgColor"
    :backgroundColor="bgColor"
  >
    <transition-group
      class="watermark"
      v-bind="watermarkTransition"
    >
      <Icon
        v-for="name in [iconName || '']"
        :key="name + Date.now()"
        :name="name"
      ></Icon>
    </transition-group>
    <Header/>
    <main class="main">
      <transition
        mode="out-in"
        :name="routerViewTransition"
      >
        <router-view
          class="view"
          :key="$route.fullPath"
        ></router-view>
      </transition>
    </main>
  </ColorAnimator>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Icon from '@/components/Icon.vue';
import Header from '@/views/Header.vue';
import ColorAnimator from '@/components/ColorAnimator.vue';

const resolvePathDepth = path => path.split('/')
  .filter(Boolean).length;

const resolvePathIndex = (arr, path) => arr.indexOf(path);

const resolvePathBasenameIndex = (arr, path) => arr.indexOf(path.split('/')
  .pop());

export default {
  name: 'App',
  components: {
    Icon,
    Header,
    ColorAnimator,
  },
  data() {
    return {
      routerViewTransition: null,
      basePaths: [],
      fgColor: null,
      bgColor: null,
    };
  },
  created() {
    this.basePaths = this.$router.options.routes.map(route => route.path);
    this.fgColor = this.$route.meta.fgColor;
    this.bgColor = this.$route.meta.bgColor;
    this.updateIconName();
  },
  computed: {
    ...mapState({
      iconName: 'watermarkIconName',
    }),
    ...mapGetters({
      galleryPaths: 'galleryItemPaths',
      getTopicPropValue: 'getTopicPropValue',
    }),
    watermarkTransition() {
      return {
        'enter-active-class': `${this.routerViewTransition}-slow-enter-active`,
        'leave-active-class': `${this.routerViewTransition}-slow-leave-active`,
        'enter-class': `${this.routerViewTransition}-enter`,
        'leave-class': `${this.routerViewTransition}-leave`,
        'enter-to-class': `${this.routerViewTransition}-enter-to`,
        'leave-to-class': `${this.routerViewTransition}-leave-to`,
      };
    },
  },
  watch: {
    '$route'(to, from) { // eslint-disable-line
      this.routerViewTransition = this.resolveRouterViewTransition(to.path, from.path);
      this.fgColor = to.meta.fgColor;
      this.bgColor = to.meta.bgColor;
      this.updateIconName(to);
    },
  },
  methods: {
    resolveIconName(route = this.$route) {
      const { topic } = route.params;
      if (topic) {
        return this.getTopicPropValue(topic, 'icon');
      }
      const { iconName } = route.meta;
      if (iconName) {
        return iconName;
      }
      return '';
    },
    updateIconName(route = this.$route) {
      const iconName = this.resolveIconName(route);
      this.$store.commit('updateWatermarkIconName', {
        watermarkIconName: iconName,
      });
    },
    resolveRouterViewTransition(toPath, fromPath) {
      const fromDepth = resolvePathDepth(fromPath);
      const toDepth = resolvePathDepth(toPath);
      const hasChildParentRelations = fromDepth !== toDepth
        && (fromPath.includes(toPath) || toPath.includes(fromPath));

      if (hasChildParentRelations) {
        return fromDepth < toDepth ? 'fade-scale-in' : 'fade-scale-out';
      }

      // supported only on the root and gallery depth levels, for now
      const baseFromPathIndex = resolvePathIndex(this.basePaths, fromPath);
      const baseToPathIndex = resolvePathIndex(this.basePaths, toPath);
      // set the default transition to slide-right
      let ordinal = true;
      if (baseFromPathIndex !== -1 || baseToPathIndex !== -1) {
        ordinal = baseToPathIndex > baseFromPathIndex;
      } else {
        const galleryFromPathIndex = resolvePathBasenameIndex(this.galleryPaths, fromPath);
        const galleryToPathIndex = resolvePathBasenameIndex(this.galleryPaths, toPath);
        if (galleryFromPathIndex !== -1 || galleryToPathIndex !== -1) {
          const galleryPathsLastIndex = this.galleryPaths.length - 1;
          if ((galleryFromPathIndex === galleryPathsLastIndex && galleryToPathIndex === 0)
            || (galleryFromPathIndex === 0 && galleryToPathIndex === galleryPathsLastIndex)) {
            ordinal = galleryToPathIndex < galleryFromPathIndex;
          } else {
            ordinal = galleryToPathIndex > galleryFromPathIndex;
          }
        }
      }

      return ordinal ? 'slide-right' : 'slide-left';
    },
  },
};
</script>

<style lang="scss">
  @import "./styles/globals";

  #app {
    position: relative;
    width: 100%;
    height: 100%;

    .watermark {
      position: absolute;
      top: 0;
      left: #{$header-size - ($layout-pad * 2)};
      width: 100%;
      height: 100%;

      .icon {
        position: absolute;
        top: $layout-pad * -.5;
        width: 100%;
        font-size: 100vh;
        opacity: .2;
        // don't disturb the scroll of the content element
        pointer-events: none;
      }
    }

    .main,
    .header {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
    }

    .header {
      z-index: 1;
      width: var(--header-size);
      padding: var(--layout-pad) 0 var(--layout-pad) var(--layout-pad);
    }

    .main {
      overflow-x: hidden;
      overflow-y: auto;

      .view {
        // a must-have for the route transitions to work
        position: relative;
        margin-left: var(--header-size);
        width: calc(100% - #{$header-size});
        padding: var(--layout-pad);
        // allow child views to come to the front by using background overlay
        // use the same rule in child views to take over the screen
        background-color: inherit;
      }
    }
  }


  .slide-left-enter-active,
  .slide-left-leave-active,
  .slide-right-enter-active,
  .slide-right-leave-active {
    transition: left 300ms ease-in-out, right 300ms ease-in-out;
  }

  .slide-left-slow-enter-active,
  .slide-left-slow-leave-active,
  .slide-right-slow-enter-active,
  .slide-right-slow-leave-active {
    transition: left 600ms ease-in-out, right 600ms ease-in-out;
  }

  .slide-left-enter,
  .slide-right-leave-to {
    left: -100%;
  }

  .slide-left-enter-to,
  .slide-right-leave {
    left: 0;
  }

  .slide-right-enter,
  .slide-left-leave-to {
    right: -100%;
  }

  .slide-right-enter-to,
  .slide-left-leave {
    right: 0;
  }


  .fade-scale-in-enter-active,
  .fade-scale-out-enter-active {
    transition: opacity 200ms ease-in, transform 300ms ease-in;
  }

  .fade-scale-in-leave-active,
  .fade-scale-out-leave-active {
    transition: opacity 200ms ease-out, transform 300ms ease-in;
  }

  .fade-scale-in-slow-enter-active,
  .fade-scale-out-slow-enter-active {
    transition: opacity 800ms ease-out, transform 900ms ease-out;
  }

  .fade-scale-out-slow-leave-active,
  .fade-scale-in-slow-leave-active {
    transition: opacity 800ms ease-in, transform 900ms ease-out;
  }

  .fade-scale-in-enter,
  .fade-scale-out-enter {
    opacity: 0;
  }

  .fade-scale-in-leave-to,
  .fade-scale-out-leave-to {
    opacity: 0;
  }

  .fade-scale-in-enter,
  .fade-scale-out-leave-to {
    transform: scale(0);
  }

  .fade-scale-out-enter,
  .fade-scale-in-leave-to {
    transform: scale(10);
  }

</style>
