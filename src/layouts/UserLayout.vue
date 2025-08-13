<!--<template>-->
<!--  <div class="flex flex-col min-h-screen">-->
<!--    <Header />-->
<!--    <main class="flex-1">-->
<!--      <SectionHero />-->
<!--      <SectionAbout />-->
<!--      <SectionFeatures />-->
<!--      <SectionServices />-->
<!--      <SectionTestimonials />-->
<!--      <SectionContact />-->
<!--    </main>-->
<!--    <Footer />-->
<!--  </div>-->
<!--</template>-->

<!--<script setup>-->
<!--import Header from "../components/user/Header.vue";-->
<!--import Footer from "../components/user/Footer.vue";-->
<!--import SectionHero from "../components/user/SectionHero.vue";-->
<!--import SectionAbout from "../components/user/SectionAbout.vue";-->
<!--import SectionFeatures from "../components/user/SectionFeatures.vue";-->
<!--import SectionServices from "../components/user/SectionServices.vue";-->
<!--import SectionTestimonials from "../components/user/SectionTestimonials.vue";-->
<!--import SectionContact from "../components/user/SectionContact.vue";-->
<!--</script>-->






<template>
  <div>
    <UserHeader />
    <main class="p-6">
      <router-view />
    </main>
    <UserFooter />
  </div>
</template>

<script>
import UserHeader from "../components/UserHeader.vue";
import UserFooter from "../components/UserFooter.vue";

export default {
  components: { UserHeader, UserFooter },
};
</script>
