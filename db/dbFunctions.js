const {MongoClient} = require('mongodb');
// const { ObjectId } = require('mongodb');
const dbName = 'AlwaysOnTime';
const coll = 'grades';
const collUser = 'users';
const coll2='checkin';
const url = process.env.MOGO_URL || "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

const db = client.db(dbName);

module.exports = {

  getAllGrades: async () => {
    return await db.collection(coll).find().toArray();
  },

  searchGrades:async (obj) => {
    return await db.collection(coll).find(obj).toArray();
  },

  addCourse: async (item) => {
    return await db.collection(coll).insertOne(item);
  },

  findOneCourse:async (item)=>{
    return await db.collection(coll).findOne({course:item.course,name:item.name});
  },

  findUser:async(name)=>{
    let obj=db.collection(collUser).findOne({username:name});
    return await db.collection(collUser).findOne({username:name});
  },
  addUser:async(user)=>{
    return await db.collection(collUser).insertOne(user);
  },
  findByName:async(name)=>{
    return await db.collection(coll).find({name:name}).toArray();
  },
  getCheckInByName:async(name)=>{
    return await db.collection(coll2).find({name:name}).toArray();
  },
  giveGrades:async(item)=>{
    return await db.collection(coll).updateOne({name:item.name,course:item.course},{$set:item});
  },
  addCheckIn:async(item)=>{
    return await db.collection(coll2).insertOne(item);
  },
  findOneCheckIn:async (item)=>{
    return await db.collection(coll2).findOne({course:item.course,name:item.name,date:item.date});
  },
};


// Can considere put user and course db separately so it will be easier to read.
