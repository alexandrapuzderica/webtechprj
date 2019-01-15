import React, {Component} from 'react'

class Product extends Component{
  constructor(props){
      super(props)
      console.warn(this.props)
      this.state = {
        isEditing : false,
        product_name : this.props.product.product_name,
        price : this.props.product.price,
        description : this.props.product.description,
      }
      this.handleChange = (event) => {
        this.setState({
          [event.target.name] : event.target.value
        })
      }
  }
  

  render(){
    if (!this.state.isEditing){
      return (
        <div id="productObject">
       ???   The product {this.props.product.product_name} can be contacted at {this.props.product.description}
          
          <div>
            <button id="delete" className="button button-delete" onClick={() => this.props.onDelete(this.props.product)}>Delete</button>
            <button id="edit" className="button button-edit" onClick={() => this.setState({isEditing:true}) }>Edit</button>
          </div>
        </div>  
      )
    }
    else{
      return (
        <div id="edit">
            <input type="text" placeholder="Product_name" name="product_Name" onChange={this.handleChange} value={this.state.product_name}/>
            <br/>
            <input type="text" placeholder="Price" name="prIce" onChange={this.handleChange} value={this.state.price}/> 
            <br/>
            <input type="text" placeholder="Description" name="descRiption" onChange={this.handleChange} value={this.state.description}/>
            <br/>
            
            <button id="cancel" onClick={() => this.setState({isEditing:false})}>Cancel</button>
            <button id="save" onClick={() => {this.props.onSave(this.props.product.product_id, 
            {product_name : this.state.product_name, price : this.state.price, description : this.state.description}); 
                    this.setState({isEditing:true})}}>Save</button>
        </div>
      )
    }
  }
}

export default Product