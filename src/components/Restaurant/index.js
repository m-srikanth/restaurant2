import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Type from '../Type'
import RestoItem from '../RestoItem'
import Header from '../Header'
import './index.css'

const Constants = {
  initiate: 'INITIATE',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
}

class Restaurant extends Component {
  state = {
    typeList: [],
    typeIndex: 11,
    apiStatus: Constants.initiate,
    cartCount: 0,
    restaurantName: '',
  }

  componentDidMount() {
    this.getData()
    this.renderName()
  }

  renderName = () => {
    const {restaurantName} = this.state

    console.log(restaurantName)
  }

  onClickLogout = () => {
    const {history} = this.props

    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  cartIn = () => {
    this.setState(pre => ({cartCount: pre.cartCount + 1}))
  }

  cartDe = () => {
    const {cartCount} = this.state
    if (cartCount > 0) {
      this.setState(pre => ({cartCount: pre.cartCount - 1}))
    }
  }

  typeId = id => {
    this.setState({typeIndex: id, cartCount: 0})
  }

  getData = async () => {
    this.setState({apiStatus: 'INPROGRESS'})
    const response = await fetch(
      'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc',
    )
    const data = await response.json()
    const type = data[0].table_menu_list
    this.setState({
      typeList: type,
      apiStatus: 'SUCCESS',
      restaurantName: data[0].restaurant_name,
    })
  }

  loaderView = () => (
    <div className="loader" data-testid="loader">
      <Loader type="ThreeDots" color="black" height="50" width="50" />
    </div>
  )

  successView = () => {
    const {typeList, typeIndex, restaurantName} = this.state

    const a = typeList.filter(i => parseInt(i.menu_category_id) === typeIndex)
    const b = a[0].category_dishes
    console.log(b)

    return (
      <>
        <Header resName={restaurantName} />

        <ul className="ul1">
          {typeList.map(i => (
            <Type
              typeIndex={typeIndex}
              each={i}
              typeId={this.typeId}
              key={i.menu_category_id}
            />
          ))}
        </ul>
        <ul className="ul2">
          {b.map(i => (
            <RestoItem
              each={i}
              key={i.dish_id}
              cartIn={this.cartIn}
              cartDe={this.cartDe}
            />
          ))}
        </ul>
      </>
    )
  }

  finalOutput = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case 'INPROGRESS':
        return this.loaderView()
      case 'SUCCESS':
        return this.successView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.finalOutput()}</div>
  }
}

export default Restaurant
