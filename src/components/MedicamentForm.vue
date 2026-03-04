<template>
  <v-dialog :model-value="modelValue" max-width="520" @update:model-value="$emit('update:modelValue', $event)">
    <v-card rounded="lg">
      <v-card-title class="pt-5 px-6 font-weight-bold">Ajouter un médicament</v-card-title>

      <v-card-text class="px-6">
        <v-select
          v-model="form.categorie"
          :items="categories"
          item-title="libelle"
          item-value="code"
          label="Catégorie"
          variant="outlined"
          density="comfortable"
          class="mb-3"
          :loading="categoriesEnChargement"
        />
        <v-text-field
          v-model="form.nom"
          label="Nom"
          variant="outlined"
          density="comfortable"
          class="mb-3"
        />
        <v-text-field
          v-model="form.quantiteParUnite"
          label="Quantité par unité (ex: Boite de 20 sachets)"
          variant="outlined"
          density="comfortable"
          class="mb-3"
        />
        <v-text-field
          v-model.number="form.prixUnitaire"
          label="Prix unitaire (DA)"
          type="number"
          variant="outlined"
          density="comfortable"
          class="mb-3"
        />
        <v-text-field
          v-model.number="form.unitesEnStock"
          label="Unités en stock"
          type="number"
          variant="outlined"
          density="comfortable"
          class="mb-3"
        />
        <v-text-field
          v-model.number="form.unitesCommandees"
          label="Unités commandées"
          type="number"
          variant="outlined"
          density="comfortable"
          class="mb-3"
        />
        <v-text-field
          v-model.number="form.niveauDeReappro"
          label="Niveau de réapprovisionnement"
          type="number"
          variant="outlined"
          density="comfortable"
          class="mb-3"
        />
        <v-text-field
          v-model="form.imageURL"
          label="URL de l'image"
          variant="outlined"
          density="comfortable"
          class="mb-3"
        />
        <v-switch
          v-model="form.indisponible"
          label="Indisponible"
          color="red"
          hide-details
        />
      </v-card-text>

      <v-card-actions class="px-6 pb-5">
        <v-spacer />
        <v-btn variant="text" @click="fermer">Annuler</v-btn>
        <v-btn color="black" variant="flat" @click="soumettre">Ajouter</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { fetchCategories, createMedicament } from '../services/medicamentService'
import { Medicament } from '../models/Medicament'

const props = defineProps({
  modelValue: { type: Boolean, required: true },
})
const emit = defineEmits(['update:modelValue', 'medicament-ajoute'])

const categories = ref([])
const categoriesEnChargement = ref(true)

const formVide = () => ({
  nom: '',
  quantiteParUnite: '',
  prixUnitaire: 0,
  unitesEnStock: 0,
  unitesCommandees: 0,
  niveauDeReappro: 0,
  indisponible: false,
  imageURL: '',
  categorie: null,
})

const form = ref(formVide())

onMounted(async () => {
  categories.value = await fetchCategories()
  categoriesEnChargement.value = false
})

function fermer () {
  emit('update:modelValue', false)
}

async function soumettre () {
  const med = new Medicament(
    null,
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
  await createMedicament(med.toDTO(false))
  form.value = formVide()
  fermer()
  emit('medicament-ajoute')
}

watch(() => props.modelValue, ouvert => {
  if (!ouvert) form.value = formVide()
})
</script>
