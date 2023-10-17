import { reactive, onBeforeMount } from 'vue'
import { defineStore } from 'pinia'

export const usePlantsStore = defineStore('plants', () => {
  const state = reactive({
    plantSpecies: [], //Pflanzenart z.B. Möhre
    plantVarieties: [] //Pflanzensorte z.B. Oxhella
  })

  function loadPlantSpecies() {
    fetch('http://localhost:3000/plantspecies').then(async (resp) => {
      const data = await resp.json()
      state.plantSpecies = data
    })
  }

  function loadPlantVarieties() {
    fetch('http://localhost:3000/plantvarieties').then(async (resp) => {
      const data = await resp.json()
      state.plantVarieties = data
    })
  }

  //get single species / variety
  function getSpecies(id) {
    return state.plantSpecies.filter((speciesItem) => speciesItem['id'] === id)
  }
  function getVariety(id) {
    return state.plantVarieties.filter((varietyItem) => varietyItem['id'] === id)
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
      name: name,
      botanicname: botanicname,
      imagename: imagename,
      plantfamily: plantfamily,
      nutrition: nutrition,
      goodNeighbors: goodNeighbors.split(', '),
      badNeighbors: badNeighbors.split(', '),
      description: description
    }

    fetch('http://localhost:3000/plantspecies/', {
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

    fetch('http://localhost:3000/plantvarieties/', {
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
    if (typeof speciesId !== 'string') {
      speciesId = speciesId[0]
    }

    const varieties = state.plantVarieties.filter((varietyItem) => {
      if (varietyItem['plantspeciesId'] === speciesId) {
        return true
      }
      return false
    })
    return varieties
  }

  function getSpeciesIdFromName(name) {
    return state.plantSpecies.filter(
      (plantSpeciesItem) => plantSpeciesItem['name'] === name
    )?.[0]?.['id']
    //optional chaining
  }

  onBeforeMount(() => {
    loadPlantSpecies()
    loadPlantVarieties()
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
