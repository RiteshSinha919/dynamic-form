describe("test ducation form", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display the education form with initial empty card", () => {
    cy.get("h1").should("contain", "Education");
    cy.get("input[id='Institute Name']").should("exist");
    cy.get("input[id='Degree']").should("exist");
  });

  it("should add a new education card when clicking the Add button", () => {
    cy.get("button").contains("+ Add").click();
    cy.get("input[id='Institute Name']").should("have.length", 2);
    cy.get("input[id='Degree']").should("have.length", 2);
  });

  it("should fill and validate education details", () => {
    cy.get("input[id='Institute Name']").first().type("Test University");
    cy.get("input[id='Degree']").first().type("Bachelor of Science");

    cy.get("button").contains("+ Add").click();
    cy.get("input[id='Institute Name']").last().type("Another University");
    cy.get("input[id='Degree']").last().type("Master of Science");

    cy.get("input[id='Institute Name']").first().should("have.value", "Test University");
    cy.get("input[id='Degree']").first().should("have.value", "Bachelor of Science");
    cy.get("input[id='Institute Name']").last().should("have.value", "Another University");
    cy.get("input[id='Degree']").last().should("have.value", "Master of Science");
  });

  it("should show validation errors for empty fields", () => {
    cy.get("input[id='Institute Name']").first().type("testing institute");
    cy.get("input[id='Institute Name']").first().clear();
    cy.get("input[id='Degree']").first().type("testing degree");
    cy.get("input[id='Degree']").first().clear();

    cy.get("body").click();

    cy.contains("institute is required").should("be.visible");
    cy.contains("degree is required").should("be.visible");
  });

  it("should remove an education card when clicking the close button", () => {
    cy.get("button").contains("+ Add").click();
    
    cy.get("input[id='Institute Name']").should("have.length", 2);
    
    cy.get("input[id='Institute Name']").last().parent().parent().find("button").contains("x").click();
    
    cy.get("input[id='Institute Name']").should("have.length", 1);
  });

  it("should maintain form state after adding and removing cards", () => {
    cy.get("input[id='Institute Name']").first().type("First University");
    cy.get("input[id='Degree']").first().type("First Degree");

    cy.get("button").contains("+ Add").click();
    cy.get("input[id='Institute Name']").last().type("Second University");
    cy.get("input[id='Degree']").last().type("Second Degree");

    cy.get("input[id='Institute Name']").last().parent().parent().find("button").contains("x").click();

    cy.get("input[id='Institute Name']").should("have.value", "First University");
    cy.get("input[id='Degree']").should("have.value", "First Degree");
  });
});
