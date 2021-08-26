/* eslint-disable react/prop-types */
import React from 'react';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import { MdStarBorder, MdStar } from 'react-icons/md';

class ProductForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      size: '',
      amount: '',
      starClicked: false,
      open: false,
      addToBagClicked: false
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleStarClick = this.handleStarClick.bind(this);
  }

  handleOpen () {
    this.setState({ open: true });
  }

  handleClose () {
    this.setState({ open: false });
  }

  handleSizeChange (e) {
    this.setState({ size: e.target.value });
    if (this.state.open) {
      this.setState({ open: false });
    }
  }

  handleAmountChange (e) {
    this.setState({ amount: e.target.value });
  }

  handleStarClick (e) {
    e.preventDefault();
    this.setState({ starClicked: !this.state.starClicked });
  }

  render () {
    let arrayOfSkus = [];
    if (this.props.currentStyle.skus) {
      arrayOfSkus = Object.values(this.props.currentStyle.skus);
    }

    const range = (number) => {
      const result = [];
      for (let i = 1; i <= number; i++) {
        result.push(i);
      }
      return result;
    };

    const findRangeAccordingToSelectedSize = (size) => {
      if (this.props.currentStyle.skus) {
        for (let i = 0; i < arrayOfSkus.length; i++) {
          const sku = arrayOfSkus[i];
          if (size === `"${sku.size}"`) {
            if (sku.quantity > 15) {
              return range(15);
            } else {
              return range(sku.quantity);
            }
          }
        }
      }
    };

    const findSkuIdAccordingToSelectedSize = (size) => {
      if (this.props.currentStyle.skus) {
        for (const key in this.props.currentStyle.skus) {
          if (`"${this.props.currentStyle.skus[key].size}"` === size) {
            return key;
          }
        }
      }
    };

    return (
      <div id="form">

        <div className="size_amount">

          {this.state.addToBagClicked && this.state.size === '' ? <p className="please_select_size">Please select size</p> : null}

          {
            this.props.currentStyle.skus
              ? (Object.keys(this.props.currentStyle.skus)[0] !== 'null'
                  ? <FormControl style={{ minWidth: 150 }}>
                  <Select className="select select_size" onChange={this.handleSizeChange} displayEmpty value={this.state.size} onOpen={this.handleOpen} onClose={this.handleClose} open={this.state.open}>
                    <MenuItem value="" disabled>SELECT SIZE</MenuItem>
                    {arrayOfSkus.map((element, key) => (<MenuItem key={key} value={`"${element.size}"`}>{element.size}</MenuItem>))}
                  </Select>
                </FormControl >
                  : <FormControl style={{ minWidth: 150 }}>
                  <Select className="select select_size" onChange={this.handleSizeChange} displayEmpty value={this.state.size}>
                    <MenuItem value="" disabled>OUT OF STOCK</MenuItem>
                  </Select>
                </FormControl>
                )
              : null
          }

          {
            this.state.size === ''
              ? <FormControl disabled style={{ minWidth: 70 }}>
                <Select className="select select_amount" onChange={this.handleAmountChange} value={this.state.amount} displayEmpty renderValue={() => '-'}>
                </Select>
              </FormControl>
              : <FormControl style={{ minWidth: 70 }}>
                <Select className="select select_amount" onChange={this.handleAmountChange} value={this.state.amount} displayEmpty renderValue={() => (this.state.amount === '' ? 1 : this.state.amount.substring(1, this.state.amount.length - 1))}>
                  {findRangeAccordingToSelectedSize(this.state.size) ? findRangeAccordingToSelectedSize(this.state.size).map((quantity, key) => (<MenuItem key={key} value={`"${quantity}"`}>{quantity}</MenuItem>)) : null}
                </Select>
              </FormControl>
          }
        </div>

        <div className="bag_star">
          {
            this.props.currentStyle.skus
              ? (Object.keys(this.props.currentStyle.skus)[0] !== 'null'
                  ? <div className="add_to_bag" onClick={() => { if (this.state.size === '') { this.setState({ open: true }); this.setState({ addToBagClicked: true }); } else { this.props.addToBag({ sku_id: findSkuIdAccordingToSelectedSize(this.state.size) }); } }}>
                ADD TO BAG&emsp;&emsp;&emsp;&emsp;+
              </div>
                  : null)
              : null
          }

          <div className="star" onClick={this.handleStarClick}>
            {this.state.starClicked ? <MdStar className="star_clicked" /> : <MdStarBorder />}
          </div>

        </div>
      </div>
    );
  }
}

export default ProductForm;
