# MSD StarFleet Shipyard registry

Welcome commander. 
This is a prototype of our shipyard registry program that stores all records about our starships. Feel free to issue pull requests with new functionality or bugfixes.

### Tech stack
Build with **NodeJS** and **ExpressJS**, using **MongoDB** for data storage and **serverless** deployment on **AWS Lambda**

### Running locally
This application is designed to run as AWS Lambda function. You can run it locally with `npm run dev` command which will start up a **nodemon** instance or with `npm run offline` which will emulate AWS serverless environment. 

*Please be aware that you need to set your local aws credentials for `npm run deploy` and have **serverless** npm package installed as global dependency for both deployment and AWS offline emulation!*

### DB keys and credentials
AWS uses *secrets.json* file with this structure:
```
{
	NODE_ENV: <environment>,
	DB: <DB connection url with SCRAM auth>
}
```
There is a **.env** file with the same structure for the local testing as well. Both files were ommited from the git repo for obvious security reasons.

**You can't run the app locally without this file!** Please contact your commanding officer for a secure copy!

## REST API

**DEV URL:** https://qwm5suz9m7.execute-api.eu-central-1.amazonaws.com/dev/


### Response codes
**Status code: 200**
*[array] of all ships in the database or {object} of a single one*

**Status code: 400**
*Bad request, description of error returned*

**Status code: 404**
*Ship not found in records*

**Status code: 500**
*Something went horribly wrong...*

### Endpoints

`GET /api/ships` - returns a list of all ships in the recods
______________________________________________________

`GET /api/ships/:id` - returns a specific ship by it's id
______________________________________________________

`DELETE /api/ships/id` - deletes a ship from the records. Please check with your commanding officer if you have the authority to remove records!
*TODO v1.1: Check user authorisation from the startfleet API*
______________________________________________________

`POST /api/ships` - adds new ship to the records

**Request Body:**
``` 
Content-type: application/json
{
	name: <String>,	  // required
	speed: <String>,  // required
	registry: <String>
}
```
______________________________________________________

`PUT /api/ships/:id` - Updates a ship in the records. 

**Request body**
``` 
Content-type: application/json
{
	name: <String>,
	speed: <String>,
	registry: <String>
}
```
