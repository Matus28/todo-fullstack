# Backend API Specification

## Routes

All routes expects and returns JSON strings.

### `GET /todos`

List all todo items.

Example response body:

```json
[
  {
    "completed": false,
    "id": 1,
    "text": "Buy milk"
  },
  {
    "completed": false,
    "id": 2,
    "text": "Make dinner"
  },
  {
    "completed": false,
    "id": 3,
    "text": "Save the world"
  }
]
```

### `GET /todos/:id`

Get a single todo item.

Example response body:

```json
{
  "completed": false,
  "id": 1,
  "text": "Buy milk"
}
```

### `POST /todos`

Create a new todo item. Use the body of the POST request. The request must have
the `Content-Type` header set to `application/json`.

The body of the request should be a JSON document:

```json
{
  "text": "Description of the item",
  "completed": false
}
```

The `completed` field is optional and it will default to `false`.

Example response body:

```json
{
  "id": 4,
  "text": "Buy eggs",
  "completed": false
}
```

### `PUT /todos/:id`

Update a todo item.

Similarly to the `POST /todos` request, `Content-Type` must be set to
`application/json` and the body of the request must be a JSON document.

Example request body:

```json
{
  "text": "Description of the item",
  "completed": false
}
```

Every field is required.

Example response body:

```json
{
  "id": 4,
  "text": "Buy eggs and sugar",
  "completed": true
}
```

### `DELETE /todos/:id`

Delete a todo item.

Example response body:

```json
  {
    "id": 4,
    "text": "Buy eggs and sugar",
    "completed": true,
    "destroyed": true
  }
```

### Errors

If a todo item is not found `404` status code should be set in the response

## Frontend

Connect the application with your frontend, by serving the applications html on:
`localhost:3000/index.html`

### Filter `GET /todos?completed=true`

Add a filter for listing only the completed todo items.

Example response body:

```json
[
  {
    "completed": true,
    "id": 2,
    "text": "Make dinner"
  },
  {
    "completed": true,
    "id": 3,
    "text": "Save the world"
  }
]
```