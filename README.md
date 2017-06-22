# Fraktio presents: Team Daily Open Source

By popular request, here's the open sourced version of our internal "Team Daily" tool which we use
to measure our people's business and happiness and such.

Jaani talks about this software in [his mighty blog post](https://fraktio.fi/blogi/sisainen-kehitys-case-teamdaily/).

## Installation

### server

TeamDaily uses a MySQL database. You can find an example kekkonized
database from [client/docs/teamdaily.sql](client/docs/teamdaily.sql).
Start from there!

* `cd server`
* `yarn`
* `cp config.example.js config.js` <= configure
* `yarn run start`

### client

* `cd client`
* `yarn`
* `cp config.example.js config.js` <= configure
* `yarn run start`
