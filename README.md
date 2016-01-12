# Koa starter project

Features:

- ES6
  - Cheers~ Hugs~ Get away from callbacks.
- Koa v1
  - little different on koa context compares to Koa v2.
- Sequelize
  - Change it to everything you want, the services are well extracted.
- JWT
  - Sign tokens, authenticate users.
- RBAC
  - You need a security system, if the API isn't proxied by any.
- Koa-mount
  - Mount your APIs to a special mount point, like, `/v1`.
- Redis
  - Create user also create a user in Redis, 
      get a single user by ID will be tremendously fast.
- CORS
  - Call the API from another web app needs the API has CORS enabled for that origin.
- Parameters Validate
  - Password must be 6-24 in length, numbers, not empty, kind of things.

### Notes

#### JWT Token Based Authentication

Header:

Header Name   | Value
------------- | ------------------------------
Authorization | `Bearer eyJ0***.eyJp***.rWy3***`

#### Role Based Access Control (RBAC)

You should have a property named `role` in your `user` schema. The value could be `editor`, `writer`, etc.
Take a look at: [/app/middlewares/rbac-rules.js](https://github.com/rankun203/koa-starter/blob/master/app/middlewares/rbac-rules.js)
