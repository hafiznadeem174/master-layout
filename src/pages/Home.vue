<template>
  <section class="text-center">
    <SectionHero />
    <SectionAbout />
    <SectionFeatures />
    <SectionServices />
  </section>
</template>

<script>
import SectionHero from "@/components/user/SectionHero.vue";
import SectionAbout from "@/components/user/SectionAbout.vue";
import SectionFeatures from "@/components/user/SectionFeatures.vue";
import SectionServices from "@/components/user/SectionServices.vue";

export default {
  name: "Home",
  components: {
    SectionHero,
    SectionAbout,
    SectionFeatures,
    SectionServices,
  },
};
</script>
