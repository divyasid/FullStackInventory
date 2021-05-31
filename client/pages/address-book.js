import Head from 'next/head'
import Layout from '../components/layout/layout'
import Input from '../components/input/input'
import Card from '../components/card/card'
import React, { useState, useEffect } from 'react';
// import apis from '../data/api';
// import Button from '../components/button/button'


export const getStaticProps = async () => {
  //   const url = 'http://localhost:3001?contains=' + new URLSearchParams({
  //     contains: 'divya'
  // }))
//     const res = await fetch('http://localhost:3001?contains=' + new URLSearchParams('MA'))

    const query_url = "http://localhost:3001";
    const res = await fetch(query_url);
    const data = await res.json();
  
    return {
      props: { data }
    }
  }


// async function getStaticProps () {
//   //   const url = 'http://localhost:3001?contains=' + new URLSearchParams({
//   //     contains: 'divya'
//   // }))
// //     const res = await fetch('http://localhost:3001?contains=' + new URLSearchParams('MA'))

//     const query_url = "http://localhost:3001";
//     const res = await fetch(query_url);
//     const data = await res.json();
//   
//     return {
//       props: { data }
//     }
//   }

export default function Home({data}) {
  // console.log(data)
  // True is Edit, False is Add
  // var state = true
  const [addressList, setAddressList] = useState([data]);
  const [searchInput, setSearchInput] = useState('');
  let editState = true;
  let addState = true;

  // console.log('data12345', addressList);
  

//   async function getAddresses() {
//     console.log('get api called from component')
//     // apis.getData();
//     const query_url = "http://localhost:3001";
//     const res = await fetch('http://localhost:3001');
//     const data = await res.json();
//     console.log('data coming', data)
//     setAddressList(data)
//   
// //     return {
// //       props: { data }
// //     }

//   }

const handleChange = (chilData) => {

  // console.log('searching', chilData)

  setSearchInput(chilData.value)

  var temp = [chilData];
  
  // addressList.forEach(function(entry) {
  //   console.log('lkj',entry);
  // });

  addressList.forEach(function (x) {
    // x.forEach(function (y) {
      // console.log('y)
    let newAddressList = x.filter((address)=>{
      Object.values(address).includes(chilData.value)
    })
    console.log('xyz',newAddressList)
    });

// });

  // let add = 0;
  // for(add = 0; add < addressList.length; add++) {
  //   console.log('abc',addressList[add])
  // }

  // addressList.forEach((address) => {
  //   console.log('xyz',address)
  // })
  
  // let newAddressList = addressList.filter((address)=>{
    
  //  console.log('xyz',address)
  //  console.log('jldajsgljsdlgjl')
  //   // console.log('abcde', Object.values(address))
  //   //Object.values(address).includes(chilData.value)

    

  //   return temp.indexOf(address)

  // })

  // console.log('New List', newAddressList)
  // setAddressList(newAddressList);
  
 }

  useEffect(()=>{
    console.log('useEffect')
    // getAddresses()
    
  },[addressList]);
  
  const address = {
    "line1": "Massachusetts Hall",
    "city": "Cambridge",
    "state": "MA",
    "zip": "02138"
  }
  return (
    <Layout home>
      <Head>
        <title>Address Book</title>
      </Head>
      <h1 className="mb-8">Address Book</h1>
      <div className="w-full md:w-1/2">
        <Input
          icon="icon-search.svg"
          label='search'
          name='search'
          value={searchInput}
          pCB={handleChange}
        ></Input>
      </div>
      <div className="mt-10">

        <Card 
        addState={addState}
        >
          <p className="text-lg">Add a new user's address</p>
        </Card>



        { data.length > 0 &&
          data.map((address)=>{
            let {id, city, line1, state, zip} = address;

            return(
              <Card 
              //address={address}
              id={id} city={city} line={line1} state={state} zip={zip }
              editState={editState} />
            )
        

          })
        }



      </div>
    </Layout>
  )
}


// export const getStaticProps = async () => {
//   //   const url = 'http://localhost:3001?contains=' + new URLSearchParams({
//   //     contains: 'divya'
//   // }))
// //     const res = await fetch('http://localhost:3001?contains=' + new URLSearchParams('MA'))

//     const query_url = "http://localhost:3001?contains=".concat("MA");
//     const res = await fetch(query_url);
//     const data = await res.json();
//   
//     return {
//       props: { data }
//     }
//   }