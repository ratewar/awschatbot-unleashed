const url = require('url');
const querystring = require('querystring');
const request = require('request-promise');

module.exports = function (securityToken,
                            channelName,
                            uniqueReferenceNumber,
                            carBrandName,
                            carModel,
                            carYearOfMake,carVariant,
                            carKmDriven,
                            carColor,
                            numberOfOwners,
                            carCity,
                            shortDescription){
    var url = "https://slack.com/api/channels.create";
    var options = {
      method: 'POST',
      uri: url,
      form : {
        token : securityToken,
        name: channelName
      },
      json: true,
    };
    request(options).then((response) => {
        console.log(`Channel id is ${response.channel.id}`);
        //postMessage(securityToken,response.channel.id,"Kharid lo bhai : " + uniqueReferenceNumber);
        var message = "For you as a valued Dealer, we have a another good vehicle up for sale. \r\n Here are the required details:\r\n" +
                      ">>> Car Brand : *" + carBrandName + "*" + "\r\n" +
                      "Car Model : *" + carModel + "*" + "\r\n" +
                      "Year of Make : *" + carYearOfMake + "*" + "\r\n" +
                      "Car Variant : *" + carVariant + "*" + "\r\n" +
                      "Km Driven : *" + carKmDriven + "*" + "\r\n" + 
                      "Car Color : *" + carColor + "*" + "\r\n" + 
                      "Number of owners including current one : *" + numberOfOwners + "*" + "\r\n" + 
                      "Car City : *" + carCity + "*" + "\r\n" + 
                      "Short shortDescription about the Vehicle : *" + shortDescription + "*" + "\r\n" +
                      "Use the following reference number to bid for the vehicle *" + uniqueReferenceNumber + "*" + "\r\n" +
                      "You can view images of the Car at following link: http://foo.com/";
        inviteDealers(securityToken,response.channel.id,message);
    }).catch(function(error){
        console.log('inside the catch block with error ' + error);
    });
};
function inviteDealers(securityToken,channelId,message) {
  var url = "https://slack.com/api/users.list";
  var options = {
    method: "POST",
    uri: url,
    form : {
      token : securityToken,
      presence: false
    },
    json: true,
  };
  request(options).then((response) => {
      var url = "https://slack.com/api/channels.invite";
      for (var i = 0; i < response.members.length; i++)
      {
          var member = response.members[i];
          console.log(`found another member ${member.id} and the name of the member is ${member.profile.first_name}`);
          var options = {
              method: "POST",
              uri: url,
              form : {
                  token : securityToken,
                  channel: channelId,
                  user: member.id
              },
              json: true,
          };
          request(options).then((response) => {
            console.log(`member added ${member.id} and the name of the member is ${member.profile.first_name}`);
          }).catch(function(error){
            console.log('inside the catch block with error inviteDealers ' + error);
          });
      }
      postMessage(securityToken,channelId,message);
  }).catch(function(error){
        console.log('inside the catch block with error Inside inviteDealers ' + error);
  });
}
function postMessage(securityToken,channelId,message) {
  console.log(`channelId ${channelId}`);
  console.log(`message is ${message}`);
  var url = "https://slack.com/api/chat.postMessage";
  var options = {
    method: "POST",
    uri: url,
    form : {
      token : securityToken,
      channel: channelId,
      text: message
    },
    json: true,
  };
  request(options).then((response) => {
      console.log('message sent to channel ' + message);
  }).catch(function(error){
        console.log('inside the catch block with error Post Message ' + error);
   });
}
