const BASE_URL = 'https://pharma-server-k88v.onrender.com/api'

export async function getCodeCategoriesByReference (reference) {
  const res = await fetch(`${BASE_URL}/medicaments/${reference}/categorie`)
  if (!res.ok) throw new Error('Impossible de recuperer la catégorie')
  return res.json()
}

export async function fetchCategories (size = 100000000) {
  const res = await fetch(`${BASE_URL}/categories?size=${size}`)
  if (!res.ok) 
    throw new Error('Failed to fetch categories')
  const dataJSON = await res.json()
  return dataJSON._embedded?.categories ?? []
}

export async function fetchMedicaments (page = 0, size = 20, sort = 'nom') {
  const res = await fetch(`${BASE_URL}/medicaments?page=${page}&size=${size}&sort=${sort}`)
  if (!res.ok) throw new Error('Failed to fetch medicaments')
  const dataJSON = await res.json()
  return {
    medicaments: dataJSON._embedded?.medicaments ?? [],
    totalPages: dataJSON.page?.totalPages ?? 1,
    totalElements: dataJSON.page?.totalElements ?? 0,
  }
}

export async function searchMedicaments (nom) {
  const res = await fetch(`${BASE_URL}/medicaments/search/chercherParNom?nom=${encodeURIComponent(nom)}`)
  if (!res.ok) throw new Error('Erreur lors de la recherche')
  const dataJSON = await res.json()
  return dataJSON._embedded?.medicaments ?? []
}

export async function deleteMedicament (reference) {
  const res = await fetch(`${BASE_URL}/medicaments/${reference}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete medicament')
}

export async function patchMedicamentQuantite (reference, unitesEnStock) {
  const res = await fetch(`${BASE_URL}/medicaments/${reference}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ unitesEnStock }),
  })
  if (!res.ok) throw new Error('Failed to update medicament stock')
  return res.json()
}

export async function updateMedicamentCategorie (reference, categorieCode) {
  const res = await fetch(`${BASE_URL}/medicaments/${reference}/categorie`, {
    method: 'PUT',
    headers: { 'Content-Type': 'text/uri-list' },
    body: `${BASE_URL}/categories/${categorieCode}`,
  })
  if (!res.ok) throw new Error('Failed to update categorie')
}

export async function updateMedicament (medicament) {
  console.log('PUT body:', JSON.stringify(medicament.toDTO(true), null, 2))
  const res = await fetch(`${BASE_URL}/medicaments/${medicament.reference}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(medicament.toDTO(true)),
  })
  if (!res.ok) {
    const errBody = await res.text()
    console.error('Erreur serveur:', res.status, errBody)
    throw new Error('Failed to update medicament')
  }
  return res.json()
}

export async function createMedicament (medicament) {
  console.log('POST body:', JSON.stringify(medicament, null, 2))
  const res = await fetch(`${BASE_URL}/medicaments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(medicament),
  })
  if (!res.ok) {
    const errBody = await res.text()
    console.error('Erreur serveur:', res.status, errBody)
    throw new Error('Failed to create medicament')
  }
  return res.json()
}
