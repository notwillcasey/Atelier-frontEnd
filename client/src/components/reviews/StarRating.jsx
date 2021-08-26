/* eslint-disable react/prop-types */
import React from 'react';
import Rating from '@material-ui/lab/Rating';

class StarRating extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      value: 0
    };
  }

  render () {
    return (
    <div className='ReviewStars'>
      <Rating onChange={(e, newValue) => {
        this.props.rating(newValue);
        this.setState({
          value: newValue
        });
      }} className='reviewStarContainer' name='fiveRating' defaultValue={0} />
      <h4 >{this.state.value === 1
        ? 'Poor'
        : this.state.value === 2
          ? 'Fair'
          : this.state.value === 3
            ? 'Average'
            : this.state.value === 4
              ? 'Good'
              : this.state.value === 5
                ? 'Great'
                : null}</h4>
    </div>
    );
  }
}

export default StarRating;
