/* eslint-disable react/prop-types */
import React from 'react';
import ProductCard from './ProductCard.jsx';

class RelatedProduct extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    // console.log('RENDER RELATED PRODUCT PROPS ====== ', this.props.relatedProducts);
    const {
      relatedProducts,
      addToUserOutfits,
      selectProduct,
      masterProductDetails,
      type
    } = this.props;

    const ProductCards = relatedProducts.map((product, i) => {
      let photo = product.photos[0].thumbnail_url;
      if (!photo) {
        photo = '';
      }
      console.log('PRODUCT RATINGS ======== ', product.ratings);

      const thisProductDetails = product;

      const productsToCompare = {
        thisProductDetails,
        masterProductDetails: masterProductDetails[0]
      };

      return <ProductCard
        key={i}
        index={i}
        productid={product.id}
        name={product.name}
        category={product.category}
        defaultPrice={product.default_price}
        photo={photo}
        productsToCompare={productsToCompare}
        addToUserOutfits={addToUserOutfits}
        selectProduct={selectProduct}
        rawRatings={product.ratings}
        type={type}
        />;
    });

    return (
    <div className='related-products-wrapper'>
      <div className='section-title'><h3>Related Products</h3></div>
      <div className='carousel-container'>
        {ProductCards}
      </div>
    </div>
    );
  }
}

export default RelatedProduct;
