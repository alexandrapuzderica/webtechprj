import React, {Component} from 'react'
import OrderStore from './OrderStore'
import {EventEmitter} from 'fbemitter'
import Order from './Order'
import OrderForm from './OrderForm'

const ee = new EventEmitter()
const store = new OrderStore(ee)

function addOrder(order){
  store.addOne(order)
}

function deleteOrder(id){
  store.deleteOne(id)
}

function saveOrder(id, order){
  store.saveOne(id, order)
}

class OrderList extends Component{
  constructor(props){
    super(props)
    this.state = {
      orders : [],
      detailsFor : -1,
      selected : null
    }
    this.cancelSelection = () => {
      this.setState({
        detailsFor : -1
      })
    }
    this.selectOrder = (order_number) => {
      store.getOne(order_number)
      ee.addListener('SINGLE_ORDER_LOAD', () => {
        this.setState({
          detailsFor : store.selected.order_number,
          selected : store.selected
        })
      })
    }
  }
  componentDidMount(){
    store.getAll()
    ee.addListener('PRODUCT_LOAD', () => {
      this.setState({
        products : store.content
      })
    })
  }
  render(){
    if (this.state.detailsFor === -1){
      return (
        <div>
          <div>
          <h3>List of orders</h3>
          {this.state.orders.map((a) => 
            <Order order={a} key={a.id} onDelete={deleteOrder} onSave={saveOrder} onSelect={this.selectOrder} />
          )}
          </div>
          <div>
            <UserForm onAdd={addOrder}/>
          </div>
        </div>
      )            
    }
  }
}

export default OrderList



