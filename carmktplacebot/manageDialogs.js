'use strict';
const lexResponses = require('./lexResponses');
const databaseManager = require('../databaseManager');
const _ = require('lodash');

var types = ['Hello','Jkm'];

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
  	var userId = intentRequest.userId;
  	const slots = intentRequest.currentIntent.slots;
    var sessionAttributes = intentRequest.sessionAttributes;

	  const validationResult = validateCarDetails(sessionAttributes,carBrandName,carModel,carYearOfMake,carVariant,
                                                carKmDriven,carColor,numberOfOwners,carCity,shortDescription);
    if (!validationResult.isValid)
    {
        slots[`${validationResult.violatedSlot}`] = null;
        var options = buildOptions(validationResult.violatedSlot,
                                    carBrandName,carModel,carYearOfMake,carVariant,
                                    carKmDriven,carColor,numberOfOwners,carCity,shortDescription);
        var responseCard = buildResponseCard(`Specify ${validationResult.violatedSlot}`,
                                                  validationResult.message.content,
                                                  options);
        var outputSessionAttributes = createSessionAtributes(validationResult.violatedSlot,
                                                      carBrandName,carModel,carYearOfMake,carVariant,
                                                      carKmDriven,carColor,numberOfOwners,carCity,shortDescription);

        console.log(`I have Output Session Attributes ${JSON.stringify(outputSessionAttributes)}`);
        var response = lexResponses.elicitSlot(outputSessionAttributes,intentRequest.currentIntent.name,
                                                    slots,validationResult.violatedSlot,validationResult.message,
                                                    responseCard);
        var strResponse = JSON.stringify(response);
        console.log(strResponse);
      	return Promise.resolve(response);
    }
    console.log('before checking car Kilometre driven 987987979797 00000000000');
    var delegateResponse = lexResponses.delegate(intentRequest.sessionAttributes,intentRequest.currentIntent.slots);
    return Promise.resolve(delegateResponse);
};
function validateCarDetails(sessionAttributes,carBrandName,carModel,carYearOfMake,carVariant,carKmDriven,carColor,numberOfOwners,carCity,shortDescription)
{
     const carBrandNames = ['Nissan', 'Ford', 'Jaguar', 'Fiat', 'General Motors', 'Mahindra', 'Bentley','BMW','Mitsubishi','Mazda','Bugatti','Buick','Jeep','Renault','Datsun','Acura','Aston Martin','Maruti Suzuki','Tata','Maruti','Hyundai','Isuzu','Suzuki','Honda','Alfa Romeo','Audi','Mercedes-Benz','Mercedes'];
     if(carBrandName)
     {
        var isCarBrandCarValid = carBrandNames.includes(carBrandName);
        if(!isCarBrandCarValid)
        {
          return buildValidationResult(false,'CarBrandName',`${carBrandName} is not in our brand list. Do you still want me to continue?`);
        }
     }
	   if(carYearOfMake)
     {
		     var text = /^[0-9]+$/;
		     if ((carYearOfMake != "") && (!text.test(carYearOfMake)))
         {
          return buildValidationResult(false,
                                        'CarYearOfMake',
                                        `${carYearOfMake} is not a valid year, would you mind entering a valid year. It must be like YYYY e.g. 2012`);
       	}
        if (carYearOfMake.length != 4)
        {
          return buildValidationResult(false,
                                          'CarYearOfMake',
                                          `${carYearOfMake} is not a valid year, would you mind entering a valid year. It must be like YYYY e.g. 2012`);
        }
        var current_year = new Date().getFullYear();
        if((carYearOfMake < 2000) || (carYearOfMake > current_year))
        {
          return buildValidationResult(false, 'CarYearOfMake', `invalid Year`);
        }
      }
	     return buildValidationResult(true, null, null);
  }
  function buildValidationResult(isValid, violatedSlot, messageContent) {
    return {
        isValid,
        violatedSlot,
        message: { contentType: 'PlainText', content: messageContent },
    };
  }

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
function buildOptions(slot, appointmentType, date, bookingMap) {
      if (slot === 'CarBrandName') {
          return [
              { text: 'Yes, Continue', value: 'Y' },
          ];
      } else if (slot === 'CarModel') {
          // Return the next five weekdays.
          const options = [];
          return options;
      } else if (slot === 'CarYearOfMake') {
        const options = [];
        return options;
      }
      else if (slot === 'CarVariant') {
        const options = [];
        return options;
      }
      else if (slot === 'CarKmDriven') {
        return [
            { text: '5000 - 12000', value: '5000 - 12000'},
            { text: '12001 - 18000', value: '12001 - 18000'},
            { text: '18001 - 24000', value: '18001 - 24000'},
            { text: '24001 - 32000', value: '24001 - 32000'},
            { text: '32001 - 40000', value: '32001 - 40000'},
        ];
      }
      else if (slot === 'CarColor') {
        const options = [];
        const potentialDate = new Date();
        return options;
      }
      else if (slot === 'NumberOfOwners') {
        const options = [];
        const potentialDate = new Date();
        return options;
      }
      else if (slot === 'CarCity') {
        const options = [];
        const potentialDate = new Date();
        return options;
      }
      else if (slot === 'ShortDescription') {
        const options = [];
        const potentialDate = new Date();
        return options;
      }
  }
function createSessionAtributes(violatedSlot,carBrandName,carModel,carYearOfMake,carVariant,
                                carKmDriven,carColor,numberOfOwners,carCity,shortDescription) {
  const outputSessionAttributes = {};
  outputSessionAttributes.vliolatedSlot = violatedSlot;
  if(violatedSlot === 'CarBrandName')
  {
    outputSessionAttributes.carBrandName = carBrandName;
  }
  return outputSessionAttributes;
}
