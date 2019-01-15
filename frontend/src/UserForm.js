import React,{Component} from 'react'

class UserForm extends Component{
  constructor(props){
    super(props)
    this.state = {
      user : '',
      username: '',
      password: '',
      address: ''
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
      Name : <input type="text" name="userName" onChange={this.handleChange}/>
      Username : <input type="text" name="userUsername" onChange={this.handleChange}/>
      Password : <input type="password" name="userPassword" onChange={this.handleChange} />
      Address : <input type="email" name="userAddress" onChange={this.handleChange} />
      <button id="add" className = "button button-add" onClick={() => this.props.onAdd({
      name: this.state.name,
      username: this.state.username,
      password : this.state.password,
      address: this.state.address
      })}>Add user</button>
      
    </div>)
  }
}

export default UserForm