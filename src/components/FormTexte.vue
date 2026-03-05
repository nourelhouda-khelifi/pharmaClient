<template>
  <v-text-field
    :model-value="modelValue"
    prepend-inner-icon="mdi-magnify"
    label="Rechercher un médicament..."
    variant="outlined"
    clearable
    hide-details
    density="comfortable"
    @update:model-value="$emit('update:modelValue', $event ?? '')"
  />
</template>

<script setup>
  defineProps({
    modelValue: { type: String, default: '' },
  })
  defineEmits(['update:modelValue'])
</script>
