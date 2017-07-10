'use strict';

const sellCarNow = require('./sellCar');
const showMyBids = require('./showMyBids');

module.exports = function(intentRequest) {
  	console.log(`dispatch userId=${intentRequest.userId}, intentName=${intentRequest.currentIntent.name}`);
  	const intentName = intentRequest.currentIntent.name;
  
  	if (intentName === 'SellCar') {
      	console.log(intentName + ' was called');
      	return sellCarNow(intentRequest);
    }
    else if (intentName === 'ShowMyBids') {
      	console.log(intentName + ' was called');
      	return showMyBids(intentRequest);
    }
  	throw new Error(`Intent with name ${intentName} not supported`);
};
