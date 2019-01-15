import React,{Component} from 'react'

class ProductForm extends Component{
  constructor(props){
    super(props)
    this.state = {
      product : '',
      product_name: '',
      price: '',
      description: ''
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
      Product : <input type="text" name="productProduct" onChange={this.handleChange}/>
      Product_name: <input type="text" name="productProduct_name" onChange={this.handleChange}/>
      Price : <input type="text" name="productPrice" onChange={this.handleChange} />
      Description : <input type="text" name="productDescription" onChange={this.handleChange} />
      <button id="add" className = "button button-add" onClick={() => this.props.onAdd({
      product: this.state.product,
      product_name: this.state.product_name,
      price : this.state.price,
      description: this.state.description
      })}>Add user</button>
      
    </div>)
  }
}

export default ProductForm