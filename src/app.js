import React,{Component} from 'react';
import './app.css';

function Square(props)  {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
}
  
class Board extends Component {

    renderSquare(i) {
      return <Square value={this.props.squares[i]} 
      onClick={()=>this.props.onClick(i)}
      />;
    }

    render() {

      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
}
  
class Game extends Component {

    constructor(props){
      super(props);
      this.state ={
        history:[{
          squares: Array(9).fill(null),
          click_pos:{x:null,y:null}
        }],
        stepNumber: 0,
        xIsNext:true,
      };
    }

    jumpToMove(step){
        this.setState({
          stepNumber:step,
          xIsNext: (step%2)===0,
        });
        
    }


    handleClick(i){
      // copy the old states instead of changing it directly
      const history = this.state.history.slice(0,this.state.stepNumber+1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      const click_pos = {...current.click_pos};
      
      //if there is already a winner or the square[i] has been already filled 
      //then directly return
      if(calculateWinner(squares)[0] || squares[i]){
        return;
      }

      squares[i]= this.state.xIsNext?'X':'O';
      click_pos.x = Math.floor(i/3)+1;
      click_pos.y = i%3 +1;

      this.setState({
        history:history.concat([{
          squares:squares,
          click_pos:click_pos
        }]),
        xIsNext:!this.state.xIsNext,
        stepNumber:history.length,
      });
    }
    
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
      const even = calculateFinal(current.squares);

      const moves = history.map((step,move)=>{
        const desc = move ? 'Go to move #'+move : 'Go to game start';
        const pos = step.click_pos.x?" ("+step.click_pos.x+","+step.click_pos.y+")":"";

        return(
          <li key={move}>
            <button onClick={
              (e)=>{
                this.jumpToMove(move);
                const el = document.getElementsByClassName("move");
                el[move].style.fontWeight="bold";
                }
              } 
              className="move" 
            >
            {desc+pos}
            </button>
          </li>
        )
      });


      let status;
      if(winner[0]){
          status = 'Winner: '+winner[0]+" Grid:"+winner[1]+","+winner[2]+","+winner[3];
      }else if(even){
          status = 'This is a Even Game';
      }else{
          status = 'Next player: '+(this.state.xIsNext? 'X':'O');
      };

      return (
        <div className="game">
          <div className="game-board">
            <Board 
            squares={current.squares} 
            onClick={(i)=>this.handleClick(i)}
            />
          </div>

          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
}
 
export default Game

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] 
      && squares[a] === squares[c]) {
      return [squares[a],a,b,c];
    }
  }
  return [null];
}

function calculateFinal(squares){
  for(let i=0;i<9;++i){
    if(!squares[i]){
      return false;
    }
  }
  return true;
}
