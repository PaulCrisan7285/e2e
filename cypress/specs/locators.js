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

    //search
    "searchInput" : 'form div input',
    "searchedProduct1" : '[data-testid="productTile_7594803"]',
    "finalPrice" : '[data-testid="finalPrice"]',
    "selectSize" : '[data-testid="sizeFlyoutOpener"]',

    //cart
    "addToCart" : '[data-testid="addToBasketButton"]',
    "goToBasket" : '[data-testid="goToBasketButton"]',
    "deleteProduct": '[data-testid="delete"]',

    
}
class AboutYouPage {

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