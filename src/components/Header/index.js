import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiOutlineShoppingCart} from 'react-icons/ai'

import CartContext from '../../context/CartContext'

import './index.css'

class Header extends Component {
  state = {restoName: 'UNI Resto Cafe'}

  componentDidMount() {
    const {resName} = this.props
    if (resName !== undefined) {
      this.setState({restoName: resName})
    }
  }

  onClickLogout = () => {
    const {history} = this.props

    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  gotoCart = () => {
    const {history} = this.props

    history.replace('/cart')
  }

  renderCartItemsCount = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const cartItemsCount = cartList.length

        return (
          <>
            {cartItemsCount > 0 ? (
              <span className="cart-count-badge">{cartList.length}</span>
            ) : null}
          </>
        )
      }}
    </CartContext.Consumer>
  )

  render() {
    const {restoName} = this.state
    console.log(restoName)

    return (
      <nav className="nav-header">
        <div className="nav-content">
          <div className="nav-bar-large-container">
            <Link to="/" className="restoName">
              <h1>{restoName}</h1>
            </Link>
            <ul className="nav-menu">
              <li className="nav-menu-item">
                <div className="div3">
                  <h1>My Orders</h1>
                  <button
                    type="button"
                    className="cartBtn"
                    onClick={this.gotoCart}
                  >
                    .<AiOutlineShoppingCart size="50" />
                  </button>
                  {this.renderCartItemsCount()}
                </div>
              </li>
            </ul>
            <button
              type="button"
              className="logout-desktop-btn"
              onClick={this.onClickLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(Header)
