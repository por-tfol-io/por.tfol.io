<template>
  <div class="home">
    <router-link to="/about">
      <Icon action="toss"/>
      <!--<Icon name="magic-wand"/>-->
      <!--<Icon name="rocket"/>-->
      <!--<Icon action="loop"/>-->
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

    .icon {
      font-size: 27vw;
      color: var(--color-accent-1);
    }
  }

</style>
