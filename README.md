## Map Polygon
## Installing And Running Instruction
``` bash 
sudo docker-compose up --build #once and run without --build if dockerfile is not changed
```

#### Will download all the necessary requirements specified in Dockerfile and run both the database based on postgis image.


#### Note:docker-entrypoint.sh is used for running migrate and creatign the intial .env file which contains database information.

SomeTimes postgres(db) may run after django container so if that happens stop the compose command and run
``` bash
sudo docker-compose up
```
And persistent database is not used  here since it is only for testing purpose(and it may directly affect my original db).But it can be added if necessary