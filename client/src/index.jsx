import React from 'react';
import ReactDOM from 'react-dom';
import Overview from './components/product_overview/Overview.jsx';
import Reviews from './components/reviews/Reviews.jsx';
import RelatedLists from './components/related_products/RelatedLists.jsx';
import QuestionsAnswers from './components/questions_answers/QuestionsAnswers.jsx';
import '../dist/styles/product_overview.css';
import getReviews from './helpers/reviews/serverReview.js';
import getMeta from './helpers/reviews/meta.js';
import withClickTrackingQA from './components/questions_answers/withClickTrackingQA.jsx';
const QuestionsAnswersWithClickTracking = withClickTrackingQA(QuestionsAnswers);

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      id: 36300,
      value: '',
      starValue: 0,
      reviewLength: 0,
      nightMode: false
    };

    this.togglenightMode = this.togglenightMode.bind(this);
    this.selectProduct = this.selectProduct.bind(this);
  }

  onChange (e) {
    this.setState({ value: e.target.value });
  }

  togglenightMode (e) {
    this.setState(({ nightMode }) => ({
      nightMode: !nightMode
    }));

    if (this.state.nightMode) {
      document.body.classList.remove('night-mode');
    } else {
      document.body.classList.add('night-mode');
    }
  }

  selectProduct (e, productid) {
    this.setState({
      id: parseInt(productid)
    });
  }

  setStars (value) {
    this.setState({
      starValue: value
    });
  }

  getReviewLength (reviews) {
    this.setState({
      reviewLength: reviews
    });
  }

  render () {
    return (
      <div>
        <div id="logo">
          <div>
            <b><u>Logo</u></b>
          </div>
          <div id="search">
            <input type="text" onChange={this.onChange.bind(this)}></input>
          </div>
          <div id='toggleNightMode' onClick={this.togglenightMode}>
            {this.state.nightMode ? 'Disable Night Mode' : 'Enable Night Mode'}
          </div>
        </div>
        <Overview starValue={this.state.starValue} productId={this.state.id} reviewsNumber={this.state.reviewLength} />
        <RelatedLists productId={this.state.id} selectProduct={this.selectProduct} />
        <QuestionsAnswersWithClickTracking id={this.state.id} />
        <section id='Reviews'>
         <Reviews getReviewLength={this.getReviewLength.bind(this)} getReviews={getReviews} getMeta={getMeta} setStars={this.setStars.bind(this)} starsValue={this.state.starValue} product_id={this.state.id}/>
        </section>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('App'));

export default App;
