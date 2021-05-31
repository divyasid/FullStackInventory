import styles from './button.module.scss'
import React, { useState } from 'react';

// function shoot() {
//   console.log('clicked buttoni')
//   alert("Great Shot!");
// }

export default function Button({children, variant, type, action, pCB, disabled}) {
  // children are all buttons
  // console.log(children)

  const [showState, setShowState] = useState(false);



  const handleClick = (e) => {
    console.log('value_shoe', true)
   setShowState(true)
   if (type==='showing'){
     if(action==='save'){
  
       pCB(false)
     }if(action==='add'){
      pCB(true)
    }
  
   }

  }
  

  return (
    <button onClick={handleClick} 
    showState={showState} 
    handleShow={showState}
    disabled={disabled}
    className={`mr-2 ${styles.button} ${styles[`button--${variant}`]}`}>{children}</button>
  )
}