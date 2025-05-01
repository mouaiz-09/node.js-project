const { name } = require("ejs");
const express = require("express");
const db = require("mongoose");
const cors = require('cors');

//models
const book = require('./models/book');
const hstory = require('./models/hestory');
const Theme = require('./models/admin');

const app = express();
app.use(express.json());
app.use(cors());
// =========test ===============
require('dotenv').config();

const dbpass = process.env.DB_PASSWORD;








//==================
// sya hello 
app.get('/', (req, res) => {
    res.json({
        "algerai": "mouaiz"
    })
})

// conacted weth db
db.connect(dbpass)
    .then(() => {
        console.log("conacted scc wth db  ");

    }).catch((err) => console.log("eroo with db " + err))



//================================ ADD  BOOKS   ENDPOENT ===================================

app.post('/book', (req, res) => {
    const newbook = new book();




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

        res.json(DATA)
    } catch (error) {
        console.log(error + "get book erro ");
    }

})

//================================= delet onex book ===================================================
app.delete('/delet/:id', async (req, res) => {

    try {
        const id = req.params.id

        const dtaa = await book.findByIdAndDelete(id)
        res.send(dtaa)
        return;

    } catch (error) {
        console.log(error);

    }



})

//============================ping render==========================================


setInterval(() => {
    fetch("https://ping-book-dz.onrender.com/")
        .then(res => console.log("the  srver work and ;   Ping sent - Status:", res.status))
        .catch(err => console.error(" Ping failed:", err));
}, 300000); // 300000ms = 5 minutes    





//============================API DASHBORD ==========================================

// ==== get data ======
app.get('/apis', async (req, res) => {
    try {
        const dat = await Theme.find();
        res.send(dat);
        return
    } catch (error) {
        console.log(error);
    }
})

// ================put================
// تحديث إعدادات الموقع 

app.put("/api/:id", async (req, res) => {
    try {
        const { facebook, instagram, youtube, quora, phone, whatsapp, logo_cover, siteweb } = req.body;

        const updatedTheme = await Theme.findByIdAndUpdate(
            req.params.id,
            {
                sh: { facebook, instagram, youtube, quora, phone, whatsapp, logo_cover, siteweb },
                theme:''
            },
            { new: true } // إرجاع البيانات بعد التحديث
        );
        console.log(updatedTheme);

        if (!updatedTheme) {
            return res.status(404).json({ message: "الإعدادات غير موجودة" });
        }

        res.json({ message: "تم التحديث بنجاح", updatedTheme });
    } catch (err) {
        res.status(500).json({ error: "حدث خطأ أثناء التحديث" });
        console.log(err);

    }
});


app.listen(3000, () => {
    console.log("iam listening i port :  http://localhost:3000/");

})