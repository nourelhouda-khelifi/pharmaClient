<template>
  <v-table style="border-collapse: separate; border-spacing: 0 24px">
    <thead>
      <tr>
        <th style="color: #9e9e9e; font-weight: 500">Reference</th>
        <th style="color: #9e9e9e; font-weight: 500">Nom</th>
        <th style="color: #9e9e9e; font-weight: 500">Quantite</th>
        <th style="color: #9e9e9e; font-weight: 500">Image</th>
        <th style="color: #9e9e9e; font-weight: 500">Action</th>
      </tr>
    </thead>
    <tbody>
      <MedicamentRow
        v-for="med in medicaments"
        :key="med.reference"
        :medicament="med"
        @supprimer="$emit('supprimer', $event)"
      />
    </tbody>
  </v-table>
</template>

<script setup>
  import MedicamentRow from './MedicamentRow.vue'

  defineEmits(['supprimer'])

  defineProps({
    medicaments: {
      type: Array,
      required: true,
    },
  })
</script>
