<template>
  <router-link class="about" :to="topicNextPath">
    <section class="horizontal">
      <Icon class="right next" name="arrow-right-circle"/>
    </section>
    <section class="content">
      <p
        v-for="(paragraph, index) in topicTextContent"
        :key="index"
      >{{ paragraph }}</p>
    </section>
  </router-link>
</template>

<script>
import { mapGetters } from 'vuex';
import Icon from '@/components/Icon.vue';

export default {
  name: 'About',
  components: {
    Icon,
  },
  props: {
    topic: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapGetters([
      'getNextTopic',
      'getTopicPropValue',
    ]),
    topicTextContent() {
      return this.getTopicPropValue(this.topic, 'text');
    },
    nextTopic() {
      const nextTopicData = this.getNextTopic(this.topic);
      let nextTopicName;
      if (nextTopicData) {
        nextTopicName = nextTopicData.name;
      }
      return nextTopicName;
    },
    topicNextPath() {
      if (this.nextTopic) {
        return `/about/${this.nextTopic}`;
      }
      return '/gallery';
    },
  },
};
</script>

<style scoped lang="scss">
  @import '../styles/globals';

  .about {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: stretch;
    height: 100%;

    .icon {
      &.next {
        font-size: 3rem;
        color: var(--color-accent-1);
      }

      &.topic {
        position: absolute;
        top: $layout-pad * -1;
        left: -10vh;
        font-size: 100vh;
        opacity: .1;
        // don't disturb the scroll of the content element
        pointer-events: none;
      }
    }

    section {
      flex-grow: 1;
      margin: 0 0 2em;

      &:last-child {
        flex-grow: 0;
        margin-bottom: 0;
      }

      p {
        margin-top: 1.5em;
        line-height: 1.8;
        font-weight: bold;

        &:first-of-type {
          margin-top: 0;
        }
      }

      &.horizontal {
        display: flex;
        flex-direction: row;

        .right {
          flex-grow: 1;
          text-align: right;
        }
      }

      &.content {
        overflow-y: scroll;
      }
    }
  }

</style>
