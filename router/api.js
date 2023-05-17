
const express = require("express");
const router = express.Router();
const DATA = require("../models/productSchema");
const multer = require("multer");




//get all 
router.get('/getall', async (req, res) => {

    try {
        let list = await DATA.find();

        console.log(`from get method ${list}`);
        res.send(list);
    }
    catch (error) {
        console.log(`error from get method ${error}`);

    }

});


// fetch single
router.get('/getsingle/:id', async (req, res) => {

    try {
        let id = req.params.id;
        const singledata = await DATA.findById(id);
        console.log(`from get with id method ${singledata}`);
        res.send(singledata)
    } catch (error) {
        console.log(`error from get method ${error}`);
    }

});



//add data (post)
router.post('/post' , async (req, res) => {

    try {
        let item = {

            bookname: req.body.bookname,
            bookimgaddress: req.body.bookimgaddress,
            author: req.body.author,
            content: req.body.content
        }
        const newdata = new DATA(item);
        const savedata = await newdata.save();
        console.log(`from post method ${savedata}`);
        res.send(savedata);

    } catch (error) {
        console.log(`error from get method ${error}`);
    }

});


// delete data
router.delete('/delete/:id', async (req, res) => {

    try {
        let id = req.params.id;
        let deletedata = await DATA.findByIdAndDelete(id);
        console.log(`from delete method ${deletedata}`);
        res.send(deletedata);

    } catch (error) {
        console.log(`error from get method ${error}`);
    }

});




// update data
router.put('/update', async (req, res) => {

    try {
        let id = req.body._id;
        let item = {
            bookname: req.body.data.bookname,
            bookimgaddress: req.body.data.bookimgaddress,
            author: req.body.data.author,
            content: req.body.data.content
        }
        console.log("incoming data from update", item);

        let updatedata = await DATA.findByIdAndUpdate(
            { "_id": id },
            { $set: item }
        );
        console.log(`from put method old data ${updatedata}`);
        res.send(updatedata);

    } catch (error) {
        console.log(`error from get method ${error}`);
    }

});





//file upload
const storage = multer.diskStorage({

    destination: (req, file, callBack) => {
        callBack(null, 'uploadedFiles') //host use
        
    },
    filename: (req, file, callBack) => {

        // console.log('cb')
        // console.log(file)


        callBack(null, `${file.originalname}_${Date.now()}.pdf`)
    }
})

const upload = multer({ storage: storage })







module.exports = router;