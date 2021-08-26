import React from 'react';
import List from './List.jsx';
import interactions from '../../helpers/reviews/interactions.js';
/* eslint-disable react/prop-types */

class ListView extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      list: 2,
      filterdSearch: ''
    };
    console.log('thisss.props', this.props);
  }

  increaseList () {
    this.setState({
      list: this.state.list + 2
    });
    interactions('button');
  }

  reSortList () {
    const reSort = this.props.sortBy;
    this.props.sortList(null, reSort);
  }

  componentDidUpdate (prevProps) {
    if (prevProps.filterdSearch !== this.props.filterdSearch) {
      this.setState({
        filterdSearch: this.props.filterdSearch
      });
    }
  }

  render () {
    const listView = this;
    let count = 0;
    return (
      <div className='ReviewContain'>
        <div className='reviewContainerTitle'>
        <h2>{this.props.reviewList.length + ' reviews sorted by '}
        </h2>
          <select className='sortMethodsReview' defaultValue={
            this.props.sortBy === 'relevant'
              ? 'Relevance'
              : this.props.sortBy === 'helpful'
                ? 'Helpful'
                : this.props.sortBy === 'newest'
                  ? 'Newest'
                  : ''}
          onChange={this.props.sortList}>
          <option value='Relevance'>Relevance</option>
          <option value='Helpful'>Helpful</option>
          <option value='Newest'>Newest</option>
          </select>
        </div>
        <input type='text' className='searchbar' onChange={(e) => this.props.filterSearch(e.target.value)} placeholder='Search For Review'></input>
        <div className='reviewList'>
        {this.props.reviewList.map((review, index) => {
          if (this.props.filterRatings.some((value) => value > 0)) {
            if (this.props.filterRatings.indexOf(review.rating) !== -1 && this.state.filterdSearch.length < 3) {
              count++;
              if (count <= this.state.list) {
                return <List key={review.review_id} review={review} reSortList={listView.reSortList.bind(listView)}/>;
              }
            }
            if (this.props.filterRatings.indexOf(review.rating) !== -1 && this.state.filterdSearch.length >= 3) {
              if (review.body.toLowerCase().includes(this.state.filterdSearch) || review.summary.toLowerCase().includes(this.state.filterdSearch)) {
                count++;
                if (count <= this.state.list) {
                  return <List key={review.review_id} review={review} reSortList={listView.reSortList.bind(listView)}/>;
                }
              }
            }
            return '';
          }
          if (this.state.filterdSearch.length >= 3) {
            if (review.body.toLowerCase().includes(this.state.filterdSearch) || review.summary.toLowerCase().includes(this.state.filterdSearch)) {
              count++;
              if (count <= this.state.list) {
                return <List key={review.review_id} review={review} reSortList={listView.reSortList.bind(listView)}/>;
              }
            }
            return '';
          }
          if (this.state.filterdSearch.length < 3) {
            if (this.state.list <= index) {
              return '';
            }
            return <List key={review.review_id} review={review} reSortList={listView.reSortList.bind(listView)}/>;
          }
          return '';
        })}
        </div>
        <button className='moreReviews btn' onClick={this.increaseList.bind(this)} disabled={this.props.reviewList.length < 2 || this.state.list >= this.props.reviewList.length}>More Reviews</button>
        <button className='addReviews btn' onClick={this.props.addReview}>Add A Review +</button>
      </div>
    );
  }
}

export default ListView;
