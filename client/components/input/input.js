import styles from './input.module.scss'
import React, { useState } from 'react';

export default function Input({ icon, value, label, action, pCB, name }) {

  const [inputState, setinputState] = useState({
    line1: "",
    city: "",
    state: "",
    zip: ""
  });

  const handleChange = (e) => {

    pCB({ name: e.target.name, value: e.target.value })

  }

  return (

    <div className="mb-8">
      <label className="block text-lg mb-4" htmlFor="input">{label}</label>
      {icon && <img className={styles['input__icon']} src={`/${icon}`} />}
      <input
        onChange={handleChange}
        className={`block w-full ${styles.input}`} value={value} name={name} type="text" placeholder={name} />
    </div>



  )
}




