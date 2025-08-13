<template>
  <section class="text-center">

    <SectionAbout />
    <SectionFeatures />
    <SectionServices />
  </section>
</template>

<script>

import SectionAbout from "@/components/user/SectionAbout.vue";
import SectionFeatures from "@/components/user/SectionFeatures.vue";
import SectionServices from "@/components/user/SectionServices.vue";

export default {
  name: "About",
  components: {

    SectionAbout,
    SectionFeatures,
    SectionServices,
  },
};
</script>
