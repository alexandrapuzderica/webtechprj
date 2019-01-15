import axios from 'axios'
const SERVER = ' https://projectt-alexandrapuzderica.c9users.io:8080'

class ProductStore{
  constructor(ee){
    this.emitter = ee
    this.content = []
    this.selected = null
  }
  getAll(){
    axios(SERVER + '/products')
      .then((response) => {
        this.content = response.data
        this.emitter.emit('PRODUCT_LOAD')
      })
      .catch((error) => console.warn(error))
  }
  addOne(product){
    axios.post(SERVER + '/products', product)
      .then(() => this.getAll())
      .catch((error) => console.warn(error))
  }
  deleteOne(id){
    axios.delete(SERVER + '/product/' + id)
      .then(() => this.getAll())
      .catch((error) => console.warn(error))
  }
  saveOne(id, client){
    axios.put(SERVER + '/product/' + id, client)
      .then(() => this.getAll())
      .catch((error) => console.warn(error))
  }
  getOne(username){
    axios(SERVER + '/products/' + username)
      .then((response) => {
        this.selected = response.data
        this.emitter.emit('SINGLE_PRODUCT_LOAD')
      })
      .catch((error) => console.warn(error))
  }
}

export default ProductStore
