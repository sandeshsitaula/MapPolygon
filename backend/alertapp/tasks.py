# tasks.py

from celery import shared_task
import os
import subprocess

def sendMail(numbersList,alertMessageList):
    #checks for adb and shellms
    checkIfExists=subprocess.run('adb shell service check isms',shell=True,stdout=subprocess.PIPE,stderr=subprocess.PIPE,text=True)

    print(checkIfExists)
    if (checkIfExists.stdout.find("Service isms: found")==-1):
        print("ShellMs not found")
        return "shellms not found"
    else:
        print(numberList,messageList)
        for number,message in zip(numbersList,alertMessageList):
            command=f"adb shell am startservice --user 0 -n com.android.shellms/.sendSMS -e contact {number} -e 'msg {message}'"
            os.system(command)#runs the command
            print(command)

        return "Successfully message sent"



