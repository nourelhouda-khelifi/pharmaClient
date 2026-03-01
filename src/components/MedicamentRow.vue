<template>
  <tr class="row-contour">
    <td class="td-first">{{ medicament.reference }}</td>
    <td>
      <div class="font-weight-medium">{{ medicament.nom }}</div>
      <div class="text-caption text-grey">{{ medicament.quantiteParUnite }}</div>
    </td>
    <td>
      <div class="d-flex align-center ga-2">
        <v-btn icon="mdi-minus" size="small" variant="outlined" density="compact" />
        <span class="font-weight-medium">{{ medicament.unitesEnStock }}</span>
        <v-btn icon="mdi-plus" size="small" variant="outlined" density="compact" />
      </div>
    </td>
    <td>
      <v-img
        :src="medicament.imageURL"
        width="60"
        height="45"
        cover
        rounded="sm"
      />
    </td>
    <td class="td-last">
      <v-btn icon="mdi-pencil" size="small" color="blue" variant="tonal" class="mr-1" />
      <v-btn icon="mdi-delete" size="small" color="red" variant="tonal" />
    </td>
  </tr>
</template>

<style scoped>
.row-contour td {
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
}
.td-first {
  border-left: 1px solid #e0e0e0;
  border-radius: 8px 0 0 8px;
}
.td-last {
  border-right: 1px solid #e0e0e0;
  border-radius: 0 8px 8px 0;
}
</style>

<script setup>
  defineProps({
    medicament: {
      type: Object,
      required: true,
    },
  })
</script>
