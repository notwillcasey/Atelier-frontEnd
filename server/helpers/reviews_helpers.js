/* eslint-disable camelcase */
const axios = require('axios');
const apiToken = process.env.API_TOKEN;

const getReviews = (product, sort) => {
  return axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews', {
    headers: {
      Authorization: apiToken
    },
    params: {
      sort: sort,
      count: 100,
      product_id: product
    }
  }).then((results) => {
    return results.data.results;
  });
};
const getMeta = (product) => {
  return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta/?product_id=${product}`, {
    headers: {
      Authorization: apiToken
    }
  }).then((results) => {
    return results.data;
  });
};
const putHelp = (reviewID) => {
  return axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/${reviewID}/helpful`, null, {
    headers: {
      Authorization: apiToken
    }
  });
};

const postReview = (obj) => {
  const { product_id, rating, summary, body, recommend, name, email, characteristics } = obj;
  const data = { product_id: product_id, rating: rating, summary: summary, body: body, recommend: recommend, name: name, email: email, characteristics: characteristics, photos: [] };
  return axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews', data, {
    headers: {
      Authorization: apiToken
    }
  });
};

const putReport = (reviewID) => {
  return axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/${reviewID}/report`, null, {
    headers: {
      Authorization: apiToken
    }
  });
};

const postInteraction = (element) => {
  const time = new Date();
  console.log('date', time);
  return axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/interactions', {
    element: element,
    widget: 'Rating & Reviews',
    time: time
  }, {
    headers: {
      Authorization: apiToken
    }
  }).then((res) => console.log(res)).catch((err) => console.log(err));
};

module.exports.getReviews = getReviews;
module.exports.getMeta = getMeta;
module.exports.putHelp = putHelp;
module.exports.postReview = postReview;
module.exports.putReport = putReport;
module.exports.postInteraction = postInteraction;