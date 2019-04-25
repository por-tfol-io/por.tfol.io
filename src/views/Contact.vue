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
      ],
    };
  },
};
</script>

<style scoped lang="scss">

  .contact {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    height: 100%;
    text-align: center;

    > :not(:first-child) {
      margin: 4rem 0 0;
    }

    ul.social {
      margin: 4rem auto .2rem;

      li {
        display: inline-block;
        width: 32px;
        height: 32px;
        mask-size: contain;
        mask-repeat: no-repeat;
        mask-position: 50% 50%;
        background-color: var(--color-accent-2);
        cursor: pointer;

        &:not(:last-child) {
          margin-right: 1rem;
        }

        &.github {
          mask-image: url('../assets/images/github.svg');
        }

        &.stackoverflow {
          mask-image: url('../assets/images/stackoverflow.svg');
          mask-size: 120% 120%;
        }

        &.linkedin {
          width: 40px;
          mask-image: url('../assets/images/linkedin.svg');
        }
      }
    }
  }

</style>
