const express = require("express");
const mongoose = require("mongoose");
const {mongoURI} = require('./keys')

const app = express();

app.use(express.json());

mongoose
  .connect(mongoURI,
    {
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
  .then(() => console.log("Mondodb Connected...."))
  .catch(err => console.error(err));

  //use model

  require('./models/contact')

// Use routes

app.use('/contact', require('./router/crud'))

app.get("/", (req, res) => {
  res.send("Server working");
});


const port = process.env.PORT || 5000;

if(process.env.NODE_ENV === "production"){
  app.use(express.static('client/build'))
  const path = require('path')
  app.get("*",(req,res)=>{
      res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}

app.listen(port, () => console.log(`Server running on port ${port}`));