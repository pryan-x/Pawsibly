import Axios from 'axios'

let APIKey = 'T5VtSPDylLXPvqbEFPX6b7QB2lbYFCxcNDFE7PwvGNCNBK2U8L'

let SECRET = '64WPW71lp3TiLoX9TPtILKANXgaS7TApYlTNoBxG'

const PetfinderApi = Axios.create({
  baseURL: 'https://api.petfinder.com/v2/'
})

export default PetfinderApi
