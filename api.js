const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer((req, res)=>{
    // console.log(req.method);
    res.setHeader("Access-Control-Allow-Origin","*")
    res.setHeader("Access-Control-Allow-Headers","*");
    res.setHeader("Access-Control-Allow-Methods","PUT","DELETE","PATCH","POST","OPTIONS");

    let parsedUrl = url.parse(req.url,true);
    // console.log(parsedUrl);
    let products = fs.readFileSync('./products.json','utf-8');

    
    if(req.method==="OPTIONS") {
        res.end();
    }
    // getting all products
    else if(parsedUrl.pathname==="/products" && req.method=="GET" && parsedUrl.query.id===undefined) {
        res.end(products);
    // getting single product
    } else if(parsedUrl.pathname==="/products" && req.method=="GET" && parsedUrl.query.id!=undefined){
        
        let parsedProducts = JSON.parse(products);
        let product = parsedProducts.find((product)=>{
            return product.id==parsedUrl.query.id;
        });
        if(product!=undefined){
        let productStr = JSON.stringify(product);
        res.end(productStr);
        } else{
            res.end("message: Product not found");
        }
    }
    // creating a product

    else if(parsedUrl.pathname==='/products' && req.method==='POST') {
        // res.end("POST request received");
        let newProduct = "";
        req.on('data',(chunk)=>{
            newProduct += chunk;
        });
        req.on('end',()=>{
            // console.log(newProduct);
            let newProductArray = JSON.parse(newProduct);
            // console.log(newProductArray);
            let productsArray = JSON.parse(products);
            // console.log(typeof productsArray);
            productsArray.push(newProductArray);
            fs.writeFile('./products.json',JSON.stringify(productsArray),(err)=>{
                if(err===null) {
                    res.end(JSON.stringify("product saved sucessfully"));
                } else{
                    res.end("ERROR saving the product");
                }
            });
        })
    }
    // upating a product

    else if(parsedUrl.pathname==='/products' && req.method==='PUT') {
        let newProduct = "";
        req.on('data',(chunk)=>{
            newProduct += chunk;
        });
        req.on("end",()=>{
            let productsArray = JSON.parse(products);
            // console.log(productsArray);
            let newProductArray = JSON.parse(newProduct);
            // console.log(newProductArray);
            // console.log(parsedUrl.query.id);
            let index = productsArray.findIndex((product)=>{
                return product.id==parsedUrl.query.id;
            })
            if(index !== -1) {
                // console.log(index);
                productsArray[index] = newProductArray;
                fs.writeFile('./products.json',JSON.stringify(productsArray),(err)=>{
                    if(err===null){
                        res.end("Data have been UPDATED sucessfully")
                    } else{
                        res.end("ERROR the element with given ID not found");
                    }
                })
            } else{
                // console.log(index);
                res.end("ERROR");
            }
        })
    } 
    // deleting a product

    else if(parsedUrl.pathname==='/products' && req.method==='DELETE') {
        let productsArray = JSON.parse(products);

        let index = productsArray.findIndex((product)=>{
            return parsedUrl.query.id === product.id;
        });
        if(index !== -1){
            productsArray.splice(index,1);
            fs.writeFile('./products.json',JSON.stringify(productsArray),(err)=>{
                if(err===null) {
                    res.end("Product DELETED sucessfully");
                } else{
                    res.end("ERROR while deleting the product");
                }
            })
        } else{
            res.end("ERROR: Given ID not found");
        }
    }
 
    // else if(parsedUrl.pathname=='/products' && a){}
    // else if(req.url==="/products" && req.method=="POST") {
    //     res.end("New Products  Data added")
    // } else if(req.url==="/users" && req.method=="POST") {
    //     res.end("New User created");
    // }
}).listen(3000);