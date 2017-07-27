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

## Manual installation

### server

TeamDaily uses a MySQL database. You can find an example kekkonized
database from [database_dump/teamdaily.sql](database_dump/teamdaily.sql).
Start from there!

* `cd server`
* `yarn`
* `cp .env.example .env` <= configure
* `yarn run start`

### client

* `cd client`
* `yarn`
* `cp .env.example .env` <= configure
* `yarn run start`
