## Recipe Service

---

In this project there are User authentication and CRUD operations for Recipe and Ingredients using NestJS and Prisma ORM with MySQL database.

### Endpoints related to user authentication:

- `POST http://localhost:3000/users/register` - Register user. Expected payload is: `username`, `email` and `password`
- `POST http://localhost:3000/users/login` - Login user, using Passport authentication with JWT strategy
- `GET http://localhost:3000/users/current` - Get information about current user
- `PATCH http://localhost:3000/users/edit` - Edit current user information

### Endpoints for Recipe:

- `GET http://localhost:3000/recipe` - Lists all Recipes
- `GET http://localhost:3000/recipe/<id>` - Fetches a Recipe by ID
- `POST http://localhost:3000/recipe` - Creates new Recipe. Expected payload: `name`, `text`
- `PATCH http://localhost:3000/recipe/<id>` - Edits Recipe
- `DELETE http://localhost:3000/recipe/<id>` - Deletes Recipe

### Endpoints for Ingredients:

- `GET http://localhost:3000/ingredients` - Lists all Ingredients
- `GET http://localhost:3000/ingredients/<id>` - Fetches a Ingredient by ID
- `POST http://localhost:3000/ingredients` - Creates new Ingredient. Expected payload: `name`, `amount`
- `PATCH http://localhost:3000/ingredients/<id>` - Edits Ingredient
- `DELETE http://localhost:3000/ingredients/<id>` - Deletes Ingredient
