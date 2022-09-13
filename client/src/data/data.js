const TEAMS = '/api/teams';
const MATCHES = 'api/matches';
const DELETE_ALL = '/api/deleteAll';

async function postPlainTextPromise(url = '', data = '') {
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
    const status = response.status;
    console.log("data: ", response);
    return response.text().then((res) => {
      try {
        return {status: status, content: JSON.parse(res)};
      } catch (error) {
        return {status: status, content: res};
      }
    });
  }

  const postTeams = async function(data) {
    let result;
    await postPlainTextPromise(TEAMS, data).then((res) => {
      result = res;
    });
    return result;
  }

  const getPromise = async function(url) {
    let res = await fetch(url);
    console.log("res");
    return res.text().then((res) => {return JSON.parse(res)});
  }

  const getTeams = async function() {
    let result = [];
    await getPromise(TEAMS).then((data) => {
        console.log("result: ", data);
        result = data;
    });
    return result;
  }

  const postMatches = async function(data) {
    let result;
    await postPlainTextPromise(MATCHES, data).then((res) => {
      result = res;
    });
    return result;
  }

  const getMatches = async function() {
    let result = [];
    await getPromise(MATCHES).then((data) => {
        result = data;
    });
    console.log("result: ", result);
    return result;
  }

  const deleteAllPromise = async function() {
    const response = await fetch(DELETE_ALL, {
      method: 'DELETE',
    });
    const status = response.status;
    return response.text().then((res) => {
      try {
        return {status: status, content: JSON.parse(res)};
      } catch (error) {
        return {status: status, content: res};
      }
    });
  }

  const deleteAll = async function() {
    let result;
    await deleteAllPromise().then((res) => {
      result = res;
    });
    return result;
  }

  const processResult = (obj) => {
    console.log("process result: ", obj);
    if (!obj || typeof obj === 'string' || !obj.status) {
      return {status: 400, message: 'no response: ' + (typeof obj === 'string' && obj)};
    } 
    if (obj.status && obj.content && typeof content === 'string') {
      return {status: obj.status, message: obj.content};
    }
    if (obj.status && obj.status == 400) {
      let msg = 'unknown error';
      if (obj.content && obj.content.detail) {
        msg = obj.content.detail;
      } else if (obj.content && obj.content.cause && obj.content.cause.message) {
        msg = obj.content.cause.message;
      }
      return {status: obj.status, message: msg};
    }
  }

  export {getTeams, postTeams, getMatches, postMatches, deleteAll, processResult};