"use strict";

/**
 * @interface HTTPClient
 */
/**
 * @method
 * @name HTTPClient#request
 * @param {Object} - options
 * @returns {Promise<Object>}
 */


class APIClient {
  /**
   *
   * @param {string} clientId
   * @param {HTTPClient} http
   */
  constructor(clientId, http) {
    this.http = http;
    this.clientId = clientId;
    this.baseUrl = 'https://api.unsplash.com'

  }

  /**
   * @return {Promise<string>}
   */
  getRandomPhoto() {
    const options = {
      method: 'get',
      url: `${this.baseUrl}/photos/random`,
      headers: {
        authorization: `Client-ID ${this.clientId}`
      }
    };
    return this.http.request(options).then(data => data.urls.raw)
  }

}

module.exports = APIClient;
