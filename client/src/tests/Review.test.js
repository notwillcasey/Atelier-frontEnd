/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import Ratings from '../components/reviews/Ratings.jsx';
import ListView from '../components/reviews/ListView.jsx';
import List from '../components/reviews/List.jsx';
describe('Mock test', () => {
  it('Should equal true', () => {
    expect(2 + 2).toEqual(4);
  });
});

describe('Ratings', function () {
  it('should render Ratings component without crashing', function () {
    const wrapper = shallow(<Ratings characteristics={[]} ratingsBreakdown={{ 1: '17', 2: '7', 3: '11', 4: '19', 5: '46' }} filtered={[]} starValue={3.7} recommended={{ false: '58', true: '42' }}/>);
    expect(wrapper.hasClass('reviewRatings')).toBeTruthy();
  });

  it('should render characterstics lists', function () {
    const characteristics = [{ fit: 4 }];
    const wrapper = shallow(<Ratings characteristics={characteristics} ratingsBreakdown={{ 1: '17', 2: '7', 3: '11', 4: '19', 5: '46' }} filtered={[]} starValue={3.7} recommended={{ false: '58', true: '42' }}/>);
    expect(wrapper.find('input')).toHaveLength(characteristics.length);
  });
});

describe('ListView', function () {
  it('should render ListView component without crashing', function () {
    const wrapper = shallow(<ListView filterdSearch={''} filterRatings={[]} reviewList={[]} sortBy={'newest'} />);
    expect(wrapper.hasClass('ReviewContain')).toBeTruthy();
  });

  it('should contain <List/> component', function () {
    const wrapper = shallow(<ListView filterdSearch={''} filterRatings={[]} reviewList={[{
      review_id: 3,
      rating: 4,
      summary: 'I am liking these glasses',
      recommend: false,
      response: "Glad you're enjoying the product!",
      body: "They are very dark. But that's good because I'm in very sunny spots",
      date: '2019-06-23T00:00:00.000Z',
      reviewer_name: 'bigbrotherbenjamin',
      helpfulness: 5,
      photos: []
    }]} sortBy={'newest'} />);
    expect(wrapper.find('List')).toHaveLength(1);
  });
});

describe('List', function () {
  it('should render List without crashing', function () {
    const wrapper = shallow(<List key={3} review={{
      review_id: 3,
      rating: 4,
      summary: 'I am liking these glasses',
      recommend: true,
      response: "Glad you're enjoying the product!",
      body: "They are very dark. But that's good because I'm in very sunny spots",
      date: '2019-06-23T00:00:00.000Z',
      reviewer_name: 'bigbrotherbenjamin',
      helpfulness: 5,
      photos: [{
        id: 1,
        url: 'urlplaceholder/review_5_photo_number_1.jpg'
      }]
    }}/>);
    expect(wrapper.hasClass('reviewTile')).toBeTruthy();
  });
});
