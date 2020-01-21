import Api from './ApiConfig'
import PetfinderApi from './Petfinder'
import Axios from 'axios'
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
  let data = {
    breed_list: breeds,
    user_id: userId
  }
  console.log(data)

  try {
    const resp = await Api.put(`/users/${userId}/breeds`, data)

    return resp
  } catch (error) {
    console.log(error)
  }
}

export const initializeUserBreed = async (userId) => {

  let data = {
    user_id: userId,
    breed_list: []
  }

  try {
    const resp = await Api.post(`/users/${userId}/breeds`, data)

    return resp
  } catch (error) {
    console.log(error)
  }
}

export const getUserData = async (id, token) => {

  let config = {
    headers: { 'Authorization': `Bearer ${token}` }
  };

  try {
    // console.log(data.user_id)
    const resp = await Api.get(`/users/${id}`, config)
    return resp
  } catch (error) {
    console.log(error)
  }
}

export const getApiToken = async () => {
  let getTokenConfig = [
    "grant_type=client_credentials&client_id=T5VtSPDylLXPvqbEFPX6b7QB2lbYFCxcNDFE7PwvGNCNBK2U8L&client_secret=64WPW71lp3TiLoX9TPtILKANXgaS7TApYlTNoBxG",
    {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  ]
  try {
    const tokenResp = await PetfinderApi.post('oauth2/token', ...getTokenConfig)
    console.log(tokenResp.data.access_token)
    return tokenResp.data.access_token
  } catch (error) {
    console.log(error)
  }
}

export const getDogs = async (
  selectedBreeds,
  gender,
  zip,
  locationRange,
  dogBreedData,
) => {

  const comma = gender.length === 2 ? ',' : ''

  const zipcode = zip.length === 5 ? `&location=${zip}` : ''

  const locationRadius = zip.length === 5 ? `&distance=${locationRange}` : ''

  const dogBreedChain = []

  selectedBreeds.forEach((selection, index) => {
    dogBreedChain.push(dogBreedData[selection].name)
  })

  const dogListUrl = `/animals?type=dog&gender=${gender[0] ? gender[0] : ''}${comma}${gender[1] ? gender[1] : ''}${zipcode}${locationRadius}&breed=${dogBreedChain.join(',')}&status=adoptable`
  console.log(dogListUrl)

  try {

    const token = await getApiToken()

    let config = {
      headers: { 'Authorization': `Bearer ${token}` }
    };

    const resp = await PetfinderApi.get(dogListUrl, config)

    return resp
  } catch (error) {
    console.log(error)
  }
}

export const deleteUser = async (token, id) => {
  try {
    let config = {
      headers: { 'Authorization': `Bearer ${token}` }
    };
    const resp = Api.delete(`/users/${id}`, config)
    return resp
  } catch (error) {
    console.log(error)
  }
}

export const deleteBreeds = async (id) => {
  try {
    const resp = Api.delete(`users/${id}/breeds`)
    return resp
  } catch (error) {
    console.log(error)
  }
}


export const updateUserSettings = async (username, password, zipcode, token, id) => {
  let data = {}
  if (password.length >= 3) {
    data = {
      username: username,
      password: password,
      zipcode: zipcode
    }
  } else {
    data = {
      username: username,
      zipcode: zipcode
    }
  }

  let config = {
    headers: { 'Authorization': `Bearer ${token}` }
  };

  try {
    const resp = await Api.put(`/users/${id}`, data, config)
    return resp
  } catch (error) {
    throw error
  }
}