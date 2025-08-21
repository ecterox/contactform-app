<template>
  <div class="ma-5">
    <v-btn icon v-if="theme.name.value !== 'dark'" @click="toggleTheme()">
      <v-icon class="mr-1" color="blue-grey darken-4">mdi-lightbulb</v-icon>
    </v-btn>
    <v-btn icon v-if="theme.name.value === 'dark'" @click="toggleTheme()">
      <v-icon color="yellow darken-3">mdi-lightbulb-outline</v-icon>
    </v-btn>
  </div>

  <div class="w-75 mx-auto my-15">
    <ContactForm />
  </div>
</template>

<style scoped>

</style>

<script setup>
const theme = useTheme();

const toggleTheme = () => {
  theme.toggle(['dark', 'light']);
  console.log('Theme: ' + theme.name.value)
}
</script>