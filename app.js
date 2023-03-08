const express=require("express");
const request=require("request")
const bodyparser =require("body-parser");
const mailchimp= require("@mailchimp/mailchimp_marketing");
const https=require("https");
const { url } = require("inspector");
const { json } = require("body-parser");
const app=express();
app.use(express.static("public"))
app.use(bodyparser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})
/*mailchimp.setConfig({
    //*****************************ENTER YOUR API KEY HERE******************************
     apiKey: "9806ae78ab1bfd67e8afb397f1e19e5e-us21",
    //*****************************ENTER YOUR API KEY PREFIX HERE i.e.THE SERVER******************************
     server: "us21"
    });*/
    //As soon as the sign in button is pressed execute this
app.post("/",function(req,res){
  
   const name= req.body.name;
   const last = req.body.last;
   const email=req.body.email;
 const data ={
members:[
    {
        email_address:email,
        status:"subscribed",
        merge_fields:{
            FNAME:name,
            LNAME:last
        }
    }
]
 };
 const jsondata=JSON.stringify(data);
 const url="https://us21.api.mailchimp.com/3.0/lists/c7f3bb1dc7";
 const options={
    method:"POST",
    auth: "Mahek:9035d2a1e8cf9bcd7f3e2006967f17a1-us21"
 }
const request= https.request(url,options,function(response){
if(response.statusCode===200){
    res.sendFile(__dirname+"/success.html")
}
else{
     res.sendFile(__dirname+"/failure.html")
        }



    response.on("data",function(data){
    console.log(JSON.parse(data));
})
})
request.write(jsondata);
request.end();
   //*****************************ENTER YOU LIST ID HERE******************************
/*const listId = "c7f3bb1dc7";
//Creating an object with the users data
const subscribingUser = {
 name: name,
 last: last,
 email: email};

 //Uploading the data to the server
 async function run() {
    const response = await mailchimp.lists.addListMember(listId, {
     email_address: subscribingUser.email,
     status: "subscribed",
     merge_fields: {
     FNAME: subscribingUser.name,
     LNAME: subscribingUser.last
    }
    });
    //If all goes well logging the contact's id
 res.sendFile(__dirname + "/success.html")
 console.log(
`Successfully added contact as an audience member. The contact's id is ${
 response.id
 }.`
);
}
run().catch(e => res.sendFile(__dirname + "/failure.html"));*/
});
//    var statuscode=res.statusCode;
//    if (statuscode==200){
// res.sendFile(__dirname+"/success.html")
//    }
//    else{
// res.sendFile(__dirname+"/failure.html")
//    }
// })
app.listen(process.env.PORT|| 3000,function(){
   
  console.log("port is running");
})

// 9806ae78ab1bfd67e8afb397f1e19e5e-us21
//AUDIENCEID
// c7f3bb1dc7
