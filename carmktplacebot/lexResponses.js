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
module.exports.elicitSlotwithResponseCard = function(sessionAttributes,
                                                      intentName, 
                                                      responseCard, 
                                                      slots, 
                                                      elicitSlot,
                                                      message) {
  return {
    sessionAttributes,
    dialogAction : {
      type : 'ElicitSlot',
      intentName,
      responseCard,
      slots,
      slotToElicit : elicitSlot,
      message,
    }
  };
};
module.exports.elicitSlot = function(sessionAttributes,intentName, slots, slotToElicit,message) {
  return {
    sessionAttributes,
    dialogAction : {
      type : 'ElicitSlot',
      intentName,
      slots,
      slotToElicit,
      message,
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
