/* eslint-disable react/prop-types */
import React from 'react';
import ProductCard from './ProductCard.jsx';

class YourOutfit extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    const {
      masterProductDetails,
      userOutfits,
      addToUserOutfits,
      removeFromUserOutfits,
      selectProduct,
      starValue,
      type
    } = this.props;

    const outfitCards = userOutfits.map((outfit, i) => {
      let photo = outfit.photos[0].thumbnail_url;
      if (!photo) {
        photo = '';
      }

      const thisProductDetails = outfit;

      const productsToCompare = {
        thisProductDetails,
        masterProductDetails: masterProductDetails ? masterProductDetails[0] : null
      };

      return <ProductCard
      key={i}
      index={i}
      productid={outfit.id}
      name={outfit.name}
      category={outfit.category}
      defaultPrice={outfit.default_price}
      photo={photo}
      removeFromUserOutfits={removeFromUserOutfits}
      selectProduct={selectProduct}
      productsToCompare={productsToCompare}
      rawRatings={outfit.ratings}
      type={type}
      />;
    });

    return (
      <div className='your-outfits-wrapper'>
        <div className='section-title'><h3>Your Outfit</h3></div>
        <div className='carousel-container'>
          <div className='product-card' onClick={(e => addToUserOutfits(e, 0, 'masterProductDetails'))}>
            <div className='add-to-outfits'>
              <h4>+ Add to Outfit</h4>
            </div>
          </div>
          {outfitCards}
        </div>
      </div>
    );
  }
}

export default YourOutfit;
