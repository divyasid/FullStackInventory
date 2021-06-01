const express = require('express');
const cors = require('cors')
const addressController = require('./controllers/address/index');
const redis = require('./singletons/redis');

const corsOptions = {
  origin: 'http://localhost:3000',
  exposedHeaders: ['Content-Type', 'application/json']
}

const app = express();
app.use(cors(corsOptions))
app.use(express.json());

// :todo: potentially may be to a file
const log = console.log;

app.post('/v1/addresses', async (req, res) => {
  log("http post body: ", req.body)
  if (req.body === null || Object.keys(req.body).length === 0) {
    res.json({ error: "No expected Body" });
    return;
  }
  try {
    // :todo: check if already present, so reject?
    const addrId = await addressController.add(req.body);
    const addr = await addressController.get(addrId);
    res.json(addr);
  } catch (error) {
    log(error);
    // :todo: may need better rerport
    res.json({ error: "Entry create failed" });
  }
});


app.get('/v1/addresses', async (req, res) => {
  var searchstr = req.query.contains;
  if (searchstr == null || searchstr.length === 0) {
    searchstr = '';
  }
  log("get key value: ", searchstr);
  try {
    const adrs = await addressController.search(searchstr);
    res.json(adrs);
  } catch (error) {
    // :todo: better error reporting; for now, send empty
    res.json([])
  }
});

app.delete('/v1/addresses/:objid', async (req, res) => {
  // :todo: some error check if key not present?
  log("delete req.", req.params);
  const delete_id = req.params.objid;
  if (delete_id.length === 0) {
    res.json({ error: "No ObjectId to Delete" })
    return
  }
  log("delete get query paramater id: ", delete_id);
  try {
    await addressController.delete(delete_id);
    res.json({ result: "OK", items: 1 });
  } catch (error) {
    log(error);
    res.json({ error: "Entry may not exist" });
  }
});

app.put('/v1/addresses', async (req, res) => {
  log("http put body: ", req.body)
  var adrs;
  try {
    adrs = await addressController.search(req.body.id);
    if (adrs.length == 0) {
      res.json({ error: "No Entry to update" });
      return;
    }
    if (adrs.length != 1) {
      res.json({ error: "Rejected as matching more than one 1 Entry to update" });
      return;
    }
  } catch (error) {
    log(error);
    res.json({ error: "Entry does not exist" })
    return;
  }
  log("current item: ", adrs[0])
  log("updating: ", req.body)
  try {
    await addressController.update(req.body.id, req.body);
    res.json({ result: "OK" });
  } catch (error) {
    // :todo: decode and do better reporting
    log(error);
    res.json({ error: "Entry update failed" })
  }
});

console.log("listening on port: ", process.env.PORT)
app.listen(process.env.PORT);
