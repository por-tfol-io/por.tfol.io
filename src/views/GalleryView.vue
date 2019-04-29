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
      <router-link class="control"
                   :to="prevPath">
        <Icon name="chevron-left"/>
      </router-link>
      <router-link class="control"
                   :to="nextPath">
        <Icon name="chevron-right"/>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Icon from '@/components/Icon.vue';
import WebView from '@/components/WebView.vue';

export default {
  name: 'GalleryView',
  components: {
    Icon,
    WebView,
  },
  props: {
    viewPath: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isExpanded: false,
    };
  },
  methods: {
    expand() {
      this.isExpanded = true;
    },
  },
  computed: {
    ...mapGetters([
      'getGalleryItemByPath',
      'getPrevGalleryItemByPath',
      'getNextGalleryItemByPath',
    ]),
    prevPath() {
      return this.getPrevGalleryItemByPath(this.viewPath).path;
    },
    nextPath() {
      return this.getNextGalleryItemByPath(this.viewPath).path;
    },
    url() {
      return this.getGalleryItemByPath(this.viewPath).url;
    },
  },
};
</script>

<style scoped lang="scss">
  @import '../styles/globals';

  $control-size: .8rem;

  .gallery-view {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: stretch;
    height: 100%;

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
