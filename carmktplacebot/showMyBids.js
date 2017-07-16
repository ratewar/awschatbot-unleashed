'use strict';

const lexResponses = require('./lexResponses');
const databaseManager = require('../databaseManager');

module.exports = function(intentRequest) {
    var bidRef = intentRequest.currentIntent.slots.BidRef;
    return fullfilRequest(bidRef).then(fullfiledRequest => {
        return lexResponses.close(intentRequest.sessionAttributes, fullfiledRequest.fullfilmentState, fullfiledRequest.message);
    });
};
function fullfilRequest(bidId) {
    return databaseManager.findBids(bidId).then(response => {
        console.log('fullfilRequest invoked with');
        var message = 'Thanks, your bid details are' + '\r\n';
        response.Items.forEach(function(item) {
            console.log(" -", item.dealer_name + ": " + item.bid_amount);
            message +=   'Dealer Reference - *' + item.dealer_name + '* Bid Amount is - *INR.' + item.bid_amount + '*' + '\r\n';
        });
        console.log('sending final message with bid details are ' + message);
        return buildFulfilmentResult('Fulfilled', message);
    });
}
function buildFulfilmentResult(fullfilmentState, messageContent) {
  return {
      fullfilmentState,
      message: { contentType: 'PlainText', content: messageContent }
  };
}




