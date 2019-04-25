
<!-- todo - turn this component to a directive! (https://vuejs.org/v2/guide/custom-directive.html) -->

<template>
  <div class="color-animator"
       :style="{
          color: tweenedCSSFgColor,
          backgroundColor: tweenedCSSBgColor,
       }"
  >
    <slot></slot>
  </div>
</template>

<script>
import * as TWEEN from '@tweenjs/tween.js';
import * as Color from 'color-js';

const parseColor = (raw = [0, 0, 0]) => {
  let c;
  if (typeof raw === 'string') {
    c = raw;
  } else if (Array.isArray(raw)) {
    // scale the rgb values to match the [0..1] range that Color requires
    const [red, green, blue] = raw.map(val => val / 255);
    c = {
      red,
      green,
      blue,
      alpha: 1,
    };
  } else {
    c = '#555';
  }
  return new Color(c).toRGB();
};

const animate = () => {
  if (TWEEN.update()) {
    window.requestAnimationFrame(animate);
  }
};

export default {
  name: 'ColorAnimator',
  props: {
    duration: {
      type: Number,
      default: 1200,
    },
    foregroundColor: {
      type: [String, Array],
      default: '#555',
    },
    backgroundColor: {
      type: [String, Array],
      default: '#eee',
    },
  },
  data() {
    return {
      fgColor: null,
      bgColor: null,
      tweenedFgColor: {},
      tweenedBgColor: {},
    };
  },
  created() {
    this.tweenedFgColor = parseColor(this.foregroundColor);
    this.tweenedBgColor = parseColor(this.backgroundColor);
  },
  watch: {
    foregroundColor(newValue) {
      if (newValue) {
        this.fgColor = parseColor(newValue);
      }
    },
    backgroundColor(newValue) {
      if (newValue) {
        this.bgColor = parseColor(newValue);
      }
    },
    fgColor() {
      new TWEEN.Tween(this.tweenedFgColor)
        .easing(TWEEN.Easing.Quadratic.In)
        .to(this.fgColor, this.duration)
        .start();

      animate();
    },
    bgColor() {
      new TWEEN.Tween(this.tweenedBgColor)
        .easing(TWEEN.Easing.Quadratic.Out)
        .to(this.bgColor, this.duration)
        .start();

      animate();
    },
  },
  computed: {
    tweenedCSSFgColor() {
      return new Color(Object.assign({}, this.tweenedFgColor)).toCSS();
    },
    tweenedCSSBgColor() {
      return new Color(Object.assign({}, this.tweenedBgColor)).toCSS();
    },
  },
};

</script>

<style scoped lang="scss">

  .color-animator {
  }

</style>
