import faker from 'faker';
import URL from './api.client';

class API {
    randomTitle = 'Book ' + faker.datatype.number();
    randomAuthor = faker.name.firstName() + ' ' + faker.name.lastName();
    get postRequest() {
        return cy.request('POST', URL.booksURL, {
            title: this.randomTitle,
            author: "Artur B"
        });
    };
    get getAllBooks() { return cy.request(URL.booksURL) };
    getOneBook(response) { return cy.request(URL.bookURL + response.body.id) };
    deleteBook(id) { return cy.request('DELETE', URL.bookURL + id) };
    putRequest(id) {
        return cy.request('PUT', URL.bookURL + id, {
            title: this.randomTitle,
            author: this.randomAuthor
        });
    };
    getWithFail(response) {
        return cy.request({
            url: URL.bookURL + response.body.id,
            failOnStatusCode: false,
        });
    };
};

export default new API();