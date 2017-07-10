'use strict';

const dispatch = require('./carmktplacebot/dispatch');
const authorizer = require('./dealersmktplace/authorization');
const submitBid = require('./dealersmktplace/bidForCar');

module.exports.intents = (event, context, callback) => {
	try {
	    console.log(`event.bot.name=${event.bot.name}`);
	    dispatch(event).then(response => {
	    	callback(null, response);
	    });
	} catch (err) {
	    callback(err);
	} 
};
module.exports.authorization = (event, context, callback) => {
	try{
		const code = event.queryStringParameters.code;
  		console.log(code);
  		authorizer(code).then(() =>{
    		const response = {
	        	statusCode: 200,
	        	body: JSON.stringify(
	          	{
		            message: 'Authorisation was called',
	       	    	input: event,
	          	}),
      		};
    		callback(null, response);
		});
	} catch(err) {
		callback(err);
	}
};  
module.exports.bidForCar = (event, context, callback) => {
	try {
		submitBid(event).then((response) => {
			callback(null, response);	
		});
	} catch(err) {
		callback(err);
	}
};  
