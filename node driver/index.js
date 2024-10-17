const MongoClient = require('mongodb').MongoClient;

const username = "rootuser";
// const cluster = "amigoscodecluster0";
const database = "amigoscode";
const password = "rootpass";
const db = "amigoscode"
const collections = {
  student: "student"
}

// const uri = `mongodb+srv://${username}:${password}@${cluster}.yecee.mongodb.net/${database}?retryWrites=true&w=majority`;
const uri = `mongodb://rootuser:rootpass@localhost:27017`;
const client = new MongoClient(
  uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
async function main() {
  try {
    await client.connect();
    console.log("Connected to db...")
    const collection = client.db(db).collection(collections.student);
    const cursor = await collection.find();
    await cursor.forEach(console.log)

  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
}

main();
