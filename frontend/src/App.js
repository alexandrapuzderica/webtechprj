import React, { Component } from 'react'
import './App.css'
import UserList from './UserList'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Online Shop</h1>
        </header>
        <UserList/>
      </div>
    )
  }
}

export default App