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