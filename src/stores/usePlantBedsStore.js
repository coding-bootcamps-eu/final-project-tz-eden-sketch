import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { nanoid } from 'nanoid'

export const usePlantBedsStore = defineStore('beds', () => {
  const state = reactive({
    currentMonth: 'januar',
    currentPeriod: 'anfang',

    currentBedplan: { beds: [] }, //leeres Object
    freeColumsLeft: [], //wird nicht mehr genutzt??

    moveSetModusIsActive: [false, false, false, false, false, false],
    activeSets: [] // [{bednumber: 1, set:{...}}, ...]
  })

  async function loadBedplan(bedId) {
    const response = await fetch(`${import.meta.env.VITE_EDENSKETCH_API_URL}/bedplans/` + bedId)
    const data = await response.json()
    state.currentBedplan = data
  }

  const currentTime = computed(() => {
    return translateTime(state.currentMonth, state.currentPeriod)
  })

  async function updateBedplan() {
    // async function putTodo(id, todoLi) {
    const resp = await fetch(
      `${import.meta.env.VITE_EDENSKETCH_API_URL}/bedplans/` + state.currentBedplan.id,
      {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(state.currentBedplan)
      }
    )

    const data = await resp.json()
    return data
  }

  const spaceLeftInCurrentBed = computed(() => {
    const countArray = []
    for (let b = 1; b < state.currentBedplan.beds.length + 1; b++) {
      let currentBed = calculateBedState(b, state.currentMonth, state.currentPeriod)[0]
      let count = 0

      for (let i = 0; i < currentBed.length; i++) {
        if (currentBed[i] === 'frei') {
          count = count + 1
        }
      }
      countArray.push(count)
    }
    // state.freeColumsLeft = countArray
    return countArray
  })

  function newStartColumns(bedNumber, currentMonth, currentPeriod, currentPlantSet) {
    const startColumns = []
    const currentTime = translateTime(currentMonth, currentPeriod)

    for (let i = currentTime; i < currentTime + currentPlantSet.cultureDuration; i++) {
      const calculatedTime = translateTimeBack(currentTime)
      const currentBedArray = calculateBedState(
        bedNumber,
        calculatedTime.month,
        calculatedTime.period
      )[2]
      console.log('currentBedArray: ', currentBedArray)
      console.log('needed columns: ', currentPlantSet.neededColums)
      for (let k = 0; k < currentBedArray.length; k++) {
        let currentStartColumn = k
        let count = 0
        for (let j = k; j < currentBedArray.length; j++) {
          if (currentBedArray[j] !== 'frei' && currentBedArray[j] !== currentPlantSet.id) {
            count = 0

            break
          } else if (currentBedArray[j] === 'frei' || currentBedArray[j] === currentPlantSet.id) {
            count++
            if (count < currentPlantSet.neededColums) {
              continue
            } else if (count === currentPlantSet.neededColums) {
              startColumns.push(currentStartColumn)
              count = 0
              break
            }
          }
        }
      }
      return startColumns
    }

    // for every period from now + culture duration
    //
  }
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

    const monthDict = [
      'januar',
      'februar',
      'märz',
      'april',
      'mai',
      'juni',
      'juli',
      'august',
      'september',
      'oktober',
      'november',
      'dezember'
    ]

    const periods = ['ende', 'anfang', 'mitte']

    let monthInteger = Math.trunc(time / 3)
    if (time % 3 > 0) {
      translation.month = monthDict[monthInteger]
    } else {
      //Modulo=0
      translation.month = monthDict[monthInteger - 1]
    }
    translation.period = periods[time % 3]

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
    const currentBedWithSetIds = []
    for (let i = 0; i < 24; i++) {
      currentBed[i] = 'frei'
      currentBedWithSetIds[i] = 'frei'
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
          currentBedWithSetIds[currentSet.startColum + i] = currentSet.id
        }
      }
    }
    return [currentBed, relevantSets, currentBedWithSetIds]
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

    const resp = await fetch(`${import.meta.env.VITE_EDENSKETCH_API_URL}/bedplans/`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(newBedplan)
    })
    const data = await resp.json()
    let newId = data
    return newId.id
  }

  async function deleteBedplan(bedplanId) {
    const resp = await fetch(`${import.meta.env.VITE_EDENSKETCH_API_URL}/bedplans/` + bedplanId, {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json' }
    })
    await resp.json()
  }

  async function getVariety(id) {
    //nicht außerhalb des stores erreichbar. nur für error message in checkIfAddSetPossible
    const URL = `${import.meta.env.VITE_EDENSKETCH_API_URL}/plantvarieties/${id}`
    const resp = await fetch(URL)
    const data = await resp.json()

    return data
  }

  function checkIfAddSetPossible(
    bedNumber,
    month,
    period,
    varietyId,
    startColum0,
    cultureDurationIntern,
    rowDistance
  ) {
    // console.log(
    //   'checkIfAddSetPossible ',
    //   bedNumber,
    //   month,
    //   period,
    //   varietyId,
    //   startColum0,
    //   cultureDurationIntern,
    //   rowDistance
    // )
    const start = translateTime(month, period)
    const end = start + cultureDurationIntern

    let addSetIsPossible = false

    let variety = varietyId
    // let variety = ''
    // if (getVariety(varietyId)) {
    //   variety = variety.name + ' (' + variety.species + ') '
    // } else {
    //   variety = varietyId
    // }

    //alle relevanten Beete berechnen
    // const relevantBeds = []
    for (let i = start; i < end; i++) {
      //todo: prüfen: mit +1 richtig?
      const month = translateTimeBack(i).month
      const period = translateTimeBack(i).period

      const relevantBed = calculateBedState(bedNumber, month, period)[0]

      const isSpace = isSpaceInBedForSet(
        relevantBed,
        startColum0,
        translateRowDistance(rowDistance)
      )

      if (isSpace.value) {
        //es ist von Aussaat bis Ernte Platz im Beet
        addSetIsPossible = true
      } else {
        addSetIsPossible = false
        // console.log('variery: ', variety)
        // console.log('isSpace: ', isSpace)
        const time = translateTimeBack(i)

        //todo: message gibt falsche zeit zurück und leider keine Spalten und andere Daten
        let message =
          'Leider kann die Sorte ' +
          variety +
          'nicht eingepflanzt / versetzt werden, weil ' +
          i +
          time.period +
          time.month +
          ' in Spalte ' +
          isSpace.colum +
          ' schon eine andere Sorte (' +
          isSpace.otherVariety +
          ') steht.'
        // console.log('checkIfAddSetPossible', addSetIsPossible, message)
        return { value: addSetIsPossible, type: 'error', message: message }
      }
    }

    return { value: addSetIsPossible, type: 'ok', message: '' }
  }

  function isSpaceInBedForSet(bedArray, startColum0, neededColums) {
    let isSpace = false
    // console.log('isSpaceInBedForSet :' + bedArray, startColum0, neededColums)

    for (let i = startColum0; i < startColum0 + neededColums; i++) {
      //todo: prüfen: +1 richtig??
      if (bedArray[i] === 'frei') {
        isSpace = true
      } else {
        isSpace = false
        // console.log('isSpaceInBedForSet', bedArray, startColum0, neededColums)
        // console.log('isSpaceInBedForSet', isSpace, i, bedArray[i])
        return { value: isSpace, colum: i, otherVariety: bedArray[i] }
      }
    }
    return { value: isSpace, colum: '', otherVariety: '' }
  }

  async function addSet(
    bedNumber,
    month,
    period,
    varietyId,
    startColum0,
    cultureDuration,
    rowDistance
  ) {
    const bed = state.currentBedplan.beds.filter((bedItem) => bedItem.bedNumber === bedNumber)[0]

    const newSet = {
      id: nanoid(),
      plantvarietiesId: varietyId,
      startColum: startColum0,
      startTime: translateTime(month, period),
      cultureDuration: cultureDuration,
      neededColums: translateRowDistance(rowDistance)
    }

    bed.sets.push(newSet)
    await updateBedplan()
  }

  // function getRandomInt(min, max) {
  //   min = Math.ceil(min)
  //   max = Math.floor(max)
  //   return Math.floor(Math.random() * (max - min) + min) // The maximum is exclusive and the minimum is inclusive
  // }

  function calculateStartColumsInBed(
    bedNumber,
    month,
    period,
    varietyId,
    cultureDurationIntern,
    rowDistance
    // setId=null !!!!!! muss in die folgenden Funktionen mitgeschleppt werden
  ) {
    // console.log('Bed-Nr ' + bedNumber)
    // console.log('variety-id ' + varietyId)
    // console.log('row-distance ' + rowDistance)
    const startColums = []

    for (let i = 0; i < 24; i++) {
      if (
        checkIfAddSetPossible(
          bedNumber,
          month,
          period,
          varietyId,
          i,
          cultureDurationIntern,
          rowDistance
        ).value
      ) {
        startColums.push(i)
      }
    }
    // console.log(
    //   'calculateStartColumsInBed',
    //   bedNumber,
    //   month,
    //   period,
    //   varietyId,
    //   cultureDurationIntern,
    //   rowDistance
    // )
    // console.log(startColums)
    return startColums
  }

  function deleteSet(setId, bedNumber) {
    //löscht das Set komplett aus dem Beetplan
    for (let i = 0; i < state.currentBedplan.beds[bedNumber - 1].sets.length; i++) {
      if (state.currentBedplan.beds[bedNumber - 1].sets[i].id === setId) {
        state.currentBedplan.beds[bedNumber - 1].sets.splice(i, 1)
      }
    }
    updateBedplan()
  }

  function harvestSet(setId, bedNumber) {
    //löscht das Set ab dem ausgewählten Zeitpunkt aus dem Beetplan = verkürzt die Zeit im Beet
    for (let i = 0; i < state.currentBedplan.beds[bedNumber - 1].sets.length; i++) {
      if (state.currentBedplan.beds[bedNumber - 1].sets[i].id === setId) {
        const newCultureDuration =
          this.currentTime - state.currentBedplan.beds[bedNumber - 1].sets[i].startTime
        state.currentBedplan.beds[bedNumber - 1].sets[i].cultureDuration = newCultureDuration - 1
      }
    }
    updateBedplan()
  }

  function updatePositionInBed(bedNumber, setId, newStartColum0) {
    const currentBed = state.currentBedplan.beds.find(
      (bedItem) => bedItem['bedNumber'] === bedNumber
    )
    const currentSet = currentBed.sets.find((setItem) => setItem['id'] === setId)

    currentSet.startColum = newStartColum0

    updateBedplan()
  }

  return {
    state,
    loadBedplan,
    updateBedplan,
    spaceLeftInCurrentBed,
    currentTime,
    translateTimeBack,
    calculateBedState,
    translateTime,
    addBedplan,
    deleteBedplan,
    checkIfAddSetPossible,
    addSet,
    isSpaceInBedForSet,
    calculateStartColumsInBed,
    //getRandomInt, //todo: später löschen,
    deleteSet,
    harvestSet,
    getVariety,
    updatePositionInBed,
    newStartColumns
  }
})
