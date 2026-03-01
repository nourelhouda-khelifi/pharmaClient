const BASE_URL = 'https://pharma-server-k88v.onrender.com/api'

export function fetchMedicaments (onSuccess, page = 0, size = 20, sort = 'nom') {
  const fetchOptions = { method: 'GET' }
  fetch(`${BASE_URL}/medicaments?page=${page}&size=${size}&sort=${sort}`, fetchOptions)
    .then(response => {
      return response.json()
    })
    .then(dataJSON => {
      const medicaments = dataJSON._embedded?.medicaments ?? []
      const totalPages = dataJSON.page?.totalPages ?? 1
      const totalElements = dataJSON.page?.totalElements ?? 0
      onSuccess(medicaments, totalPages, totalElements)
    })
    .catch(error => {
      console.log(error)
    })
}
