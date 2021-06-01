import styles from './card.module.scss'
import Button from '../button/button'
import Input from '../input/input'
import React, { useState } from 'react';


export default function Card({ children, addState, editState, street, city, state, zip, line, id }) {
  let _inputState = {
    line1: "",
    city: "",
    state: "",
    zip: ""
  }

  if (city && state && zip && line && id) {
    console.log('check', state, city, zip, line)
    _inputState = {
      id: id,
      line1: line,
      city: city,
      state: state,
      zip: zip
    }
  }

  const [showState, setShowState] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [inputState, setinputState] = useState(_inputState);

  function handleDelete(childData) {
    console.log('handleDelete:', childData)
    const delete_url = "http://localhost:3001/v1/addresses/" + childData;
    fetch(delete_url, {
      method: 'DELETE'
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

  function handleShow(childData) {
    let method;
    if (addState) {
      method = 'POST';
    } else if (editState) {
      method = 'PUT';
    }

    if (!childData) {
      fetch('http://localhost:3001/v1/addresses', {
        method: method,
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
    else {
      setShowState(childData)
    }
  }

  const handleClick = (e) => {
    console.log()
    setShowState(true)
  }

  const handleChange = (data) => {
    setinputState({ ...inputState, [data.name]: data.value })
  }

  return (
    <div className={styles.card}>
      <div className={`flex flex-wrap justify-between items-center`}>
        <div className="mb-4 md:mb-0">
          <p>{city}</p>
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
              <Button onClick={() => clickDelete} pCB={handleDelete} action='delete' objectId={_inputState.id} variant="error">Delete</Button>
            </>
          }
        </div>
      </div>
      <div className={`border-2 border-purple p-8 mt-8 w-full md:w-1/2 ${showState ? styles['card__edit--visible'] : styles['card__edit']}`}>
        <Input pCB={handleChange} label='Line1' name="line1" value={inputState.line1}></Input>
        <Input pCB={handleChange} label='City' name="city" value={inputState.city}></Input>
        <Input pCB={handleChange} label='State' name="state" value={inputState.state}></Input>
        <Input pCB={handleChange} label='Zip' name="zip" value={inputState.zip}></Input>
        <Button pCB={handleShow} disabled={disabled} type='showing' action='save' variant="primary">Save</Button>
      </div>
    </div>
  )
}
