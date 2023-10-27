# Cinema-API
API built using Node.js and Express

API Endpoints
- List Movies
- Movie Details
- List Genres


List Movies
HTTP GET

| Endpoint           | Description |
| --------- | ------- |
| cinema-dsih.onrender.com/api | Used to list and search through out all the available movies. Can sort, and order the results       |

Endpoint Parameters

| Parameter | Default |Description|
| --------- | ------- | ------- |
| rating    |    0    |   Used to filter movie by a given minimum IMDb rating      |
| year      |    0    |   Used to filter movie by a given from release year     |
| genres    |   All   |   Used to filter by a given genre    |
