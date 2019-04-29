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

// todo - move this to a utility module
const resolveChildPath = (galleryItem) => {
  let path = '/gallery';
  if (galleryItem && galleryItem.path) {
    path += `/${galleryItem.path}`;
  }
  return path;
};

export default {
  name: 'GalleryIndex',
  components: {
    Icon,
    AccordionSlider,
  },
  computed: {
    sliderItems() {
      return this.$store.state.galleryItems
        .map(item => ({
          title: item.name,
          description: `lorem ipsum dolor sit amet, ${item.name} ${item.name} ${item.name}. lorem ipsum dolor sit amet, lorem ipsum dolor sit amet  ${item.name}.`,
          link: resolveChildPath(item),
        }));
    },
  },
};

</script>

<style scoped lang="scss">
  @import '../styles/globals';

  $control-size: 1rem;

  .gallery-index {
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
