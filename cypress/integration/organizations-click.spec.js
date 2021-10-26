describe("Click organizations", () => {
  getOrganizations().forEach((organizationIndex) => {
    it(`opens organization ${organizationIndex + 1}`, () => {
      cy.visit("http://localhost:3000");
      cy.get(".dots-map__categories > button").eq(2).click();
      cy.get(".dots-map__results-list__category-results button")
        .eq(organizationIndex)
        .click();
      cy.get(".dots-map__sidebar__main-area .dots-map__card");
      cy.get(".dots-map__card__close-button").click();
    });
  });

  function getOrganizations() {
    return range(0, 31);
  }

  function range(start, end) {
    return new Array(end - start).fill(null).map((_, i) => start + i);
  }
});
