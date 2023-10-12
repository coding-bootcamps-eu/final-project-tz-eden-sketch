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
    return state.plantVariety
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
  function setSpecies(
    name,
    imagename,
    botanicname,
    plantfamily,
    description,
    goodNeighbors,
    badNeighbors
  ) {
    let id = state.plantSpecies.length //todo: bessere Id generieren oder kommt vom Backend?
    if (state.plantSpecies.filter((speciesItem) => speciesItem['name'] === name).length > 0) {
      //species already exits
      console.log('species already exists')
      return false
    }

    state.plantSpecies.push({
      id: id,
      name: name,
      imagename: imagename,
      botanicname: botanicname,
      plantfamily: plantfamily,
      descriptrion: description,
      goodNeighbors: goodNeighbors,
      badNeighbors: badNeighbors
    })

    return true
  }

  function setVariety(name, species_id, descr, weeks, light) {
    let id = state.plantVarieties.length
    state.plantVarity.push({
      id: id,
      name: name,
      descr: descr,
      species_id: species_id,
      weeks: weeks,
      light: light
    })
  }
  function varietiesBySpecies(speciesId) {
    return state.plantVarieties.filter((varietyItem) => varietyItem['speciesId'] === speciesId)
  }

  function getSpeciesIdFromName(name) {
    return state.plantSpecies.filter(
      (plantSpeciesItem) => plantSpeciesItem['name'] === name
    )?.[0]?.['id']
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
    getAllSpecies,
    getAllVarieties,
    getSpecies,
    getVariety,
    varietiesBySpecies,
    getSpeciesIdFromName
  }
})
