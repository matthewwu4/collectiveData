// const fetch = require('node-fetch');
const fetch = require('sync-fetch');

let collectors = new Map();

const urlOne = 'https://api.opensea.io/api/v1/events?asset_contract_address=0xd07dc4262BCDbf85190C01c996b4C06a461d2430&token_id=470463&event_type=transfer&only_opensea=false&offset=0&limit=10000';
const urlTwo = 'https://api.opensea.io/api/v1/events?asset_contract_address=0xd07dc4262BCDbf85190C01c996b4C06a461d2430&token_id=470280&event_type=transfer&only_opensea=false&offset=0&limit=10000';
const urlThree = 'https://api.opensea.io/api/v1/events?asset_contract_address=0xd07dc4262bcdbf85190c01c996b4c06a461d2430&token_id=470708&event_type=transfer&only_opensea=false&offset=0&limit=10000';
const options = {method: 'GET'};

var uniqueCollectors = 0;

// function fetchData(urlFetch) {
//   fetch(urlFetch, options)
//     .then(res => {
//       return res.json();
//     })
//     .then(data => {
//       data.asset_events.forEach(singleEvent => {
//         if(singleEvent.to_account.address == '0x63edff8c1baec7311eeecc26a6410b699b3f6224' || singleEvent.from_account.address == '0x63edff8c1baec7311eeecc26a6410b699b3f6224') {
//           console.log('This one');
//           console.log(singleEvent.to_account.user.username);
//         }
//           // If collector has a username and if it is in our map
//           if(singleEvent.to_account.user != null && collectors.has(singleEvent.to_account.user.username)) {
//             collectors.set(singleEvent.to_account.user.username, collectors.get(singleEvent.to_account.user.username)+parseInt(singleEvent.quantity, 10));

//             // Subtraction
//             if(singleEvent.from_account.user != null && collectors.has(singleEvent.from_account.user.username)) {
//               collectors.set(singleEvent.from_account.user.username, collectors.get(singleEvent.from_account.user.username)-parseInt(singleEvent.quantity, 10));
//             } else if(singleEvent.from_account.user != null && !collectors.has(singleEvent.from_account.user.username)) {
//               collectors.set(singleEvent.from_account.user.username, -parseInt(singleEvent.quantity, 10));
//             } else if(collectors.has(singleEvent.from_account.address)) {
//               collectors.set(singleEvent.from_account.address, collectors.get(singleEvent.from_account.address)-parseInt(singleEvent.quantity, 10));
//             } else {
//               collectors.set(singleEvent.from_account.address, -parseInt(singleEvent.quantity, 10));
//             }

//           } // If collector has a username but not in our map
//           else if(singleEvent.to_account.user != null && !collectors.has(singleEvent.to_account.user.username)) {
//             collectors.set(singleEvent.to_account.user.username, parseInt(singleEvent.quantity, 10));

//             // Subtraction
//             if(singleEvent.from_account.user != null && collectors.has(singleEvent.from_account.user.username)) {
//               collectors.set(singleEvent.from_account.user.username, collectors.get(singleEvent.from_account.user.username)-parseInt(singleEvent.quantity, 10));
//             } else if(singleEvent.from_account.user != null && !collectors.has(singleEvent.from_account.user.username)) {
//               collectors.set(singleEvent.from_account.user.username, -parseInt(singleEvent.quantity, 10));
//             } else if(collectors.has(singleEvent.from_account.address)) {
//               collectors.set(singleEvent.from_account.address, collectors.get(singleEvent.from_account.address)-parseInt(singleEvent.quantity, 10));
//             } else {
//               collectors.set(singleEvent.from_account.address, -parseInt(singleEvent.quantity, 10));
//             }

//           } // If collector has no username and is in our map
//           else if(collectors.has(singleEvent.to_account.address)) {
//             collectors.set(singleEvent.to_account.address, collectors.get(singleEvent.to_account.address)+parseInt(singleEvent.quantity, 10));

//             // Subtraction
//             if(singleEvent.from_account.user != null && collectors.has(singleEvent.from_account.user.username)) {
//               collectors.set(singleEvent.from_account.user.username, collectors.get(singleEvent.from_account.user.username)-parseInt(singleEvent.quantity, 10));
//             } else if(singleEvent.from_account.user != null && !collectors.has(singleEvent.from_account.user.username)) {
//               collectors.set(singleEvent.from_account.user.username, -parseInt(singleEvent.quantity, 10));
//             } else if(collectors.has(singleEvent.from_account.address)) {
//               collectors.set(singleEvent.from_account.address, collectors.get(singleEvent.from_account.address)-parseInt(singleEvent.quantity, 10));
//             } else {
//               collectors.set(singleEvent.from_account.address, -parseInt(singleEvent.quantity, 10));
//             }

//           } // If collector has no username and is not in our map
//           else {
//             collectors.set(singleEvent.to_account.address, parseInt(singleEvent.quantity, 10));

//             // Subtraction
//             if(singleEvent.from_account.user != null && collectors.has(singleEvent.from_account.user.username)) {
//               collectors.set(singleEvent.from_account.user.username, collectors.get(singleEvent.from_account.user.username)-parseInt(singleEvent.quantity, 10));
//             } else if(singleEvent.from_account.user != null && !collectors.has(singleEvent.from_account.user.username)) {
//               collectors.set(singleEvent.from_account.user.username, -parseInt(singleEvent.quantity, 10));
//             } else if(collectors.has(singleEvent.from_account.address)) {
//               collectors.set(singleEvent.from_account.address, collectors.get(singleEvent.from_account.address)-parseInt(singleEvent.quantity, 10));
//             } else {
//               collectors.set(singleEvent.from_account.address, -parseInt(singleEvent.quantity, 10));
//             }

