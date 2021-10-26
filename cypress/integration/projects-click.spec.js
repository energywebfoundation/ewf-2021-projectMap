describe("Click projects", () => {
  getProjects().forEach((projectIndex) => {
    it(`Opens project ${projectIndex + 1}`, () => {
      cy.visit("http://localhost:3000");
      cy.get(".dots-map__result.dots-map__project-result")
        .eq(projectIndex)
        .click();
      cy.get(".dots-map__sidebar__main-area .dots-map__card");
      cy.get(".dots-map__card__close-button").click();
    });
  });

  function getProjects() {
    return range(0, 27);
  }

  function range(start, end) {
    return new Array(end - start).fill(null).map((_, i) => start + i);
  }
});
