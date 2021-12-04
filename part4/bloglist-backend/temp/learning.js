const orders = [200, 300, 500]

const sum = orders.reduce((sum, order) => {
  return sum + order
}, 0)


console.log(sum)