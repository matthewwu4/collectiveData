const axios = require('axios');
const fetch = require('node-fetch');

let collectors = new Map();

const urlOne = 'https://api.opensea.io/api/v1/events?asset_contract_address=0xd07dc4262BCDbf85190C01c996b4C06a461d2430&token_id=470463&event_type=transfer&only_opensea=false&offset=0&limit=10000';
const urlTwo = 'https://api.opensea.io/api/v1/events?asset_contract_address=0xd07dc4262BCDbf85190C01c996b4C06a461d2430&token_id=470280&event_type=transfer&only_opensea=false&offset=0&limit=10000';
const urlThree = 'https://api.opensea.io/api/v1/events?asset_contract_address=0xd07dc4262bcdbf85190c01c996b4c06a461d2430&token_id=470708&event_type=transfer&only_opensea=false&offset=0&limit=1000';
const options = {method: 'GET'};

var uniqueCollectors = 0;
var totalCollectives = 0;
var urlNum = 0;
var firstTime = true;

function fetchData(urlFetch) {
  fetch(urlFetch, options)
    .then(res => {
      return res.json();
    })
    .then(data => {
      data.asset_events.forEach(singleEvent => {
          if(collectors.has(singleEvent.to_account.address)) {
            collectors.set(singleEvent.to_account.address, collectors.get(singleEvent.to_account.address)+parseInt(singleEvent.quantity, 10));
            if(collectors.has(singleEvent.from_account.address)) {
              collectors.set(singleEvent.from_account.address, collectors.get(singleEvent.from_account.address)-parseInt(singleEvent.quantity, 10));
            } else {
              collectors.set(singleEvent.from_account.address, -parseInt(singleEvent.quantity, 10));
            }
          } else {
            collectors.set(singleEvent.to_account.address, parseInt(singleEvent.quantity, 10));
            if(collectors.has(singleEvent.from_account.address)) {
              collectors.set(singleEvent.from_account.address, collectors.get(singleEvent.from_account.address)-parseInt(singleEvent.quantity, 10));
            } else {
              collectors.set(singleEvent.from_account.address, -parseInt(singleEvent.quantity, 10));
            }
            firstTime = false;
          }
      });
      if(urlNum == 2) {
        console.log(collectors);
      }
      urlNum++;
    })
    .catch(err => console.error('error:' + err));
}

fetchData(urlOne);
fetchData(urlTwo);
fetchData(urlThree);