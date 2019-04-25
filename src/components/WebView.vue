<template>
  <div class="web-view">
    <div class="overlay" v-show="!loaded">
      <Icon class="icon" name="cog" action="spin"/>
    </div>
    <object v-if="url"
            class="tunnel"
            allowfullscreen="allowfullscreen"
            ref="tunnel"
            :data="url"
            @load="onTunnelLoaded"
    ></object>
  </div>
</template>

<script>
import Icon from '@/components/Icon.vue';

export default {
  name: 'WebView',
  components: {
    Icon,
  },
  props: {
    url: String,
    isFullscreen: Boolean,
  },
  data() {
    return {
      loaded: false,
    };
  },
  mounted() {
    document.addEventListener('fullscreenchange', this.onFullscreenChange, false);
  },
  beforeDestroy() {
    document.removeEventListener('fullscreenchange', this.onFullscreenChange, false);
  },
  methods: {
    async goFullScreen() {
      // todo - use screenfull.js instead (npm i -S screenfull)
      return this.$refs.tunnel.requestFullscreen();
    },
    async exitFullScreen() {
      // todo - use screenfull.js instead
      if (this.isDomFullscreen()) {
        return this.$refs.tunnel.exitFullscreen();
      }
      return false;
    },
    onTunnelLoaded() {
      const delay = Math.random() * 200 + 100;
      window.setTimeout(() => {
        this.loaded = true;
      }, delay);
    },
    onFullscreenChange() {
      this.$emit('update:isFullscreen', this.isDomFullscreen());
    },
    isDomFullscreen() {
      return !!(
        // todo - use a proper library for this stuff (screenfull.js?)
        document.webkitIsFullScreen && document.webkitCurrentFullScreenElement
      );
    },
  },
  watch: {
    async isFullscreen(newValue) {
      if (typeof newValue !== 'boolean') {
        return false;
      }
      let result;
      if (newValue) {
        result = this.goFullScreen();
      } else {
        result = this.exitFullScreen();
      }
      return result;
    },
  },
};
</script>

<style scoped lang="scss">

  $zoom: 1.5;

  .web-view {
    position: relative;
    box-shadow: 1px 1px 5px #999;

    .overlay {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #333;

      .icon {
        font-size: 3rem;
      }
    }

    .tunnel {
      display: block;
      width: calc(100% * #{$zoom});
      height: calc(100% * #{$zoom});
      transform: scale(1 / $zoom, 1 / $zoom);
      transform-origin: 0 0;
      border: 0 none;
    }
  }
</style>
