# e-Commers Backend

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in **Postman**.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://jestjs.io/docs/getting-started) for more information.

#### Routes

List of Routes:

| Endpoints                   | Description                                             |
| :-------------------------- | :------------------------------------------------------ |
| `POST /register`            | Add new User utama                                      |
| `POST /login`               | Access for Users                                        |
| `GET /product`              | Retrieves all **Product** entities                      |
| `GET /product/:id`          | Retrieve **Product** entity detail data based on **ID** |
| `POST /admin/register`      | Add new Admin                                           |
| `POST /admin/login`         | Access for Admin                                        |
| `POST /admin/product`       | Create the **Product** entity                           |
| `GET /admin/product`        | Retrieves all **Product** entities                      |
| `GET /admin/product/:id`    | Retrieve **Product** entity detail data based on **ID** |
| `PATCH /admin/product/:id`  | Editing the **Product** entity column based on **ID**   |
| `Delete /admin/product/:id` | Delete the **Product** entity column based on **ID**    |

#### 1. POST /register

#### Description

```http
 	Add new User
```

#### Response

_200 - Created_

- Body

```http
{
    "statusCode": 201,
    "email": "customers@gmail.com",
    "message": "created"

}
```

_400 - Bad Request_

- Body

```http
  {
    "statusCode": 400,
    "error": [
        "UserName cannot be empty!",
        "Email is Already!",
        "Email cannot be empty!"
        "Password cannot be empty!!"
        "Role cannot be empty!"
    ]
}
```

#### 2. POST /login

#### Description

```http
 	Access for Users
```

#### Response

_200 - OK_

- Body

```http
{
    "statusCode": 200,
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJjdXN0b21lcnNAZ21haWwuY29tIiwiYWRtaW4iOmZhbHNlLCJpYXQiOjE3MTQ1NzY5ODV9.f3FxKoohMdfT_ES7cuXX_njkDmarqU_Exjc8W9kPP9s",
    "id": 1,
    "message": "Logged in"
}
```

_401 - Unauthorized_

- Body

```http
{
    "statusCode": 401,
    "error": "Email not found"
}
```

```http
{
    "statusCode": 401,
    "error": "Username/Password invalid!"
}
```

#### 3. GET /product

#### Description

```http
 	Retrieves all **Product** entities
```

#### Response

- Body
  _200 - OK_

```http
{
    "statusCode": 200,
    "message": {
        "count": 25,
        "rows": [
            {
                "id": 1,
                "name": "Galaxy S20",
                "description": "The latest mobile phone with advanced features and sleek design.",
                "image": "http://dummyimage.com/100x100.png/ff4444/ffffff",
                "price": 271,
                "AuthorId": 1,
                "CategoryId": 1,
                "createdAt": "2024-05-01T14:02:15.462Z",
                "updatedAt": "2024-05-01T14:02:15.462Z",
                "User": {
                    "userName": "admin"
                },
                "Category": {
                    "name": "Samsung"
                }
            },
            {
                "id": 2,
                "name": "Nokia 9 PureView",
                "description": "Enjoy entertainment on-the-go with this feature-packed mobile phone.",
                "image": "http://dummyimage.com/100x100.png/cc0000/ffffff",
                "price": 873,
                "AuthorId": 1,
                "CategoryId": 1,
                "createdAt": "2024-05-01T14:02:15.462Z",
                "updatedAt": "2024-05-01T14:02:15.462Z",
                "User": {
                    "userName": "admin"
                },
                "Category": {
                    "name": "Samsung"
                }
            },
            ...
        ]
    }
}
```

_500 - Internal Server Error_

- Body

```http
  {
    "statusCode": 500,
    "error": "Internal Server Error"
  }
```

#### 4. GET /product/:id

#### Description

```http
 	Retrieve **Product** entity detail data based on **ID**
```

#### Response

_200 - OK_

- Body

```http
{
    "statuscode": 200,
    "message": {
        "id": 1,
        "name": "Galaxy S20",
        "description": "The latest mobile phone with advanced features and sleek design.",
        "image": "http://dummyimage.com/100x100.png/ff4444/ffffff",
        "price": 271,
        "AuthorId": 1,
        "CategoryId": 1,
        "createdAt": "2024-05-01T14:02:15.462Z",
        "updatedAt": "2024-05-01T14:02:15.462Z"
    }
}
```

_404 - Not Found_

- Body

```http
  {
    "statusCode": 404,
    "error": {
        "name": "Id not found"
    }
  }
```

#### 5. POST /admin/register

#### Description

```http
 	Add new Admin
```

#### Response

_200 - Created_

- Body

```http
{
    "statusCode": 201,
    "email": "customers@gmail.com",
    "message": "created"

}
```

_400 - Bad Request_

- Body

```http
  {
    "statusCode": 400,
    "error": [
        "UserName cannot be empty!",
        "Email is Already!",
        "Email cannot be empty!"
        "Password cannot be empty!!"
        "Role cannot be empty!"
    ]
}
```

#### 6. POST /admin/login

#### Description

```http
 	Access for Admin
```

#### Response

_200 - OK_

- Body

```http
{
    "statusCode": 200,
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJjdXN0b21lcnNAZ21haWwuY29tIiwiYWRtaW4iOmZhbHNlLCJpYXQiOjE3MTQ1NzY5ODV9.f3FxKoohMdfT_ES7cuXX_njkDmarqU_Exjc8W9kPP9s",
    "id": 1,
    "message": "Logged in"
}
```

_401 - Unauthorized_

- Body

```http
{
    "statusCode": 401,
    "error": "Email not found"
}
```

```http
{
    "statusCode": 401,
    "error": "Username/Password invalid!"
}
```

