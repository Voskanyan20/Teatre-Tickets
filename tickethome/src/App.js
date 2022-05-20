import './App.css';
import React, {Component} from 'react';
import _ from "lodash"
let ROW = 15
let COLUMN = 15
class App extends Component {
  constructor(props) {
    super(props);
      let tickets;
      try{
          tickets = JSON.parse(localStorage.getItem('tickets')) || [];
      }catch (error) {
          tickets =[]
      }
      this.state={
          tickets,
          formMenu: false,
          info: [],
          value: '',
      }
  }
    change = (event)=>{
        this.setState({value: event.target.value})
    }
  pay = (row,colum)=>{
      const{tickets,value} = this.state
      const cicle = tickets.findIndex(finder => finder.colum === colum && finder.row === row);
      if(cicle > -1){
        tickets.splice(cicle , 1)
      }else {
          tickets.push({row ,colum})
      }
      this.setState({tickets})
  }
  pay = () =>{
      const{forMenu} = this.state
      this.setState({forMenu: !forMenu})
  }

    add = (row,colum)=>{
        const{tickets,value} = this.state
        tickets.push({
            name: value,
        })
        localStorage.setItem("Ticket" , JSON.stringify(tickets))
        this.setState({tickets})
    }
    exit = ()=>{
      const{formenu} = this.state
        this.setState({formenu: !formenu})
    }
  render() {
      const{tickets,forMenu,info,value} = this.state
    return (
        <div>
            <table className='table'>
              <tbody>
                {_.range(1, ROW + 1).map(row => (<tr key={row}>
                    {_.range(1, COLUMN + 1).map(colum => {
                        const actived = tickets.find(finder=>finder.colum === colum && finder.row === row);
                        return(
                            <td key={colum} className={actived ?'active' :null} onClick={()=>this.pay(row,colum)}>{`${row}/${colum}`}</td>
                        ) })}
                </tr>))}
              </tbody>
            </table>
            {forMenu?
                <div className='form'>
                <form>
                    <p></p>
                    <input value={value} onChange={this.change} type='text' placeholder='Please write your Name'/>
                    <input type='tel' placeholder='Please Write your phone number'/>
                </form>
                <button onClick={this.exit}>Exit</button>
                <button onClick={this.add}>Add</button>
            </div>:null}
        </div>
    );
  }
}

export default App;
