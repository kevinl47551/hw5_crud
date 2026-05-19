const express = require('express')
const MongoClient = require('mongodb').MongoClient
const app = express()

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(express.json())

MongoClient.connect('mongodb+srv://kl47551:kl@cluster0.kjgvem0.mongodb.net/?appName=Cluster0')
  .then(client => {
    // ...
    const db = client.db('idea-tracker')
    const ideasCollection = db.collection('ideas')
   

    app.post('/ideas', (req, res) => {
    ideasCollection
        .insertOne(req.body)
        .then(result => {
        res.redirect('/')
        })
        .catch(error => console.error(error))
    })

    app.get('/', (req, res) => {
        db.collection('ideas')
            .find()
            .toArray()
            .then(results => {
                res.render('index.ejs', { ideas: results })
            })
            .catch(error => console.error(error))
    })
    

    app.put('/ideas', (req, res) => {
        console.log(req.body)
        ideasCollection
            .findOneAndUpdate(
                { title: req.body.oldTitle }, 
                {$set: {
                    title: req.body.title,
                    description: req.body.description,
                }},
                {upsert: true,}
            )
            .then(result => {
                res.json('Success')
            })
            .catch(error => console.error(error))
    })


    app.delete('/ideas', (req, res) => {
        ideasCollection
        .deleteOne({ titleDelete: req.body.title })
        .then(result => {
            if (result.deletedCount === 0) {
                return res.json('No idea to delete')
            }
            res.json(`Deleted idea`)
        })
        .catch(error => console.error(error))
    })

  })
  .catch(console.error)


app.listen(3000, function () {
  console.log('listening on 3000')
})