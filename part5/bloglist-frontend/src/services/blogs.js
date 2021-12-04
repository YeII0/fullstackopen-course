import axios from 'axios'
import { extractData } from './common'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  return extractData(
    () => axios.get(baseUrl)
  )
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }
  return extractData(
    () => axios.post(baseUrl, newBlog, config)
  )
}

const update = async (id, updatedBlog) => {
  const config = {
    headers: { Authorization: token }
  }
  return extractData(
    () => axios.put(`${baseUrl}/${id}`, updatedBlog, config)
  )
}

const remove = async id => {
  const config = {
    headers: { Authorization: token }
  }
  return extractData(
    () => axios.delete(`${baseUrl}/${id}`, config)
  )
}

const blogService = {
  getAll,
  create,
  update,
  setToken,
  remove
}

export default blogService