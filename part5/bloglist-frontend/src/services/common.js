export const extractData = async request => {
  try {
    const response = await request()
    return response.data
  } catch (error) {
    throw error.response.data.error
  }
}
