
import {TestLocators} from "./locators";

const faker = require("faker");
const firstName = faker.name.firstName();
const lastName = faker.name.lastName();
const fileForUpload = 'valid_jpeg_file.jpeg';
const date = faker.random.number({
    'min': 19700101,
    'max': 20210314
});

describe('Test specs', function () {
	before(function () {cy.faker = require('faker');
		cy.visit('https://form.jotform.com/210137027408345');
	});

    it('Start Page', function(){

        //cy.contains('Test Form').should('be.visible');
        cy.get(TestLocators.nextButton).click();
    }); 

    it('Name Page', function () {

        cy.get(TestLocators.firstNameInput).type(firstName).blur();
        cy.get(TestLocators.firstNameInput).invoke('val').then((val) => {
			expect(val.trim()).equal(firstName);
		});
        cy.get(TestLocators.lastNameInput).type(lastName).blur();
        cy.get(TestLocators.lastNameInput).invoke('val').then((val) => {
			expect(val.trim()).equal(lastName);
		});
        cy.get(TestLocators.firstPageNextButton).click();
    });
       
    it('Upload Page', function(){
        
        cy.get(TestLocators.uploadFile).attachFile(fileForUpload, { subjectType: 'drag-n-drop' });
        cy.contains(fileForUpload).should('be.visible');
        cy.get(TestLocators.secondPageNextButton).click();
    
    });

    it('Signature Page', function(){
        
        cy.get(TestLocators.signatureInput).click();
        //check that the signature was added
        cy.get('[data-component="signature"] input').invoke('val').then((val) => {
			expect(val).to.contain('data:image/png');
		});
        cy.get(TestLocators.thirdPageNextButton).click();
    });
    
    it('Date page', function(){
        
        //cy.get(TestLocators.dateInput).type(date);
        //cy.get(TestLocators.forthPageNextButton).click();
        cy.get(TestLocators.datePickerButton).click();
        cy.get(TestLocators.todayButton).click();
        cy.get(TestLocators.forthPageNextButton).click();
    });

    it('Security Question page', function(){
        
        cy.get(TestLocators.securityQuestionDropdown).first().select('Name of the first pet', {force:true});
        cy.get(TestLocators.answerInput).type(firstName);
        cy.get(TestLocators.submitButton).click();
        cy.contains('Thank You').should('be.visible');
    });
	
});