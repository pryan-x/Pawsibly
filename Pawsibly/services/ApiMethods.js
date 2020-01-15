import Api from './ApiConfig'
// import { TMDB_API_KEY } from 'react-native-dotenv'
// const apiAppend = `api_key=${TMDB_API_KEY}`

export const LoginMethod = async (username, password) => {

  var data = {
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

export const RegisterMethod = async (username, password) => {

  var data = {
    username: username,
    password: password
 }

try {
    const resp = await Api.post(`/users/register`, data)
    return resp
  } catch (error) {
    throw error
  }
}