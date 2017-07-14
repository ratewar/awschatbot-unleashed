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
    console.log(`Hello Brother here is sessionAttributes ${sessionAttributes}`);
	  const validationResult = validator.validateCarDetails(sessionAttributes,
                                                            carBrandName,
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
        
        var options = buildOptions(validationResult.violatedSlot,intentRequest.currentIntent.slots);
        var responseCard = buildResponseCard(validationResult.responseCardTitle,
                                             validationResult.responseCarSubtitle,
                                              options);
        var outputSessionAttributes = 
               createSessionAtributes(validationResult.violatedSlot,validationResult.violatedSlotOriginalValue);
      
        //console.log(`I have Output Session Attributes ${JSON.stringify(outputSessionAttributes)}`);
        slots[`${validationResult.violatedSlot}`] = null;
        var response = lexResponses.elicitSlot(outputSessionAttributes,
                                                intentRequest.currentIntent.name,
                                                slots,
                                                validationResult.violatedSlot,
                                                validationResult.message,
                                                responseCard);
        var strResponse = JSON.stringify(response);
        console.log(strResponse);
        return Promise.resolve(response); 
    }
    else
    { 
      var isSessionAttributesEmpty = _.isEmpty(sessionAttributes);
      console.log(`Session Attributes is empty check ${isSessionAttributesEmpty}`);
      if(!isSessionAttributesEmpty)
      {
        intentRequest.currentIntent.slots[`${sessionAttributes.vliolatedSlot}`] =  `${sessionAttributes.violatedSlotOriginalValue}`;
        intentRequest.sessionAttributes = {};
      }
      console.log('before checking car Kilometre driven 987987979797');
      return Promise.resolve(lexResponses.delegate(intentRequest.sessionAttributes,
											                             intentRequest.currentIntent.slots));
    } 
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
function buildOptions(violatedSlot, allSlots) {
      if (violatedSlot === 'CarBrandName') {
          return [
              { text: `Yes, Continue with the ${allSlots.CarBrandName}`, value: 'Y' },
          ];
      } else if (violatedSlot === 'CarModel') {
          // Return the next five weekdays.
          const options = [];
          return options;
      } else if (violatedSlot === 'CarYearOfMake') {
        const options = [];
        return options;
      }
      else if (violatedSlot === 'CarVariant') {
        const options = [];
        return options;
      }
      else if (violatedSlot === 'CarKmDriven') {
        return [
            { text: '5000 - 12000', value: '5000 - 12000'},
            { text: '12001 - 18000', value: '12001 - 18000'},
            { text: '18001 - 24000', value: '18001 - 24000'},
            { text: '24001 - 32000', value: '24001 - 32000'},
            { text: '32001 - 40000', value: '32001 - 40000'},
        ];
      }
      else if (violatedSlot === 'CarColor') {
        const options = [];
        const potentialDate = new Date();
        return options;
      }
      else if (violatedSlot === 'NumberOfOwners') {
        const options = [];
        const potentialDate = new Date();
        return options;
      }
      else if (violatedSlot === 'CarCity') {
        const options = [];
        const potentialDate = new Date();
        return options;
      }
      else if (violatedSlot === 'ShortDescription') {
        const options = [];
        const potentialDate = new Date();
        return options;
      }
 }
function createSessionAtributes(violatedSlot,violatedSlotOriginalValue) {
  const outputSessionAttributes = {};
  outputSessionAttributes.vliolatedSlot = violatedSlot;
  outputSessionAttributes.violatedSlotOriginalValue = violatedSlotOriginalValue;
  return outputSessionAttributes;
}
