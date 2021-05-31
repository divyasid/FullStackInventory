import Head from 'next/head'
import Layout from '../components/layout/layout'
import Link from 'next/link'

export default function Home( {data} ) {
  // async function createAddress() {
  //   const response = await fetch(`http://localhost:3001`, {
  //     body: JSON.stringify({
  //       "line1": "7610 kirwin lane",
  //       "city": "Cambridge",
  //       "state": "MA",
  //       "zip": "02138"
  //     }),
  //       method: 'POST',
  //       mode: 'no-cors',
  //       headers: {
  //         "Access-Control-Allow-Origin": "*",
  //         "Access-Control-Request-Method": "cross-site",
  //         "Referrer-Policy":"unsafe-url",
  //         "Content-Type": "application/json"
  //       }
  //       });
  //   //await response.json();
  //   const result = await response.text();
  //   console.log("response: ", response);
  //   console.log("result: ", result);
  // }
  // createAddress()

  // async function deleteAddress() {
  //   const response = await fetch(`http://localhost:3001`, {
  //     body: JSON.stringify({
  //       "line1": "7610 kirwin lane",
  //       "city": "Cambridge",
  //       "state": "MA",
  //       "zip": "02138"
  //     }),
  //       method: 'DELETE',
  //       mode: 'no-cors',
  //       headers: {
  //         "Access-Control-Allow-Origin": "*",
  //         "Access-Control-Request-Method": "cross-site",
  //         "Referrer-Policy":"unsafe-url",
  //         "Content-Type": "application/json"
  //       }
  //       });
  //   //await response.json();
  //   const result = await response.text();
  //   console.log("response: ", response);
  //   console.log("result: ", result);
  // }

  // async function updateAddress() {
  //   const response = await fetch(`http://localhost:3001`, {
  //     body: JSON.stringify({
  //       "line1": "1111TESTPUT",
  //       "city": "Cambridge",
  //       "state": "MA",
  //       "zip": "02138"
  //     }),
  //       method: 'PUT',
  // //       mode: 'no-cors',
  //       headers: {
  //         "Access-Control-Allow-Origin": "*",
  //         "Access-Control-Request-Method": "cross-site",
  //         "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, POST, DELETE, OPTIONS",
  //         "Access-Control-Allow-Headers": "Content-Type",
  //         "Referrer-Policy":"unsafe-url",
  //         "Content-Type": "application/json"
  //       }
  //       });
    //await response.json();
  //   const result = await response.text();
  //   console.log("response: ", response);
  //   console.log("result: ", result);
  // }

  // updateAddress()
  return (
    <Layout home>
      <Head>
        <title>Overview</title>
      </Head>
      <h1>Overview</h1>
      <p>Welcome to your Lob full-stack take home challenge!</p>
      <p>Please head over to <Link href="/address-book"><a className="underline">Address book</a></Link> to get started</p>
    </Layout>
  )
}




// ninjas!!!!!!!
// export const getStaticProps = async () => {
//   const res = await fetch('https://jsonplaceholder.typicode.com/users');
//   const data = await res.json();

//   return {
//     props: { ninjas: data }
//   }
// }

// // export default function Home( {ninjas} ) {
// const Ninjas = ({ ninjas }) => {
//   return (
//     <div>
//       <h1>All Ninjas</h1>
//       {ninjas.map(ninja => (
//         <div key={ninja.id}>
//           <a>
//             <h3>{ ninja.id }</h3>
//           </a>
//         </div>
//       ))}
//       </div>
//   );
//       }


// export default Ninjas;

// export const postServerData = async () => {
//     const res = await fetch('http://localhost:3001/', {
//       body: JSON.stringify({
//         'q': 'a'
//       }),
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       method: 'POST'
//     })
//     .then(response => {
//       if(response.ok){
//         // response.json().then((data) => {
//         //   console.log(data)
//         // });
//         console.log("Working!!");
//       }else{
//         throw 'There is something wrong'
//       }
//     }).
//     catch(error => {
//         console.log(error);
//     });
//   }
  
  