import axios from 'axios'

const baseUrl = 'https://restcountries.com/v3.1'

const getOne = async name => {
  const response = await axios.get(`${baseUrl}/name/${name}?fullText=true`)
  return response.data[0]
}

const exportedObj = { getOne }

export default exportedObj