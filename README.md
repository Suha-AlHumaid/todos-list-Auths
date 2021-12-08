# W08D03
# Todos Api With Auths
It's simple todos list project with authentication and authorization. It's includes signin and register system useing bcrybt and jwt. Give only permission for admin to delete or see users information and create custom role.

ّIndex:
* [Instructions](#Instructions)
* [Technologies](#technologies)
* [Schemas](#Schemas)
* [Routers](#Routers)

## Instructions for useing this project:
```
npm i  
 ```
create .env file and set your own values:
```
PORT=your own port
DB_URI= url on mongodb
SALT=salt value
secert_key=any secrt value
```

## Technologies:
* Mongoose
* Mongo DB
* express
* node js
* bcrybt
* jwt


## Schemas:
 * Role schema
    <br>  contains this information: role and permessions
    ```
    const roleSchema = new mongoose.Schema({
  role: { type: String , required: true },
  permissions: { type: Array ,required: true},
},
{timestamps: true});
    ```
 * user schema
   <br>  contains this information: email , password and role
  
  ```const userSchema = new mongoose.Schema({
  email: { type: String, required: true,unique: true },
  password: { type: String, required: true },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    required: true
 },{timestamps: true});
   ```
  * Task schema
    <br> contains this information: email , password and role

  ```const taskSchema = new mongoose.Schema({
  task: { type: String, required: true },
  isDele: { type: Boolean, default: false, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  
 }
},
{timestamps: true});
```

## Entity Relationship Diagram
![entity relationship diagram](https://github.com/Suha-AlHumaid/W08D03/blob/main/img/r%20digram.jpg)


 ## Routers:
### Role Routers

 * Create role api
      <br> To create new user role like: admin and user.
      only admin can create a role
      
 * Get all role api
      <br> List all roles in the DB like: Admin and user.
      only admin can see rools

        
 ### User Routers
   * Register api: 
Create new user with particuler role (email , passsword , role). Password hashed by bcrypt.
   * Login api: <br>
Login user via compare email and password that enters by user with email and hashed password (by bcrypt). Also get exist token validation which finsh in 60 minuts.
   * Delete user api. 
   <br> only work for admin who has exist token.
Get all users router.
<br> only work for admin who has exist token.
          
          
 ### Tasks Routers 
   * Create task api.
   * Update task api.
   * Delete task api.
   * Get all task api.
   * Get specific task api.
Tasks Routers only work for user who has exist token.

   
