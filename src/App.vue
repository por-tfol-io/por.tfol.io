<template>
  <ColorAnimator
    id="app"
    :foregroundColor="fgColor"
    :backgroundColor="bgColor"
  >
    <Header/>
    <main class="main">
      <transition
        mode="out-in"
        :name="transitionName"
      >
        <router-view
          class="view"
          v-bind:key="$route.fullPath"
        ></router-view>
      </transition>
    </main>
  </ColorAnimator>
</template>

<script>
import Header from '@/views/Header.vue';
import ColorAnimator from '@/components/ColorAnimator.vue';

export default {
  name: 'App',
  components: {
    Header,
    ColorAnimator,
  },
  data() {
    return {
      transitionName: 'slide',
      basePaths: [],
      fgColor: null,
      bgColor: null,
    };
  },
  created() {
    this.basePaths = this.$router.options.routes.map(route => route.path);
    this.fgColor = this.$router.currentRoute.meta.fgColor;
    this.bgColor = this.$router.currentRoute.meta.bgColor;
  },
  watch: {
    '$route'(to, from) { // eslint-disable-line
      const fromPath = from.path;
      const toPath = to.path;
      const fromDepth = fromPath.split('/').length;
      const toDepth = toPath.split('/').length;
      // check for child-parent relations
      if (fromDepth !== toDepth && (fromPath.includes(toPath) || toPath.includes(fromPath))) {
        this.transitionName = fromDepth < toDepth ? 'fade-scale-in' : 'fade-scale-out';
      } else {
        const ordinal = this.basePaths.indexOf(toPath) > this.basePaths.indexOf(fromPath);
        this.transitionName = ordinal ? 'slide-right' : 'slide-left';
      }

      this.fgColor = to.meta.fgColor;
      this.bgColor = to.meta.bgColor;
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
    transition: left 300ms ease, right 300ms ease;
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
  .fade-scale-in-leave-active,
  .fade-scale-out-enter-active,
  .fade-scale-out-leave-active {
    transition: opacity 300ms ease, transform 300ms ease;
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
    transform: scale(.3);
  }

  .fade-scale-out-enter,
  .fade-scale-in-leave-to {
    transform: scale(3);
  }

</style>
