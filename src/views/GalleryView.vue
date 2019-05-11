<template>
  <div class="gallery-view">
    <WebView
      v-if="url"
      :url="url"
      :isFullscreen.sync="isExpanded"
    />
    <div v-else
         class="empty-view">
      <Icon name="unlink"/>
      <span v-for="line in i18n.brokenLink" :key="line">{{ line }}</span>
    </div>
    <div class="fill"></div>
    <div class="controls">
      <!--todo - extract these to a component-->
      <router-link class="control exit"
                   to="/gallery">
        <Icon name="exit"/>
        {{ i18n.label.exit }}
      </router-link>
      <span class="control info"
            tabindex="0"
            v-on="{ click: showInfo }">
        <Icon name="question-circle"/>
        {{ i18n.label.info }}
      </span>
      <span class="control expand"
            tabindex="0"
            :class="{
              disabled: !url,
            }"
            v-on="{ click: expand }">
        <Icon name="frame-expand"/>
        {{ i18n.label.expand }}
      </span>
      <router-link class="control"
                   :to="prevPath">
        <Icon name="arrow-left"/>
        {{ i18n.label.prev }}
      </router-link>
      <router-link class="control"
                   :to="nextPath">
        <Icon name="arrow-right"/>
        {{ i18n.label.next }}
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
      i18n: {
        brokenLink: [
          'this item seems to be broken...',
          'try another one, or let me know.',
        ],
        label: {
          prev: 'prev',
          next: 'next',
          expand: 'expand',
          info: 'info',
          exit: 'exit',
        },
      },
      isExpanded: false,
    };
  },
  methods: {
    expand() {
      this.isExpanded = true;
    },
    showInfo() {
      // todo - implement with an overlay semi-transparent dialog, add links to github etc. inside
    },
  },
  computed: {
    ...mapGetters([
      'getGalleryItem',
      'getPrevGalleryItem',
      'getNextGalleryItem',
    ]),
    prevPath() {
      return this.getPrevGalleryItem(this.viewPath).path;
    },
    nextPath() {
      return this.getNextGalleryItem(this.viewPath).path;
    },
    url() {
      return this.getGalleryItem(this.viewPath).url;
    },
  },
};
</script>

<style scoped lang="scss">
  @import '../styles/globals';

  $text-size: 1rem;
  $icon-size: $text-size * 1.5;

  .gallery-view {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: stretch;
    height: 100%;

    .icon {
      display: block;
      margin: 0 0 .5em;
      font-size: 6rem;
    }

    .web-view {
      width: calc(100vw - #{$header-size} - #{$layout-pad * 2});
      height: calc((100vw - #{$header-size} - #{$layout-pad * 2}) * .55);
      border-radius: 5px;
      border: 3px solid;
    }

    .empty-view {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;

      .icon {
        font-size: $icon-size * 3;
      }
    }

    .fill {
      flex-grow: 1;
    }

    .controls {
      flex-grow: 0;
      align-self: stretch;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: stretch;
      margin-top: $icon-size;

      .control {
        flex-grow: 1;
        // stretch all controls with equal widths
        width: 100%;
        margin: 0 $text-size 0 0;
        outline: 0 none;
        text-align: center;
        font-size: $text-size;
        cursor: pointer;
        opacity: var(--opacity-reduced);
        text-shadow: 1px 1px 3px #ccc;

        &:last-child {
          margin-right: 0;
        }

        &:hover,
        &:active {
          opacity: 1;
        }

        &.disabled {
          opacity: calc(var(--opacity-reduced) * .666);
          pointer-events: none;
        }

        .icon {
          font-size: $icon-size;
        }
      }
    }
  }

</style>
