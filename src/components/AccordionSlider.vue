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
      </section>
      <div class="enter">
        {{ i18n.more }}
        <Icon name="enter"/>
      </div>
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
  data() {
    return {
      i18n: {
        more: 'see more',
      },
    };
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
      /* global ref in a component? fixme! */
      --padding: var(--layout-pad);
      // required for positioning the gradient fill pseudo element
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: stretch;
      box-sizing: border-box;
      height: 100%;
      flex-grow: 1;
      margin: 0 0 0 2px;
      padding: var(--padding) calc(var(--padding) / 4);
      overflow: hidden;
      transition: width 800ms ease-in-out, padding 800ms ease-in-out;

      // background gradient box
      &:after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: transparent linear-gradient(0deg, transparent, #fff) no-repeat;
        background-position: 0 calc(var(--padding) * -1);
        opacity: .2;
        pointer-events: none;
      }

      > :first-child,
      > :last-child {
        flex-grow: 0;
        margin: 0;
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
        transition: top 700ms ease-in-out, width 700ms ease-in-out, transform 740ms ease-in-out;
      }

      section,
      .enter {
        opacity: 0;
        transition: opacity 800ms ease-in;
      }

      section {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: center;
        overflow: hidden;
        margin: 2em 0;

        p {
          text-overflow: ellipsis;
        }
      }

      .enter {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        transition: none 0s;

        .icon {
          margin-left: .5rem;
          font-size: 1.5rem;
        }
      }

      &:hover,
      &:focus {
        // just a number that's high enough to squish all the other items
        width: 222% !important;
        padding: var(--padding) calc(var(--padding) / 2);

        h2 {
          top: 0;
          width: 100%;
          transform: rotateZ(0);
        }

        section {
          opacity: 1;
        }

        .enter {
          opacity: var(--opacity-reduced);

          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }

</style>
