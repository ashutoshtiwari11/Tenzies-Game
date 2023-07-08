import React, { useEffect } from "react";
import Card from "./card.jsx";
import { nanoid } from "nanoid";
import Confetti from 'react-confetti'

export default function App() {
  const [state, setState] = React.useState([]);
  let [win, setWin] = React.useState(false);
 
  React.useEffect(() => {
    const firstValue = state.length > 0 ? state[0].value : null;
    const allSameValue = state.every(die => die.value === firstValue);
   const allheld = state.every(die => die.isheld === true)
    setWin(allSameValue && allheld);
  }, [state]);
  
   
  useEffect(() => {
    setState(allnewdice());
  }, []);

  function allnewdice() {
    let newarray = [];
    for (let i = 0; i < 10; i++) {
      newarray.push({ value: Math.floor(Math.random() * 6) + 1, id: nanoid(), isheld: false });
    }
    return newarray;
  }

  function holdDice(id) {
    setState(oldDice =>
      oldDice.map(die =>
        die.id === id ? { ...die, isheld: !die.isheld } : die
      )
    );
  }
function newdice(){
   const die = {
     value: Math.floor(Math.random() * 6) + 1,
     isheld: false,
     id: nanoid(),
   }
   return die;
  }
  function rolldice() {
    if (!win) {
    setState(previous => previous.map(
       die => (die.isheld ? die : newdice())) 
           ) 
          } 
          else {
            win = false;
            setState(allnewdice()) ;
          }
    }


  function renderDice() {
    return state.map(die => (
      <Card
        key={die.id}
        value={die.value}
        isHeld={die.isheld}
        holdDice={() => holdDice(die.id)}
      />
    ));
  }
  function Reset(){
   setState(allnewdice) 
  }

  return (
    <>
    {win && <Confetti />}
    <h1 className="title">Tenzies</h1>
            <p className="instructions"> Roll until all dice are the same. <br /> Click each die to freeze it at its current value between rolls.</p>
      <div className="die-div">
        <div className="main">{renderDice()}</div>
      <div><button onClick={rolldice} > {win ? 'New Game' : 'Roll' } </button></div>
      <div><button onClick={Reset}> Reset </button></div>
    </div>
    </>
  );
}