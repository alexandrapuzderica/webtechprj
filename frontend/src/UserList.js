import React, {Component} from 'react'
import UserStore from './UserStore'
import {EventEmitter} from 'fbemitter'
import User from './User'
import UserForm from './UserForm'

const ee = new EventEmitter()
const store = new UserStore(ee)

function addUser(user){
  store.addOne(user)
}

function deleteUser(id){
  store.deleteOne(id)
}

function saveUser(id, user){
  store.saveOne(id, user)
}

class UserList extends Component{
  constructor(props){
    super(props)
    this.state = {
      users : [],
      detailsFor : -1,
      selected : null
    }
    this.cancelSelection = () => {
      this.setState({
        detailsFor : -1
      })
    }
    this.selectUser = (username) => {
      store.getOne(username)
      ee.addListener('SINGLE_USER_LOAD', () => {
        this.setState({
          detailsFor : store.selected.username,
          selected : store.selected
        })
      })
    }
  }
  componentDidMount(){
    store.getAll()
    ee.addListener('USER_LOAD', () => {
      this.setState({
        users : store.content
      })
    })
  }
  render(){
    if (this.state.detailsFor === -1){
      return (
        <div>
          <div>
          <h3>List of users</h3>
          {this.state.users.map((a) => 
            <User user={a} key={a.id} onDelete={deleteUser} onSave={saveUser} onSelect={this.selectUser} />
          )}
          </div>
          <div>
            <UserForm onAdd={addUser}/>
          </div>
        </div>
      )            
    }
  }
}

export default UserList



