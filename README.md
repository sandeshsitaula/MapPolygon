## Small Assignment With Docker,Django and Postgis

## Installing And Running Instruction
``` bash 
sudo docker-compose up --build
```

#### Will download all the necessary requirements specified in Dockerfile and run both the database based on postgis image.

## Usage
``` bash
curl localhost/api/index/ # just for testing whether the server is running or not

curl localhost/api/addLocation/ # adds a random location to Point column provided by django.contrib.gis.models.db . It represents latitude and Longitude

curl localhost/api/viewLocation/1/ # for getting that specific location

curl localhost/api/allLocation/ #for agetting all the location
```

#### Note:docker-entrypoint.sh is used for running migrate and creatign the intial .env file which contains database information.

SomeTimes postgres(db) may run after django container so if that happens stop the compose command and run
``` bash
sudo docker-compose up
```
And persistent database is not used  here since it is only for testing purpose(and it may directly affect my original db).But it can be added if necessary