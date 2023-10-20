import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePlantBedsStore = defineStore('beds', () => {
  const state = reactive({
    currentMonth: 'januar',
    currentPeriod: 'anfang',

    currentBedplan: { beds: [] } //leeres Object
  })

  async function loadBedplan(bedId) {
    const response = await fetch('http://localhost:3000/bedplans/' + bedId)
    const data = await response.json()
    state.currentBedplan = data
  }

  const currentTime = computed(() => {
    return translateTime(state.currentMonth, state.currentPeriod)
  })

  function translateTime(month, period) {
    let translation = 0
    const timeDictionary = {
      januar: [1, 2, 3],
      februar: [4, 5, 6],
      märz: [7, 8, 9],
      april: [10, 11, 12],
      mai: [13, 14, 15],
      juni: [16, 17, 18],
      juli: [19, 20, 21],
      august: [22, 23, 24],
      september: [25, 26, 27],
      oktober: [28, 29, 30],
      november: [31, 32, 33],
      dezember: [34, 35, 36]
    }
    if (period === 'anfang') {
      translation = timeDictionary[month][0]
    } else if (period === 'mitte') {
      translation = timeDictionary[month][1]
    } else if (period === 'ende') {
      translation = timeDictionary[month][2]
    }

    return translation
  }

  function calculateBedState(bedNumber, month, period) {
    const bed = state.currentBedplan.beds.find((bedItem) => bedItem['bedNumber'] === bedNumber)

    if (!bed) {
      //loading not finished jet
      return [[], []]
    }

    const bedSets = bed.sets

    const time = translateTime(month, period)
    const relevantSets = []

    //preparing empty bed
    const currentBed = [] //24 colums = 120cm in reality
    for (let i = 0; i < 24; i++) {
      currentBed[i] = 'frei'
    }

    //check each set in bed
    // for (let set of bedSets) {
    for (let b = 0; b < bedSets.length; b++) {
      let currentSet = bedSets[b]

      //ist das set zum Zeitpunkt den wir uns ansehen gerade im Beet?

      if (currentSet.startTime > time) {
        //set wird erst NACH dem aktuellen Zeitpunkt angepflanzt
      } else if (currentSet.startTime + currentSet.cultureDuration < time) {
        //set ist gerade nicht mehr im Beet
      } else {
        //set ist gerade im Beet
        relevantSets.push(currentSet)
        //set im Beet eintragen
        for (let i = 0; i < currentSet.neededColums; i++) {
          currentBed[currentSet.startColum + i] = currentSet.plantvarietiesId
        }
      }
    }
    return [currentBed, relevantSets]
  }

  // function addPlant() {

  // }

  return {
    state,
    loadBedplan,
    currentTime,
    calculateBedState,
    translateTime
    // addPlant
  }
})
