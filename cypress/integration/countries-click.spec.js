describe("Click countries", () => {
  it("opens each country", () => {
    cy.visit("http://localhost:3000");
    cy.get(".dots-map__categories > button").eq(1).click();
    cy.get(".dots-map__results-list__category-results")
      .eq(1)
      .find("button")
      .each(($el) => {
        cy.wrap($el).click();
        cy.get(".dots-map__sidebar__main-area .dots-map__card");
        cy.get(".dots-map__card__close-button").click();
      });
  });
});
