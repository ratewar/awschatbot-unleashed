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
     const carBrandNames = ['Nissan', 'Ford', 'Jaguar', 'Fiat', 'General Motors', 'Mahindra', 'Bentley','BMW','Mitsubishi','Mazda','Bugatti','Buick','Jeep','Renault','Datsun','Acura','Aston Martin','Maruti Suzuki','Tata','Maruti','Hyundai','Isuzu','Suzuki','Honda','Alfa Romeo','Audi','Mercedes-Benz','Mercedes'];
     if(carBrandName)
     {
        console.log('Response from user is ' + carBrandName);
        if(sessionAttributes != null && sessionAttributes.CarBrandName != null && carBrandName !=='Y')
        {
            var isCarBrandCarValid = carBrandNames.includes(carBrandName);
            if(!isCarBrandCarValid)
            {
              return buildValidationResult(false,
                                            'CarBrandName',
                                            `${carBrandName} is not in our brand list. Do you still want me to continue?`,
                                            'Specify Car Brand Name',
                                            'In case you me to continue let me know');
            }
        }   
        else
        {
           var isCarBrandCarValid = carBrandNames.includes(carBrandName);
            if(!isCarBrandCarValid)
            {
              return buildValidationResult(false,
                                            'CarBrandName',
                                            `${carBrandName} is not in our brand list. Do you still want me to continue?`,
                                             'Specify Car Brand Name',
                                             'In case you me to continue let me know');
            }
        } 
     }
     if(carYearOfMake)
     {
         var text = /^[0-9]+$/;
         if ((carYearOfMake != "") && (!text.test(carYearOfMake)))
         {
          return buildValidationResult(false,
                                        'CarYearOfMake',
                                        `${carYearOfMake} is not a valid year, would you mind entering a valid year. It must be like YYYY e.g. 2012`,
                                        null,
                                        null);
        }
        if (carYearOfMake.length != 4)
        {
          return buildValidationResult(false,
                                          'CarYearOfMake',
                                          `${carYearOfMake} is not a valid year, would you mind entering a valid year. It must be like YYYY e.g. 2012`,
                                          null,
                                          null);
        }
        var current_year = new Date().getFullYear();
        if((carYearOfMake < 2000) || (carYearOfMake > current_year))
        {
          return buildValidationResult(false, 'CarYearOfMake', `invalid Year`,null,null);
        }
      }
       return buildValidationResult(true, null, null);
  }
function buildValidationResult(isValid, violatedSlot, messageContent, responseCardTitle, responseCarSubtitle) {
  if (messageContent == null) {
    return {
      isValid,
      violatedSlot,
      responseCardTitle,
      responseCarSubtitle
    };
  }
  return {
    isValid,
    violatedSlot,
    message: { contentType: 'PlainText', content: messageContent },
    responseCardTitle,
      responseCarSubtitle
  };
};