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

    <FormTexte v-model="motcle" class="mb-4" />

    <ListMedicaments
      :medicaments="medicaments"
      @supprimer="supprimerMedicament"
      @livrer="livrerMedicament"
      @dispenser="dispenserMedicament"
      @modifier="ouvrirSidebar"
    />

    <MedicamentSidebar
      v-model="sidebarOuverte"
      :medicament="medicamentActif"
      @medicament-modifie="chargerMedicaments(pageActuelle)"
    />

    <MedicamentForm
      v-model="dialogOuvert"
      @medicament-ajoute="chargerMedicaments(pageActuelle)"
    />

    <div v-if="!motcle" class="d-flex justify-center align-center mt-4 ga-4">
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
    <div v-else class="text-body-2 text-grey mt-4 text-center">
      {{ medicaments.length }} résultat(s) pour « {{ motcle }} »
    </div>

  </v-container>
</template>

<script setup>
  import { ref, onMounted, watch } from 'vue'
  import { fetchMedicaments, deleteMedicament, patchMedicamentQuantite, searchMedicaments } from '../services/medicamentService'
  import ListMedicaments from '../components/ListMedicaments.vue'
  import MedicamentForm from '../components/MedicamentForm.vue'
  import MedicamentSidebar from '../components/MedicamentSidebar.vue'
  import FormTexte from '../components/FormTexte.vue'

  const medicaments = ref([])
  const pageActuelle = ref(1)
  const totalPages = ref(1)
  const totalElements = ref(0)
  const dialogOuvert = ref(false)
  const sidebarOuverte = ref(false)
  const medicamentActif = ref(null)
  const motcle = ref('')

  function ouvrirSidebar (medicament) {
    medicamentActif.value = medicament
    sidebarOuverte.value = true
  }

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

  async function livrerMedicament (reference) {
    const med = medicaments.value.find(m => m.reference === reference)
    await patchMedicamentQuantite(reference, med.unitesEnStock + 1)
    chargerMedicaments(pageActuelle.value)
  }

  async function dispenserMedicament (reference) {
    const med = medicaments.value.find(m => m.reference === reference)
    if (med.unitesEnStock <= 0) return
    await patchMedicamentQuantite(reference, med.unitesEnStock - 1)
    chargerMedicaments(pageActuelle.value)
  }

  function changerPage (page) {
    chargerMedicaments(page)
  }

  watch(motcle, async (val) => {
    if (val && val.trim()) {
      medicaments.value = await searchMedicaments(val.trim())
    } else {
      chargerMedicaments(pageActuelle.value)
    }
  })

  onMounted(() => {
    chargerMedicaments(pageActuelle.value)
  })
</script>
