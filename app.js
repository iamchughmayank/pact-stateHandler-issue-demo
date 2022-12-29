import express from 'express';
const app = express()
const port = 3000

app.get('/clients/:id', (req, res) => {
  if (req.params.id == 23) {
    return res.send({
        account_status: "test",
        active: 1,
        client_id: 24297,
        client_name: "Rowe - Cummings",
        created: "2017-07-14T16:32:29.000Z",
        email_address: "Grover.McCullough@yahoo.com"
      });
  } else {
    res.status(404).send('Cannot find the client id')
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})