<script setup>
function toggleTheme() {
  this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
}
</script>

<template>
  <div>
    <v-btn icon v-if="!$vuetify.theme.dark" @click="toggleTheme()">
      <v-icon class="mr-1" color="blue-grey darken-4">mdi-lightbulb</v-icon>
    </v-btn>
    <v-btn icon v-if="$vuetify.theme.dark" @click="toggleTheme()">
      <v-icon color="yellow darken-3">mdi-lightbulb-outline</v-icon>
    </v-btn>
  </div>

  <div class="w-75 mx-auto my-15">
    <ContactForm />
  </div>
</template>

<style scoped>

</style>