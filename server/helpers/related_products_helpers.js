const axios = require('axios');
const router = require('express').Router();
const bodyParser = require('body-parser');

const apiToken = process.env.API_TOKEN;
const apiURL = process.env.API;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const getRelatedProducts = (currentProductId) => {
  const relatedProductIds = axios.get(`${apiURL}products/${currentProductId}/related`, {
    headers: {
      Authorization: apiToken
    }
  });

  // need to retrievee for category, name, slogan, price
  const relatedProductDetails = relatedProductIds.then(relatedProducts => {
    relatedProducts.data.push(currentProductId);
    return Promise.all(relatedProducts.data.map(id => {
      return axios.get(`${apiURL}products/${id}`, {
        headers: {
          Authorization: apiToken
        }
      });
    }));
  });

  const productImages = relatedProductDetails.then((productsList) => {
    return Promise.all(productsList.map(product => {
      return axios.get(`${apiURL}products/${product.data.id}/styles`, {
        headers: {
          Authorization: apiToken
        }
      });
    }));
  });

  const productDetailsWithImages = productImages.then((images) => {
    // const needed = ['id', 'photos'];
    const imageData = images.map(image => {
      const id = image.data.product_id;
      const imageObj = image.data.results[0];
      imageObj.id = id;
      const filtered = Object.keys(imageObj)
        // .filter(key => needed.includes(key))
        .reduce((obj, key) => {
          obj[key] = imageObj[key];
          return obj;
        }, {});
      return filtered;
    });
    return imageData;
  });

  const productRatings = productDetailsWithImages.then((products) => {
    return Promise.all(products.map(product => {
      return axios.get(`${apiURL}reviews/meta?product_id=${product.id}`, {
        headers: {
          Authorization: apiToken
        }
      });
    }));
  });

  return Promise.all([relatedProductDetails, productDetailsWithImages, productRatings]);
};

const combineDetailsImagesRatings = (productDetails, productImages, productRatings) => {
  const ratings = productRatings.map((product) => {
    const ratingsObj = {};
    ratingsObj.ratings = product.data.ratings;
    return ratingsObj;
  });

  const combinedData = productDetails.map((product, i) => {
    const productData = product.data;
    const combine = {
      ...productImages[i],
      ...ratings[i],
      ...productData
    };
    return combine;
  });

  return combinedData;
};

module.exports = {
  getRelatedProducts: getRelatedProducts,
  combineDetailsImagesRatings: combineDetailsImagesRatings
};
