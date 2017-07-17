'use strict'
const lexResponses = require('./carmktplacebot/lexResponses');
module.exports = function(intentRequest) {
	const source = intentRequest.invocationSource;
	if(source === 'FulfillmentCodeHook')
	{
		return Promise.resolve(lexResponses.close(intentRequest.sessionAttributes, 'Fulfilled',null));
	}
}