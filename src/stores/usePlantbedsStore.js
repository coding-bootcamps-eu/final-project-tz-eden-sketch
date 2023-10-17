import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePlantBedsStore = defineStore('beds', () => {
  const state = reactive({
    currentMonth: '',
    currentPeriod: '',

    beds: [
      {
        id: '16515-5646',
        bedNumber: 1,
        name: 'Beet 1',
        sets: [
          {
            plantvarietiesId: '37325a55-d047-4b27-bedb-5e718755ec7c', //Lujubscha(Knoblauch): 25/5=5Spalten
            startColum: 6,
            startTime: 2,
            cultureDuration: 13,
            neededColums: 5
          },
          {
            plantvarietiesId: '6fe4e254-979a-4130-892f-8b53617f67cd', //Oxella: 30/5=6Spalten
            startColum: 0,
            startTime: 2,
            cultureDuration: 13,
            neededColums: 6
          },
          {
            plantvarietiesId: 'eaa937e3-abfb-4af2-a6e9-df863a38a2ed', //Butterflay(Spinat): 20/5=4Spalten
            startColum: 20,
            startTime: 2,
            cultureDuration: 13,
            neededColums: 4
          },
          {
            plantvarietiesId: 'eaa937e3-abfb-4af2-a6e9-df863a38a2ed', //Butterflay(Spinat): 20/5=4Spalten
            startColum: 20,
            startTime: 10,
            cultureDuration: 13,
            neededColums: 4
          }
        ]
      }
    ] //6 Beete
  })

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
    // const monthDictionary = {
    //   Januar: 1,
    //   Februar: 2,
    //   März: 3,
    //   April: 4,
    //   Mai: 5,
    //   Juni: 6,
    //   Juli: 7,
    //   August: 8,
    //   September: 9,
    //   Oktober: 10,
    //   November: 11,
    //   Dezember: 12
    // }

    // const periodDictionary = {
    //   Anfang: 1,
    //   Mitte: 2,
    //   Ende: 3
    // }
    // translation = (monthDictionary[month] - 1) * 3 + periodDictionary[period]

    return translation
  }

  //const bed_1 = computed(() => calculateBedState())

  // function calculateBedState(bedNumber, month, period) {
  //   let bedSets = state.beds.filter((bedItem) => bedItem['bedNumber'] === bedNumber).sets

  //   //preparing empty bed
  //   const currentBed = [] //24 colums = 120cm in reality
  //   for (let i = 0; i < 24; i++) {
  //     currentBed[i] = 'frei'
  //   }

  //   //check each set in bed
  //   for (let set of bedSets) {
  //     //ist das set zum Zeitpunkt den wir uns ansehen gerade im Beet?

  //     for (let i = 0; i < set.neededColums; i++) {
  //       currentBed[set.startColum + i] = set.plantvarietiesId
  //     }
  //   }
  //   return currentBed
  // }
  // function addPlant() {

  // }

  return {
    state,
    currentTime,
    // calculateBedState,
    translateTime
    // addPlant
  }
})
