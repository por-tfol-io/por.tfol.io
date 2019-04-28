<template>
  <router-link class="about" :to="topicNextPath">
    <!--todo - put this in the app level, and send events up tp update the icon name-->
    <Icon class="topic" :name="topicIconName"/>
    <section></section>
    <section class="content">
      <p
        v-for="(paragraph, index) in topicTextContent"
        :key="index"
      >{{ paragraph }}</p>
    </section>
    <section class="horizontal">
      <Icon class="right next" name="arrow-right-circle"/>
    </section>
  </router-link>
</template>

<script>
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
  data() {
    return {
      topics: new Map(Object.entries({
        drive: {
          icon: 'magnifier',
          text: [
            `curiosity is what drives me, and learning is what i love and do best.`,
            `i'm always on the search for new things to discover.`,
          ],
        },
        skills: {
          icon: 'code',
          text: [
            `i do web and full-stack development. language agnostic, but excel in javascript.`,
            `enthusiastic about functional programming, IOT, cloud computing, software architecture and design, quantum computing...`,
            `absolutely fascinated by user experience (as well as developer experience).`,
          ],
        },
        sharing: {
          icon: 'heart',
          text: [
            `along the path, i have the chance to share the things i learn with amazing people who share back.`,
            'through these connections i had mentored developers, conducted seminars and courses, hosted technology events and instructed hackathons.',
            'open source is important to me (and so is open science/data).',
          ],
        },
      })),
    };
  },
  methods: {
    getTopicPropValue(propKey) {
      let icon;
      const data = this.topics.get(this.topic);
      if (data) {
        icon = data[propKey]; // eslint-disable-line
      }
      return icon;
    },
  },
  computed: {
    topicIconName() {
      return this.getTopicPropValue('icon');
    },
    topicTextContent() {
      return this.getTopicPropValue('text');
    },
    nextTopic() {
      const topicKeys = [...this.topics.keys()];
      const currIndex = topicKeys.findIndex(key => key === this.topic);
      return topicKeys[currIndex + 1];
    },
    topicNextPath() {
      let path;
      if (this.nextTopic) {
        path = `/about/${this.nextTopic}`;
      } else {
        path = '/gallery';
      }
      return path;
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
        padding: 0 var(--layout-pad);
        overflow-y: scroll;
      }
    }
  }

</style>
