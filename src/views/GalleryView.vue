<template>
  <div class="gallery-view">
    <WebView
      v-if="url"
      :url="url"
      :isFullscreen.sync="isExpanded"
    />
    <div v-else># broken link #</div>
    <div class="fill"></div>
    <div class="controls">
        <span class="control expand"
              tabindex="0"
              :class="{
                disabled: !url,
              }"
              v-on="{ click: expand }">
          <Icon name="frame-expand"/>
        </span>
      <router-link class="control prev"
                   :to="prev">
        <Icon name="chevron-left"/>
      </router-link>
      <router-link class="control next"
                   :to="next">
        <Icon name="chevron-right"/>
      </router-link>
    </div>
  </div>
</template>

<script>
// import childRoutePaging from '@/mixins/child-route-paging';
import Icon from '@/components/Icon.vue';
import WebView from '@/components/WebView.vue';

const flattenArray = (accum, val) => {
  accum.push(...val);
  return accum;
};

const resolveChildPath = (childRoute) => {
  let path = '/gallery';
  if (childRoute && childRoute.path) {
    path += `/${childRoute.path}`;
  }
  return path;
};

export default {
  name: 'GalleryView',
  components: {
    Icon,
    WebView,
  },
  // mixins: [
  //   childRoutePaging,
  // ],
  props: {
    childView: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      i18n: {},
      isExpanded: false,
      childRoutes: [], // fixme - is this necessary to have it as observable?
    };
  },
  created() {
    // todo - childRoutes is not necessary here, get rid of it
    this.childRoutes = this.$router.options.routes
      .filter(route => route.name === 'gallery')
      .map(route => route.children)
      .reduce(flattenArray, []);
  },
  methods: {
    expand() {
      this.isExpanded = true;
    },
    resolveChildPathByIndex(index) {
      const route = this.childRoutes[index];
      return resolveChildPath(route);
    },
  },
  computed: {
    currentIndex() {
      // fixme - it seems that when using dynamic route params,
      // fixme - this.$route is the parent, and not the child route.
      // fixme - (e.g. gallery/:childView), should we detect this situation somehow and address it?

      // todo - try to use a nested router-view, and see if it solves this issue

      // return this.childRoutes.findIndex(route => route.name === this.$route.name);
      return this.childRoutes.findIndex(route => route.path === this.childView);
    },
    prev() {
      const prevIndex = (this.currentIndex - 1 + this.childRoutes.length) % this.childRoutes.length;
      return this.resolveChildPathByIndex(prevIndex);
    },
    next() {
      const nextIndex = (this.currentIndex + 1) % this.childRoutes.length;
      return this.resolveChildPathByIndex(nextIndex);
    },
    url() {
      let url = '';
      const currRoute = this.childRoutes[this.currentIndex];
      if (currRoute && currRoute.meta && currRoute.meta.url) {
        url = currRoute.meta.url; // eslint-disable-line
      }
      return url;
    },
  },
};
</script>

<style scoped lang="scss">
  @import '../styles/globals';

  $control-size: 1rem;

  .gallery-view {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: stretch;
    height: 100%;

    .accordion {
      position: absolute;
      top: 0;
      bottom: 0;
      left: var(--layout-pad);
      right: 0;
    }

    .web-view {
      width: calc(100vw - #{$header-size} - #{$layout-pad * 2});
      height: calc((100vw - #{$header-size} - #{$layout-pad * 2}) * .55);
      border-radius: 5px;
      border: 3px solid;
    }

    .fill {
      flex-grow: 1;
    }

    .controls {
      display: flex;
      flex-direction: row;
      align-items: center;
      flex-grow: 0;
      margin-top: $control-size * 1.5;

      .control {
        margin: 0;
        font-size: $control-size;
        cursor: pointer;

        &:not(:last-child) {
          margin-right: $control-size * 1.5;
        }

        &.disabled {
          opacity: var(--opacity-reduced);
          pointer-events: none;
        }

        &.expand {
          font-size: $control-size * 1.25;
        }

        .icon {
          font-weight: bold;
          text-shadow: 1px 1px 3px #999;
        }
      }
    }
  }
</style>
