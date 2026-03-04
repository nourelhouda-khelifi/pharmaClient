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
      <v-btn color="black" prepend-icon="mdi-plus" @click="dialogOuvert = true">
        Ajouter un médicament
      </v-btn>
    </div>

    <ListMedicaments :medicaments="medicaments" @supprimer="supprimerMedicament" />

    <MedicamentForm
      v-model="dialogOuvert"
      @medicament-ajoute="chargerMedicaments(pageActuelle)"
    />

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
  import { fetchMedicaments, deleteMedicament } from '../services/medicamentService'
  import ListMedicaments from '../components/ListMedicaments.vue'
  import MedicamentForm from '../components/MedicamentForm.vue'

  const medicaments = ref([])
  const pageActuelle = ref(1)
  const totalPages = ref(1)
  const totalElements = ref(0)
  const dialogOuvert = ref(false)

  async function chargerMedicaments (page) {
    const { medicaments: data, totalPages: nbPages, totalElements: nbElements } = await fetchMedicaments(page - 1)
    medicaments.value = data
    totalPages.value = nbPages
    totalElements.value = nbElements
  }

  async function supprimerMedicament (reference) {
    await deleteMedicament(reference)
    chargerMedicaments(pageActuelle.value)
  }

  function changerPage (page) {
    chargerMedicaments(page)
  }

  onMounted(() => {
    chargerMedicaments(pageActuelle.value)
  })
</script>
