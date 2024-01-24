import {Component} from 'react'

import CartContext from '../../context/CartContext'

import './index.css'

class RestoItem extends Component {
  state = {quantity: 0}

  onDecrementQuantity = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    }
  }

  onIncrementQuantity = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  renderProductDetailsView = () => (
    <CartContext.Consumer>
      {value => {
        const {quantity} = this.state
        const {each} = this.props
        const itemDetails = {
          addonCat: each.addonCat,
          dishAvailability: each.dish_Availability,
          dishType: each.dish_Type,
          dishCalories: each.dish_calories,
          dishCurrency: each.dish_currency,
          dishDescription: each.dish_description,
          id: each.dish_id,
          dishImage: each.dish_image,
          dishName: each.dish_name,
          dishPrice: each.dish_price,
        }
        const {addCartItem} = value

        const onClickAddToCart = () => {
          addCartItem({...itemDetails, quantity})
        }

        const x =
          quantity !== 0 ? (
            <button
              type="button"
              className="button add-to-cart-btn"
              onClick={onClickAddToCart}
            >
              ADD TO CART
            </button>
          ) : (
            ''
          )

        const isAwail = itemDetails.dishAvailability ? (
          <div className="div11">
            <div className="quantity-container">
              <button
                type="button"
                className="quantity-controller-button"
                onClick={this.onDecrementQuantity}
                data-testid="minus"
              >
                -
              </button>
              <p className="quantity">{quantity}</p>
              <button
                type="button"
                className="quantity-controller-button"
                onClick={this.onIncrementQuantity}
                data-testid="plus"
              >
                +
              </button>
            </div>
            {x}
          </div>
        ) : (
          <p className="not">Not available</p>
        )

        const addcart =
          itemDetails.addonCat.length === 0 ? (
            ''
          ) : (
            <p className="custm">Customizations available</p>
          )

        return (
          <li className="li2">
            <div className="product-details-success-view">
              <div className="product-details-container">
                <img
                  className="img1"
                  src={itemDetails.dishImage}
                  alt={itemDetails.dishName}
                />
                <div className="product">
                  <h1 className="product-name">{itemDetails.dishName}</h1>
                  <p className="price-details">
                    {itemDetails.dishCurrency} {itemDetails.dishPrice}
                  </p>
                  <p className="currency">
                    {itemDetails.dishCalories} calories
                  </p>
                  <p className="product-description">
                    {itemDetails.dishDescription}
                  </p>
                  {isAwail}
                  {addcart}
                </div>
              </div>
            </div>
          </li>
        )
      }}
    </CartContext.Consumer>
  )

  render() {
    return this.renderProductDetailsView()
  }
}

export default RestoItem
