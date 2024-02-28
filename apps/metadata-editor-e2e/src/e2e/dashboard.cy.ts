describe('dashboard', () => {
  let pageOne
  describe('pagination', () => {
    it('should display different results on click on arrow', () => {
      cy.visit('/records/all')
      cy.get('gn-ui-results-table')
        .find('.table-row-cell')
        .first()
        .invoke('text')
        .then((text) => {
          pageOne = text
        })
    })
    //TODO remove skip when dump contains more than 15 records
    it.skip('should display different results on click on specific page and change url', () => {
      cy.visit('/records/search?_page=2')
      cy.get('gn-ui-pagination-buttons').find('gn-ui-button').eq(1).click()
      cy.get('gn-ui-results-table')
        .find('.table-row-cell')
        .first()
        .invoke('text')
        .then((text) => {
          expect(text).to.equal(pageOne)
          cy.url().should('include', 'page=1')
        })
      cy.get('gn-ui-pagination-buttons').find('gn-ui-button').last().click()
      cy.get('gn-ui-results-table')
        .find('.table-row-cell')
        .first()
        .invoke('text')
        .then((text) => {
          expect(text).not.to.equal(pageOne)
          cy.url().should('include', 'page=2')
        })
    })
  })

  describe('sorting', () => {
    let originalFirstItem
    let newFirstItem
    it('should order the result list on click', () => {
      cy.visit('/records/all')
      cy.get('gn-ui-results-table')
        .find('.table-row-cell')
        .eq(1)
        .invoke('text')
        .then((list) => {
          originalFirstItem = list.trim()
          // order by title descending
          cy.get('.table-header-cell').eq(1).click()
          cy.url().should('include', 'sort=resourceTitleObject.default.keyword')
          cy.get('.table-header-cell').eq(1).click()
          cy.url().should(
            'include',
            'sort=-resourceTitleObject.default.keyword'
          )
          cy.get('gn-ui-results-table')
            .find('.table-row-cell')
            .eq(1)
            .invoke('text')
            .then((list) => {
              newFirstItem = list.trim()
              expect(newFirstItem).not.to.equal(originalFirstItem)
            })
        })
    })
  })

  describe('checkboxes', () => {
    it('should show the correct amount of selected records when they are selected', () => {
      cy.visit('/records/all')
      cy.get('gn-ui-results-table')
        .find('.table-row-cell')
        .get('gn-ui-checkbox')
        .eq(2)
        .click()
      cy.get('.selected-records').contains('1 selected')
    })

    it('should show nothing when none are selected', () => {
      cy.visit('/records/all')
      cy.get('gn-ui-results-table')
        .find('.table-row-cell')
        .get('gn-ui-checkbox')
        .each(($checkbox) => cy.wrap($checkbox).click())
      cy.get('[data-cy=records-information]').should(
        'not.have.descendants',
        '.selected-records'
      )
    })

    it('should select all records when the "select all" checkbox is checked', () => {
      cy.visit('/records/all')
      cy.get('gn-ui-results-table')
        .find('.table-row-cell')
        .get('gn-ui-checkbox')
        .first()
        .click()
      cy.get('.selected-records').contains('14 selected')
    })
  })
})
