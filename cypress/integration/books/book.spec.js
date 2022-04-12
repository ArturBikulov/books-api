const faker = require("faker");
let bookId;
let title;

context("Books Api", () => {
  beforeEach(() => {
    // Visit default website from Cypress
    cy.visit("https://example.cypress.io/commands/network-requests");
    title = "api.book." + faker.datatype.number();
  });

  it("Create a book", () => {
    // Send POST new book api
    cy.request("POST", "https://f4hatlr72b.execute-api.us-east-1.amazonaws.com/production/books", {
        title: title,
        author: "Artur B"
      })
      // GET the response from POST book api
      .then((response) => {
        bookId = "https://f4hatlr72b.execute-api.us-east-1.amazonaws.com/production/" + response.body.id;
        //Send GET request with a new book id
      cy.request(
        "https://f4hatlr72b.execute-api.us-east-1.amazonaws.com/production/" +response.body.id).then((response) => {
        // Verify status code === 200
        expect(response.status).to.eq(200);
        // Verify that random title name that was generate before this test is the one that we received in a response body
        expect(response.body.title).to.eq(title);
        // Verify that body contains right title and author
        cy.log(JSON.stringify(response.body));
      });
    });
  });

  it("GET a book", () => {
     // Send GET book api
    cy.request("GET", bookId)
    .then((response) => {
      // Verify status code === 200
      expect(response.status).to.eq(200);
      // Verify that body contains right title and author
      cy.log(JSON.stringify(response.body));
    });
  });
  
  it("UPDATE a book", () => {
    // Send UPDATE new book api
   cy.request("PUT", bookId , {
       title: "Xfinity",
       author: "Artur B",
     }).then(() => {
       //Send a GET Request to get updated book and verify the result
       cy.request("GET", bookId).then((response) => {
     // Verify Updated title
     expect(response.body.title).to.eq("Xfinity");
     // Verify status code === 200
     expect(response.status).to.eq(200);
     // Verify that body contains right title and author
     cy.log(JSON.stringify(response.body));
   });
 });
});

  it("Create book and then DELETE a book", () => {
      // Send POST new book api
     cy.request("DELETE", bookId).then((response) => {
       expect(response.status).to.eq(200);
     })
  });
});