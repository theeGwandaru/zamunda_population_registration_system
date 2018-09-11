
# Zamunda Population Registration System

A population database to provide persons to the fictitious economy of Zamunda


### Prerequisites

```
A node.js and npm installation
A mysql-server installation
A mysql user account with the username: zprs_app and password: password. These can be changed in config/index.js
```

## Getting Started
```
Download and extract this repo to your file system
Change directory to where you extracted the repo
On a command line, run npm install and then npm start
Open browser to localhost:3000
```

### Installing
```
Download and extract this repo to your file system
Change directory to where you extracted the repo
On a command line, run npm install and then npm start
Open browser to localhost:3000
```


### Api End Points
## Search By Identificaion Document Number (e.g. nationalId, passportNumber)
```
localhost:3000/rest/natural-persons/search/id?nationalId=56767&passportNumber=12343&serviceId=123442&alienId=123424
```

## Search by names or othe non Id params
```
localhost:3000/rest/natural-persons/search/firstName=John&secondName=Smith&surname=Doe
```

## Running the tests

To do

### Break down into end to end tests

To do

## Deployment

To do


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
