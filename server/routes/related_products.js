// const axios = require('axios');
// const keys = require('../config.js');
const router = require('express').Router();
const { getRelatedProducts, combineDetailsImagesRatings } = require('../helpers/related_products_helpers.js');

router.get('/related-products', (req, res) => {
  console.log('RELATED PRODUCTS SERVER ============ ');
  const masterProductId = req.query.product_id;
  getRelatedProducts(masterProductId)
    .then(([productDetails, productImages, productRatings]) => {
      return combineDetailsImagesRatings(productDetails, productImages, productRatings);
    })
    .then((results) => {
      res.send(results);
      res.end();
    })
    .catch((error) => {
      console.log('error in axios ====== ', error);
      res.status(400).send('error in server app.get axios');
      res.end();
    });
});

module.exports = router;
