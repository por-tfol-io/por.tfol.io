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
      <p>{{ item.description }}</p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'AccordionSlider',
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
      padding: var(--padding) 1rem;
      overflow: hidden;
      text-overflow: ellipsis;
      text-decoration: none;
      /*transform: skew(-5deg);*/
      transform-origin: 100% 0;
      transition: width 800ms ease-in-out, padding 800ms ease-in-out;

      h2 {
        margin-bottom: var(--padding);
        white-space: nowrap;
        word-break: keep-all;
      }

      &:hover {
        width: 200% !important;
        padding: var(--padding);
      }

      &:after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: transparent linear-gradient(0deg, transparent, #fff);
        opacity: .2;
        pointer-events: none;
      }

      :first-child {
        margin-top: 0;
      }

      :last-child {
        margin-bottom: 0;
      }
    }
  }

</style>
