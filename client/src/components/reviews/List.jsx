/* eslint-disable node/handle-callback-err */
/* eslint-disable camelcase */
import React from 'react';
import increaseHelp from '../../helpers/reviews/helpfulness.js';
import StarsGlobal from './StarsGlobal.jsx';
import axios from 'axios';
import interactions from '../../helpers/reviews/interactions.js';
/* eslint-disable react/prop-types */

class List extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isClicked: false,
      imageClick: false,
      src: '',
      reviewBodyFull: this.props.review.body,
      notClicked: true,
      wasReported: false
    };
  }

  parseDate (date) {
    const newDate = new Date(date);
    const day = newDate.getDate().toString();
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(newDate).toString();
    const year = newDate.getFullYear().toString();
    return month + ' ' + day + ', ' + year;
  }

  increaseHelfpulness () {
    console.log(this.props.review);
    if (!this.state.isClicked) {
      increaseHelp(this.props.review.review_id);
      this.props.review.helpfulness += 1;
      this.setState({
        isClicked: true
      });
      this.props.reSortList();
    }
    interactions('button');
  }

  expandImage (e) {
    console.log(e.target.src);
    this.setState({
      imageClick: !this.state.imageClick,
      src: e.target.src
    });
    interactions('img');
  }

  closeImage () {
    this.setState({
      imageClick: false
    });
    interactions('img');
  }

  showMoreOrLess () {
    this.setState({
      notClicked: !this.state.notClicked
    });
    interactions('button');
  }

  reportReview (review_id) {
    if (!this.state.wasReported) {
      axios.put('/atelier/reviews/report', { review_id: review_id }).then(() => this.setState({
        wasReported: true
      })).catch((err) => console.log('failed to report'));
    }
    interactions('button');
  }

  render () {
    console.log('this.props', this.props.review);
    return (
      <div className='reviewTile'>
          <div className='reviewStarRating'>
              <StarsGlobal value={this.props.review.rating}/>
            <h3>{this.props.review.reviewer_name + ', ' + this.parseDate(this.props.review.date)}</h3>
          </div>
          <div className='reviewTitle'>
            <h1>{this.props.review.summary}</h1>
          </div>
          <div className='reviewBody'>
            {this.state.notClicked && this.state.reviewBodyFull.length <= 200 && (<p>{this.state.reviewBodyFull}</p>)}
            {this.state.notClicked && this.state.reviewBodyFull.length > 200 && (<div>
              <p>{this.state.reviewBodyFull.slice(0, 200)}</p>
              <button onClick={this.showMoreOrLess.bind(this)}>Show More</button>
            </div>)}
            {!this.state.notClicked && (<div>
              <p>{this.state.reviewBodyFull}</p>
              <button onClick={this.showMoreOrLess.bind(this)}>Show Less</button>
            </div>)}
            {this.props.review.photos.map((photo) => {
              return <img onClick={this.expandImage.bind(this)} style={{ width: '5em', height: '5em' }}
              key={photo.id} src={photo.url}></img>
              ;
            })}
          </div>
          <div className='reviewRecommended'>
            {this.props.review.recommend && (<p>&#10003; I recommend this product</p>)}
          </div>
          <div className='reviewResponse'>
            {this.props.review.response === null ? '' : this.props.review.response.length > 0 ? (<p>Response: <br></br>{this.props.review.response}</p>) : ''}
          </div>
          <div className='reviewHelpful'>
            <p>Helpful? <button onClick={this.increaseHelfpulness.bind(this)} className='reviewYes'>Yes</button>({this.props.review.helpfulness}) | <button onClick={() => this.reportReview(this.props.review.review_id)} className='reviewReport'>{this.state.wasReported ? 'Reported' : 'Report'}</button></p>
          </div>
          <hr></hr>
          {this.state.imageClick && (<div onClick={this.closeImage.bind(this)}className='reviewImageContainer'>
            <img onClick={this.expandImage.bind(this)} className='reviewImage' src={this.state.src}></img>
          </div>)}
        </div>
    );
  }
};

export default List;
