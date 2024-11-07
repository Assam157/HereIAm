const app=require("express")
app1=app() 
const bodyParser=require("body-parser")
const mongoose=require("mongoose")
const cors=require("cors")
const model=require("./models/mongoosemodel")
const Product = require("./models/mongoosemodel")
const path=require("path")
app1.use(app.json())
app1.use(cors())
const passport=require("passport")
const UserBaba=require("./models/UserConfig")
const LocalAuth=require("passport-google").Strategy
const GooglePassport=require("passport-google-oauth20")
const session=require("express-session")

mongoose.connect("mongodb+srv://Maitreya:killdill12@cluster0.sk6ugig.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
        useNewUrlParser:true,
    }
)
 
app1.use(app.static(__dirname + '/public'))
app1.use(passport.initialize());
app1.use(bodyParser.urlencoded({extended:true}))
app1.use(session({secret:"secret"},{resave:false},{saveUninitialized:true}));
app1.enable("trust proxy");
app1.set("view engine","ejs")
app1.listen(3001,function(req,res){
    console.log("The server is listening ")
})

const SeedDatabase=async()=>{
    try{
        await Product.deleteMany() 

        const products=[
            {
                name:"Tomato",
                type:"Aloo",
                description:"Tomatoe",
                price:350.00, 
                image:"https://media.istockphoto.com/id/1132371208/photo/three-ripe-tomatoes-on-green-branch.jpg?s=612x612&w=0&k=20&c=qVjDb5Tk3-UccV-E9gqvoz97PTsP1QmBftw27qA9kEo="
            },
            {
                name: 'Pawaz',
                type: 'Pawaz', 
                description: 'Onions',
                price: 2500.00,
                image: "https://images.herzindagi.info/image/2023/Dec/benefits-of-eating-onions-in-winter-add-to-diet-anti-ageing.jpg"
         
              },
        ];

        await Product.insertMany(products);
        console.log("Database Seeded Succesfully");
    }
    catch(error)
    {
        console.log("Error Seeding Database")
    }

};

SeedDatabase();


app1.get("/api/products",async function(req,res){
    try{
        const allProducts=await Product.find();
        res.json(allProducts);
    }
    catch(error){
        console.error(error);
        res.status(500),json({error:"Internal Server Error"});
    }
});

 
 
 
app1.post("/views/SignUpForm",function(req,res){
    res.redirect("SignUpForm");
})

app1.get("/views/SignUpForm",function(req,res){
    res.render("SignUpForm");
})

 