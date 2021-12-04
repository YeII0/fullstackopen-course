Cypress.Commands.add('createUser', ({ fullname, username, password }) => {
  const user = {
    name: fullname,
    username: username,
    password: password
  }
  cy.request('POST', 'http://localhost:3003/api/users/', user)
})

Cypress.Commands.add('login', ({ username, password }) => {
  cy
    .request('POST', 'http://localhost:3003/api/login', {
      username, password
    })
    .then(({ body }) => {
      localStorage.setItem('loggedUser', JSON.stringify(body))
      cy.loadPage()
    })
})

Cypress.Commands.add('createBlog', ({ author, title, url, likes }) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: { author, title, url, likes },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`
    }
  })
})

Cypress.Commands.add('loadPage', () => {
  cy.intercept({
    method: 'GET',
    url: 'http://localhost:3000/api/blogs'
  }).as('dataGetFirst')
  cy.visit('http://localhost:3000')
  cy.wait('@dataGetFirst')
})