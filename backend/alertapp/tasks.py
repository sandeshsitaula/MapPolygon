# # tasks.py
import os
from taskiq_matrix.instance import broker
from asgiref.sync import sync_to_async
import subprocess


@broker.task()
async def sendMail(number,message):
    #checks for adb and shellms
    await sync_to_async(os.system)('adb devices')

    checkIfAdbExists=await sync_to_async(subprocess.run)('adb shell service check isms',shell=True,stdout=subprocess.PIPE,stderr=subprocess.PIPE,text=True)

    if (checkIfAdbExists.stdout.find("Service isms: found")==-1):
        print("ShellMs not found")
        return "shellms not found"
    else:
        command=f"adb shell am startservice --user 0 -n com.android.shellms/.sendSMS -e contact {number} -e msg {message}"
        await sync_to_async(os.system)(command)#runs the command
        print("hello")
        return "Successfully message sent"

#
#
