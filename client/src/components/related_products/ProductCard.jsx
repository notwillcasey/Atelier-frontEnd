/* eslint-disable react/prop-types */
import React from 'react';
import ComparisonModal from './ComparisonModal.jsx';
import StarsGlobal from '../reviews/StarsGlobal.jsx';

class ProductCard extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      compareOpen: false
    };

    this.toggleCompareProducts = this.toggleCompareProducts.bind(this);
  }

  toggleCompareProducts (e) {
    this.setState(({ compareOpen }) => ({
      compareOpen: !compareOpen
    }));
  }

  render () {
    const {
      index,
      name,
      category,
      defaultPrice,
      photo,
      addToUserOutfits,
      removeFromUserOutfits,
      selectProduct,
      productid,
      productsToCompare,
      rawRatings,
      type
    } = this.props;

    let method, actionIcon;
    if (type === 'relatedProduct') {
      method = addToUserOutfits;
      actionIcon = <span className='icon'>&#9733;</span>;
    }

    if (type === 'userOutfit') {
      method = removeFromUserOutfits;
      actionIcon = '❌';
    }

    return (
      <div className='product-card' key={index}>
        <div className='featured-image' style={{ backgroundImage: `url(${photo})` }}>
          <div className='compare' onClick={this.toggleCompareProducts}></div>
          <div className='product-action-icon' onClick={(e => method(e, index, 'relatedProducts'))}>{ actionIcon }</div>
        </div>
        <div className='card-description-container' onClick={(e => selectProduct(e, productid, name))} >
          <div className='category-name'><h5>{category}</h5></div>
          <div className='product-card-title'><h4>{name}</h4></div>
          <div className='product-card-price'>${defaultPrice}</div>
          <StarsGlobal rawRatings={rawRatings} />
        </div>
        {this.state.compareOpen && <ComparisonModal toggleCompareProducts={this.toggleCompareProducts} productsToCompare={productsToCompare} /> }
      </div>
    );
  }
}

export default ProductCard;
