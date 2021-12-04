const reducer = (state = '', action) => {
  switch (action.type) {
    case 'FILTER':
      const query = action.data
      return query
    default:
      return state
  }
}

export const setQuery = query => {
  return {
    type: 'FILTER',
    data: query
  }
}

export default reducer