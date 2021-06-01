import Head from 'next/head'
import Layout from '../components/layout/layout'
import Input from '../components/input/input'
import Card from '../components/card/card'
import React, { useState, useEffect } from 'react';


export const getStaticProps = async () => {
  const query_url = "http://localhost:3001/v1/addresses?contains=";
  const res = await fetch(query_url);
  const data = await res.json();
  return {
    props: { data }
  }
}

const fetchAddresses = async (query) => {
  let query_url = "http://localhost:3001/v1/addresses";
  if (query) {
    query_url += `?contains=${query}`;
  }
  const res = await fetch(query_url);
  const data = await res.json();
  return data;
}

export default function Home({ data }) {
  console.log('abc', data)
  const [addressList, setAddressList] = useState(data);
  const [searchInput, setSearchInput] = useState('');
  let editState = true;
  let addState = true;

  const handleChange = async (chilData) => {

    // console.log('searching', chilData)

    setSearchInput(chilData.value)
    let data = await fetchAddresses(chilData.value)

    setAddressList(data)

    // var temp = [chilData];

    // addressList.forEach(function(entry) {
    //   console.log('lkj',entry);
    // });

    // addressList.forEach(function (x) {
    //   // x.forEach(function (y) {
    //     // console.log('y)
    //   let newAddressList = x.filter((address)=>{
    //     Object.values(address).includes(chilData.value)
    //   })
    //   console.log('xyz',newAddressList)
    //   });

    // });  
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
          // label='search'
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



        {addressList.length > 0 &&
          addressList.map((address) => {
            let { id, city, line1, state, zip } = address;

            return (
              <Card
                id={id} city={city} line={line1} state={state} zip={zip}
                editState={editState} />
            )


          })
        }
      </div>
    </Layout>
  )
}

