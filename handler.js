'use strict';

const dispatch = require('./carmktplacebot/dispatch');
const authorizer = require('./dealersmktplace/authorization');
const submitBid = require('./dealersmktplace/bidForCar');
const bidInactive = require('./markbidinactive/markInactive');
const greetUser = require('./greetUser');

module.exports.greetUser = (event, context, callback) => {
	try {
	    console.log(`event.bot.name=${event.bot.name}`);
	    dispatch(event).then(response => {
	      	callback(null, response);
	    });
	} catch (err) {
	    callback(err);
	}
};
module.exports.intents = (event, context, callback) => {
	try {
	    console.log(`event.bot.name=${event.bot.name}`);
	    dispatch(event).then(response => {
	    	console.log(`final Response 10000000000 ${JSON.stringify(response)}`);
	    	callback(null, response);
	    });
	} catch (err) {
	    callback(err);
	}
};
module.exports.createBidSlackChannel = (event, context, callback) => {
	try {
	    var item = event.Records[0].dynamodb.NewImage;
	    console.log(item);	
	    console.log('Car Id is ' + item.carId.S);
	    console.log('Car Brand is ' + item.carBrandName.S);
	    console.log('Car Model is ' + item.CarModel.S);
	    console.log('Car Year of Make is ' + item.carYearOfMake.S);
	    console.log('Car Variant is ' + item.carVariant.S);
	    console.log('Car Km Driven is ' + item.carKmDriven.S);
	    console.log('Car Color is ' + item.carColor.S);
	    console.log('Car Number of Owners is ' + item.numberOfOwners.S);
	    console.log('Car City is ' + item.carCity.S);
	    console.log('Car Short Description is ' + item.shortDescription.S);
	    console.log('Car User Id is ' + item.userId.S);
	    console.log('Car Bid Reference is ' + item.bid_reference.S);
	} catch (err) {
	    callback(err);
	}
	callback(null, null);
}; 
module.exports.authorization = (event, context, callback) => {
	try{
		const code = event.queryStringParameters.code;
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
module.exports.markBidInvalid = (event, context, callback) => {
	try {
		console.log("Called as part of Cron Job That runs Everyday at 10 am");
		var response = bidInactive(event);
		callback(null, response);
	} catch(err) {
		callback(err);
	}
};
