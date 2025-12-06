import express from 'express';
import "dotenv/config";
const app=express();
const port=process.env.PORT || 8000;
app.use(express.json());
let prodData=[];
let Uniqueid=1;
//add new product
app.post('/product',(req,res)=>{
    const {name,price}=req.body;
    const newProd = { id: Uniqueid++, name, price };
    prodData.push(newProd);
    res.status(201).send(newProd); 
})
// get all product
app.get('/product',(req,res)=>{
    res.status(201).send(prodData);
})
// get product with id
app.get('/product/:id',(req,res)=>{
    const prod=prodData.find(pid =>pid.id === parseInt(req.params.id));
    if(!prod){
        res.status(404).send("No Product Found!");
    }
    res.status(202).send(prod); 
})
//update
app.put('/product/:id',(req,res)=>{
    const prod=prodData.find(pid =>pid.id === parseInt(req.params.id));
    if(!prod){
        res.status(404).send("No product Found!");
    }
    const {name,price}=req.body
    prod.name=name;
    prod.price=price;
    res.status(200).send(prod);
})
//delete
app.delete('/product/:id',(req,res)=>{
    const prod=prodData.find(pid => pid.id === parseInt(req.params.id));
    if(prod=== -1){
        res.status(404).send("No product Found!");
    }
    prodData.splice(prod,1);
    return res.status(204).send("Deleted")
})
app.listen(port,()=>{
    console.log(`Server Running at port ${port}`);
})