#### 7. POST /admin/product

#### Description

```http
 Create the **Product** entity
```

#### Request

- Headers

```http
  {
  "access_token": String
  }
```

- Body

```http
  {
  "name": String,
  "description": String,
  "price": Integer,
  "image": String,
  "AuthorId": Integer,
  "CategoryId": Integer
  }
```

#### Response

_201 - Created_

- Body

```http
{
    "statuscode": 201,
    "message": {
        "id": 26,
        "name": "Test Product",
        "description": "This is a Test product",
        "price": null,
        "image": "test.jpg",
        "AuthorId": 1,
        "CategoryId": 1,
        "updatedAt": "2024-05-01T15:40:35.997Z",
        "createdAt": "2024-05-01T15:40:35.997Z"
    }
}
```

_400 - Bad Request_

- Body

```http
  {
    "statusCode": 400,
    "message:": "Name cannot be empty!",
                "Description cannot be empty!",
                "Price cannot be empty!",
                "Price should not be below 5000!",
                "Image cannot be empty!",
                "User cannot be empty!",
                "Category cannot be empty!"
  }
```

_500 - Internal Server Error_

- Body

```http
  {
    "statusCode": 500,
    "error": "Internal Server Error"
  }
```

#### 8. GET /admin/product

#### Description

```http
  Retrieves all **Product** entities
```

#### Request

- Headers

```http
  {
  "access_token": String
  }
```

#### Response

_200 - OK_

- Body

```http
{
    "statusCode": 200,
    "message": {
        "count": 25,
        "rows": [
            {
                "id": 1,
                "name": "Galaxy S20",
                "description": "The latest mobile phone with advanced features and sleek design.",
                "image": "http://dummyimage.com/100x100.png/ff4444/ffffff",
                "price": 271,
                "AuthorId": 1,
                "CategoryId": 1,
                "createdAt": "2024-05-01T14:02:15.462Z",
                "updatedAt": "2024-05-01T14:02:15.462Z",
                "User": {
                    "userName": "admin"
                },
                "Category": {
                    "name": "Samsung"
                }
            },
            {
                "id": 2,
                "name": "Nokia 9 PureView",
                "description": "Enjoy entertainment on-the-go with this feature-packed mobile phone.",
                "image": "http://dummyimage.com/100x100.png/cc0000/ffffff",
                "price": 873,
                "AuthorId": 1,
                "CategoryId": 1,
                "createdAt": "2024-05-01T14:02:15.462Z",
                "updatedAt": "2024-05-01T14:02:15.462Z",
                "User": {
                    "userName": "admin"
                },
                "Category": {
                    "name": "Samsung"
                }
            },
            ...
        ]
    }
}
```

_500 - Internal Server Error_

- Body

```http
  {
    "statusCode": 500,
    "error": "Internal Server Error"
  }
```

#### 9. GET /admin/product/:id

#### Description

```http
  Retrieve **Product** entity detail data based on **ID**
```

#### Request

- Headers

```http
  {
  "access_token": String
  }
```

#### Response

_200 - OK_

- Body

```http
{
    "statuscode": 200,
    "message": {
        "id": 1,
        "name": "Galaxy S20",
        "description": "The latest mobile phone with advanced features and sleek design.",
        "image": "http://dummyimage.com/100x100.png/ff4444/ffffff",
        "price": 271,
        "AuthorId": 1,
        "CategoryId": 1,
        "createdAt": "2024-05-01T14:02:15.462Z",
        "updatedAt": "2024-05-01T14:02:15.462Z"
    }
}
```

_404 - Not Found_

- Body

```http
  {
    "statusCode": 404,
    "error": {
        "name": "Id not found"
    }
  }
```

_500 - Internal Server Error_

- Body

```http
  {
    "statusCode": 500,
    "error": "Internal Server Error"
  }
```

#### 10. PATCH /admin/product/:id

#### Description

```http
Editing the **Product** entity column based on **ID**
```

#### Request

- Headers

```http
  {
  "access_token": String
  }
```

- Body

```http
  {
  "name": String,
  "description": String,
  "price": Integer,
  "image": String,
  "AuthorId": Integer,
  "CategoryId": Integer
  }
```

#### Response

_201 - Created_

- Body

```http
{
    "statuscode": 201,
    "message": {
        "id": 26,
        "name": "Test Product",
        "description": "This is a Test product",
        "price": null,
        "image": "test.jpg",
        "AuthorId": 1,
        "CategoryId": 1,
        "updatedAt": "2024-05-01T15:40:35.997Z",
        "createdAt": "2024-05-01T15:40:35.997Z"
    }
}
```

_400 - Bad Request_

- Body

```http
  {
    "statusCode": 400,
    "message:": "Name cannot be empty!",
                "Description cannot be empty!",
                "Price cannot be empty!",
                "Price should not be below 5000!",
                "Image cannot be empty!",
                "User cannot be empty!",
                "Category cannot be empty!"
  }
```

_500 - Internal Server Error_

- Body

```http
  {
    "statusCode": 500,
    "error": "Internal Server Error"
  }
```

#### 11. DELETE /admin/product/:id

#### Description

```http
 	 Delete the **Product** entity column based on **ID**
```

#### Request

- Headers

```http
  {
  "access_token": String
  }
```

#### Response

_200 - OK_

- Body

```http
{
    "statusconde": 200,
    "message": "${product.name} success to delete"
}
```

_404 - Not Found_

- Body

```http
  {
    "statusCode": 404,
    "message": "Id not found"
  }
```

_500 - Internal Server Error_

- Body

```http
  {
    "statusCode": 500,
    "error": "Internal Server Error"
  }
```
