import styles from './card.module.scss'
import Button from '../button/button'
import Input from '../input/input'
import React, { useState } from 'react';


export default function Card({children, addState, editState, street, city, state, zip, line, id}) {

  let _inputState = {
    line1:"",
    city: "",
    state: "",
    zip:""
  }

  if(city && state && zip && line){
    console.log('check', state, city, zip,line)
    _inputState = {
      line1: line,
    city: city,
    state:state,
    zip: zip
    }
  }
  
  
  // const [addState, setAddState] = useState(false);
 const [showState, setShowState] = useState(false);
 const [disabled, setDisabled] = useState(false);
 const [inputState, setinputState] = useState(_inputState);


function clickSave() {
  // const addr = {
  //     line1: inputState.line,
  //     city: inputState.city,
  //     state: inputState.state,
  //     zip: inputState.zip,
  //    
  // }
  

  //createAddress(addr);




};

 function handleShow (childData) {
   

   if(!childData)
   {
    console.log("((",inputState);
    fetch('http://localhost:3001/', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
      },
    
      body: JSON.stringify(inputState),
    })
    .then(response => response.json())
    .then(data => {
      setShowState(childData)
      console.log('Success:', data);
      window.location.reload();
    })
    .catch((error) => {
      setShowState(childData)
      alert('add adddress failed');
      console.error('Error:', error);
    });

  }
   else{
    setShowState(childData)
   }
  //console.log('come to card', childData)

}

 const handleClick = (e) => {
   console.log()
  setShowState(true)
 }

 const handleChange = (data) => {

  // if(inputState.city || inputState.line1 || inputState.state || inputState.zip === ''){
  //   setDisabled(true);
  // }else{
  //   setDisabled(false)
  // }


  setinputState({...inputState,[data.name]:data.value})
 }



 console.log('form', inputState);

  return (
  <div className={styles.card}>
    <div className={`flex flex-wrap justify-between items-center`}>
      <div className="mb-4 md:mb-0">
      <p>{city }</p>
        <p>{line} {city} {state} {zip}</p>
      </div>
      <div >
        {addState ? 
          <Button variant="secondary" 
          //onClick={handleClick}
          pCB={handleShow}
          type='showing'
          action='add'
          >Add Address</Button>
        : 
          <>
            <Button 
            pCB={handleShow}
            type='showing'
            action='add'
            variant="secondary">Edit</Button>
            <Button onClick={()=> clickDelete} variant="error">Delete</Button>        
          </>
        }
      </div>
    </div>
    <div className={`border-2 border-purple p-8 mt-8 w-full md:w-1/2 ${showState ? styles['card__edit--visible']: styles['card__edit']}`}>
      <Input pCB={handleChange} label='Line1'  name="line1" value={inputState.line1}></Input>
      <Input pCB={handleChange} label='City' name="city" value={inputState.city}></Input>
      <Input pCB={handleChange} label='State' name="state" value={inputState.state}></Input>
      <Input pCB={handleChange} label='Zip' name="zip" value={inputState.zip}></Input>
      <Button pCB={handleShow} onclick={clickSave} disabled={disabled} type='showing' action='save' variant="primary">Save</Button>
    </div>
  </div>
  )
}
