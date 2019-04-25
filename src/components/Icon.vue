<template>
  <transition-group
    v-if="action === 'loop'"
    class="loop" tag="div" name="slide">
    <span
      v-for="number in [iconIndex]" v-bind:key="number"
      class="icon lnr"
      :class="iconClass"
      @click="loop"
    ></span>
  </transition-group>
  <span
    v-else
    class="icon lnr"
    :class="iconClass"
    v-on="iconBindings"
  ></span>
</template>

<script>
const iconNames = [
  'pencil',
  'bullhorn',
  'code',
  'earth',
  'rocket',
  'bicycle',
  'diamond',
  'heart-pulse',
  'power-switch',
  'users',
  'mic',
  'star',
  'picture',
  'camera',
  'film-play',
  'license',
  'magic-wand',
  'briefcase',
  'book',
  'gift',
  'bookmark',
  'pointer-right',
];

export default {
  name: 'Icon',
  props: {
    name: String,
    action: {
      type: String,
      default: 'toss',
    },
  },
  data() {
    return {
      iconIndex: 0,
      timeoutId: null,
      intervalId: null,
      spinning: false,
    };
  },
  mounted() {
    this.invokeAction();
  },
  methods: {
    invokeAction() {
      this.resolveActionDispatcher()();
    },
    resolveActionDispatcher() {
      if (!(this.action in this)) {
        return () => 1;
      }
      return this[this.action];
    },
    clear() {
      if (typeof this.timeoutId === 'number') {
        window.clearTimeout(this.timeoutId);
      }
      if (typeof this.intervalId === 'number') {
        window.clearInterval(this.intervalId);
      }
    },
    toss() {
      if (this.name) {
        return;
      }

      this.clear();

      const stepDelay = 111;
      const fullIterationTime = stepDelay * iconNames.length;
      const tossDelay = (fullIterationTime / 8) + (Math.random() * fullIterationTime);
      //                ^ run for at least 1/8 the time it takes to iterate over all icons

      this.intervalId = window.setInterval(this.nextIcon, stepDelay);
      this.timeoutId = window.setTimeout(() => {
        window.clearInterval(this.intervalId);
      }, tossDelay);
    },
    loop() {
      if (this.name) {
        return;
      }

      this.clear();

      this.intervalId = window.setInterval(this.nextIcon, 1500);
    },
    spin() {
      this.spinning = true;
    },
    nextIcon() {
      this.iconIndex = (this.iconIndex + 1) % iconNames.length;
    },
  },
  computed: {
    iconName() {
      let iconName;
      if (this.name) {
        iconName = this.name;
      } else {
        iconName = iconNames[this.iconIndex];
      }
      return iconName;
    },
    iconClass() {
      const lnrClass = `lnr-${this.iconName}`;
      const animation = this.spinning ? 'spin' : '';
      return `${lnrClass} ${animation}`;
    },
    iconBindings() {
      let b = null;
      if (!this.name) {
        b = {
          click: this.resolveActionDispatcher(),
        };
      }
      return b;
    },
  },
};
</script>

<style scoped lang="scss">

  .spin {
    animation: rotation 3s infinite linear;
  }

  @-webkit-keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }

  /* fixme - loop transitions */
  /*
    .loop {
      position: relative;

      .lnr {
        position: relative;
        display: inline-block;
      }
    }
  */

  /*
    .slide-move,
    .slide-enter-to,
    .slide-leave-to {
      transition: all 1s ease-in-out;
    }

    .slide-enter-to {
      left: 0;
    }

    .slide-leave-to {
      left: -1rem;
    }
  */

</style>
