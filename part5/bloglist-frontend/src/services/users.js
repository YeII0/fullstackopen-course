import axios from 'axios'
import { extractData } from './common'
const baseUrl = '/api/users'

const getAll = async () => {
  return extractData(
    () => axios.get(baseUrl)
  )
}

const userService = {
  getAll
}

export default userService