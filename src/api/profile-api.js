import axios from 'axios';

export class ProfileApi {

  static async getProfile(id) {

    let response = null;
    const API_URL = process.env.REACT_APP_BASE_API_URL;
    const API_KEY = process.env.REACT_APP_GET_USER_BY_USER_ID_API_KEY;

    try {
      const config = {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "X-Functions-Key": API_KEY
        },
        url: API_URL + "api/users/" + id,
        method: "get",
        data: {}
      };

      response = await axios(config).then(resp => resp).catch((error) => error);
    } catch (error) {
      response = error;
    }

    return response;
  }

  static async createProfile(id, hash, name, username, bio) {

    let response = null;
    const API_URL = process.env.REACT_APP_BASE_API_URL;
    const API_KEY = process.env.REACT_APP_CREATE_USER_API_KEY;
    const creationDate = new Date().toISOString();

    try {
      const config = {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "X-Functions-Key": API_KEY
        },
        url: API_URL + "api/users/create",
        method: "post",
        data: {
          id: id,
          hash: hash,
          name: name,
          username: username, 
          bio: bio,
          creationDate: creationDate
        }
      };

      response = await axios(config).then(resp => resp).catch((error) => error);
    } catch (error) {
      response = error;
    }

    return response;
  }

  static async checkUsernameExists(username) {

    let response = null;
    const API_URL = process.env.REACT_APP_BASE_API_URL;
    const API_KEY = process.env.REACT_APP_CHECK_USERNAME_EXISTS_API_KEY;

    try {
      const config = {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "X-Functions-Key": API_KEY
        },
        url: API_URL + "api/users/" + username,
        method: "get",
        data: {}
      };

      response = await axios(config).then(resp => resp).catch((error) => error);
    } catch (error) {
      response = error;
    }

    return response;
  }

  static async getFollowings(id) {

    let response = null;
    const API_URL = process.env.REACT_APP_BASE_API_URL;
    const API_KEY = process.env.REACT_APP_GET_FOLLOWINGS_BY_USER_ID_API_KEY;

    try {
      const config = {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "X-Functions-Key": API_KEY
        },
        url: API_URL + "api/users/" + id + "/followings",
        method: "get",
        data: {}
      };

      response = await axios(config).then(resp => resp).catch((error) => error);
    } catch (error) {
      response = error;
    }

    return response;
  }

}