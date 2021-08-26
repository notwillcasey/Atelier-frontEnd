/* eslint-disable react/prop-types */
import React from 'react';
import { MdArrowForward, MdArrowBack, MdFullscreen, MdFullscreenExit } from 'react-icons/md';
import ImageList from '@material-ui/core/List';
import ImageListItem from '@material-ui/core/ListItem';
import Zoom from 'react-img-zoom';

class Carousel extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
    };
  }

  render () {
    return (
      this.props.expandedView
        ? (this.props.expandedCarouselClicked
            ? <div className="carousel">

          <div className="carousel_container_zoomed" onClick={() => { this.props.zoomOut(); }}>
            <Zoom img={`${this.props.currentImage}`} zoomScale={2.5} height={550} width={1140} transitionTime={0.5} />
          </div>
        </div>
            : <div className="carousel">

        <div className="carousel_container" id="expanded_carousel" style={{ backgroundImage: `url(${this.props.currentImage})` }} onClick={(e) => { e.stopPropagation(); this.props.expandedCarouselClick(); }} >

          <div className="icons_container" style={{ maxHeight: 450, overflow: 'auto' }}>
            {this.props.currentStyle.photos
              ? this.props.currentStyle.photos.map((photo, key) => {
                return (<div className= {`icon ${photo.url === this.props.currentImage ? 'selected_icon' : ''} carousel_thumbnail_image`} key={key} onClick={ (e) => { e.stopPropagation(); this.props.thumbnailClick(photo.url); }}></div>);
              })
              : null }
          </div>

          <div className="arrows">
            <div className="arrows_container">
              {this.props.currentStyle.photos
                ? (this.props.currentImage !== this.props.currentStyle.photos[0].url ? <MdArrowBack onClick={(e) => { e.stopPropagation(); this.props.backArrowClick(); }} className="back_arrow" /> : null)
                : null }
              {this.props.currentStyle.photos
                ? (this.props.currentImage !== this.props.currentStyle.photos[this.props.currentStyle.photos.length - 1].url ? <MdArrowForward onClick={(e) => { e.stopPropagation(); this.props.forwardArrowClick(); }} className="forward_arrow" /> : null)
                : null }
            </div>
          </div>

          <div className="expand_container">
            <MdFullscreenExit className="expand" onClick={(e) => { e.stopPropagation(); this.props.shrink(); }} />
          </div>

        </div>

      </div>)
        : <div className="carousel">

        <div className="carousel_container" style={{ backgroundImage: `url(${this.props.currentImage})` }} onClick={(e) => { e.stopPropagation(); this.props.expand(); }} >
          <ImageList style={{ maxHeight: 500, overflow: 'auto' }} className="thumbnails_container">
            {this.props.currentStyle.photos
              ? this.props.currentStyle.photos.map((photo, key) => {
                return (<ImageListItem style={{ backgroundImage: `url(${photo.url})` }} className= {`${photo.url === this.props.currentImage ? 'selectedd' : ''} carousel_thumbnail_image`} key={key} onClick={ (e) => { e.stopPropagation(); this.props.thumbnailClick(photo.url); }}></ImageListItem>);
              })
              : null }
          </ImageList>

          <div className="arrows">
            <div className="arrows_container">
              {this.props.currentStyle.photos
                ? (this.props.currentImage !== this.props.currentStyle.photos[0].url ? <MdArrowBack onClick={(e) => { e.stopPropagation(); this.props.backArrowClick(); }} className="back_arrow" /> : null)
                : null }
              {this.props.currentStyle.photos
                ? (this.props.currentImage !== this.props.currentStyle.photos[this.props.currentStyle.photos.length - 1].url ? <MdArrowForward onClick={(e) => { e.stopPropagation(); this.props.forwardArrowClick(); }} className="forward_arrow" /> : null)
                : null }
            </div>
          </div>

          <div className="expand_container">
            <MdFullscreen className="expand" />
          </div>

        </div>

      </div>
    );
  }
}

export default Carousel;
