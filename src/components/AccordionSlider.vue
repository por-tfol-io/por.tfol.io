<template>
  <div class="accordion">
    <router-link
      class="item"
      v-for="item in items"
      :key="item.name"
      :to="item.link"
      :style="{
        width: `${100 / items.length}%`,
      }"
    >
      <h2>{{ item.title }}</h2>
      <section>
        <p>{{ item.description }}</p>
        <Icon class="more" name="chevron-right-circle"/>
      </section>
    </router-link>
  </div>
</template>

<script>
import Icon from '@/components/Icon.vue';

export default {
  name: 'AccordionSlider',
  components: {
    Icon,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped lang="scss">

  .accordion {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: stretch;

    .item {
      /* global ref in a component? fixme */
      --padding: var(--layout-pad);
      box-sizing: border-box;
      position: relative;
      height: 100%;
      flex-grow: 1;
      margin: 0 0 0 2px;
      padding: var(--padding) calc(var(--padding) / 4);
      overflow: hidden;
      text-overflow: ellipsis;
      transition: width 800ms ease-in-out, padding 800ms ease-in-out;

      // background gradient box
      &:after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background:
          transparent
          linear-gradient(0deg, transparent, #fff)
          no-repeat
          0 calc(var(--padding) * -1);
        opacity: .2;
        pointer-events: none;
      }

      :first-child {
        margin-top: 0;
      }

      :last-child {
        margin-bottom: 0;
      }

      h2 {
        position: relative;
        top: 100%;
        width: 0;
        overflow: visible;
        text-align: right;
        white-space: nowrap;
        word-break: keep-all;
        transform: rotateZ(-90deg);
        transform-origin: 0 0;
        transition: top 800ms ease-in-out, width 800ms ease-in-out, transform 840ms ease-in-out;
      }

      section {
        margin-top: var(--padding);
        opacity: 0;
        transition: opacity 900ms ease-in;

        .more {
          position: absolute;
          bottom: var(--padding);
          right: var(--padding);
          font-size: 3rem;
          opacity: var(--opacity-reduced);
        }
      }

      &:hover,
      &:focus {
        // just a number that's high enough to squish all the other items
        width: 222% !important;
        padding: var(--padding);

        h2 {
          top: 0;
          width: 100%;
          transform: rotateZ(0);
        }

        section {
          opacity: 1;
        }
      }
    }
  }

</style>
