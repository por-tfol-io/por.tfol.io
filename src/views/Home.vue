<template>
  <div class="home">

    <!-- todo - start navigation from here. -->
    <!-- todo - navigation concept: -->
    <!-- todo - the big icon in the center of the home page leads to the about page, -->
    <!-- todo - which is styled the same, but the container is almost entirely opaque (.8), -->
    <!-- todo - so the icon can be seen through -->
    <!-- todo - the about section is arranged as changing (sliding) cards, when the last one -->
    <!-- todo - will invite (and lead) to the gallery -->

    <router-link to="/about">
      <Icon class="icon" action="toss"/>
      <!--<Icon class="icon" name="magic-wand"/>-->
      <!--<Icon class="icon" name="rocket"/>-->
      <!--<Icon class="icon" action="loop"/>-->
    </router-link>
  </div>
</template>

<script>
import Icon from '@/components/Icon.vue';

export default {
  name: 'Home',
  components: {
    Icon,
  },
};
</script>

<style scoped lang="scss">

  .home {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;

    a {
      text-decoration: none;
    }

    .icon {
      font-size: 20vw;
      color: var(--color-accent-1);
    }
  }

</style>
