const axios = require('axios');
const router = require('express').Router();
const bodyParser = require('body-parser');

const apiToken = process.env.API_TOKEN;
const apiURL = process.env.API;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/productStyles', (req, res) => {
  axios.get(`${apiURL}products/${req.query.productId}/styles`, {
    headers: {
      Authorization: apiToken
    }
  })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      console.log('error in axios', error);
      res.status(400).send('error in server app.get axios');
    });
});

router.get('/product', (req, res) => {
  axios.get(`${apiURL}products/${req.query.productId}`, {
    headers: {
      Authorization: apiToken
    }
  })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => {
      console.log('error in axios product', err);
      res.status(400).send('error in app.get product info', err);
    });
});

router.post('/cart', (req, res) => {
  axios.post(`${apiURL}cart`, req.body, {
    headers: {
      Authorization: apiToken
    }
  })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

module.exports = router;
