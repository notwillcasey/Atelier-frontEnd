/* eslint-disable react/prop-types */
import React from 'react';
import Rating from '@material-ui/lab/Rating';

class StarsGlobal extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  calcAverageRating (rawRatings) {
    let totalScore = 0;
    let numberOfRatings = 0;
    for (const rating in rawRatings) {
      totalScore += rating * parseInt(rawRatings[rating]);
      numberOfRatings += parseInt(rawRatings[rating]);
    }
    return totalScore / numberOfRatings;
  }

  render () {
    const { rawRatings } = this.props;
    let averageRating = 0;

    if (rawRatings) {
      averageRating = this.calcAverageRating(rawRatings);
    }

    console.log('AVERAGE RATING ======= ', averageRating);

    return (
    <div className='StarsGlobal'>
      <Rating value={this.props.value ? this.props.value : averageRating} precision={0.1} readOnly/>
    </div>);
  }
}
export default StarsGlobal;
