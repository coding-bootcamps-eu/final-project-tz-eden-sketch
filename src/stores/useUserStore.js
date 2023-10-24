import { reactive, onBeforeMount } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const state = reactive({
    currentUser: {}
  })

  async function addNewUser(userName) {
    const newUser = {
      name: userName
    }

    const resp = await fetch('http://localhost:3000/users/', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(newUser)
    })
    const data = await resp.json()
    let newId = data.id
    console.log('neue User ID', newId)
    localStorage.setItem('edenSketchUserId', newId)
    return newId
  }

  async function loadUser() {
    const userId = localStorage.getItem('edenSketchUserId')
    const URL = `http://localhost:3000/users/${userId}`
    const resp = await fetch(URL)
    const data = await resp.json()
    state.currentUser = data
  }

  async function deleteUser() {
    const resp = await fetch(`http://localhost:3000/users/${state.currentUser.id}`, {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json' }
    })
    //const data =
    await resp.json()
    localStorage.removeItem('edenSketchUserId')
  }

  async function changeName(name) {
    const URL = `http://localhost:3000/users/${state.currentUser.id}`
    const resp = await fetch(URL, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ name: name })
    })
    const data = await resp.json()
    state.currentUser = data
  }

  function validateUserName(name) {
    if (name.length >= 2) {
      return true
    }
    return false
  }

  onBeforeMount(async () => {
    if (localStorage.getItem('edenSketchUserId') !== null) {
      await loadUser()
    }
  })
  return {
    state,
    addNewUser,
    loadUser,
    deleteUser,
    changeName,
    validateUserName
  }
})
