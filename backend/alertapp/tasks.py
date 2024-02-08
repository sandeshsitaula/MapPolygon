# # tasks.py
import os
from taskiq_matrix.instance import broker
from asgiref.sync import sync_to_async
# from celery import shared_task
# import os
#
@broker.task()
async def sendMail(number,message):
    #checks for adb and shellms
    await sync_to_async(os.system)('adb devices')

    command=f"adb shell am startservice --user 0 -n com.android.shellms/.sendSMS -e contact {number} -e msg {message}"
    await sync_to_async(os.system)(command)#runs the command
    print("hello")
    return "Successfully message sent"

#
#
