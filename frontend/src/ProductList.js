import React, {Component} from 'react'
import ProductStore from './ProductStore'
import {EventEmitter} from 'fbemitter'
import Product from './Product'
import ProductForm from './ProductForm'

const ee = new EventEmitter()
const store = new ProductStore(ee)

function addProduct(product){
  store.addOne(product)
}

function deleteProduct(id){
  store.deleteOne(id)
}

function saveProduct(id, product){
  store.saveOne(id, product)
}

class ProductList extends Component{
  constructor(props){
    super(props)
    this.state = {
      products : [],
      detailsFor : -1,
      selected : null
    }
    this.cancelSelection = () => {
      this.setState({
        detailsFor : -1
      })
    }
    this.selectProduct = (product_name) => {
      store.getOne(product_name)
      ee.addListener('SINGLE_PRODUCT_LOAD', () => {
        this.setState({
          detailsFor : store.selected.product_name,
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
          <h3>List of products</h3>
          {this.state.products.map((a) => 
            <Product product={a} key={a.id} onDelete={deleteProduct} onSave={saveProduct} onSelect={this.selectProduct} />
          )}
          </div>
          <div>
            <UserForm onAdd={addProduct}/>
          </div>
        </div>
      )            
    }
  }
}

export default ProductList



