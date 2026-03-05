import { getCodeCategoriesByReference } from '../services/medicamentService'

const BASE_URL = 'https://pharma-server-k88v.onrender.com/api'

export class Medicament {
  constructor (
    reference = null,
    nom = '',
    imageURL = '',
    quantiteParUnite = '',
    unitesEnStock = 0,
    prixUnitaire = 0,
    unitesCommandees = 0,
    niveauDeReappro = 0,
    indisponible = false,
    fournisseur = null,
    categorieUrl = null,
    categorie = null,
  ) {
    this._reference = reference
    this._nom = nom
    this._imageURL = imageURL
    this._quantiteParUnite = quantiteParUnite
    this._unitesEnStock = unitesEnStock
    this._prixUnitaire = prixUnitaire
    this._unitesCommandees = unitesCommandees
    this._niveauDeReappro = niveauDeReappro
    this._indisponible = indisponible
    this._fournisseur = fournisseur
    this._categorieUrl = categorieUrl
    this._categorie = categorie

    this.loadCategorieCode()
  }

  get reference () { return this._reference }
  set reference (v) { this._reference = v }

  get nom () { return this._nom }
  set nom (v) { this._nom = v }

  get imageURL () { return this._imageURL }
  set imageURL (v) { this._imageURL = v }

  get quantiteParUnite () { return this._quantiteParUnite }
  set quantiteParUnite (v) { this._quantiteParUnite = v }

  get unitesEnStock () { return this._unitesEnStock }
  set unitesEnStock (v) { this._unitesEnStock = v }

  get prixUnitaire () { return this._prixUnitaire }
  set prixUnitaire (v) { this._prixUnitaire = v }

  get unitesCommandees () { return this._unitesCommandees }
  set unitesCommandees (v) { this._unitesCommandees = v }

  get niveauDeReappro () { return this._niveauDeReappro }
  set niveauDeReappro (v) { this._niveauDeReappro = v }

  get indisponible () { return this._indisponible }
  set indisponible (v) { this._indisponible = v }

  get fournisseur () { return this._fournisseur }
  set fournisseur (v) { this._fournisseur = v }

  get categorieUrl () { return this._categorieUrl }
  set categorieUrl (c) { this._categorieUrl = c }

  get categorie () { return this._categorie }
  set categorie (c) { this._categorie = c }

  async loadCategorieCode () {
    if (this._categorie != null || this._reference == null) return
      const data = await getCodeCategoriesByReference(this._reference)
    this._categorie = data.code
  }

  clone () {
    return new Medicament(
      this._reference,
      this._nom,
      this._imageURL,
      this._quantiteParUnite,
      this._unitesEnStock,
      this._prixUnitaire,
      this._unitesCommandees,
      this._niveauDeReappro,
      this._indisponible,
      this._fournisseur,
      this._categorieUrl,
      this._categorie,
    )
  }

  apply (obj) {
    Object.assign(this, obj)
  }

  toDTO (includeReference = false) {
    const dto = {
      nom: this.nom,
      imageURL: this.imageURL,
      quantiteParUnite: this.quantiteParUnite,
      unitesEnStock: this.unitesEnStock,
      prixUnitaire: this.prixUnitaire,
      unitesCommandees: this.unitesCommandees,
      niveauDeReappro: this.niveauDeReappro,
      indisponible: this.indisponible,
      categorie: `${BASE_URL}/categories/${this.categorie}`,
    }

    if (includeReference) dto.reference = this.reference
    return dto
  }
}
