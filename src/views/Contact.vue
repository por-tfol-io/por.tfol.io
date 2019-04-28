<template>
  <div class="contact">
    <p>lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.
      lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.</p>
    <ul class="social">
      <li v-for="name in social"
          :key="name"
          :class="name"
      ></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  data() {
    return {
      social: [
        'github',
        'stackoverflow',
        'linkedin',
        'toad',
      ],
    };
  },
};
</script>

<style scoped lang="scss">

  $icon-size: 2rem;

  .contact {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    height: 100%;

    > :not(:first-child) {
      margin: var(--layout-pad) 0 0;
    }

    ul.social {
      margin: var(--layout-pad) 0 .2rem;

      li {
        display: inline-block;
        width: $icon-size;
        height: $icon-size;
        mask-size: contain;
        mask-repeat: no-repeat;
        mask-position: 50% 50%;
        background-color: var(--color-accent-2);
        cursor: pointer;

        &:not(:last-child) {
          margin-right: $icon-size / 2;
        }

        &.github {
          mask-image: url('../assets/images/github.svg');
        }

        &.stackoverflow {
          mask-image: url('../assets/images/stackoverflow.svg');
          mask-size: 120% 120%;
        }

        &.linkedin {
          width: $icon-size * 1.25;
          mask-image: url('../assets/images/linkedin.svg');
        }

        &.toad {
          width: $icon-size * 1.25;
          // todo - grant attribution (https://www.svgrepo.com/svg/289183/toad)
          mask-image: url('../assets/images/toad.svg');
          mask-size: 120% 120%;
          /*animation: bounceUpDown .5s alternate infinite;*/
        }
      }
    }
  }

  /*
    @keyframes slideRight {
      from {
        transform: translateX(0);
      }
      to {
        transform: translateX(200px);
      }
    }

    @keyframes bounceUpDown {
      0% {
        transform: translateY(0);
        animation-timing-function: cubic-bezier(0, .50, .50, 1);
      }
      50% {
        transform: translateY(-50px);
        animation-timing-function: cubic-bezier(.50, 0, 1, .50);
      }
      100% {
        transform: translateY(0);
      }
    }
  */

</style>