//           }
//       });
//       if(urlNum == 2) {
//         console.log(collectors);
//         for (let [key, value] of collectors) {
//           if(value > 0) {
//             uniqueCollectors++;
//           } else {
//             collectors.delete(key);
//           }
//         }
//         console.log(uniqueCollectors);
//       }
//       urlNum++;
//     })
//     .catch(err => console.error('error:' + err));
// }

function syncFetch(urlFetch, message) {
  console.log(message);
  const data = fetch(urlFetch, options).json();
  data.asset_events.forEach(singleEvent => {

      // If collector has a username and if it is in our map
      if(singleEvent.to_account.user != null && collectors.has(singleEvent.to_account.user.username)) {
        collectors.set(singleEvent.to_account.user.username, collectors.get(singleEvent.to_account.user.username)+parseInt(singleEvent.quantity, 10));

        // Subtraction
        if(singleEvent.from_account.user != null && collectors.has(singleEvent.from_account.user.username)) {
          collectors.set(singleEvent.from_account.user.username, collectors.get(singleEvent.from_account.user.username)-parseInt(singleEvent.quantity, 10));
        } else if(singleEvent.from_account.user != null && !collectors.has(singleEvent.from_account.user.username)) {
          collectors.set(singleEvent.from_account.user.username, -parseInt(singleEvent.quantity, 10));
        } else if(collectors.has(singleEvent.from_account.address)) {
          collectors.set(singleEvent.from_account.address, collectors.get(singleEvent.from_account.address)-parseInt(singleEvent.quantity, 10));
        } else {
          collectors.set(singleEvent.from_account.address, -parseInt(singleEvent.quantity, 10));
        }

      } // If collector has a username but not in our map
      else if(singleEvent.to_account.user != null && !collectors.has(singleEvent.to_account.user.username)) {
        collectors.set(singleEvent.to_account.user.username, parseInt(singleEvent.quantity, 10));

        // Subtraction
        if(singleEvent.from_account.user != null && collectors.has(singleEvent.from_account.user.username)) {
          collectors.set(singleEvent.from_account.user.username, collectors.get(singleEvent.from_account.user.username)-parseInt(singleEvent.quantity, 10));
        } else if(singleEvent.from_account.user != null && !collectors.has(singleEvent.from_account.user.username)) {
          collectors.set(singleEvent.from_account.user.username, -parseInt(singleEvent.quantity, 10));
        } else if(collectors.has(singleEvent.from_account.address)) {
          collectors.set(singleEvent.from_account.address, collectors.get(singleEvent.from_account.address)-parseInt(singleEvent.quantity, 10));
        } else {
          collectors.set(singleEvent.from_account.address, -parseInt(singleEvent.quantity, 10));
        }

      } // If collector has no username and is in our map
      else if(collectors.has(singleEvent.to_account.address)) {
        collectors.set(singleEvent.to_account.address, collectors.get(singleEvent.to_account.address)+parseInt(singleEvent.quantity, 10));

        // Subtraction
        if(singleEvent.from_account.user != null && collectors.has(singleEvent.from_account.user.username)) {
          collectors.set(singleEvent.from_account.user.username, collectors.get(singleEvent.from_account.user.username)-parseInt(singleEvent.quantity, 10));
        } else if(singleEvent.from_account.user != null && !collectors.has(singleEvent.from_account.user.username)) {
          collectors.set(singleEvent.from_account.user.username, -parseInt(singleEvent.quantity, 10));
        } else if(collectors.has(singleEvent.from_account.address)) {
          collectors.set(singleEvent.from_account.address, collectors.get(singleEvent.from_account.address)-parseInt(singleEvent.quantity, 10));
        } else {
          collectors.set(singleEvent.from_account.address, -parseInt(singleEvent.quantity, 10));
        }

      } // If collector has no username and is not in our map
      else {
        collectors.set(singleEvent.to_account.address, parseInt(singleEvent.quantity, 10));

        // Subtraction
        if(singleEvent.from_account.user != null && collectors.has(singleEvent.from_account.user.username)) {
          collectors.set(singleEvent.from_account.user.username, collectors.get(singleEvent.from_account.user.username)-parseInt(singleEvent.quantity, 10));
        } else if(singleEvent.from_account.user != null && !collectors.has(singleEvent.from_account.user.username)) {
          collectors.set(singleEvent.from_account.user.username, -parseInt(singleEvent.quantity, 10));
        } else if(collectors.has(singleEvent.from_account.address)) {
          collectors.set(singleEvent.from_account.address, collectors.get(singleEvent.from_account.address)-parseInt(singleEvent.quantity, 10));
        } else {
          collectors.set(singleEvent.from_account.address, -parseInt(singleEvent.quantity, 10));
        }

      }
  });
}

//fetchData(urlOne);
//fetchData(urlTwo);
//fetchData(urlThree);

syncFetch(urlOne, 'fetch one');
syncFetch(urlTwo, 'fetch two');
syncFetch(urlThree, 'fetch three');

  for (let [key, value] of collectors) {
    if(value > 0) {
      console.log(key + '  =>  ' + value);
    }
  }

// if(urlNum == 2) {
//   console.log(collectors);
//   for (let [key, value] of collectors) {
//     if(value > 0) {
//       uniqueCollectors++;
//     } else {
//       collectors.delete(key);
//     }
//   }
//   console.log(uniqueCollectors);
// }
// urlNum++;