import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const usePlantBedsStore = defineStore('plants', () => {
  const state = reactive({
    currentMonth: '',
    currentPeriod: '',
    test: 'Test'
  })

  // function addPlant() {

  // }

  return {
    state
    // addPlant
  }
})
