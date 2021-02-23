# McbAngularTask

API used: json-server

Document link: https://www.npmjs.com/package/json-server

npm package: sudo npm i -g json-server

Run command: json-server --watch [location/of/db.json]

Note:- 
After successful installation of json-server, kindly run this with default port 3000. I used this API with port 3000 in the angular application (http://localhost:3000/).
 
------------------------------------------------------------------------------------------------------------------------------------ 
| **Kindly use the db.json file which is in the assets folder of angular project [src/assets/db.json], then only API will work.**   |
|---------------------------------------------------------  OR ---------------------------------------------------------------------|
| If you wish, you can initiate the server with the below json format in your own db.json file (It will be automatically            |
| created after running the [json-server --watch] command).                                                                         |
|                                                                                                                                   |
|                                                    {                                                                              |
|                                                        "customers": [],                                                           |
|                                                        "transactions": []                                                         | 
|                                                    }                                                                              |     
|                                                                                                                                   |
-------------------------------------------------------------------------------------------------------------------------------------

