describe('Blog app', function () {
  beforeEach(function () {
    cy.request('DELETE', 'http://localhost:3003/api/testing/reset')
    cy.createUser({
      fullname: 'Maciej Rozyc',
      username: 'macieksej',
      password: 'foo'
    })
    cy.loadPage()
  })

  it('Login form is shown', function () {
    cy.contains('Login')
  })

  describe('Login', function () {
    it('succeds with correct credientials', function () {
      cy.get('#username').type('macieksej')
      cy.get('#password').type('foo')
      cy.get('#login-button').click()

      cy.contains('Maciej Rozyc logged-in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('macieksej')
      cy.get('#password').type('wrongPassword')
      cy.get('#login-button').click()

      cy.get('.notification')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'macieksej', password: 'foo' })
    })

    it('a blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#author').type('Michal Szafranski')
      cy.get('#title').type('Wiecej niz oszczedzanie pieniedzy')
      cy.get('#url').type('https://wnop.pl')
      cy.get('#likes').type(50)
      cy.contains('Save').click()

      cy.get('[data-name=blogs]').contains('Title: Wiecej niz oszczedzanie pieniedzy')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          author: 'Michal Szafranski',
          title: 'Wiecej niz oszczedzanie pieniedzy',
          url: 'https://wnop.pl',
          likes: 50
        })
        cy.loadPage()
      })

      it('user can add like', function () {
        cy.contains('show more').click()
        cy.contains('Likes: 50')
        cy.get('.likeButton').click()
        cy.contains('Likes: 51')
      })

      it('user can remove his blog', function () {
        cy.contains('show more').click()
        cy.contains('remove').click()
        cy.get('[data-name=blogs]').should('not.contain', 'Title: Wiecej niz oszczedzanie pieniedzy')
      })

      it('user can\'t remove remove another user blog', function () {
        cy.createUser({
          fullname: 'Another User',
          username: 'anotheruser',
          password: 'foo',
        })
        cy.login({
          username: 'anotheruser',
          password: 'foo'
        })
        cy.createBlog({
          author: 'Michael Greger',
          title: 'Tea',
          url: 'https://nutritionfacts.org',
          likes: 0
        })
        cy.login({
          username: 'macieksej',
          password: 'foo'
        })
        cy.contains('Title: Tea').closest('[data-name=blog]').as('otherUserBlog')
        cy.get('@otherUserBlog').contains('show more').click()
        cy.get('@otherUserBlog').should('not.contain', 'remove')
      })
    })

    describe('and few blogs exists', function () {
      beforeEach(function () {
        cy.createBlog({
          author: 'Author 1',
          title: 'Title 1',
          url: 'https://site1.com',
          likes: 59
        })
        cy.createBlog({
          author: 'Author 2',
          title: 'Title 2',
          url: 'https://site1.com',
          likes: 10
        })
        cy.createBlog({
          author: 'Author 3',
          title: 'Title 3',
          url: 'https://site1.com',
          likes: 10
        })
        cy.createBlog({
          author: 'Author 4',
          title: 'Title 4',
          url: 'https://site4.com',
          likes: 120
        })
        cy.loadPage()
      })

      it.only('blogs are sorted by likes from in descending order', function () {
        cy.get('[data-name=blog').each((blog) => {
          console.log(blog)
          cy.wrap(blog).contains('show more').click()
        })

        cy.get('[data-name=likesNumber').should(likeElems => {
          let likes = parseInt(Cypress.$(likeElems[0]).text())

          likeElems.each((index, likeElem) => {
            expect(parseInt(Cypress.$(likeElem).text())).to.be.at.most(likes)
            likes = parseInt(Cypress.$(likeElem).text())
          })
        })
      })
    })
  })
})