# # tasks.py
#
# from celery import shared_task
# import os
# import subprocess
#
# @shared_task
# def sendMail(number,message):
#     #checks for adb and shellms
#     os.system('adb devices')
#     checkIfExists=subprocess.run('adb shell service check isms',shell=True,stdout=subprocess.PIPE,stderr=subprocess.PIPE,text=True)
#
#     if (checkIfExists.stdout.find("Service isms: found")==-1):
#         print("ShellMs not found")
#         return "shellms not found"
#     else:
#             command=f"adb shell am startservice --user 0 -n com.android.shellms/.sendSMS -e contact {number} -e msg {message}"
#             os.system(command)#runs the command
#             print(command)
#
#             return "Successfully message sent"
#
#
#
