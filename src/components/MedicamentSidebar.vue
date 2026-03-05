<template>
  <v-navigation-drawer
    :model-value="modelValue"
    location="right"
    temporary
    width="520"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <!-- Header -->
    <div class="d-flex justify-space-between align-center px-6 py-4 border-b">
      <span class="text-h6 font-weight-bold">Gérer un médicament</span>
      <v-btn icon="mdi-close" variant="text" size="small" @click="$emit('update:modelValue', false)" />
    </div>

    <div class="px-6 py-4" style="overflow-y: auto; height: calc(100% - 64px)">

      <!-- Informations générales -->
      <p class="text-subtitle-1 font-weight-bold mb-4">Informations générale</p>

      <v-checkbox
        v-model="form.indisponible"
        label="indisponible"
        density="comfortable"
        hide-details
        class="mb-4"
      />

      <div class="d-flex ga-3 mb-3">
        <v-text-field
          v-model="form.nom"
          label="Nom"
          variant="outlined"
          density="comfortable"
        />
      </div>

      <v-select
        v-model="form.categorie"
        :items="categories"
        item-title="libelle"
        item-value="code"
        variant="outlined"
        density="comfortable"
        :loading="categoriesEnChargement"
        class="mb-3"
      />

      <v-text-field
        v-model="form.imageURL"
        label="URL de l'image"
        variant="outlined"
        density="comfortable"
        class="mb-6"
      />

      <!-- Gestion du stock -->
      <p class="text-subtitle-1 font-weight-bold mb-4">Gestion du stock</p>

      <div class="d-flex ga-3 mb-3">
        <v-text-field
          v-model.number="form.unitesEnStock"
          label="Unité en stock"
          type="number"
          variant="outlined"
          density="comfortable"
          style="flex: 1"
        />
        <v-text-field
          v-model.number="form.unitesCommandees"
          label="Unité en commande"
          type="number"
          variant="outlined"
          density="comfortable"
          style="flex: 1"
        />
        <v-text-field
          v-model.number="form.niveauDeReappro"
          label="Niveau de réapprovisionnement"
          type="number"
          variant="outlined"
          density="comfortable"
          style="flex: 1"
        />
      </div>

      <div class="d-flex ga-3 mb-6">
        <v-text-field
          v-model="form.quantiteParUnite"
          label="Quantité par unité"
          variant="outlined"
          density="comfortable"
          style="flex: 1"
        />
        <v-text-field
          v-model.number="form.prixUnitaire"
          label="Prix unitaire (€)"
          type="number"
          variant="outlined"
          density="comfortable"
          style="flex: 1"
        />
      </div>

      <!-- Actions -->
      <v-btn color="black" variant="flat" block class="mb-2" @click="sauvegarder">Sauvegarder</v-btn>
      <v-btn variant="text" block @click="$emit('update:modelValue', false)">Annuler</v-btn>
    </div>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { fetchCategories, updateMedicament, updateMedicamentCategorie, getCodeCategoriesByReference } from '../services/medicamentService'
import { Medicament } from '../models/Medicament'

const props = defineProps({
  modelValue: { type: Boolean, required: true },
  medicament:  { type: Object, default: null },
})
const emit = defineEmits(['update:modelValue', 'medicament-modifie'])

const categories = ref([])
const categoriesEnChargement = ref(true)

const formVide = () => ({
  reference: null,
  nom: '',
  imageURL: '',
  quantiteParUnite: '',
  unitesEnStock: 0,
  prixUnitaire: 0,
  unitesCommandees: 0,
  niveauDeReappro: 0,
  indisponible: false,
  categorie: null,
})

const form = ref(formVide())

async function remplirForm (med) {
  if (!med) return
  const categorie = await getCodeCategoriesByReference(med.reference)
  form.value = {
    reference:        med.reference,
    nom:              med.nom,
    imageURL:         med.imageURL,
    quantiteParUnite: med.quantiteParUnite,
    unitesEnStock:    med.unitesEnStock,
    prixUnitaire:     med.prixUnitaire,
    unitesCommandees: med.unitesCommandees,
    niveauDeReappro:  med.niveauDeReappro,
    indisponible:     med.indisponible,
    categorie:        categorie.code ?? null,
  }
}

onMounted(async () => {
  categories.value = await fetchCategories()
  categoriesEnChargement.value = false
  await remplirForm(props.medicament)
})

// Si l'utilisateur clique sur une autre ligne pendant que le sidebar est ouvert
watch(() => props.medicament, async (med) => {
  if (categoriesEnChargement.value) return
  await remplirForm(med)
})

async function sauvegarder () {
  const med = new Medicament(
    form.value.reference,
    form.value.nom,
    form.value.imageURL,
    form.value.quantiteParUnite,
    form.value.unitesEnStock,
    form.value.prixUnitaire,
    form.value.unitesCommandees,
    form.value.niveauDeReappro,
    form.value.indisponible,
    null,
    null,
    form.value.categorie,
  )
  await updateMedicament(med)
  await updateMedicamentCategorie(form.value.reference, form.value.categorie)
  emit('update:modelValue', false)
  emit('medicament-modifie')
}
</script>
