<template>
  <div>
    <v-form @submit.prevent="onSubmit">
        <v-text-field
            v-model="name.value.value"
            :counter="10"
            :error-messages="name.errorMessage.value"
            label="Name"
            placeholder="Max Mustermann"
            prepend-inner-icon="mdi-account"
            clearable
            required
        ></v-text-field>

        <v-text-field
            v-model="phone.value.value"
            :counter="7"
            :error-messages="phone.errorMessage.value"
            label="Telefon Nr."
            placeholder="01234 / 567890"
            prepend-inner-icon="mdi-phone"
            clearable
            required
        ></v-text-field>

        <v-text-field
            v-model="email.value.value"
            :error-messages="email.errorMessage.value"
            label="E-Mail"
            placeholder="max@mustermann.de"
            prepend-inner-icon="mdi-email"
            clearable
            required
        ></v-text-field>

        <v-select
            v-model="topic.value.value"
            :error-messages="topic.errorMessage.value"
            :items="items"
            label="Thema"
            prepend-inner-icon="mdi-information"
            required
        ></v-select>

        <v-textarea
            v-model="message.value.value"
            :counter="1024"
            :error-messages="message.errorMessage.value"
            label="Nachricht"
            placeholder="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. "
            prepend-inner-icon="mdi-message"
            auto-grow
            clearable
            required
        ></v-textarea>

        <v-btn
            class="dark me-4"
            type="submit"
            :disabled="submitDisabled"
        >
          Absenden
        </v-btn>

        <v-btn @click="handleReset">
          Zurücksetzen
        </v-btn>
    </v-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useField, useForm, useSubmitCount, useIsSubmitting } from 'vee-validate'

const submitDisabled = ref(true)

const { handleSubmit, handleReset, meta } = useForm({
  validationSchema: {
    name (value) {
      if (/^[A-Za-z]{2,}\s+[A-Za-z]{2,}$/.test(value)) return true

      return 'Bitte den vollständigen Namen angeben. Vor- und Nachname müssen jeweils mindestens zwei Buchstaben enthalten.'
    },
    phone (value) {
      if (/^[0-9-]{7,}$/.test(value)) return true

      return 'Die Telefon-Nr. darf keine Buchstaben enthalten und muss aus mindestens sieben Zahlen bestehen.'
    },
    email (value) {
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

      return 'Es muss eine gültige E-Mail sein.'
    },
    topic (value) {
      if (value) return true

      return 'Wähle die Thematik dieser Nachricht.'
    },
    message (value) {
      if (value?.replace(/\s/g, '').length >= 50) return true

      return 'Die Nachricht muss mindestens 50 Zeichen lang sein.'
    }
  },
})

const name = useField('name')
const message = useField('message')
const phone = useField('phone')
const email = useField('email')
const topic = useField('topic')

const items = ref([
  'Allgemein',
  'Konto',
  'Bestellung',
  'Zahlung',
  'Sonstiges'
])

function isSubmittable() {
  return (meta.value.valid && meta.value.dirty
      /*!useIsSubmitting() && *//*useSubmitCount === 0 && */)
}

watch(meta, () => {
  submitDisabled.value = !isSubmittable()
  console.log("Submittable: " + isSubmittable())
})

const toast = useToast()

const onSubmit = handleSubmit(async(formData) => {
  const { data } = await $fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(formData)
  });

  handleReset()
  toast.success({ title: 'Erfolg!', message: 'Nachricht übermittelt!' })
  //console.log(data)
})
</script>