'use strict';

 const handleDialogCodeHook = require('./manageDialogs');
 const handleFulfillmentCodeHook = require('./manageFullfilment');

module.exports = function (intentRequest) {
	const source = intentRequest.invocationSource;    
	console.log(`Invoation Source is ----------------- ${source}`);
  	if (source === 'DialogCodeHook') {
        return handleDialogCodeHook(intentRequest);
    }
    if (source === 'FulfillmentCodeHook') {
        return handleFulfillmentCodeHook(intentRequest);
    }
};
          
