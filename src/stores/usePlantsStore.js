import { reactive, onBeforeMount } from 'vue'
import { defineStore } from 'pinia'

export const usePlantsStore = defineStore('plants', () => {
  const state = reactive({
    plantSpecies: [], //Pflanzenart z.B. Möhre
    plantVarieties: [] //Pflanzensorte z.B. Oxhella
  })

  async function loadPlantSpecies() {
    const resp = await fetch('http://localhost:3000/plantspecies')
    const data = await resp.json()
    state.plantSpecies = data
  }

  async function loadPlantVarieties() {
    const resp = await fetch('http://localhost:3000/plantvarieties')
    const data = await resp.json()
    state.plantVarieties = data
  }

  //vorerst keine Funktion zum erfassen von Pflanzen im Frontend vorgesehen
  // function saveToBackend() {
  //speicher Daten im Backend
  //fetch()
  // }

  //get all species / varieties
  function getAllSpecies() {
    return state.plantSpecies
  }

  function getAllVarieties() {
    return state.plantVarieties
  }

  //get single species / variety
  function getSpecies(id) {
    return state.plantSpecies.filter((speciesItem) => speciesItem['id'] === id)
  }
  function getVariety(id) {
    return state.plantVarieties.filter((varietyItem) => varietyItem['id'] === id)
  }

  //todo: delete Funktion

  // add new species / variety
  async function setSpecies(
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
      name: name,
      botanicname: botanicname,
      imagename: imagename,
      plantfamily: plantfamily,
      nutrition: nutrition,
      goodNeighbors: goodNeighbors,
      badNeighbors: badNeighbors,
      description: description
    }

    // const resp =
    await fetch('http://localhost:3000/plantspecies/', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(newSpecies)
    })
    // const savedSpecies = await resp.json()

    return true
  }

  async function setVariety(
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
    growingSeason,
    growingSeasonIntern,
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
      botanicname: botanicname === '' ? getSpecies(speciesInStore)[0].botanicname : botanicname,
      plantspeciesId: speciesInStore,
      species: species,
      plantfamily: plantfamily === '' ? getSpecies(speciesInStore)[0].plantfamily : plantfamily,
      description: description,
      sowingForPlantingStart: sowingForPlantingStart,
      sowingForPlantingEnd: sowingForPlantingEnd,
      plantingStart: plantingStart,
      plantingEnd: plantingEnd,
      directSowingStart: directSowingStart,
      directSowingEnd: directSowingEnd,
      harvestingStart: harvestingStart,
      growingSeason: growingSeason,
      growingSeasonIntern: growingSeasonIntern,
      plantingDistance: plantingDistance,
      rowDistance: rowDistance,
      nutrition: nutrition === '' ? getSpecies(speciesInStore)[0].nutrition : nutrition,
      light: light,
      water: water,
      sowingDepth: sowingDepth,
      cultivationTips: cultivationTips,
      imagename: imagename === '' ? getSpecies(speciesInStore)[0].imagename : imagename
    }

    // const resp =
    await fetch('http://localhost:3000/plantvarieties/', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(newVariety)
    })
    // const savedVariety = await resp.json()

    return true
  }

  function varietiesBySpecies(speciesId) {
    return state.plantVarieties.filter((varietyItem) => varietyItem['speciesId'] === speciesId)
  }

  function getSpeciesIdFromName(name) {
    console.log(name)
    return state.plantSpecies.filter(
      (plantSpeciesItem) => plantSpeciesItem['name'] === name
    )?.[0]?.['id']
    //optional chaining
  }
  onBeforeMount(async () => {
    await loadPlantSpecies()
    await loadPlantVarieties()
  })

  onBeforeMount(async () => {
    await loadPlantSpecies()
    await loadPlantVarieties()
  })

  return {
    state,
    setSpecies,
    setVariety,
    getAllSpecies,
    getAllVarieties,
    getSpecies,
    getVariety,
    varietiesBySpecies,
    getSpeciesIdFromName
  }
})
