'use strict';
const _ = require('lodash');
module.exports.validateCarDetails = function (carBrandName,
                                                carModel,
                                                carYearOfMake,
                                                carVariant,
                                                carKmDriven,
                                                carColor,
                                                numberOfOwners,
                                                carCity,
                                                shortDescription) {
     const carBrandNames = ['nissan', 'ford', 'jaguar', 'fiat', 'general motors', 'mahindra', 'bentley','bmw','mitsubishi','mazda','bugatti','buick','jeep','renault','datsun','acura','aston martin','maruti suzuki','tata','hyundai','isuzu','suzuki','honda','alfa romeo','audi','mercedes-benz','toyota'];
     if(carBrandName)
     {
     
        var isCarBrandCarValid = carBrandNames.includes(carBrandName.toLowerCase());
        if(!isCarBrandCarValid)
        {
              var concatString = '\n';
              var counter = 1;
              _.forEach(carBrandNames, function(value) {
                  console.log(value);
                  var tempCarBrand = counter + '.  ' + _.startCase(_.toLower(value));
                  concatString += tempCarBrand;
                  concatString += '\n';
                  counter++;
              });
              carBrandName = _.startCase(_.toLower(carBrandName));
              return buildValidationResult(false,
                                           'CarBrandName',
                                           `Kindly note ${carBrandName} is not in our list. pls check if your Car Brand exist in the list below as we only deal in the following Car Brands ${concatString}`,
                                           null,
                                           null,
                                           false);
        }
     }
     if(carYearOfMake)
     {
         var text = /^[0-9]+$/;
         if (((carYearOfMake != "") && (!text.test(carYearOfMake))) || (carYearOfMake.length != 4))
         {
          return buildValidationResult(false,
                                      'CarYearOfMake',
                                      `Please check ${carYearOfMake} is not a valid year, Valid year must be like YYYY format e.g. 2012`,
                                      null,
                                      null,
                                      false);
        }
        var current_year = new Date().getFullYear();
        if(carYearOfMake > current_year)
        {
          return buildValidationResult(false, 
                                        'CarYearOfMake',
                                        `Please check seems you have mistakenly entered a future year ${carYearOfMake}, kindly provide the correct Year of Make`,
                                        null,
                                        null,
                                        false);
        }
        if(carYearOfMake < 2000)
        {
          return buildValidationResult(false, 
                                        'CarYearOfMake',
                                        `Dealer Market Place does not response well for Cars which has Year of Make earlier than 2000, pls check if the year entered was correct and then reenter`,
                                        null,
                                        null,
                                        false);
        }
      }
      return buildValidationResult(true, null, null,null,null,null);
  }
function buildValidationResult(isValid, violatedSlot, messageContent, responseCardTitle, responseCarSubtitle,isResponseCardRequired) {
  if (messageContent === null) {
    return {
      isValid,
      violatedSlot,
      responseCardTitle,
      responseCarSubtitle,
      isResponseCardRequired
    };
  }
  return {
    isValid,
    violatedSlot,
    message: { contentType: 'PlainText', content: messageContent },
    responseCardTitle,
    responseCarSubtitle,
    isResponseCardRequired
  };
};