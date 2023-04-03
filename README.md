## Model Project 
#### REST Secure REST API, MongoDB, Authentication & Autherization 

-------
1. First you need to register a new user: `/api/users` and add the following in the body: 

```
{   
    "name": "Your name",
    "email": "Your email",
    "password": "Your password"
}
```
2. Login using your user credentials: `/api/users/login`, and add the following in the body:

```
{   
    "email": "Your email",
    "password: "Your password"
}
```

3. You may use any of the following endpoints to use CRUD operations on the Model resource:

- Get models : ``/api/models``
- Get model by id: ``/api/models/1``
- Create new model : `/api/models`, and add the following in the body:

 ```
{   
    "name": "Model name",
}
```
- Update specific model: `/api/models/1`, and add the new model name to the body
- Delete any model by specifying the id: ``/api/models/1``

4. After every HTTP request, the request and response are stored in MongoDB and can be displyed to authorized users through the following endpoint: ``/api/logs ``

a default pagination of 10 items per 1 page is set, you may change that by specifying the page and size queries, as such: 
``/api/logs?page=1&size=4 ``


