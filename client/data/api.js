

export default class  Apis {
    // export function Apis () {
   // const query_url = "http://localhost:3001";
    // const res = await fetch(query_url);
    //let data;


     static async getData(){
        const query_url = "http://localhost:3001/";
        let data;
        
        let res = await fetch(query_url, {
            mode: 'no-cors',
            method: "post",
            headers: {
                 "Content-Type": "application/json",
                 "Access-Control-Allow-Origin": "*"
            }
 }).then( function(res){
            data = res.json();
        }

        ).catch(
            console.log('Error in get')
        )
        //let data = await res.json();

        return data;
        
    }
}

        // async function update (){
        //     query_url = "http://localhost:3001";
        //     const res = await put(query_url);
        // }
        // async function remove(){
        //     query_url = "http://localhost:3001";
        //     const res = await delete(query_url);
        // }
        // async function post (){
        //     query_url = "http://localhost:3001";
        //     const res = await post(query_url);
        // }


    
//     
//       return {
//         props: { data }
//       }
    
// }