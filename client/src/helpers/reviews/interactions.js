import axios from 'axios';
const postInteraction = (element) => {
  // const time = new Date();
  // console.log('date', time);
  return axios.post('/atelier/reviews/interaction', { element: element });
};

export default postInteraction;
