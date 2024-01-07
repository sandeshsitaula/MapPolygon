## Map Polygon
## Installing And Running Instruction
``` bash 
sudo docker-compose up --build #once and run without --build if dockerfile is not changed

sudo docker-compose up # from second time
```

#### Will download all the necessary requirements specified in Dockerfile and run both the database based on postgis image.

### Usage
#### Go to localhost:3000/ and u will receive the index page there u can add new maps and once added u can go to index page to view it as list and on clicking that list u go to that particular map. 

Uses React-leaflet library and openmaps for displaying maps.



#### Note:docker-entrypoint.sh is used for running migrate and creatign the intial .env file which contains database information.


#### Note : Sometimes due to permission error the nodemodules folder may not be created in frontend directory so manually run npm install if this problem occured. It is mainly due to permission error.