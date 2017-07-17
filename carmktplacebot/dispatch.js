'use strict';

const sellCar = require('./sellCar');
const showMyBids = require('./showMyBids');
const greetUser = require('./greetUser');
module.exports = function(intentRequest) {
  	console.log(`dispatch userId=${intentRequest.userId}, intentName=${intentRequest.currentIntent.name}`);
  	const intentName = intentRequest.currentIntent.name;
    if(intentName === 'Greetings') {
        return greetUser(intentRequest);
    }
  	if (intentName === 'SellCar') {
      	return sellCar(intentRequest);
    }
    else if (intentName === 'ShowBids') {
      	return showMyBids(intentRequest);
    }
  	throw new Error(`Intent with name ${intentName} not supported`);
};
