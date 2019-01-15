import React,{Component} from 'react'

class ProductForm extends Component{
  constructor(props){
    super(props)
    this.state = {
      order : '',
      order_number: '',
      price: '',
      payment: ''
    }
    this.handleChange = (event) => {
      this.setState({
        [event.target.name] : event.target.value
      })
      console.warn(this.state)
    }
  }
  render(){
    return (<div>
      Order : <input type="text" name="orderOrder" onChange={this.handleChange}/>
      Order_number: <input type="text" name="ordeOrder_number" onChange={this.handleChange}/>
      Price : <input type="text" name="productPrice" onChange={this.handleChange} />
      Payment : <input type="text" name="orderPyament" onChange={this.handleChange} />
      <button id="add" className = "button button-add" onClick={() => this.props.onAdd({
      order: this.state.order,
      order_number: this.state.product_name,
      price : this.state.price,
      payment: this.state.description
      })}>Add order</button>
      
    </div>)
  }
}

export default OrderForm