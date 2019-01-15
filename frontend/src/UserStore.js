import axios from 'axios'
const SERVER = ' https://projectt-alexandrapuzderica.c9users.io:8080'

class UserStore{
  constructor(ee){
    this.emitter = ee
    this.content = []
    this.selected = null
  }
  getAll(){
    axios(SERVER + '/users')
      .then((response) => {
        this.content = response.data
        this.emitter.emit('USER_LOAD')
      })
      .catch((error) => console.warn(error))
  }
  addOne(user){
    axios.post(SERVER + '/users', user)
      .then(() => this.getAll())
      .catch((error) => console.warn(error))
  }
  deleteOne(id){
    axios.delete(SERVER + '/users/' + id)
      .then(() => this.getAll())
      .catch((error) => console.warn(error))
  }
  saveOne(id, client){
    axios.put(SERVER + '/user/' + id, client)
      .then(() => this.getAll())
      .catch((error) => console.warn(error))
  }
  getOne(username){
    axios(SERVER + '/users/' + username)
      .then((response) => {
        this.selected = response.data
        this.emitter.emit('SINGLE_USER_LOAD')
      })
      .catch((error) => console.warn(error))
  }
}

export default UserStore
