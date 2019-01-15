import React, {Component} from 'react'

class Item extends Component{
  constructor(props){
      super(props)
      console.warn(this.props)
      this.state = {
        isEditing : false,
        quantity : this.props.item.quantity,
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
        <div id="ite,Object">
????          The item {this.props.item.quantity} can be contacted at {this.props.user.address}
          
          <div>
            <button id="delete" className="button button-delete" onClick={() => this.props.onDelete(this.props.user)}>Delete</button>
            <button id="edit" className="button button-edit" onClick={() => this.setState({isEditing:true}) }>Edit</button>
          </div>
        </div>  
      )
    }
    else{
      return (
        <div id="edit">
            <input type="text" placeholder="Name" name="appointmentDate" onChange={this.handleChange} value={this.state.name}/>
            <br/>
            <input type="text" placeholder="Username" name="userName" onChange={this.handleChange} value={this.state.username}/> 
            <br/>
            <input type="text" placeholder="Password" name="passWord" onChange={this.handleChange} value={this.state.password}/>
            <br/>
            <input type="text" placeholder="Address" name="userAddress" onChange={this.handleChange} value={this.state.address}/>
            
            <button id="cancel" onClick={() => this.setState({isEditing:false})}>Cancel</button>
            <button id="save" onClick={() => {this.props.onSave(this.props.user.user_id, 
            {name : this.state.name, username : this.state.username, password : this.state.password, address : this.state.address}); 
                    this.setState({isEditing:true})}}>Save</button>
        </div>
      )
    }
  }
}

export default User