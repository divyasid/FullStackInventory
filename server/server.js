const express = require( 'express' );
const app = express();
var cors = require('cors')
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cors())
const addressController = require( './controllers/address/index' );
const redis = require( './singletons/redis' );
// :todo: may be to a file
const log = console.log;


const addr1 = { line1: '185 Berry St', city: 'San Francisco', state: 'CA', zip: '94107' };

app.post( '/', async ( req, res ) => {
  log("http post body: ", req.body)
  res.append("Access-Control-Allow-Origin", "*")
  if (req.body === null || Object.keys(req.body).length === 0 ) {
    res.json({error: "No expected Body"});
    return;
  }
  try {
    // :todo: should we check if already present, so reject?
    const addrId = await addressController.add(req.body);
    const addr = await addressController.get(addrId);
    res.json(addr);
  } catch (error) {
    log(error);
    // :todo: may need better rerport
    res.json({error: "Entry create failed"});
  }
});

// // TEST DUMMY
// app.get( '/', ( req, res ) => {
//   console.log("get from server.js is called");
//   res.send({"get": "called"});
// });


app.get( '/', async ( req, res) => {
  // :todo: some error check if key not present?
  log('LOOKOKHEHEHEHHERHEHREH')
  log(req.query)
  log("get key value: ", req.query.contains);
  // res.setHeader('Content-Type', 'application/json')
  // res.statusCode = 200
  try {
    const adrs = await addressController.search(req.query.contains);
    // res.end(JSON.stringify(adrs))
    res.json(adrs);
  } catch (error) {
    // :todo: better error reporting; for now, send empty
    res.json([])
  }
  // res.json({result:"OK"})

  
});

app.delete('/', async ( req, res ) => {
   // :todo: some error check if key not present?
  log("get query paramater id: ", req.query.contains);
  try {
    adrs = await addressController.search(req.query.contains);
    for (item of adrs) {
      await addressController.delete(item.id);
    }
    res.json({ result: "OK", items: adrs.length});
  } catch (error) {
    log(error);
    res.json({error: "Entry may not exist"});
  }
});

app.put('/', async ( req, res ) => {
  log("http put body: ", req.body)
  var adrs;
  try {
    adrs = await addressController.search(req.body.id);
    if (adrs.length == 0) {
      res.json({error: "No Entry to update"});
      return;
    }
    if (adrs.length != 1) {
      res.json({error: "Rejected as matching more than one 1 Entry to update"});
      return;
    }
  } catch (error) {
    log(error);
    res.json({error: "Entry does not exist"})
    return;
  }
  log("current item: ", adrs[0])
  log("updating: ", req.body)
  try {
    await addressController.update( req.body.id, req.body);
    res.json({result: "OK"});
  } catch (error) {
    // :todo: can we decode and do better reporting
    log(error);
    res.json({error: "Entry update failed"})
  }
});

console.log("listening on port: ", process.env.PORT)
app.listen( process.env.PORT );
