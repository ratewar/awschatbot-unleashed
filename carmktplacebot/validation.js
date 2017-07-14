'use strict';

module.exports.validateCarDetails = function (sessionAttributes,
                                                carBrandName,
                                                carModel,
                                                carYearOfMake,
                                                carVariant,
                                                carKmDriven,
                                                carColor,
                                                numberOfOwners,
                                                carCity,
                                                shortDescription) {
     const carBrandNames = ['nissan', 'ford', 'jaguar', 'fiat', 'general motors', 'mahindra', 'bentley','bmw','mitsubishi','mazda','bugatti','buick','jeep','renault','datsun','acura','aston martin','maruti suzuki','tata','maruti','hyundai','isuzu','suzuki','honda','alfa romeo','audi','mercedes-benz','mercedes', 'mercedes benz'];
     if(carBrandName)
     {
        console.log('Response from user is ' + carBrandName);
        console.log(`sessionAttributes are ${sessionAttributes}`);
        if(sessionAttributes != null && sessionAttributes.vliolatedSlot != null &&  sessionAttributes.vliolatedSlot === 'CarBrandName' && 
            (carBrandName.toLowerCase() ==='y' || carBrandName.toLowerCase() ==='yes')) {
          
            return buildValidationResult(true,null,null, null,null, null);
        }
        var isCarBrandCarValid = carBrandNames.includes(carBrandName.toLowerCase());
        if(!isCarBrandCarValid)
        {
          return buildValidationResult(false,
                                        'CarBrandName',
                                        carBrandName,         
                                        `${carBrandName} is not in our brand list. Do you still want me to continue?`,
                                         'Specify Car Brand Name',
                                         'In case you me to continue let me know');
        }
     }
     if(carYearOfMake)
     {
         var text = /^[0-9]+$/;
         if ((carYearOfMake != "") && (!text.test(carYearOfMake)))
         {
          return buildValidationResult(false,
                                        'CarYearOfMake',
                                        carYearOfMake,
                                        `${carYearOfMake} is not a valid year, would you mind entering a valid year. It must be like YYYY e.g. 2012`,
                                        null,
                                        null);
        }
        if (carYearOfMake.length != 4)
        {
          return buildValidationResult(false,
                                          'CarYearOfMake',
                                          carYearOfMake
                                          `${carYearOfMake} is not a valid year, would you mind entering a valid year. It must be like YYYY e.g. 2012`,
                                          null,
                                          null);
        }
        var current_year = new Date().getFullYear();
        if((carYearOfMake < 2000) || (carYearOfMake > current_year))
        {
          return buildValidationResult(false, 'CarYearOfMake', carYearOfMake,`invalid Year`,null,null);
        }
      }
       return buildValidationResult(true, null, null,null,null);
  }
function buildValidationResult(isValid, violatedSlot, violatedSlotOriginalValue,messageContent, responseCardTitle, responseCarSubtitle) {
  if (messageContent == null) {
    return {
      isValid,
      violatedSlot,
      violatedSlotOriginalValue,
      responseCardTitle,
      responseCarSubtitle
    };
  }
  return {
    isValid,
    violatedSlot,
    violatedSlotOriginalValue,
    message: { contentType: 'PlainText', content: messageContent },
    responseCardTitle,
    responseCarSubtitle
  };
};