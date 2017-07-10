'use strict';
const lexResponses = require('./lexResponses');
const databaseManager = require('../databaseManager');

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
	const source = intentRequest.invocationSource;

  console.log(`CarBrandName is ${carBrandName}`);
  console.log(`CarModel is ${carModel}`);
  console.log(`CarYearOfMake is ${carYearOfMake}`);
  console.log(`CarVariant is ${carVariant}`);
  console.log(`CarKmDriven is ${carKmDriven}`);
  console.log(`CarColor is ${carColor}`);
  console.log(`NumberOfOwners is ${numberOfOwners}`);
  console.log(`CarCity is ${carCity}`);
  console.log(`ShortDescription is ${shortDescription}`);
    
	var userId = intentRequest.userId;
	const slots = intentRequest.currentIntent.slots;
	
	const validationResult = validateCarDetails(carBrandName, 
                        												carModel,
                        												carYearOfMake,
                        												carVariant,
                        												carKmDriven,
                        												carColor,
                        												numberOfOwners,
                        												carCity,
                        												shortDescription);
    if (!validationResult.isValid) {
        console.log(`Violated Slot is ${validationResult.violatedSlot}`);
        console.log(`Violated message is ${validationResult.message}`);
      	slots[`${validationResult.violatedSlot}`] = null;
      	return Promise.resolve(lexResponses.elicitSlot(intentRequest.sessionAttributes, 
      													                       intentRequest.currentIntent.name, 
      													                       slots, 
      													                       validationResult.violatedSlot, 
      													                       validationResult.message));
    }
    return Promise.resolve(lexResponses.delegate(intentRequest.sessionAttributes, 
    												                      intentRequest.currentIntent.slots));
};
function validateCarDetails(carBrandName, 
              							carModel,
              							carYearOfMake,
              							carVariant,
              							carKmDriven,
              							carColor,
              							numberOfOwners,
              							carCity,
              							shortDescription) {
	if(carYearOfMake){
		var text = /^[0-9]+$/;
		if ((carYearOfMake != "") && (!text.test(carYearOfMake))) {
            return buildValidationResult(false, 'CarYearOfMake', `${carYearOfMake} is not a valid year, would you mind entering a valid year. It must be like YYYY e.g. 2012`);
       	}
        if (carYearOfMake.length != 4) {
            return buildValidationResult(false, 'CarYearOfMake', `${carYearOfMake} is not a valid year, would you mind entering a valid year. It must be like YYYY e.g. 2012`);
        }
        var current_year = new Date().getFullYear();
        if((carYearOfMake < 2000) || (carYearOfMake > current_year)) {
        	return buildValidationResult(false, 'CarYearOfMake', `Year should be in range 2000 to current year as Market Place does not respond well in terms of bid for cars made before year 2000`);
        }
   }
	return buildValidationResult(true, null, null);
}
function buildValidationResult(isValid, violatedSlot, messageContent) {
  if (messageContent == null) {
    return {
      isValid,
      violatedSlot
    };
  }
  return {
    isValid,
    violatedSlot,
    message: { contentType: 'PlainText', content: messageContent }
  };
}