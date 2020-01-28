# toda-api

### Use toda-api for toda-api-vendor 

All params used **underscore case**

1. API
    - -api: command API flag (required)
    - --create: create all API service with name
    - --create-model: create only model of API service
        - -mysql: if it's set model inherits MysqlModel
        - -cassandra: if it's set model inherits CassandraModel
    - --create-repository: create only repository of API service
    - --create-controller: create only controller of API service
            - -auth: if it's set add default roles middleware to service
    >   Ex: toda-cli -api --create=user -auth  
        Ex: toda-cli -api --create-controller=user -auth   
        Ex: toda-cli -api --create-model=user -mysql 
        Ex: toda-cli -api --create-repository=user
2. PM2
    - -pm2: command pm2 flag (required)
    - --type: `microservices` or `monolithic` (default is **monolithic**)
    - --port: start port for API (default is **4001**)
    
    > Ex: toda-cli -pm2 --type=microservices --port=4001

3. Roles
    - -role: command role flag (required)
    - --name: name of role

    > Ex: toda-cli -role --name=user
