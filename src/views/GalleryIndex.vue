<template>
  <div class="gallery-index">
    <AccordionSlider :items="sliderItems">
      <!--todo - inject the items via slots, then style them in here-->
    </AccordionSlider>
  </div>
</template>

<script>
import AccordionSlider from '@/components/AccordionSlider.vue';

const resolveLink = (galleryItem) => {
  let path = '/gallery';
  if (galleryItem && galleryItem.path) {
    path += `/${galleryItem.path}`;
  }
  return path;
};

export default {
  name: 'GalleryIndex',
  components: {
    AccordionSlider,
  },
  computed: {
    sliderItems() {
      // todo - change accordion api to accept only a slot as template, and ditch this mapping
      return this.$store.state.galleryItems
        .map(item => ({
          title: item.name,
          description: `lorem ipsum dolor sit amet, ${item.name} ${item.name} ${item.name}. lorem ipsum dolor sit amet, lorem ipsum dolor sit amet  ${item.name}.`,
          link: resolveLink(item),
        }));
    },
  },
};

</script>

<style scoped lang="scss">

  .gallery-index {
    height: 100%;

    .accordion {
      position: absolute;
      top: 0;
      bottom: 0;
      left: var(--layout-pad);
      right: 0;
    }
  }

</style>
