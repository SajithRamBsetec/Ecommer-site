const productModel = require('../Models/AddProduct');
const redis = require('../Middlewares/Redis');

exports.getImage = async (req, res) => {
    console.log(req.query);
    const { imgsearch, mode,ProductId } = req.query;
   
     if (mode === 'search') {
        try {
             
    const cachedata=await redis.hgetall("Searches")
    const ParsedSearch=Object.values(cachedata).map(JSON.parse)
    const gocache=0
    if(ProductId){
ParsedSearch.map((item)=>{
    if(item._id==ProductId){
        gocache=1
    }
    else{
        gocache=0
    }
})
    }
    if (ParsedSearch.length > 0 && gocache===0) {
        console.log("Data from redis")
        console.log(ParsedSearch);
        res.json(ParsedSearch);
    }
    else{
            const result = await productModel.find({
                $or: [
                    {_id:ProductId},
                  { Category: { $regex: imgsearch, $options: 'i' } },
                  { Tags: { $elemMatch: { $regex: imgsearch, $options: 'i' } } }
                ]
              });
              for(const product of result){
              redis.hset("Searches",product._id.toString(),JSON.stringify(product))
              }
            console.log("data stored in Cache");
            res.json(result);
    } 
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while searching images.' });
        }
    }
    
    if (mode === "all") {
        try {
            const cachedata = await redis.hgetall("Products");
            const parsedData = Object.values(cachedata).map(JSON.parse);
        
            if (parsedData.length > 0) {
                console.log("Data from redis")
                console.log(parsedData);
                res.json(parsedData);
            } else {
                const result = await productModel.find();
                for (const product of result) {
                    await redis.hset("Products", product._id.toString(), JSON.stringify(product));
                }
                console.log("Data stored in cache");
                res.json(result);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while fetching images.' });
        }
        
    }
};
