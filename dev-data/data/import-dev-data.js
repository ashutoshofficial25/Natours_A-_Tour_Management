const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Review = require('./../../models/reviewModel');
const User = require('./../../models/userModel');
const Tour = require('./../../models/tourModel');

dotenv.config({ path: './config.env' });
//console.log(process.env);
// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>,process.env.DATABASE_PASSWORD'
// );
const DB = process.env.DATABASE;
console.log(DB);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then((con) => console.log('Database connected Successfully'));

//Read JSON file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
// const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
// const reviews = JSON.parse(
//   fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
// );

//IMPORT data into database

const importData = async () => {
  try {
    await Tour.create(tours);
    // await User.create(users, { validateBeforeSave: false });
    //await Review.create(reviews);
    console.log('Data Uploaded Successfully');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

//Delete all data from COLLECTION

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    // await User.deleteMany();
    //await Review.deleteMany();
    console.log('Data delelted successfully');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

console.log(process.argv);

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
