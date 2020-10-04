import React,{Component} from 'react'
import './header.css'

class Header extends Component{
    render(){
        return(
            <div>
                <h2>Welcome to Tic-Tac-Toe Game Challenge!</h2>
                <br/>
                <div>Please select board size 
                <select>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
                </div>
                <br/>
            </div>
        )
    }
}

export default Header;