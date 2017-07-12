'use strict';

const sellCar = require('./sellCar');
const showMyBids = require('./showMyBids');

module.exports = function(intentRequest) {
  	console.log(`dispatch userId=${intentRequest.userId}, intentName=${intentRequest.currentIntent.name}`);
  	const intentName = intentRequest.currentIntent.name;
  
  	if (intentName === 'SellCar') {
      	console.log(intentName + ' was called');
      	return sellCar(intentRequest);
    }
    else if (intentName === 'ShowBids') {
      	console.log(intentName + ' was called');
      	return showMyBids(intentRequest);
    }
  	throw new Error(`Intent with name ${intentName} not supported`);
};
