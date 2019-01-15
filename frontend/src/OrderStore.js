import axios from 'axios'
const SERVER = ' https://projectt-alexandrapuzderica.c9users.io:8080'

class OrderStore{
  constructor(ee){
    this.emitter = ee
    this.content = []
    this.selected = null
  }
  getAll(){
    axios(SERVER + '/orders')
      .then((response) => {
        this.content = response.data
        this.emitter.emit('ORDER_LOAD')
      })
      .catch((error) => console.warn(error))
  }
  addOne(order){
    axios.post(SERVER + '/orders', order)
      .then(() => this.getAll())
      .catch((error) => console.warn(error))
  }
  deleteOne(id){
    axios.delete(SERVER + '/order/' + id)
      .then(() => this.getAll())
      .catch((error) => console.warn(error))
  }
  saveOne(id, client){
    axios.put(SERVER + '/order/' + id, client)
      .then(() => this.getAll())
      .catch((error) => console.warn(error))
  }
  getOne(username){
    axios(SERVER + '/orders/' + username)
      .then((response) => {
        this.selected = response.data
        this.emitter.emit('SINGLE_ORDER_LOAD')
      })
      .catch((error) => console.warn(error))
  }
}

export default OrderStore
