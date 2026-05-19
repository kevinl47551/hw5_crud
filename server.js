const express = require('express')
const MongoClient = require('mongodb').MongoClient
const app = express()

app.listen(3000, function () {
  console.log('listening on 3000')
})

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
  // Note: __dirname is the current directory you're in. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
})

MongoClient.connect('mongodb+srv://kl47551:kl@cluster0.kjgvem0.mongodb.net/?appName=Cluster0')
  .then(client => {
    // ...
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')
   

    app.post('/quotes', (req, res) => {
    quotesCollection
        .insertOne(req.body)
        .then(result => {
        console.log(result)
        })
        .catch(error => console.error(error))
    })
    
  })
  .catch(console.error)