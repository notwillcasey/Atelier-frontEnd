/* eslint-disable react/prop-types */
import React from 'react';
import Carousel from './Carousel.jsx';
import ProductInfo from './ProductInfo.jsx';
import ProductDescription from './ProductDescription.jsx';
import $ from 'jquery';

class Overview extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      product: {},
      styles: [],
      images: [],
      currentImage: '',
      currentStyle: {},
      expandedView: false,
      expandedCarouselClicked: false
    };

    this.handleThumbnailClick = this.handleThumbnailClick.bind(this);
    this.handleChangeStyle = this.handleChangeStyle.bind(this);
    this.handleBackArrowClick = this.handleBackArrowClick.bind(this);
    this.handleForwardArrowClick = this.handleForwardArrowClick.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
    this.handleShrink = this.handleShrink.bind(this);
    this.handleExpandedCarouselClick = this.handleExpandedCarouselClick.bind(this);
    this.handleZoomOut = this.handleZoomOut.bind(this);
    this.addToBag = this.addToBag.bind(this);
  }

  fetchProductStyles (id) {
    $.ajax({
      url: '/atelier/productStyles/',
      type: 'GET',
      data: { productId: id },
      success: (data) => {
        this.setState({ styles: data.results });
        const imagesArray = this.state.styles.map((style) => {
          return style.photos;
        });
        this.setState({ images: imagesArray });
        this.setState({ currentImage: imagesArray[0][0].url });
        this.setState({ currentStyle: data.results[0] });
      },
      error: (err) => {
        console.log('error in getting back to client', err);
      }
    });
  }

  fetchProducts (id) {
    $.ajax({
      url: '/atelier/product',
      type: 'GET',
      data: { productId: id },
      success: (data) => {
        this.setState({ product: data });
        this.props.getProductName(data.name);
      },
      error: (err) => {
        console.log('error in back to client product', err);
      }
    });
  }

  componentDidMount () {
    this.fetchProductStyles(this.props.productId);
    this.fetchProducts(this.props.productId);
  }

  componentDidUpdate (prevProps) {
    if (prevProps.productId !== this.props.productId) {
      this.fetchProducts(this.props.productId);
      this.fetchProductStyles(this.props.productId);
    }
  }

  handleThumbnailClick (image) {
    this.setState({ currentImage: image });
  }

  handleChangeStyle (style, image) {
    this.setState({ currentStyle: style });
    this.setState({ currentImage: image });
  }

  handleBackArrowClick () {
    let index;
    this.state.currentStyle.photos.forEach((photo, ind) => {
      if (this.state.currentImage === photo.url) {
        index = ind;
        if (index === 0) {
          index = this.state.currentStyle.photos.length - 1;
        } else {
          index--;
        }
      }
    });
    this.setState({ currentImage: this.state.currentStyle.photos[index].url });
  }

  handleForwardArrowClick () {
    let index;
    this.state.currentStyle.photos.forEach((photo, ind) => {
      if (this.state.currentImage === photo.url) {
        index = ind;
        if (index === this.state.currentStyle.photos.length - 1) {
          index = 0;
        } else {
          index++;
        }
      }
    });
    this.setState({ currentImage: this.state.currentStyle.photos[index].url });
  }

  addToBag (obj) {
    $.ajax({
      url: 'atelier/cart',
      type: 'POST',
      data: obj,
      success: (data) => {
        console.log('success in post', data);
      },
      error: (err) => {
        console.log('error in post', err);
      }
    });
  }

  handleExpand () {
    this.setState({ expandedView: true });
  }

  handleShrink () {
    this.setState({ expandedView: false });
  }

  handleExpandedCarouselClick () {
    this.setState({ expandedCarouselClicked: true });
  }

  handleZoomOut () {
    this.setState({ expandedCarouselClicked: false });
  }

  render () {
    return (
      <div className="overview">

        <div className="website_announcement">
          <i>SITE-WIDE ANNOUNCEMENT MESSAGE! </i> SALE / DISCOUNT <b>OFFER</b> - <u>NEW PRODUCT HIGHLIGHT</u>
        </div>

        <div id="overview">
          <div id="carouselProductInfo">
            <Carousel productId={this.props.productId} images={this.state.images} currentImage={this.state.currentImage} styles={this.state.styles} currentStyle={this.state.currentStyle} currentSetOfThumbnails={this.state.currentSetOfThumbnails} thumbnailClick={this.handleThumbnailClick} forwardArrowClick={this.handleForwardArrowClick} backArrowClick={this.handleBackArrowClick} expand={this.handleExpand} expandedView={this.state.expandedView} expandedCarouselClicked={this.state.expandedCarouselClicked} expandedCarouselClick={this.handleExpandedCarouselClick} zoomOut={this.handleZoomOut} shrink={this.handleShrink} />

            <ProductInfo product={this.state.product} styles={this.state.styles} currentStyle={this.state.currentStyle} images={this.state.images} changeStyle={this.handleChangeStyle} addToBag={this.addToBag} starValue={this.props.starValue} expand={this.handleExpand} expandedView={this.state.expandedView} reviewsNumber={this.props.reviewsNumber} />
          </div>

          <div >
            <ProductDescription product={this.state.product} />
          </div>

        </div>

      </div>
    );
  }
}

export default Overview;
