<template>
  <div class="about">
    <div>
      <Icon class="icon" name="magnifier"/>
      <p>{{ i18n.description.drive }}</p>
    </div>
    <div>
      <Icon class="icon" name="code"/>
      <p>{{ i18n.description.skills[0] }}</p>
      <p>{{ i18n.description.skills[1] }}</p>
      <p>{{ i18n.description.skills[2] }}</p>
    </div>
    <div>
      <Icon class="icon" name="heart"/>
      <p>{{ i18n.description.sharing[0] }}</p>
      <p>{{ i18n.description.sharing[1] }}</p>
      <p>{{ i18n.description.sharing[2] }}</p>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon.vue';

export default {
  name: 'About',
  components: {
    Icon,
  },
  data() {
    return {
      i18n: {
        description: {
          drive: `curiosity is what drives me, and learning is what i love and do best. i'm always on the search for new things to discover.`,
          skills: [
            `i do web and full-stack development. language agnostic, but excel in javascript.`,
            `enthusiastic about functional programming, IOT, cloud computing, software architecture and design, quantum computing...`,
            `i'm absolutely fascinated by user experience (as well as developer experience).`,
          ],
          sharing: [
            `along the path, i have the chance to share the things i learn with amazing people who share back.`,
            'through these connections i had mentored developers, conducted seminars and courses, hosted technology events and instructed hackathons.',
            'open source is important to me (and so is open science/data).',
          ],
        },
      },
    };
  },
};
</script>

<style scoped lang="scss">

  .about {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    /* use this container's scrollbar, not the viewport's */
    height: auto;
    text-align: justify;
    font-size: .85rem;

    div {
      &:not(:first-child) {
        margin-top: 3rem;
      }

      .icon {
        font-size: 2rem;
        color: var(--color-accent-1);
      }

      p {
        margin-top: .5rem;
      }
    }
  }

</style>
