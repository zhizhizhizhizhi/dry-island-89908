const TEAMS = '/api/teams';
const MATCHES = 'api/matches';
const DELETE_ALL = '/api/deleteAll';

async function postPlainText(url = '', data = '') {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors', 
      cache: 'default',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'text/plain'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer', 
      body: data
    });
    return response.json();
  }

  const postTeams = async function(data) {
    return postPlainText(TEAMS, data);
  }


  const getPromise = async function(url) {
    // return fetch(url)
    //     .then((response) => console.log(response))
    //     .then((data) => {
    //         console.log("data: ", data);
    //         return data
    //     });
    let res = await fetch(url);
    console.log("res");
    return res.text().then((res) => {return JSON.parse(res)});
  }

  const getTeams = async function() {
    let result = [];
    await getPromise(TEAMS).then((data) => {
        result = data;
    });
    console.log("result: ", result);
    return result;
  }

  const postMatches = async function(data) {
    return postPlainText(MATCHES, data);
  }

  const getMatches = async function() {
    let result = [];
    await getPromise(MATCHES).then((data) => {
        result = data;
    });
    console.log("result: ", result);
    return result;
  }

  export {getTeams, postTeams, getMatches, postMatches};