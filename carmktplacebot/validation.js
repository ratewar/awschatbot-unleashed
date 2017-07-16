'use strict';
const _ = require('lodash');
const isNumeric = require('isnumeric');
var validator = require('validator');
module.exports.validateCarDetails = function (carBrandName,
                                                carModel,
                                                carYearOfMake,
                                                carVariant,
                                                carKmDriven,
                                                carColor,
                                                numberOfOwners,
                                                carCity,
                                                shortDescription,
                                                numberofDays,
                                                emailAddress) {
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
      if(carKmDriven)
      {
         console.log(`Inside Car Km Driven validation with value ${carKmDriven}`); 
         const carKmDrivenValues = ['less than 12000','12001 - 18000','18001 - 24000','24001 - 32000','32001 - 40000']; 
         var isCarKmDrivenValid = carKmDrivenValues.includes(carKmDriven.toLowerCase());
         console.log('Car Km Driven is not in Array values');
         if(!isCarKmDrivenValid)
         {
            console.log('checking if CarKmDriven is Numeric');
            var isNumericFlag = isNumeric(carKmDriven);
            console.log(`Car Km Driven is Numeric ${isNumericFlag}`);
            if(isNumericFlag)
            {
                console.log('Car Km Driven is number now checking if it is less than 0');
                if(carKmDriven <= 0)
                {
                  console.log(`Since Car Km Driven value is less than 0 : ${carKmDriven} hence creating False Validation Result`);
                  return buildValidationResult(false, 
                                        'CarKmDriven',
                                        `I cannot take ${carKmDriven} as Car Kms Driven figure.\n Specify Car Kms Driven either by choosing one of the options below or mention exact Kms figure`,
                                        'Specify Car Km Driven',
                                        'Choose one of the options or mention exact figure',
                                        true);
                }
            }
            else
            {
              console.log('Car Km Driven is not a numeic hence creating false validation result');
              return buildValidationResult(false, 
                                        'CarKmDriven',
                                        `I cannot take ${carKmDriven} as Car Kms Driven figure.\n Specify Car Kms Driven either by choosing one of the options below or mention exact Kms figure`,
                                        'Specify Car Km Driven',
                                        'Choose one of the options or mention exact figure',
                                        true);
            }
         }
      }
      if(numberOfOwners)
      {
         console.log(`inside validation check for Number of Owners ${numberOfOwners}`);
         var isNumericFlag = isNumeric(numberOfOwners); 
         console.log(`value of numberOfOwners is ${isNumericFlag}`);
         if(!isNumericFlag)
         {
              console.log('since number of owners is not numeric hence created a False Validation Result');
              return buildValidationResult(false, 
                                          'NumberOfOwners',
                                          `Number of Owners has to be one of the values mentioned below or specify a number in the message box below`,
                                          'Specify Car Number of Owners',
                                          'Choose one of the options or mention number in the message box below',
                                          true);      
         }
         else
         {
            
            var isNumberOfOwnersValid = numberOfOwners > 0  && numberOfOwners <= 5; 
            console.log(`Value of isNumberOfOwnersValid ${isNumberOfOwnersValid}`);
            if(!isNumberOfOwnersValid)
            {
                console.log('Since Number of Owners is not within array hence creating false validation error');
                return buildValidationResult(false, 
                                          'NumberOfOwners',
                                          `Number of Owners has to be one of the values mentioned below or specify a number in the message box below`,
                                          'Specify Car Number of Owners',
                                          'Choose one of the options or mention number in the message box below',
                                          true);          
            }
         }
      }
      if(numberofDays)
      {
          console.log(`inside validation check for Auction Expire Days ${numberofDays}`);
          var isAuctionExpireFlag = isNumeric(numberofDays); 
          console.log(`value of isAuctionExpireFlag is ${isAuctionExpireFlag}`);
          if(!isAuctionExpireFlag)
          {
              console.log('since Number of Days is not numeric hence created a False Validation Result');
              return buildValidationResult(false, 
                                          'NumberOfDays',
                                          'Days for Auction Expire has to be one of the values mentioned below',
                                          'Specify Days for Auction Expire',
                                          'Choose one of the options below',
                                          true);      
          }
          if(numberofDays < 3  || numberofDays > 5)
          {
                console.log('Since Number of Days is not within array hence creating false validation error' + numberofDays);
                return buildValidationResult(false, 
                                          'NumberOfDays',
                                          'Days for Auction Expire has to be one of the values mentioned below',
                                          'Specify Days for Auction Expire',
                                          'Choose one of the options below',
                                          true);      
          }         
      }
      if(emailAddress)
      {
          emailAddress = emailAddress.substring(emailAddress.indexOf("|") + 1);
          console.log(`inside validation check for Email Address ${emailAddress}`);
          var isValidEmailId = validator.isEmail(emailAddress); 
          console.log(`value of isValidEmailId is ${isValidEmailId}`);
          if(!isValidEmailId)
          {
              console.log('since Email Address is not valid hence created a False Validation Result');
              return buildValidationResult(false, 
                                          'EmailAddress',
                                          'Please check your Email Address again',
                                          null,
                                          null,
                                          false);      
          }
      }
      return buildValidationResult(true, null, null,null,null,null);
}
function buildValidationResult(isValid, violatedSlot, messageContent, 
                                responseCardTitle, responseCarSubtitle,isResponseCardRequired)
{
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