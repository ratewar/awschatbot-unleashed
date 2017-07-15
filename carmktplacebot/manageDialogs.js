'use strict';
const lexResponses = require('./lexResponses');
const validator = require('./validation');
const databaseManager = require('../databaseManager');
const _ = require('lodash');

module.exports = function(intentRequest) {
   	const carBrandName = intentRequest.currentIntent.slots.CarBrandName;
  	const carModel = intentRequest.currentIntent.slots.CarModel;
  	const carYearOfMake = intentRequest.currentIntent.slots.CarYearOfMake;
  	const carVariant = intentRequest.currentIntent.slots.CarVariant;
  	const carKmDriven = intentRequest.currentIntent.slots.CarKmDriven;
  	const carColor = intentRequest.currentIntent.slots.CarColor;
  	const numberOfOwners = intentRequest.currentIntent.slots.NumberOfOwners;
  	const carCity = intentRequest.currentIntent.slots.CarCity;
  	const shortDescription = intentRequest.currentIntent.slots.ShortDescription;
    console.log(` carBrandName ${carBrandName}`);
    console.log(` carModel ${carModel}`);
    console.log(` carYearOfMake ${carYearOfMake}`);
    console.log(` carVariant ${carVariant}`);
    console.log(` carKmDriven ${carKmDriven}`);
    console.log(` carColor ${carColor}`);
    console.log(` numberOfOwners ${numberOfOwners}`);
    console.log(` carCity ${carCity}`);
    console.log(` shortDescription ${shortDescription}`);
    

  	const source = intentRequest.invocationSource;
  	var userId = intentRequest.userId;
  	const slots = intentRequest.currentIntent.slots;
    var sessionAttributes = intentRequest.sessionAttributes;
    
	  const validationResult = validator.validateCarDetails(carBrandName,
                                                          carModel,
                                                          carYearOfMake,
                                                          carVariant,
                                                          carKmDriven,
                                                          carColor,
                                                          numberOfOwners,
                                                          carCity,
                                                          shortDescription);
    console.log(`validationResult.isValid value is ${validationResult.isValid} and violatedSlot is ${validationResult.violatedSlot}`);
    if (!validationResult.isValid)
    {
      /*
      * this block below is checking if session attribute is non empty and contains violated slot which is 
      * same as the slot which has again violated in validation then close the conversation as user
      * does not have a valid input for the slot.
      */
      console.log(`Session Attributes is : ${sessionAttributes}`);  
      var isSessionAttributeEmpty = _.isEmpty(sessionAttributes);
      console.log(`Session Attribute Empty check is ${isSessionAttributeEmpty}`);
      if(!isSessionAttributeEmpty)
      {
           console.log(`sessionAttributes Violated Slot is ${sessionAttributes.violatedSlot}`) ;
           if(sessionAttributes.violatedSlot === validationResult.violatedSlot)
           {
              var fulfilmentResponse = buildFulfilmentResult('Fulfilled', 'I wish I could help you but unfortunately with provided details, I will not be able to proceed any further. \n Thank you for your visit and Have a Great Day!');
              intentRequest.sessionAttributes = {};
              return Promise.resolve(lexResponses.close(intentRequest.sessionAttributes, 
                                                        fulfilmentResponse.fullfilmentState, 
                                                        fulfilmentResponse.message));
           }
      }
      var responseCard;
      if(validationResult.isResponseCardRequired)
      {
        var options = buildOptions(validationResult.violatedSlot);
        responseCard = buildResponseCard(validationResult.responseCardTitle,
                                             validationResult.responseCarSubtitle,
                                              options);
      }  
      slots[`${validationResult.violatedSlot}`] = null;
      sessionAttributes = {};
      sessionAttributes.violatedSlot = validationResult.violatedSlot;
      var response = lexResponses.elicitSlot(sessionAttributes,
                                              intentRequest.currentIntent.name,
                                              slots,
                                              validationResult.violatedSlot,
                                              validationResult.message,
                                              responseCard);
      var strResponse = JSON.stringify(response);
      console.log(strResponse);
      return Promise.resolve(response); 
    }
    console.log('right outside the car km driven elicit slot construct');
    if(carBrandName !== null && carModel !== null && carYearOfMake !== null && carVariant !== null && carKmDriven === null)
    {
        sessionAttributes = {};
        console.log('inside Car Km Driven Elicit Slot construct');
        var options = buildOptions('CarKmDriven');
        responseCard = buildResponseCard('Specify Car Km Driven',
                                         'Choose one of the options or mention exact figure',
                                         options);
        var message = { contentType: 'PlainText', content: 'Please mention number of Kms Car has been Driven so far \n choose one of the options or mention Km Driven figure e.g. 45677' };
        var response = lexResponses.elicitSlot(sessionAttributes,
                                              intentRequest.currentIntent.name,
                                              slots,
                                              'CarKmDriven',
                                              message,
                                              responseCard);
        var strResponse = JSON.stringify(response);
        console.log(strResponse);
        return Promise.resolve(response); 
    }  
    console.log('before checking car Kilometre driven 987987979797');
    return Promise.resolve(lexResponses.delegate(intentRequest.sessionAttributes,
											                             intentRequest.currentIntent.slots));
};
// Build a responseCard with a title, subtitle, and an optional set of options which should be displayed as buttons.
function buildResponseCard (title, subTitle, options)
 {
     let buttons = null;
     if (options != null && options.length > 0)
     {
         buttons = [];
         for (let i = 0; i < Math.min(5, options.length); i++) {
             buttons.push(options[i]);
         }
     }
     return {
         contentType: 'application/vnd.amazonaws.card.generic',
         version: 1,
         genericAttachments: [{
             title,
             subTitle,
             buttons,
         }],
     };
 }
// Build a list of potential options for a given slot, to be used in responseCard generation.
function buildOptions(forSlot) {
    if (forSlot === 'CarKmDriven') {
      return [
          { text: 'Less than 12000', value: 'Less than 12000'},
          { text: '12001 - 18000', value: '12001 - 18000'},
          { text: '18001 - 24000', value: '18001 - 24000'},
          { text: '24001 - 32000', value: '24001 - 32000'},
          { text: '32001 - 40000', value: '32001 - 40000'},
      ];
    }
 }
function createSessionAtributes(violatedSlot,violatedSlotOriginalValue) {
  const outputSessionAttributes = {};
  outputSessionAttributes.vliolatedSlot = violatedSlot;
  outputSessionAttributes.violatedSlotOriginalValue = violatedSlotOriginalValue;
  return outputSessionAttributes;
}
function buildFulfilmentResult(fullfilmentState, messageContent) {
  return {
    fullfilmentState,
    message: { contentType: 'PlainText', content: messageContent }
  };
}
