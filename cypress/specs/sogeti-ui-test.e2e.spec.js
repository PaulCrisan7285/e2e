import { locators, LocatorsPage } from "./locators";

const locatorsPage = new LocatorsPage();

const firstName = cy.faker.name.firstName();
const lastName = cy.faker.name.lastName();
const email = cy.faker.internet.email();
const company = cy.faker.company.companyName();
const phoneNumber = cy.faker.phone.phoneNumber();
const messageText = cy.faker.lorem.text();

describe('Sogeti UI Automation Task', function () {

    beforeEach(function () {
        
        cy.visit('/');
    });

    it('UI test 1', () => {
        
        //access automation page by hovering on Services and clicking on automation
        locatorsPage.accessAutomationPage();
        cy.url().should('contain', 'automation');
        cy.contains('AUTOMATION').should('be.visible');
        
        //hover over servises and check that Services and Automation are selected/expanded
        cy.get(locators.servicesButton).trigger('mouseover');
        cy.get(locators.servicesButton).invoke('attr', 'class')
                                       .should('include', 'expanded');
    
        cy.get(locators.servicesList).filter(':contains("Automation")')
                                     .parent()
                                     .invoke('attr', 'class')
                                     .should('include', 'expanded');
    });

    it('UI test 2', () => {

        //access automation page
        locatorsPage.accessAutomationPage();
        
        //scroll down the page
        cy.contains('Contact us').scrollIntoView();
        
        //complete form
        cy.get(locators.firstNameInput).type(firstName, {force:true}).blur();
        cy.get(locators.lastNameInput).type(lastName, {force:true}).blur();
        cy.get(locators.emailInput).type(email, {force:true}).blur();
        cy.get(locators.companyInput).type(company, {force:true}).blur();
        cy.get(locators.phoneInput).type(phoneNumber, {force:true}).blur();
        cy.get(locators.countrySelect).select('Romania', {force:true});
        cy.get(locators.messageTextarea).type(messageText, {force:true}).blur();
        cy.get(locators.agreeCheckbox).check({force:true})
        //captcha has to be completed manually since is prod env
        cy.confirmCaptcha();
        //submit form
        cy.get('[data-f-type="form"]').submit();
        
        //check that the form is submitted
        //cy.contains('Thank you for contacting us.').should('be.visible');
    })

    it('UI test 3', () => {
        
        cy.get(locators.worldWideButton).click();
       
        //check that each link is live by making a request 
        cy.get(locators.countries).each(countryPage => {
            cy.request(countryPage.prop('href'))
        });
    });

});