# URL Shortener using Consistent Hashing with Sharded Database

A basic URL shortener that takes a URL, consistently hashes it and stores it in a sharded database using hash-ring (Chooses a DB connection from a pool based on the hashed URL). 

## HTTP Endpoints:

Returns JSON response
* **`POST`** : http://localhost:3000/?url=:url  (url = url to shorten)
* **`GET`** : http://localhost:3000/:urlId (urlId = shortened URL)

## Requirements:
* docker >= 17.12.0+
* docker-compose
* node.js
* npm

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g


## Quick Start
* Clone or download this repository
* Go inside the directory
* Run this command to build docker file `docker build -t pgshard .`
* Run this command `docker-compose up -d`

## Environments
This Compose file contains the following environment variables:

* `POSTGRES_USER` the default value is **postgres**
* `POSTGRES_PASSWORD` the default value is **changeme**
* `PGADMIN_PORT` the default value is **5050**
* `PGADMIN_DEFAULT_EMAIL` the default value is **pgadmin4@pgadmin.org**
* `PGADMIN_DEFAULT_PASSWORD` the default value is **admin**

## Access to postgres: 
* `localhost:5432`
* **Username:** postgres (as a default)
* **Password:** changeme (as a default)

## Access to PgAdmin: 
* **URL:** `http://localhost:5050`
* **Username:** pgadmin4@pgadmin.org (as a default)
* **Password:** admin (as a default)

## Add new servers in PgAdmin:

#### _Create Server 1 - Shard 1_
* **Name** `shard1`
* **Host name/address** `postgres1`
* **Port** `5432`
* **Username** as `POSTGRES_USER`, by default: `postgres`
* **Password** as `POSTGRES_PASSWORD`, by default `changeme`

#### _Create Server 2 - Shard 2_
* **Name** `shard2`
* **Host name/address** `postgres2`
* **Port** `5432`
* **Username** as `POSTGRES_USER`, by default: `postgres`
* **Password** as `POSTGRES_PASSWORD`, by default `changeme`

#### _Create Server 3 - Shard 3_
* **Name** `shard3`
* **Host name/address** `postgres3`
* **Port** `5432`
* **Username** as `POSTGRES_USER`, by default: `postgres`
* **Password** as `POSTGRES_PASSWORD`, by default `changeme`


## Starting the Node Application
* Change local machine hostname in index.js
* Make sure the databases are running
* In the current directory `npm start`