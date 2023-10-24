import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePlantBedsStore = defineStore('beds', () => {
  const state = reactive({
    currentMonth: 'januar',
    currentPeriod: 'anfang',

    currentBedplan: { beds: [] }, //leeres Object

    lastSetId: 0 //todo: bessere ID für sets
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

  function translateTimeBack(time) {
    const translation = {
      month: '',
      period: ''
    }

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
    const periods = ['anfang', 'mitte', 'ende']

    // const month= time/3

    translation.month = Object.keys(timeDictionary).find((key) => timeDictionary[key] === time)
    console.log(Object.keys(timeDictionary))
    console.log(translation)
    console.log(translation.month)
    console.log(time)
    translation.period = periods[timeDictionary[translation.month].indexOf(time)]

    return translation
  }

  function translateRowDistance(rowDistance) {
    return rowDistance / 5
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

  async function addBedplan(userId, title, description, userVarieties) {
    const newBedplan = {
      userId: userId,
      title: title,
      description: description,
      userVarieties: userVarieties,
      beds: [
        {
          bedNumber: 1,
          name: 'Beet 1',
          plantfamilies: ['Kreuzblütler', 'Zwiebelgewächse', 'Doldenblütler'],
          nutrition: 'Starkzehrer',
          sets: []
        },
        {
          bedNumber: 2,
          name: 'Beet 2',
          plantfamilies: ['Kürbisgewächse', 'Nachtschattengewächse'],
          nutrition: 'Starkzehrer + Dünger',
          sets: []
        },
        {
          bedNumber: 3,
          name: 'Beet 3',
          plantfamilies: ['Korbblütler', 'Gänsefußgewächse'],
          nutrition: 'Mittelzehrer',
          sets: []
        },
        {
          bedNumber: 4,
          name: 'Beet 4',
          plantfamilies: ['Zwiebelgewächse', 'Doldenblütler'],
          nutrition: 'Schwachzehrer',
          sets: []
        },
        {
          bedNumber: 5,
          name: 'Beet 5',
          plantfamilies: ['Nachtschattengewächse'],
          nutrition: 'Starkzehrer',
          sets: []
        },
        {
          bedNumber: 6,
          name: 'Beet 6',
          plantfamilies: ['Leguminosen', 'Korbblütler'],
          nutrition: 'Mittelzehrer',
          sets: []
        }
      ]
    }

    const resp = await fetch('http://localhost:3000/bedplans/', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(newBedplan)
    })
    const data = await resp.json()
    let newId = data
    return newId.id
  }

  async function deleteBedplan(bedplanId) {
    const resp = await fetch('http://localhost:3000/bedplans/' + bedplanId, {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json' }
    })
    await resp.json()
  }

  function checkIfAddSetPossible(
    bedNumber,
    month,
    period,
    varietyId,
    startColum,
    cultureDurationIntern,
    rowDistance
  ) {
    const start = translateTime(month, period)
    const end = start + cultureDurationIntern

    const relevantBeds = []

    for (let i = start; i < end; i++) {
      calculateBedState(bedNumber, month, period)
    }

    return true
  }

  function addSet(bedNumber, month, period, varietyId, startColum, cultureDuration, rowDistance) {
    const bed = state.currentBedplan.beds.filter((bedItem) => bedItem.bedNumber === bedNumber)[0]

    const newSet = {
      id: state.lastSetId + 1, //todo: bessere ID
      plantvarietiesId: varietyId,
      startColum: startColum,
      startTime: translateTime(month, period),
      cultureDuration: cultureDuration,
      neededColums: translateRowDistance(rowDistance)
    }
    bed.sets.push(newSet)
    //an API updaten
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min) // The maximum is exclusive and the minimum is inclusive
  }

  function calculateStartColumsInBed(
    bedNumber,
    month,
    period,
    varietyId,
    cultureDuration,
    rowDistance
  ) {
    const startColums = []

    startColums[0] = getRandomInt(0, 25) //todo: richtig prüfen!!
    startColums[1] = getRandomInt(0, 25)
    startColums[3] = getRandomInt(0, 25)
    return startColums
  }

  return {
    state,
    loadBedplan,
    currentTime,
    translateTimeBack,
    calculateBedState,
    translateTime,
    addBedplan,
    deleteBedplan,
    checkIfAddSetPossible,
    addSet,
    calculateStartColumsInBed,
    getRandomInt //todo: später löschen
  }
})
