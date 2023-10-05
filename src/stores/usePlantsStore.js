import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const usePlantsStore = defineStore('plants', () => {
  const state = reactive({
    plantSpecies: [{ id: '1', name: 'Spinat', imagename: 'bellpepper.webp' }], //Pflanzenart z.B. Möhre
    plantVariety: [] //Pflanzensorte z.B. Oxhella
  })

  function loadFromBackend() {
    //lade beim starten der App die Daten
    //fetch()
  }

  function saveToBackend() {
    //speicher Daten im Backend
    //fetch()
  }

  //get all species
  function getAllSpecies() {
    return state.plantSpecies
  }

  //get single species / variety
  function getSpecies(id) {
    return state.plantSpecies.filter((speciesItem) => speciesItem['id'] === id)
  }
  function getVariety(id) {
    return state.plantVariety.filter((varietyItem) => varietyItem['id'] === id)
  }

  //todo: delete Funktion

  // add new species / variety
  function setSpecies(
    name,
    imagename,
    botanicname,
    plantfamily,
    descr,
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
      descr: descr,
      goodNeighbors: goodNeighbors,
      badNeighbors: badNeighbors
    })

    return true
  }

  function setVariety(name, species_id, descr, weeks, light) {
    let id = state.plantVariety.length
    state.plantVarity.push({
      id: id,
      name: name,
      descr: descr,
      species_id: species_id,
      weeks: weeks,
      light: light
    })
  }
  function varietiesBySpecies(id) {
    return state.plantVariety.filter((varietyItem) => varietyItem['species_id'] === id)
  }

  function getSpeciesIdFromName(name) {
    return state.plantSpecies.filter(
      (plantSpeciesItem) => plantSpeciesItem['name'] === name
    )?.[0]?.['id']
    //optional chaining
  }

  return {
    state,
    setSpecies,
    setVariety,
    getAllSpecies,
    getSpecies,
    getVariety,
    varietiesBySpecies,
    getSpeciesIdFromName
  }
})
