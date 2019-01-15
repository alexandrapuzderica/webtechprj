import React, {Component} from 'react'

class Order extends Component{
  constructor(props){
      super(props)
      console.warn(this.props)
      this.state = {
        isEditing : false,
        order_number : this.props.product.order_number,
        price : this.props.product.price,
        payment : this.props.product.payment,
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
        <div id="orderObject">
       ???   The order {this.props.product.product_name} can be contacted at {this.props.order.payment}
          
          <div>
            <button id="delete" className="button button-delete" onClick={() => this.props.onDelete(this.props.order)}>Delete</button>
            <button id="edit" className="button button-edit" onClick={() => this.setState({isEditing:true}) }>Edit</button>
          </div>
        </div>  
      )
    }
    else{
      return (
        <div id="edit">
            <input type="text" placeholder="Order_number" name="order_Number" onChange={this.handleChange} value={this.state.order_number}/>
            <br/>
            <input type="text" placeholder="Price" name="prIce" onChange={this.handleChange} value={this.state.price}/> 
            <br/>
            <input type="text" placeholder="Pyament" name="paYment" onChange={this.handleChange} value={this.state.payment}/>
            <br/>
            
            <button id="cancel" onClick={() => this.setState({isEditing:false})}>Cancel</button>
            <button id="save" onClick={() => {this.props.onSave(this.props.order.order_id, 
            {order_number : this.state.order_number, price : this.state.price, payment : this.state.payment}); 
                    this.setState({isEditing:true})}}>Save</button>
        </div>
      )
    }
  }
}

export default Order