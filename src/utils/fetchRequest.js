async function postRequest(url,method, data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: method, // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('loginToken')
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    
    return await response.json(); // parses JSON response into native JavaScript objects
}


async function getRequest(url) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('loginToken')
      },
    });
    
    return await response.json(); // parses JSON response into native JavaScript objects
}


export {postRequest,getRequest};