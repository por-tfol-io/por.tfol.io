<template>
  <div class="gallery-index">
    <Icon class="watermark" name="rocket"/>
    <AccordionSlider :items="sliderItems">
      <!--todo - inject the items via slots, then we can style them here-->
    </AccordionSlider>
  </div>
</template>

<script>
import Icon from '@/components/Icon.vue';
import AccordionSlider from '@/components/AccordionSlider.vue';

const flattenArray = (accum, val) => {
  accum.push(...val);
  return accum;
};

const resolveChildPath = (childRoute) => {
  let path = '/gallery';
  if (childRoute && childRoute.path) {
    path += `/${childRoute.path}`;
  }
  return path;
};

export default {
  name: 'GalleryIndex',
  components: {
    Icon,
    AccordionSlider,
  },
  created() {
    // todo - do all that needs to be done with childRoutes here, and pass all
    // todo - the data down, so the childRoutes reference in Gallery can be removed.

    this.childRoutes = this.$router.options.routes
      .filter(route => route.name === 'gallery')
      .map(route => route.children || [])
      .reduce(flattenArray, []);
  },
  computed: {
    sliderItems() {
      return [].concat(this.childRoutes)
        .filter(Boolean)
        .map(route => ({
          title: route.name,
          description: 'lorem ipsum dolor sit amet, lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.',
          link: resolveChildPath(route),
        }));
    },
  },
};

</script>

<style scoped lang="scss">
  @import '../styles/globals';

  $control-size: 1rem;

  .gallery-index {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: stretch;
    height: 100%;

    .icon {
      /* todo - encapsulate and move to app, and put in its own router-view. */
      /* todo - use opposite transitions to the main router-view */
      &.watermark {
        position: absolute;
        top: $layout-pad * -1;
        left: -10vh;
        font-size: 100vh;
        opacity: .1;
        // don't disturb the scroll of the content element
        pointer-events: none;
      }
    }


    .accordion {
      position: absolute;
      top: 0;
      bottom: 0;
      left: var(--layout-pad);
      right: 0;
    }
  }
</style>
