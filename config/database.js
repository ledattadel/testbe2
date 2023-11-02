const mongoose = require("mongoose");

const MONGODB = 'mongodb+srv://trongdat2105:210500@cluster0.pftsd96.mongodb.net/blog?retryWrites=true&w=majority';
mongoose.set("strictQuery", true);

mongoose
  .connect(MONGODB)
  .then(() => {
    console.log("Connect to MongooDB....");
  })
  .catch((err) => {
    console.log(err);
  });
