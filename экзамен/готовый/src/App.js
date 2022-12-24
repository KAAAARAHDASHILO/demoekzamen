import React, { useState } from 'react';
import Web3 from 'web3';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserList } from './Contract/UserList';
import { Context } from './Contract/Context';
import Routers from './router';
const App = () => {
  const [web3] = useState(new Web3('HTTP://127.0.0.1:8545'));
  const AddressContract = '0xF5aF73eD038824688491D19925786CcCAee2f026';
  const [Contract] = useState(new web3.eth.Contract(UserList, AddressContract));
  const [color, setColor] = useState(false)
  return (
    <Context.Provider value={{ color, setColor, web3, Contract }}>
      <div className={`Backgroud-${color ? "red" : "black"}`}>
        <Router> 
            <Routers />
        </Router>
      </div>
    </Context.Provider>)
}
export default App