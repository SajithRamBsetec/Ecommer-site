const productModel = require('../Models/AddProduct');
const redis = require('../Middlewares/Redis');
var num = 0;

exports.getImage = async (req, res) => {
    console.log(req.query);
    const { imgsearch, mode,ProductId} = req.query;

    if (mode === 'search') {
        try {
            const CacheData=redis.hgetall("Searches")
           const parsedData=Object.values(CacheData).map(JSON.parse)
           let goin=0
           
           const result = await productModel.find({
            $or: [
              { Category: { $regex: imgsearch, $options: 'i' } },
              { Tags: { $elemMatch: { $regex: imgsearch, $options: 'i' } } }
            ]
          }).sort({Views:-1});
          parsedData.map((items)=>{
if(items._id!==result[i]){
    goin=1}
})
           if(parsedData.length==2 && goin==0){
            let totaldata=[]
           
             parsedData.map((item)=>{
                for (let i=0;i<result.length;i++){
                    if(item._id==result[i]){
                     
                        totaldata.push(item)
                    }
                    else{
                    
                            if(i==1||i==2){
                                redis.hset("Searches", result[i]._id.toString(), JSON.stringify(result[i]));
                                redis.pexpire("Searches:",result[i]._id.toString(),10);
                            }
                        
                        totaldata=result[i]
                    }
                  }
                
             })
             res.json(totaldata)
           }
           else{
            const results = await productModel.find({
                $or: [
                  { Category: { $regex: imgsearch, $options: 'i' } },
                  { Tags: { $elemMatch: { $regex: imgsearch, $options: 'i' } } }
                ]
              }).sort({Views:-1});
              let Data=[]
          for (let i=0;i<2;i++){
            console.log("Result"+result[i])
            Data[i]=results[i]
          }
          console.log("Data"+Data)


          for (const product of Data) {
              await redis.hset("Searches", product._id.toString(), JSON.stringify(product));
              await redis.pexpire("Searches:" + product._id.toString(), 10); // Convert minutes to seconds
          }
          
           
            res.json(results);

        } 
    }catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while searching images.' });
        }
    }
  

    if (mode === "all") {
        try {
            const cachedata = await redis.hgetall("Products");
            const parsedData = Object.values(cachedata).map(JSON.parse);
 
            if (parsedData.length > 0) {
                console.log("Data from redis");
                res.json(parsedData);
            } else {
                const result = await productModel.find().sort({Views: -1});
            
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
    if (ProductId) {
        const operation = await productModel.updateOne(
            { _id: ProductId},
            {$inc: { Views: 1 } },
            { upsert: true, new: true }
        );
    }
};
