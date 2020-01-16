import Api from './ApiConfig'
// import { TMDB_API_KEY } from 'react-native-dotenv'
// const apiAppend = `api_key=${TMDB_API_KEY}`

export const LoginMethod = async (username, password) => {

  let data = {
    username: username,
    password: password
  }

  try {
    const resp = await Api.post(`/users/login`, data)
    return resp
  } catch (error) {
    throw error
  }
}

export const RegisterMethod = async (username, password, zipcode) => {

  let data = {
    username: username,
    password: password,
    zipcode: zipcode
  }

  try {
    const resp = await Api.post(`/users/register`, data)
    return resp
  } catch (error) {
    throw error
  }
}

export const updateUser = async (location_range, gender, userId, token) => {
  let data = {}
  if (gender.length) {
    data = {
      location_range: location_range,
      gender: gender
    }
  } else {
    data = {
      location_range: location_range
    }
  }

  let config = {
    headers: { 'Authorization': `Bearer ${token}` }
  };

  try {
    const resp = await Api.put(`/users/${userId}`, data, config)
    return resp
  } catch (error) {
    throw error
  }
}

export const updateUserBreeds = async (breeds, userId) => {
  console.log('yo')
  let data = {
    breeds: breeds,
    // user_id: userId
  }

  try {
    const resp = await Api.put(`/users/${userId}/breeds/${userId}`, data)
    console.log(resp)
    return resp
  } catch (error) {
    console.log(error)
  }
}

export const initializeUserBreed = async (userId) => {
  let data = {
    user_id: userId,
    names: []
  }

  try {
    const resp = await Api.post(`/users/${userId}/breeds`, data)
    return resp
  } catch (error) {
    throw error
  }
}