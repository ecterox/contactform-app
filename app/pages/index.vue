<template>
  <div class="ma-5">
    <v-btn icon="mdi-theme-light-dark" @click="toggleTheme()"></v-btn>
    <div class="w-75 mx-auto my-15">
      <ContactForm
          title-placeholder="Anrede wählen..."
          name-placeholder="Name eingeben..."
          email-placeholder="E-Mail-Adresse eingeben..."
          phone-placeholder="Telefonnummer eingeben..."
          topic-placeholder="Betreff wählen..."
          message-placeholder="Nachricht eingeben..."
      />
    </div>
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