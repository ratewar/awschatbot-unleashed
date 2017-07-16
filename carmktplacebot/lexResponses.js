'use strict';
module.exports.elicitSlot = function(sessionAttributes, intentName, slots, slotToElicit, message, responseCard) {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'ElicitSlot',
            intentName,
            slots,
            slotToElicit,
            message,
            responseCard,
        },
    };
}

module.exports.confirmIntent = function(sessionAttributes, intentName, slots, message, responseCard) {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'ConfirmIntent',
            intentName,
            slots,
            message,
            responseCard,
        },
    };
}

//module.exports.close = function(sessionAttributes, fulfillmentState, message, responseCard) {
module.exports.close = function(sessionAttributes, fulfillmentState, message) {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'Close',
            fulfillmentState,
            message,
        },
    };
}
module.exports.delegate = function(sessionAttributes, slots) {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'Delegate',
            slots,
        },
    };
}
module.exports.buildFulfilmentResult = function(fullfilmentState, messageContent) {
  return {
    fullfilmentState,
    message: { contentType: 'PlainText', content: messageContent }
  };
}
// Build a responseCard with a title, subtitle, and an optional set of options which should be displayed as buttons.
module.exports.buildResponseCard  = function(title, subTitle, options)
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
module.exports.buildOptions = function(forSlot)
{
    console.log('inside buildOptions method in LexResponses');
    if (forSlot === 'CarKmDriven')
    {
      return [
          { text: 'Less than 12000', value: 'Less than 12000'},
          { text: '12001 - 18000', value: '12001 - 18000'},
          { text: '18001 - 24000', value: '18001 - 24000'},
          { text: '24001 - 32000', value: '24001 - 32000'},
          { text: '32001 - 40000', value: '32001 - 40000'},
      ];
    }
    else if (forSlot === 'NumberOfOwners')
    {
      return [
          { text: 'Only one, me', value: 1},
          { text: 'I am Second', value: 2},
          { text: 'Including me 3', value: 3},
          { text: 'Including me 4', value: 4},
          { text: 'Including me 5', value: 5},
      ];
    }
    else if (forSlot === 'NumberOfDays')
    {
      return [
          { text: 'In 3 Days', value: 3},
          { text: 'In 4 Days', value: 4},
          { text: 'In 5 Days', value: 5},
      ];
    }
}