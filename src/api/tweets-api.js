import axios from 'axios';
import uuid from 'uuidv4';


export class TweetsApi {

  static async getTweets(userId) {

    let response = null;
    const API_URL = process.env.REACT_APP_BASE_API_URL;
    const API_KEY = process.env.REACT_APP_GET_TWEETS_BY_USER_ID_API_KEY;

    try {
      const config = {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "X-Functions-Key": API_KEY
        },
        url: API_URL + "api/users/" + userId + "/tweets",
        method: "get",
        data: {}
      };

      response = await axios(config).then(resp => resp).catch((error) => error);
    } catch (error) {
      response = error;
    }

    return response;
  }

  static async createTweet(userId, userName, userUsername, content) {

    let response = null;
    const API_URL = process.env.REACT_APP_BASE_API_URL;
    const API_KEY = process.env.REACT_APP_POST_TWEET_API_KEY;
    const creationDate = new Date().toISOString();

    try {
      const config = {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "X-Functions-Key": API_KEY
        },
        url: API_URL + "api/tweets/create",
        method: "post",
        data: {
          id: uuid(),
          userId: userId,
          userName: userName,
          userUsername: userUsername, 
          content: content,
          creationDate: creationDate
        }
      };

      response = await axios(config).then(resp => resp).catch((error) => error);
    } catch (error) {
      response = error;
    }

    return response;
  }
}