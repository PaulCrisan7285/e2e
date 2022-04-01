const locators = {
    
    "worldWideButton" : '[aria-label="Worldwide"]',
    "countries" : '[id="country-list-id"] a',
    "servicesButton" : 'li[data-levelname="level2"]',
    "servicesList" : '[data-levelname="level2"] li a',
    "firstNameInput" : '[name="__field_123927"]',
    "lastNameInput" : '[name="__field_123938"]',
    "emailInput" : '[name="__field_123928"]',
    "phoneInput" : '[name="__field_123929"]',
    "companyInput" : '[name="__field_132738"]',
    "countrySelect" : '[name="__field_132596"]',
    "messageTextarea" : '[name="__field_123931"]',
    "agreeCheckbox" : '[id="__field_1239350"]',
    "submitButton" : '[name="submit"]'
}
class LocatorsPage {

    accessAutomationPage(){

        cy.get(locators.servicesButton).trigger('mouseover');
        cy.get(locators.servicesList).filter(':contains("Automation")').click();
    }
}    
export { locators , LocatorsPage };