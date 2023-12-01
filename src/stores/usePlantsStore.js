import { reactive, onBeforeMount } from 'vue'
import { defineStore } from 'pinia'

export const usePlantsStore = defineStore('plants', () => {
  const state = reactive({
    plantSpecies: [], //Pflanzenart z.B. Möhre
    plantVarieties: [] //Pflanzensorte z.B. Oxhella
  })

  async function loadPlantSpecies() {
    fetch(`${import.meta.env.VITE_EDENSKETCH_API_URL}/plantspecies`).then(async (resp) => {
      const data = await resp.json()
      state.plantSpecies = data
    })
  }

  async function loadPlantVarieties() {
    fetch(`${import.meta.env.VITE_EDENSKETCH_API_URL}/plantvarieties`).then(async (resp) => {
      const data = await resp.json()
      state.plantVarieties = data
    })
  }

  //get single species / variety
  function getSpecies(id) {
    return state.plantSpecies.filter((speciesItem) => speciesItem['id'] === id)
  }
  function getVariety(id) {
    return state.plantVarieties.find((varietyItem) => varietyItem['id'] === id)
  }

  // add new species / variety
  function setSpecies(
    name,
    botanicname,
    imagename,
    plantfamily,
    nutrition,
    goodNeighbors,
    badNeighbors,
    description
  ) {
    if (state.plantSpecies.filter((speciesItem) => speciesItem['name'] === name).length > 0) {
      //species already exits
      console.log('species already exists')
      return false
    }

    const newSpecies = {
      name, //statt name: name,
      botanicname,
      imagename,
      plantfamily,
      nutrition,
      goodNeighbors: goodNeighbors.split(', '),
      badNeighbors: badNeighbors.split(', '),
      description
    }

    fetch(`${import.meta.env.VITE_EDENSKETCH_API_URL}/plantspecies/`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(newSpecies)
    }).then(async (resp) => {
      const data = await resp.json()
      state.plantSpecies = data
    })

    return true
  }

  function setVariety(
    name,
    botanicname,
    species,
    plantfamily,
    description,
    sowingForPlantingStart,
    sowingForPlantingEnd,
    plantingStart,
    plantingEnd,
    directSowingStart,
    directSowingEnd,
    harvestingStart,
    cultureDuration,
    cultureDurationIntern,
    plantingDistance,
    rowDistance,
    nutrition,
    light,
    water,
    sowingDepth,
    cultivationTips,
    imagename
  ) {
    const speciesInStore = getSpeciesIdFromName(species)

    const newVariety = {
      name: name,
      botanicname: botanicname, //=== '' ? this.getSpecies(speciesInStore)[0].botanicname : botanicname,
      plantspeciesId: speciesInStore,
      species: species,
      plantfamily: plantfamily, //=== ''? getSpecies(speciesInStore)[0].plantfamily : plantfamily,
      description: description,
      sowingForPlantingStart: sowingForPlantingStart,
      sowingForPlantingEnd: sowingForPlantingEnd,
      plantingStart: plantingStart,
      plantingEnd: plantingEnd,
      directSowingStart: directSowingStart,
      directSowingEnd: directSowingEnd,
      harvestingStart: harvestingStart,
      cultureDuration: cultureDuration,
      cultureDurationIntern: cultureDurationIntern,
      plantingDistance: plantingDistance,
      rowDistance: rowDistance,
      nutrition: nutrition, // === '' ? getSpecies(speciesInStore)[0].nutrition : nutrition,
      light: light,
      water: water,
      sowingDepth: sowingDepth,
      cultivationTips: cultivationTips,
      imagename: imagename //=== ''  ? getSpecies(speciesInStore)[0].imagename : imagename
    }

    fetch(`${import.meta.env.VITE_EDENSKETCH_API_URL}/plantvarieties/`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(newVariety)
    }).then(async (resp) => {
      const data = await resp.json()
      state.plantSpecies = data
    })

    return true
  }

  function varietiesBySpecies(speciesId) {
    //Problem vom router. ID wird manchmal als Array ['id'] und manchmal als string 'id' übergeben
    //Übergabe id aus params von URL
    if (Array.isArray(speciesId)) {
      speciesId = speciesId[0]
    }

    return state.plantVarieties.filter((varietyItem) => varietyItem['plantspeciesId'] === speciesId)
  }

  function getSpeciesIdFromName(name) {
    return state.plantSpecies.find((plantSpeciesItem) => plantSpeciesItem?.name === name)?.id
    //optional chaining
  }

  onBeforeMount(async () => {
    await loadPlantSpecies()
    await loadPlantVarieties()
  })

  return {
    state,
    setSpecies,
    setVariety,
    loadPlantSpecies,
    loadPlantVarieties,
    getSpecies,
    getVariety,
    varietiesBySpecies,
    getSpeciesIdFromName
  }
})
