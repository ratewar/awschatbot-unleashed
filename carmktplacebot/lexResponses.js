'use strict';

module.exports.delegate = function(sessionAttributes,slots) {
  return {
    sessionAttributes,
    dialogAction: {
      type: 'Delegate',
      slots,
    },
  };
};
module.exports.elicitSlot = function(sessionAttributes,intentName, slots, slotToElicit,message,title,buttons) {
  return {
    sessionAttributes,
    dialogAction : {
      type : 'ElicitSlot',
      intentName,
      slots,
      slotToElicit,
      message,
      responseCard: getResponseCard(title,buttons)
    }
  };
};
module.exports.close = function (sessionAttributes, fulfillmentState, message) {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'Close',
            fulfillmentState,
            message,
        },
    };
}
function getResponseCard(title,buttons) {
  console.log(`In the getResponseCar ${buttons}`);
  return {
      contentType: 'application/vnd.amazonaws.card.generic',
      genericAttachments: [
          {
            title,
            buttons
          }
      ]
  };
}