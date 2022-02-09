const AboutYouLocators = {
    
    //header
    "headerMenu" : '[data-testid="HeaderMenu"]',
    "userNav" : '[data-testid="userNav"]',
    "searchButon" : '[data-testid="HeaderSearch"]',
    "basketButton" : '[data-testid="HeaderBasket"]',

    //homepage


    //registration 
    "firstNameInput" : '[data-testid="FirstnameField"]',
    "lastNameInput" : '[data-testid="LastNameField"]',
    "emailInput" : '[data-testid="EmailField"]',
    "passwordInput" : '[data-testid="PasswordField"]',
    "registerSubmitButton" : '[data-testid="RegisterSubmitButton"]',
    "validationMessage" : '[data-testid="ErrorInfoText"]',

    //login
    "loginEmailInput": '[data-testid="EmailField"]',
    "loginPasswordInput": '[data-testid="PasswordField"]',
    "loginButton": '[data-testid="SubmitLogin"]',

    //search
    "searchInput" : 'form div input',
    "searchedProduct1" : '[data-testid="productTile_7593239"]',
    "finalPrice" : '[data-testid="finalPrice"]',
    "selectSize" : '[data-testid="sizeFlyoutOpener"]',

    //cart
    "addToCart" : '[data-testid="addToBasketButton"]',
    "goToBasket" : '[data-testid="goToBasketButton"]',
    "deleteProduct": '[data-testid="delete"]',
    "basketTotalPrice": '[data-testid="basketTotalsTotalPrice"]',
    "selectNumberOfItems": '[data-testid="basketProduct-48685333"] select',
    "removeProductFromBasket": '[data-testid="delete"]',
    "confirmRemoveProduct": '[data-testid="confirm_delete"]'
    
}
class AboutYouPage {

    accessRegistrationLoginPage(){

        cy.get(AboutYouLocators.headerMenu).click();
        cy.get(AboutYouLocators.userNav).click();
    }

    search(item){
        
        cy.get(AboutYouLocators.searchButon).click();
        cy.get(AboutYouLocators.searchInput)
            .clear()
            .type(item)
            .should('have.value', item)
            .type('{enter}');
    }

    selectSizeAndAddToCard() {
        
        cy.get(AboutYouLocators.selectSize).click();
        cy.get('[type="radio"]').last().check({force:true});
        cy.get(AboutYouLocators.addToCart).click();
        cy.contains('succes').should('be.visible');
    }
}    
export { AboutYouLocators , AboutYouPage };