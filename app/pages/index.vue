<template>
  <div class="ma-5">
    <v-btn icon="mdi-theme-light-dark" @click="toggleTheme()"></v-btn>
    <div class="w-75 mx-auto my-15">
      <ContactForm
          :topics="Data['topics']"
          :titles="Data['titles']"
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

const Data = ref([])

const loadAllData = async () => {
  const [topics, titles] = await Promise.all([
    $fetch('/api/contact/topics'),
    $fetch('/api/contact/titles')
  ])

  Data.value = {
    topics,
    titles
  }
}

loadAllData()
</script>