#
#
# from celery import Celery
# from alertapp.tasks import sendMail
# # Create a Celery instance
# app = Celery('djangoProject')
#
# # Configure Celery using only settings in this file
# app.conf.result_backend = "rpc://"
#
# # Other Celery configurations...
# app.conf.worker_prefetch_multiplier = 1
# app.conf.task_acks_late = True
# # ... (add any other Celery configurations you need)
#
# # Discover and auto-load tasks from all registered Django app configs
# app.autodiscover_tasks()
