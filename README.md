# TeamDaily

By popular request, here's the open sourced version of our internal "TeamDaily" tool which we at Fraktio use
to measure our people's business and happiness and such.

Jaani talks about this software in [his mighty blog post](https://fraktio.fi/blogi/sisainen-kehitys-case-teamdaily/).

## Installation

### Install pre-commit hook

Used for prettify code every time commit is made. This forces same styling conventions all over the codebase.

Hook installer installs client's and server's dependencies. This is required since `prettier` is listed as a dependency in both of them.

To install hook, run the following:

```
./install-precommit-hook.sh
```

### Dockerized installation

* `docker-compose up`
* `curl http://localhost:8765`

Useful Docker commands:
* `docker-compose exec [something]`
* like `docker-compose exec server yarn run db-migrate up`
* or go deeper inside `docker-compose exec database bash`
* pass parameters with extra `--` like so `docker-compose exec server yarn run db-migrate create [migration-name] -- --sql-file`

## Manual installation

### Server

TeamDaily uses a MySQL database. You can find an example kekkonized
database from [database_dump/teamdaily.sql](database_dump/teamdaily.sql).
Start from there!

> - In development environment you should use the example kekkonized database.
> - In production create an empty database and run migrations.

* `cd server`
* `yarn`
* `cp .env.example .env` <= configure
* `yarn run db-migrate up` <= Migration MAGIC
* `yarn run start`

#### Please note
> If you installed Teamdaily before migrations were implemented, create migrations table by hand
> ```
> CREATE TABLE `migrations` (
>   `id` int(11) NOT NULL AUTO_INCREMENT,
>   `name` varchar(255) NOT NULL,
>   `run_on` datetime NOT NULL,
>   PRIMARY KEY (`id`)
> ) DEFAULT CHARSET=utf8;
> 
> INSERT INTO `migrations` (name, run_on)  VALUES ('/20170728133556-initial', NOW());
> ```


## Migrations
Create new migrations file with
`yarn run db-migrate create project-status --sql-file`

Run migrations with `yarn run db-migrate [up|down]`

More at https://db-migrate.readthedocs.io

### Client

* `cd client`
* `yarn`
* `cp .env.example .env` <= configure
* `yarn run start`

