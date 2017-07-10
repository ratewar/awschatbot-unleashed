'use strict';
var AWS = require('aws-sdk');
const request = require('request-promise');
module.exports = (code) => {
	console.log('Authorzation was called');
	const clientId = process.env.SLACK_CLIENT_ID;
	const clientSecret = process.env.SLACK_CLIENT_SECRET;
	const oauthURL = 'https://slack.com/api/oauth.access?' +
					'client_id=' + clientId + '&' +
					'client_secret=' + clientSecret + '&' +
					'code=' + code;
	const options = {
		url : oauthURL,
		json : true,
	};
	return request(options).then((response) => {
			var docClient = new AWS.DynamoDB.DocumentClient();
			var table = "dealer-market-place-tokens";
			var marketPlaceType = "CarDealers";
			var securityToken = response.access_token;
			var params = {
				TableName:table,
				Item:{
					"market_place_type":marketPlaceType,
					"security_token":securityToken
				}
			};
			console.log('adding a new item');
			docClient.put(params, function(err,data){
				if (err) {
					console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
				} else {
					console.log("Added item:", JSON.stringify(data, null, 2));
				}
			});
	}).catch((error) => error);
}
