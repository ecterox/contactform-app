<template>
  <div>
    <v-form @submit.prevent="onSubmit">
      <v-select
          v-model="title.value.value"
          :error-messages="title.errorMessage.value"
          :items="titles"
          label="Anrede *"
          :placeholder="titlePlaceholder"
          prepend-inner-icon="mdi-information"
          variant="underlined"
          required
      ></v-select>

      <v-text-field
          v-model="name.value.value"
          counter="10"
          :error-messages="name.errorMessage.value"
          label="Vollständiger Name *"
          :placeholder="namePlaceholder"
          prepend-inner-icon="mdi-account"
          variant="underlined"
          clearable
          required
      ></v-text-field>

      <v-text-field
          v-model="email.value.value"
          :error-messages="email.errorMessage.value"
          label="E-Mail *"
          :placeholder="emailPlaceholder"
          prepend-inner-icon="mdi-email"
          variant="underlined"
          clearable
          required
      ></v-text-field>

      <v-text-field
          v-model="phone.value.value"
          counter="7"
          :error-messages="phone.errorMessage.value"
          label="Telefon-Nr. *"
          :placeholder="phonePlaceholder"
          prepend-inner-icon="mdi-phone"
          variant="underlined"
          clearable
          required
      ></v-text-field>

      <v-select
          v-model="topic.value.value"
          :error-messages="topic.errorMessage.value"
          label="Betreff *"
          :items="topics"
          :placeholder="topicPlaceholder"
          prepend-inner-icon="mdi-information"
          variant="underlined"
          required
      ></v-select>

      <v-textarea
          v-model="message.value.value"
          :counter="1024"
          :error-messages="message.errorMessage.value"
          label="Nachricht *"
          :placeholder="messagePlaceholder"
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

      <v-btn
          @click="handleReset"
          :disabled='!isDirty'
      >
        <v-icon>mdi-cancel</v-icon>
      </v-btn>
    </v-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useField, useForm, useSubmitCount, useIsSubmitting } from 'vee-validate'

const submitDisabled = ref(true)
const isDirty = ref(false)

defineProps({
  titlePlaceholder: {
    type: String,
    default: 'Bitte eingeben...'
  },
  namePlaceholder: {
    type: String,
    default: 'Bitte eingeben...'
  },
  emailPlaceholder: {
    type: String,
    default: 'Bitte eingeben...'
  },
  phonePlaceholder: {
    type: String,
    default: 'Bitte eingeben...'
  },
  topicPlaceholder: {
    type: String,
    default: 'Bitte eingeben...'
  },
  messagePlaceholder: {
    type: String,
    default: 'Bitte eingeben...'
  },
  topics: {
    type: Array,
    default: () => [],
  },
  titles: {
    type: Array,
    default: () => [],
  }
})

const { handleSubmit, handleReset, meta } = useForm({
  validationSchema: {
    title (value) {
      if (value) return true

      return 'Wählen Sie bitte Ihre Anrede.'
    },
    name (value) {
      if (/^[A-Za-z]{2,}\s+[A-Za-z]{2,}$/.test(value)) return true

      return 'Bitte geben Sie Ihren vollständigen Namen an. Vor- und Nachname müssen jeweils mindestens zwei Buchstaben enthalten.'
    },
    email (value) {
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

      return 'Geben Sie bitte eine gültige E-Mail an.'
    },
    phone (value) {
      if (/^[0-9-]{7,}$/.test(value)) return true

      return 'Die Telefon-Nr. darf keine Buchstaben enthalten und muss aus mindestens sieben Ziffern bestehen.'
    },
    topic (value) {
      if (value) return true

      return 'Wählen Sie bitte die Thematik Ihrer Nachricht.'
    },
    message (value) {
      if (value?.replace(/\s/g, '').length >= 50) return true

      return 'Die Nachricht muss zwischen 50 und 1024 Zeichen lang sein.'
    }
  },
})

const title = useField('title')
const name = useField('name')
const email = useField('email')
const phone = useField('phone')
const topic = useField('topic')
const message = useField('message')

function isSubmittable() {
  return (meta.value.valid && meta.value.dirty
      /*!useIsSubmitting() && *//*useSubmitCount === 0 && */)
}

watch(meta, () => {
  submitDisabled.value = !isSubmittable()
  isDirty.value = meta.value.dirty
  console.log("Submittable: " + isSubmittable())
})

const toast = useToast()

const onSubmit = handleSubmit(async(formData) => {
  try {
    const response = await $fetch.raw('/api/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    //console.log(response?._data)
    console.log(JSON.stringify(formData))

    if (response.ok) {
      toast.success({ title: 'Erfolg!', message: 'Nachricht übermittelt!' })
      handleReset()
    }
    else {
      toast.error({title: 'Fehler!', message: 'Es ist ein Fehler beim versenden der Nachricht aufgetreten!'})
    }
  } catch (error) {
    console.log(error)
  }
})
</script>