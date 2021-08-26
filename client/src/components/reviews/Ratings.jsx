import React from 'react';
import StarsGlobal from './StarsGlobal.jsx';
import RatingsDescription from './RatingsDescription.jsx';
/* eslint-disable react/prop-types */
class Ratings extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      reviewTotal: 0,
      recommendedTotal: 0
    };
  }

  componentDidMount () {
    this.getTotal();
    this.getRecommended();
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (prevProps.ratingsBreakdown !== this.props.ratingsBreakdown) {
      this.getTotal();
      this.getRecommended();
    }
  }

  getRecommended () {
    let total = 0;
    for (const keys in this.props.recommended) {
      total += parseInt(this.props.recommended[keys]);
    }
    this.setState({
      recommendedTotal: total
    });
  }

  getTotal () {
    console.log('this.propsssssss', this.props);
    let result = 0;
    for (const keys in this.props.ratingsBreakdown) {
      result += parseInt(this.props.ratingsBreakdown[keys]);
    }
    this.setState({
      reviewTotal: result
    });
  }

  render () {
    const rounded = Math.floor(this.props.starValue * 10) / 10;
    return (
    <div className='reviewRatings'>
      <div className='reviewRating'>
        <h1>{rounded || 0}</h1>
      <StarsGlobal value={this.props.starValue || 0}/>
      </div>
      <div className='percentReviews'>
        <p>
          {Math.round(this.props.recommended.true / this.state.recommendedTotal * 100) || 0}
          % of reviews recommend this product
        </p>
      </div>
      <div className='reviewBars'>
        <div className='RatingsBreakdowns'>
          <label className='StarFilterReview' onClick={() => this.props.filterRatings(5)} htmlFor='fiveStars'>5 stars</label>
          <meter id='fiveStars' value={(Number(this.props.ratingsBreakdown[5]) / this.state.reviewTotal) || 0}></meter>
          <span className='numberdReview'>({this.props.ratingsBreakdown[5] || 0})</span>
          </div>
        <div className='RatingsBreakdowns'>
          <label className='StarFilterReview' onClick={() => this.props.filterRatings(4)} htmlFor='fourStars'>4 stars</label>
          <meter id='fourStars' value={(Number(this.props.ratingsBreakdown[4]) / this.state.reviewTotal) || 0}></meter>
          <span className='numberdReview'>({this.props.ratingsBreakdown[4] || 0})</span>
          </div>
        <div className='RatingsBreakdowns'>
          <label className='StarFilterReview' onClick={() => this.props.filterRatings(3)} htmlFor='threeStars'>3 stars</label>
          <meter id='threeStars' value={(Number(this.props.ratingsBreakdown[3]) / this.state.reviewTotal) || 0}></meter>
          <span className='numberdReview'>({this.props.ratingsBreakdown[3] || 0})</span>
          </div>
        <div className='RatingsBreakdowns'>
          <label className='StarFilterReview' onClick={() => this.props.filterRatings(2)} htmlFor='twoStars'>2 stars</label>
          <meter id='twoStars' value={(Number(this.props.ratingsBreakdown[2]) / this.state.reviewTotal) || 0}></meter>
          <span className='numberdReview'>({this.props.ratingsBreakdown[2] || 0})</span>
          </div>
        <div className='RatingsBreakdowns'>
          <label className='StarFilterReview' onClick={() => this.props.filterRatings(1)} htmlFor='oneStars'>1 stars</label>
          <meter id='oneStars' value={(Number(this.props.ratingsBreakdown[1]) / this.state.reviewTotal) || 0}></meter>
          <span className='numberdReview'>({this.props.ratingsBreakdown[1] || 0})</span>
          </div>
          {this.props.filtered.some((value) => value > 0) && (<div className='raitingsFiltered'>
        <p>
          Filter by
        {this.props.filtered.map((filter) => {
          if (filter > 0) {
            return ' ' + filter + ' stars, ';
          }
          return '';
        })}
          has been applied
        </p>
        <a href='' onClick={this.props.removeFilterRatings}>Remove All Filters</a>
      </div>)}
      </div>
      <div className='reviewSpecifics'>
        {this.props.characteristics.map((item, index) => {
          const [characteristics] = Object.keys(item);
          const [value] = Object.values(item);
          if (value.value === null) {
            return '';
          }
          return <div key={index}>
            <h4>{characteristics}</h4>
            <input type='range' min='1' max='5' step='any' value={value.value || 3} disabled></input>
            <RatingsDescription description={characteristics}/>
          </div>;
        })}
      </div>
    </div>);
  }
};

export default Ratings;
