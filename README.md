### Default Settings 
The default values for the first login are "admin" for username and "pass" for password. 

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