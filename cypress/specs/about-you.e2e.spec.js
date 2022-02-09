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
        
        aboutYouPage.accessRegistrationLoginPage();

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
    
    it.only('Login', function() {
        
        aboutYouPage.accessRegistrationLoginPage();
        cy.get('[data-testid="RegisterAndLoginButtons"] ')
            .find('[mode="bordered"]')
            .last()
            .click();
        cy.get(AboutYouLocators.loginEmailInput).type(email)
    });

    it('Search', function (){

        //search for a random keyword
        aboutYouPage.search(noProduct);
        cy.contains('nimic ...').should('be.visible');
        
        //search for a valid product
        aboutYouPage.search(searchProduct);
        cy.contains(searchProduct).should('be.visible');
       
       
    }); 

    it('Cart', function () {
       
        //search a product
        aboutYouPage.search(searchProduct);
        //select the product
        cy.get(AboutYouLocators.searchedProduct1).click({force:true});
        //get price from product page
        cy.get(AboutYouLocators.finalPrice)
            .invoke('text')
            .as('price');
        //add to cart
        aboutYouPage.selectSizeAndAddToCard();
        //access cart
        cy.get(AboutYouLocators.goToBasket).click();
        //compare price of product to total basket price
        cy.get(AboutYouLocators.basketTotalPrice)
            .invoke('text').then(text =>{
                expect(text).to.eq(this.price)
        });
        //add a second item of the same product
        cy.get(AboutYouLocators.selectNumberOfItems).select('2').should('have.value', '2');
        cy.get(AboutYouLocators.basketTotalPrice)
            .invoke('text').then(text =>{
                expect(text).not.to.eq(this.price)
        });
        //remove product from basket
        cy.get(AboutYouLocators.removeProductFromBasket).click();
        cy.get(AboutYouLocators.confirmRemoveProduct).click();
        cy.contains('gol').should('be.visible');
    });
});