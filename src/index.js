import Game from './app'
import Header from './header'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Index extends Component{
    render(){
        return(
            <div>
                <Header/>
                <Game/>
            </div>
        )
    }
}

// ========================================
  
  ReactDOM.render(
    <Index/>,
    document.getElementById('root')
  );

  