## Updated Readme for SMS Sending service 
### First Install ShellMs application for android which allows us to send message over usb using adb.
https://f-droid.org/packages/com.android.shellms/

### Then stop the adb server in your host computer if you are running it already
``` adb kill-server ```

### Build the docker-compose file again  to install necessary packages like adb,celery,amqp etc.
``` docker-compose up build```


### Create some user for testing(from createuser interface) also enable flight mode since it will charge you after sending message if you have not enabled it

### Then simply go to alertInterface in localhost:3000  then click send message button the message will be sent in background 

