/* eslint-disable react/prop-types */
import React from 'react';
import { MdCheck } from 'react-icons/md';

class ProductDescription extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
    };
  }

  render () {
    return (
      <div id="description">

        <div className="description_slogan">
          <b className="slogan">
            {this.props.product.slogan}. {this.props.product.description}
          </b>
        </div>

        <div className="description_fakeData">

          <div className="description_lines">

            <div className="description_line">
              <MdCheck />  GMO and Pesticide-free <br /> <br />
            </div>

            <div className="description_line">
              <MdCheck />  Made with 100% Genetic Modification <br /> <br />
            </div>

            <div className="description_line">
              <MdCheck />  This is made up <br /> <br />
            </div>

            <div className="description_line">
              <MdCheck />  It doesn't matter <br />
            </div>

          </div>

        </div>

      </div>
    );
  }
}

export default ProductDescription;
