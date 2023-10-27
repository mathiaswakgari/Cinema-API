# Cinema-API
API built using Node.js and Express

API Endpoints
- List Movies
- Movie Details
- List Genres


**_List Movies**
_HTTP GET__

| Endpoint           | Description |
| --------- | ------- |
| cinema-dsih.onrender.com/api/movies | Used to list and search through out all the available movies. Can sort, and order the results       |

_Endpoint Parameters_

| Parameter | Default |Description|
| --------- | ------- | ------- |
| rating    |    0    |   Used to filter movie by a given minimum IMDb rating      |
| year      |    0    |   Used to filter movie by a given from release year     |
| genres    |   All   |   Used to filter by a given genre    |


_**Movie Details**_
_HTTP GET_

| Endpoint           | Description |
| --------- | ------- |
| cinema-dsih.onrender.com/api/movies/:id |Returns the information about a specific movie|

_**List Genres**_
_HTTP GET_

| Endpoint           | Description |
| --------- | ------- |
| cinema-dsih.onrender.com/api/genres | Used to list all the available genres.|
