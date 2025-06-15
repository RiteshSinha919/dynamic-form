describe("test local code changes", () => {
  it("open localhost:3000", () => {
    cy.visit("/");
    cy.get("input[name=addItem]").type("task 1");
    cy.contains("Add").click();
  });
});
