import { contains } from "cypress/types/jquery";
import { AboutYouLocators, AboutYouPage } from "./locators";


const firstName = cy.faker.name.firstName();
const lastName = cy.faker.name.lastName();
const email = cy.faker.internet.email();
const password = cy.faker.internet.password();
const aboutYouPage = new AboutYouPage();
const searchProduct = 'PUMA';
const noProduct = 'asdfsakjl';

describe('About You Critical Path e2e', function () {

    beforeEach(function () {
        
        cy.viewport('samsung-note9');
        cy.visit('/');
    });
	

    it('Home Page', function(){

        cy.url().should('contain', 'aboutyou');


    });

    it('Registration', function(){

        cy.get(AboutYouLocators.headerMenu).click();
        cy.get(AboutYouLocators.userNav).click();

        //check validation messages are displayed
        cy.get(AboutYouLocators.registerSubmitButton).click();
        cy.get(AboutYouLocators.validationMessage)
            .should('have.length', 4);

        //add valid data for registration
        cy.get(AboutYouLocators.firstNameInput)
            .type(firstName)
            .blur()
            .should('have.value', firstName);
        
        cy.get(AboutYouLocators.lastNameInput)
            .type(lastName)
            .blur()
            .should('have.value', lastName);

        cy.get(AboutYouLocators.emailInput)
            .type(email)
            .blur()
            .should('have.value', email);
        
        cy.get(AboutYouLocators.passwordInput).type(password);

        cy.get(AboutYouLocators.validationMessage)
            .should('have.length', 0);

        //won't register since is a prod env
        //cy.get(AboutYouLocators.registerSubmitButton).click();
    }); 

    it('Search', function (){

        //search for a random keyword
        aboutYouPage.search(noProduct);
        cy.contains('nimic ...').should('be.visible');
        
        //search for a valid product
        aboutYouPage.search(searchProduct);
        cy.contains(searchProduct).should('be.visible');
       
       
    }); 

    it.only('Cart', function () {

        aboutYouPage.search(searchProduct);
        cy.get(AboutYouLocators.searchedProduct1).click({force:true});
        cy.get(AboutYouLocators.selectSize).click();
        cy.get('[type="radio"]').last().check();
        cy.get(AboutYouLocators.addToCart).click();
        cy,contains('succes').should('be.visible');
    });
});