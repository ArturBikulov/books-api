import ApiPage from '../../fixtures/API/pom.api'
let bookId;

context('Books', () => {
  beforeEach(() => {
    ApiPage.newTitle
  });

  //POST request
  it('POST the Book', () => {
    //POST the book
    ApiPage.postRequest
      .then((response) => {
        bookId = response.body.id;
        //Get request to verify book was created
        ApiPage.getOneBook(response)
          .should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.title).to.eq(ApiPage.randomTitle);
          });
      });
  });

  // Get requst to get all the books
  it('GET all the books', () => {
    ApiPage.getAllBooks
      .should((response) => {
        expect(response.status).to.eq(200);
      });
  });
  // Update request
  it('Update the Book', () => {
        ApiPage.putRequest(bookId)
          .then((response) => {
            expect(response.status).to.eq(200)
            //Get updated book and verify it was updated
            ApiPage.getOneBook(response)
              .should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.title).to.eq(ApiPage.randomTitle)
                expect(response.body.author).to.eq(ApiPage.randomAuthor);
              });
          });
      });

   //Delete Request
   it('DELETE a book', () => {
        ApiPage.deleteBook(bookId)
          .then((response) => {
            //Verify that book was deleted
            expect(response.status).to.eq(200)
            //Try to get deleted book and verify getting 404 response code
            ApiPage.getWithFail(response)
              .should((response) => {
                //Verify that book was deleted
                expect(response.status).to.eq(404)
              });
          });
      });
  });
