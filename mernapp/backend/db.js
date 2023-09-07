const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://vikashnautiyalfoodproject:Vikash1234@cluster0.7krhqus.mongodb.net/gofoodmern?retryWrites=true&w=majority"
const mongoDB = async () => {

   await mongoose.connect(mongoURI, { useNewUrlParser: true })
      .then(async () => {
         console.log("connected")
         const fetched_data = await mongoose.connection.db.collection("food_item");
         fetched_data.find({}).toArray()
        
         .then( async data=>{
            global.food_item = data;
            const foodCategry = await mongoose.connection.db.collection("foodCategory");
            foodCategry.find({}).toArray()
            .then (catData=>{
               global.foodCategory = catData;
            })
            .catch(err=>{
               console.log(err);
            })
         })
         
         
      
         .catch(err=>{
            console.log(err);           
         })
            //  const foodCategry = await mongoose.connection.db.collection("foodCategory");
            // foodCategry.find({}).toArray(async function (err, catData) {
            //    if (err) {
            //       console.log(err);
            //       global.food_items= data;
            //       global.foodCategry = catData;
            //    }
            //    else {
            //       global.food_item= data;
            //       global.foodCategry = catData;
            //    }
            // })
         //     if (err) {
         //       console.log(err);


         //     }
         //     else {
         //        global.food_item = data;
         //     }
         // })





      })
      .catch(err => {
         console.log("..", err)
      })
}
module.exports = mongoDB;
