const { name } = require("ejs");
const express = require("express");
const db = require("mongoose");
const cors = require('cors');

//models
const book = require('./models/book');
const hstory = require('./models/hestory');

const app = express();
app.use(express.json());
app.use(cors());


// sya hello 
app.get('/', (req, res) => {
    res.json({
        "algerai":"mouaiz"
    })
})

// conacted weth db
db.connect("mongodb://abdeelmouaiz09:wXRyjOUEJXISlNvj@ac-h22hkuh-shard-00-00.1yaidwn.mongodb.net:27017,ac-h22hkuh-shard-00-01.1yaidwn.mongodb.net:27017,ac-h22hkuh-shard-00-02.1yaidwn.mongodb.net:27017/?replicaSet=atlas-pgakuq-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Cluster01")
    .then(() => {
        console.log("conacted  wth db  ");

    }).catch((err) => console.log("eroo with db " + err))



//================================ ADD  BOOKS   ENDPOENT ===================================

app.post('/book', (req, res) => {
    const newbook = new book();

    console.log(req.body);


    // info 

    newbook.name = req.body.name
    newbook.auter = req.body.auter
    newbook.scoor = req.body.scoor || 0;
    newbook.link = req.body.link
    newbook.category = req.body.category
    newbook.cover = req.body.cover
    newbook.dat = req.body.dat || 2025
    newbook.type = req.body.type || "hestory";
    // save
    newbook.save().then(() => {
        res.send('تم الانشاء بنجاح ' + req.body.name)
    }).catch((err) => console.log("the err is:" + err))

})
//================================= get all book ===================================================
app.get('/books', async (req, res) => {
    try {
        const dat = await book.find();
        res.send(dat);
        return
    } catch (error) {
        console.log(error);
    }
})

//================================ GET  BOOKS   ENDPOENT ===================================
app.get('/book/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const DATA = await book.findById(id);
        console.log(DATA);
        res.json(DATA)
    } catch (error) {
        console.log(error + "get book erro ");
    }

})

//================================= delet onex book ===================================================
app.delete('/delet/:id', async (req, res) => {
   
    try {
        const id = req.params.id
        console.log(id);
        const dtaa = await book.findByIdAndDelete(id)
        res.send(dtaa)
        return;
        
      } catch (error) {
        console.log(error);
        
      }
      

   
})


app.listen(3000, () => {
    console.log("iam listening i port :  http://localhost:3000/");

})