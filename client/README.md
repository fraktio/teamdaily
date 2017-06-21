# teamdaily

Team status app

## Requirements For Developing

This application's development version runs [Node.js](https://nodejs.org/en/) inside a Docker container.

* [Docker](https://store.docker.com/search?type=edition&offering=community)
* [Docker Compose](https://docs.docker.com/compose/install/)

### Requirements for 'vanilla' development

* [Node.js](https://nodejs.org/en/)
* [Yarn](https://yarnpkg.com/lang/en/)

## Developing

* docker-compose up
* jynk jynk
* http://127.0.0.1:5678
* kood kood!

## Adding node modules

````
docker-compose up
docker-compose exec app bash // _the name 'app' is defined in docker-compose.yml_
$ cd /app
$ yarn add [--dev] puuppa
````

----

## setting up in Kubernetes cluster

You'll need Google Cloud SDK installed (with `gcloud` and `kubectl` binaries in `PATH`).

### setting up

This is... probably not 100% perfect since setting up 100% from scratch, but should at least point you at the right direction! You, of course, should change passwords, disk names etc. based on what you're actually doing.

* Make sure `kubectl` points to the right cluster. There's a "connect" link in the Google Cloud Console at the same place where you can see the container clusters, use commands from that.
* Create namespace to your kubernetes cluster: `$ kubectl create namespace teamdaily` (or something else than teamdaily works as well)
* Add initial server configuration: `$ kubectl create configmap backend-config --from-file=config.server.js=conf/config.server.production-example.js --namespace=teamdaily`
* Edit it to your liking: `$ kubectl edit configmap/backend-config --namespace=teamdaily` – you need to change at least the following:
  * Database username/password
  * Password for accessing the application (you can use `bcrypt-cli` npm package to create the hash)
* Add database secrets: `$ kubectl create secret generic mariadb-secret --from-literal=password=passu --from-literal=root_password=roottipassu --namespace=teamdaily`
* Add a disk: `$ gcloud compute disks create <disk name matching one in yaml file> --size 10 --type pd-standard --project=<your project>`
* Add secret for service key that can write to backup bucket: `$ kubectl create secret generic teamdaily-backup-service-account-key --from-file=gcloud-service-key.json=<path to service account private key json> --namespace=teamdaily` (and of course you need the bucket and service account created already)
* Make sure you have the global static ip address with the name you have set at `kubernetes.io/ingress.global-static-ip-name` on YAML file.
* Create all the pieces: `$ kubectl apply --prune -f devops/kubernetes/your-kubernetes-config.yaml --all --namespace=teamdaily`
* Debug why it doesn't work! Ingress doesn't seem to be able to correctly pick `/healthz` as the health check url from `readinessProbe` of a pod, even it should to – so you might need to change it manually in google console afterwards.

### initializing database

* Find the MariaDB pod: `$ kubectl get pods --namespace teamdaily`
* Port forward to the pod: `$ kubectl port-forward <pod name here> 3306:3306 --namespace=teamdaily`
* Connect with MariaDB client and initialize the data structure (or dump old data): `$ mysql --host=localhost --user=teamdaily --password=password --protocol=tcp teamdaily < your_whatever.sql`

## deployment

You'll need Google Cloud SDK installed (with `gcloud` and `kubectl` binaries in `PATH`). Also, be authenticated using `gcloud`. And finally, you'll need Docker running locally to build & push the image.

When that's done, just run `$ devops/deploy-to-kubernetes.sh [staging|production]`.
