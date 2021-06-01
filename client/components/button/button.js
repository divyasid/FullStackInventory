import styles from './button.module.scss'
import React, { useState } from 'react';

export default function Button({ children, variant, type, action, pCB, disabled }) {
  const [showState, setShowState] = useState(false);

  const handleClick = (e) => {
    console.log('value_shoe', true)
    setShowState(true)
    if (action === 'delete') {
      pCB();
    } else if (type === 'showing') {
      if (action === 'save') {
        pCB(false)
      } else if (action === 'add') {
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