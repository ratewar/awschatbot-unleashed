'use strict';
const lexResponses = require('./lexResponses');
const databaseManager = require('../databaseManager');
const _ = require('lodash');

var types = ['2000','3000','4000','5000'];

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
        console.log(`VAlidatieon Result is ${JSON.stringify(validationResult)}`);
        var response = lexResponses.elicitSlot(intentRequest.sessionAttributes,
                                                       intentRequest.currentIntent.name,
                                                       slots,
                                                       validationResult.violatedSlot,
                                                       validationResult.message,
                                                       validationResult.options.title,validationResult.options.buttons);
        var strResponse = JSON.stringify(response);
        console.log(strResponse);
      	return Promise.resolve(response);
    }
    console.log('before checking car Kilometre driven 987987979797');
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
            const options = getOptions('Select a coffee 1',types);
            console.log(JSON.stringify(options));
            return buildValidationResult(false, 'CarYearOfMake', `${carYearOfMake} is not a valid year, would you mind entering a valid year. It must be like YYYY e.g. 2012`,options);
       	}
        if (carYearOfMake.length != 4) {
            const options = getOptions('Select a coffee 1',types);
            console.log(JSON.stringify(options));
            return buildValidationResult(false, 'CarYearOfMake', `${carYearOfMake} is not a valid year, would you mind entering a valid year. It must be like YYYY e.g. 2012`,options);
        }
        var current_year = new Date().getFullYear();
        if((carYearOfMake < 2000) || (carYearOfMake > current_year)) {
          const options = getOptions('Select a coffee 1',types);
          console.log(JSON.stringify(options));
        	return buildValidationResult(false, 'CarYearOfMake', `Year should be in range 2000 to current year as Market Place does not respond well in terms of bid for cars made before year 2000`,options);
        }
   }
	return buildValidationResult(true, null, null);
}
function getButtons(options) {
  var buttons = [];
  _.forEach(options, option =>{
      buttons.push({
          text: option,
          value: option
      });  
  })
  return buttons;
}
function getOptions(title,types){
  return {
    title,
    buttons: getButtons(types)
  }
}
function buildValidationResult(isValid, violatedSlot, messageContent, options) {
  if (messageContent == null) {
    return {
      isValid,
      violatedSlot,
      options
    };
  }
  return {
    isValid,
    violatedSlot,
    message: { contentType: 'PlainText', content: messageContent },
    options
  };
}
