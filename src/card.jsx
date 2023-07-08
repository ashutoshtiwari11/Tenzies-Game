import React from "react";

export default function Card(props){
     
  const  styles={
        backgroundColor: props.isHeld ? "#59E391" : 'rgb(169, 255, 255)',
    };
    

return(
    <div className="dice" style={styles} onClick={props.holdDice}>
        <h2>{props.value}</h2>
    </div>
    )
}
