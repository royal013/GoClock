
const express = require("express");
const app = express();
const hbs = require("hbs");
const ejs=require("ejs");
const path = require("path");
require("./db/connection");
const bcrypt = require("bcryptjs");


app.use(express());
const Register = require("./models/manafacturer");
const Oder = require("./models/oder_schema");
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;
const static_path = path.join(__dirname, "../public");
app.set("view engine", "hbs");

const template_path = path.join(__dirname, "../templates/views");
const partial_path = path.join(__dirname, "../templates/partials");
// hbs.registerPartials(partial_path);
app.set("views", template_path);

app.use(express.static(static_path));

app.get("/", (req, res) => {
    res.render("initial");
})

app.get("/login", (req, res) => {
    res.render("login");
})

app.get("/registration", (req, res) => {
    res.render("registration.hbs");
})
app.get("/transporter_page", (req, res) => {
    // Oder.find({},function(err,allDetails){
    //     if(err){
    //         console.log(err);
    //     }
    //     else{
    //         res.render("index", { details: allDetails });
    //     }
    // })
    Oder.find()
    .then((err,details)=>{
        console.log(details);
        if(err){
            res.send(err);
        }
        else{

            res.render('transporter_page',{details:details});
        }
    })
    .catch((err)=>{
        console.log(err);
    })
    
})

app.get("/manufacturer_page", (req, res) => {
    res.render("manufacturer_page");
})


app.post("/registration", async (req, res) => {

    try {



        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
        if (password === cpassword) {

            const registerPerson = new Register({

                username: req.body.username,
                email: req.body.email,
                type: req.body.type,
                address: req.body.address,
                password: req.body.password,
                confirmpassword: req.body.confirmpassword
            })
            const data = await registerPerson.save();
            res.status(201).render("login");



        }
        else {
            res.send("password donot match.")

        }
    }
    catch (error) {
        res.status(404).send(error);
    }
})

app.post("/login", async (req, res) => {
    try {

        const email = req.body.email;
        const password = req.body.password;

        // console.log(`Email is: ${email} and password: ${password}`);

        const userEmail = await Register.findOne({ email: email });
        const type = userEmail.type;

        // const isMatch= await bcrypt.compare(password,userEmail.password);

        if ((password === userEmail.password) && type == 'Transporter') {
            res.render("transporter_page");
        }
        else if ((password === userEmail.password) && type == 'Manafacturer') {
            res.render("manufacturer_page")
        }
        // if(password===userEmail.password){

        //     res.render("manufacturer_page");
        //     // console.log("Success");
        // }
        // else{
        //     res.render("INVALID CREDENTIALS");
        // }

    } catch (error) {
        res.status(404).send(error);
        console.log("Error");

    }

})


app.post("/manufacturer_page", async (req, res) => {
    try {
        const newOder = new Oder({
            order_id: req.body.order_id,
            to: req.body.to,
            from: req.body.from,
            address: req.body.address,
            transpoter: req.body.transpoter,
            quantity: req.body.quantity


        })
        const data = await newOder.save();
        res.status(200).render("transporter_page");
        

    } catch (error) {
        res.status(404).send(error);

    }

})
app.listen(port, () => {
    console.log(`Port No. ${port}`);
})