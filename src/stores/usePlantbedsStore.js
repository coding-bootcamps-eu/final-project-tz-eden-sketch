import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePlantBedsStore = defineStore('plants', () => {
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
          }
        ]
      }
    ] //6 Beete
  })

  //computed zu bet 1 [möhreId, frei, frei, zucchiniID, ...24]
  const bed_1 = computed(() =>
    calculateCurrentBedState(state.beds.filter((bedNumber) => bedNumber === 1))
  )

  function calculateCurrentBedState(bedSets) {
    //preparing empty bed
    const currentBed = [] //24 colums
    for (let i = 0; i < 24; i++) {
      currentBed[i] = 'frei'
    }

    //check each set in bed and reservate place in bed
    for (set of bedSets) {
      for (let i = 0; i < set.neededColums; i++) {
        currentBed[set.startColum + i] = set.plantvarietiesId
      }
    }
    return currentBed
  }

  // function addPlant() {

  // }

  return {
    state,
    bed_1
    // addPlant
  }
})
