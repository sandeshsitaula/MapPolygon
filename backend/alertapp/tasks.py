# tasks.py

from celery import shared_task

@shared_task
def sendMail():
    # Task logic here
    result=10
    print(f"Task result:")
    return result
