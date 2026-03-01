<template>
  <v-container class="mt-4">

    <div class="d-flex justify-space-between align-start mb-6">
      <div>
        <h1 class="text-h4 font-weight-bold" style="color:#1a1a1a">Medicaments</h1>
        <p class="text-body-2 text-grey mt-1">
          Accédez aux données en temps réel concernant les médicaments en stock,
          contrôlez leur disponibilité et optimisez leur gestion.
        </p>
      </div>
      <v-btn color="black" prepend-icon="mdi-plus">
        Ajouter un medicament
      </v-btn>
    </div>

    <ListMedicaments :medicaments="medicaments" />

    <div class="d-flex justify-center align-center mt-4 ga-4">
      <span class="text-body-2 text-grey">
        Page {{ pageActuelle }} / {{ totalPages }} ({{ totalElements }} éléments)
      </span>
      <v-pagination
        v-model="pageActuelle"
        :length="totalPages"
        rounded="circle"
        active-color="black"
        @update:model-value="changerPage"
      />
    </div>

  </v-container>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { fetchMedicaments } from '../services/medicamentService'
  import ListMedicaments from '../components/ListMedicaments.vue'

  const medicaments = ref([])
  const pageActuelle = ref(1)
  const totalPages = ref(1)
  const totalElements = ref(0)

  function chargerMedicaments (page) {
    fetchMedicaments((data, nbPages, nbElements) => {
      medicaments.value = data
      totalPages.value = nbPages
      totalElements.value = nbElements
    }, page - 1)
  }

  function changerPage (page) {
    chargerMedicaments(page)
  }

  onMounted(() => {
    chargerMedicaments(pageActuelle.value)
  })
</script>
