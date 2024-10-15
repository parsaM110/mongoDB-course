### Default Settings 
The default values for the first login are "admin" for username and "pass" for password. 

## Basics
collections are like tables

### Docker iteractive bash terminal inside container
```
docker exec -it f91d552bd55f bash
```
###
```
mongo mongodb://localhost:27017 -u rootuser -p rootpass
```

seems outdated the binary file is located at /usr/bin/mongod
but better alternative is:
```
mongosh mongodb://localhost:27017 -u rootuser -p rootpass
```
vanila `mongosh` works too but lack authentication privilages 
## the commands
```
test> show dbs;
admin   100.00 KiB
config   60.00 KiB
local    72.00 KiB
```
### for creating DB:
```
use amigoscode;
```
for showing the name:
```
amigoscode> db.getName();
amigoscode
```
adding collection:
```
amigoscode> db.createCollection("hello");
{ ok: 1 }
```
delete Database:
```
amigoscode> db.dropDatabase();
{ ok: 1, dropped: 'amigoscode' }
```
show available methods:
```
db.help();
```
show  collections:
```
show collections
```
show stats:
```
db.stats()
db.hello.stats();
```
drop collection:
```
db.person.drop()
```
some more config for creating collections (capped means fixed size):
```
 db.createCollection("person",{ capped: true, size: 6142800 , max: 3000})
```
clear the mongocli:
``` 
ctrl + l
```
inserting documents flow:
copy and paste this:
```json
student = {
"firstName": "Retha",
"lastName": "Killeen",
"email": "rkilleen0@mysql.com",
"gender": "F",
"country": "Philippines",
"isStudentActive": false,
"favouriteSubjects": [
"maths",
"english",
"it"
],
"totalSpentInBooks": 0.00
}
```
then you write (if student collection doesn't exist the DB creates it):
```bash
db.student.insert(student);
```
or you can pass the obj like this:
```
db.student.insert({});
```
Altough Collection.insert() is deprecated. Use insertOne, insertMany, or bulkWrite.
```
> db.student.count();
DeprecationWarning: Collection.count() is deprecated. Use countDocuments or estimatedDocumentCount.
1
```
find an obj
```
> db.student.find()
[
  {
    _id: ObjectId('670a3b15c2537f2496964033'),
    firstName: 'Retha',
    lastName: 'Killeen',
    email: 'rkilleen0@mysql.com',
    gender: 'F',
    country: 'Philippines',
    isStudentActive: false,
    favouriteSubjects: [ 'maths', 'english', 'it' ],
    totalSpentInBooks: 0
  }
]
```
getting the id:
```
> db.student.find({},{_id:1}).pretty()
[ { _id: ObjectId('670a3b15c2537f2496964033') } ]
```
time stamp:
```
> ObjectId('670a3b15c2537f2496964033').getTimestamp()
ISODate('2024-10-12T09:02:13.000Z')
```
in terminal you type:
```bash
❯ uuidgen
6AEFE7D9-13F2-4678-AC27-96297502CDDF
```
then you put it there:
```json
student = {
"studentId" : "6AEFE7D9-13F2-4678-AC27-96297502CDDF",
"firstName": "john",
"lastName": "conner",
"email": "rkilleen0@mysql.com",
"gender": "F",
"country": "Philippines",
"isStudentActive": false,
"favouriteSubjects": [
"maths",
"english",
"it"
],
"totalSpentInBooks": 0.00
}
```
insert multiple data:
```
 db.student.insertMany(students);
```
or this:
```
 db.student.insertMany([{},{}]);
```
find by firstName:
```
db.student.find({firstName: 'Cally'})
[
  {
    _id: ObjectId('670b75e8c2537f249696403e'),
    firstName: 'Cally',
    lastName: 'Walkden',
    email: 'cwalkden9@craigslist.org',
    gender: 'F',
    country: 'Niger',
    isStudentActive: true,
    favouriteSubjects: [ 'it' ],
    totalSpentInBooks: 165
  }
]
```
adding projection:
```
> db.student.find({firstName: 'Cally'},{firstName: 1, lastName: 1})
[
  {
    _id: ObjectId('670b75e8c2537f249696403e'),
    firstName: 'Cally',
    lastName: 'Walkden'
  }
]
```
exclude data:
```
 db.student.find({firstName: 'Cally'},{firstName: 0, lastName: 0})
[
  {
    _id: ObjectId('670b75e8c2537f249696403e'),
    email: 'cwalkden9@craigslist.org',
    gender: 'F',
    country: 'Niger',
    isStudentActive: true,
    favouriteSubjects: [ 'it' ],
    totalSpentInBooks: 165
  }
]
```
query params:
```
db.student.find({totalSpentInBooks: {$eq: 165}})
```
showing the ones not equal to ... also with projection :
```
> db.student.find({totalSpentInBooks: {$ne: 165}},{firstName: 1})
[
  { _id: ObjectId('670a3b15c2537f2496964033'), firstName: 'Retha' },
  { _id: ObjectId('670a9abdc2537f2496964034'), firstName: 'john' },
  { _id: ObjectId('670b75e8c2537f2496964035'), firstName: 'Retha' },
  { _id: ObjectId('670b75e8c2537f2496964036'), firstName: 'Coraline' },
  { _id: ObjectId('670b75e8c2537f2496964037'), firstName: 'Ario' },
  { _id: ObjectId('670b75e8c2537f2496964038'), firstName: 'Sandye' },
  { _id: ObjectId('670b75e8c2537f2496964039'), firstName: 'Lynn' },
  { _id: ObjectId('670b75e8c2537f249696403a'), firstName: 'Fabe' },
  { _id: ObjectId('670b75e8c2537f249696403b'), firstName: 'Nealon' },
  { _id: ObjectId('670b75e8c2537f249696403c'), firstName: 'Jule' },
  { _id: ObjectId('670b75e8c2537f249696403d'), firstName: 'Mufinella' }
]
```
remember projection needs first {} :
```
 db.student.find({},{firstName: 1})
```
find only favouriteSubjects are and only are "it" :
```
> db.student.find({favouriteSubjects: ["it"]},{favouriteSubjects: 1})
```
find favouriteSubjects have at least "it" in them ($in works as well too):
```
> db.student.find({favouriteSubjects: {$all :["it"]}},{favouriteSubjects: 1})
```
find favouriteSubjects that have not "it" in them ($in works as well too):
```
> db.student.find({favouriteSubjects: {$nin :["it"]}},{favouriteSubjects: 1})
```
find favouriteSubjects have "it" or "math" in them:
```
> db.student.find({favouriteSubjects: {$in :["it","math"]}},{favouriteSubjects: 1})
```
update data:
```
>db.student.update({_id:ObjectId('670b75e8c2537f249696403e')}, {$set: {firstName: 'Maria'}})
DeprecationWarning: Collection.update() is deprecated. Use updateOne, updateMany, or bulkWrite.
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
```
omit field in data:
```
> db.student.update({_id: ObjectId('670b75e8c2537f249696403e')}, {$unset: {lastName: 1}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
```
update by incrementing value:
```
db.student.update({_id: ObjectId('670b75e8c2537f249696403e')}, {$inc: {totalSpentInBooks: 1}})
```
pulling the array:
```
db.student.update({_id: ObjectId('670b75e8c2537f249696403e')}, {$pull: {favouriteSubjects: "it"}})
```
push to the array:
```
db.student.update({_id: ObjectId('670b75e8c2537f249696403e')}, {$push: {favouriteSubjects: "english"}})
```
delete obj:
```
> db.student.deleteOne({_id: ObjectId('670b75e8c2537f249696403e')})
{ acknowledged: true, deletedCount: 1 }
```
delete from the top:
```
> db.student.deleteOne({})
{ acknowledged: true, deletedCount: 1 }
```
delete some student based on query:
```
> db.student.deleteMany({gender:'M'})
{ acknowledged: true, deletedCount: 4 }
```
delete all data:
```
> db.student.deleteMany({})
```
creating cursor:
```
var cursor = db.student.find()
```
showing size:
```
cursor.size()
cursor.count()
cursor.next()
cursor.hasNext()
```
more actions and filters with projections:
```
db.student.find({},{firstName: 1, country: 1}).limit(3).skio(1)
```
sorting :
```
db.student.find({},{firstName: 1, country: 1}).limit(3).sort({firstName:1})
```
using forEach in cursor by arrow func:
```
> db.student.find().forEach((student)=> print(student.gender));
```
using forEach in cursor by classic js func:
```
> db.student.find().forEach(function(student) {print(student.gender)});
``` 
in
