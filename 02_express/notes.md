
## **1.1 Importing Dependencies**

```jsx
import express from "express";
import "dotenv/config";

```

- `express` → framework to build APIs easily.
- `dotenv/config` → loads `.env` variables automatically.

## **1.2 Creating the App**

```jsx
const app = express();

```

Creates your Express server instance.

## **1.3 Middleware: Parse JSON**

```jsx
app.use(express.json());

```

- Allows Express to understand JSON request bodies.
- Required for POST & PUT requests.

## **1.4 Setting Up The Port**

```jsx
const port = process.env.PORT || 8000;

```

- First tries `.env` file.
- If missing, defaults to 8000.

## **1.5 Starting The Server**

```jsx
app.listen(port, () => {
  console.log(`Server Running at port ${port}`);
});

```

Starts listening for requests.

---

# ----------------------------------------

# **2. IN-MEMORY DATABASE SIMULATION**

# ----------------------------------------

## **2.1 Product Array**

```jsx
let prodData = [];

```

- Acts like a temporary database.
- Data resets every time the server restarts.

## **2.2 Auto-Increment ID**

```jsx
let Uniqueid = 1;

```

- Each product gets a unique `id`.
- Increases after every insert.

---

# ----------------------------------------

# **3. CREATE PRODUCT (POST /product)**

# ----------------------------------------

### **Purpose**

Add a new product to the "database."

### **Route Code**

```jsx
app.post('/product', (req, res) => {
  const { name, price } = req.body;

  if (!name || price == null) {
    return res.status(400).send("Name and price are required");
  }

  const newProd = { id: Uniqueid++, name, price };
  prodData.push(newProd);

  res.status(201).send(newProd);
});

```

### **Concepts**

- Accessing request body (`req.body`)
- Sending a **201 Created** response
- Validating required fields

### **Example Request**

```bash
curl -X POST http://localhost:8000/product \
-H "Content-Type: application/json" \
-d '{"name": "Keyboard", "price": 1500}'

```

### **Example Response**

```json
{
  "id": 1,
  "name": "Keyboard",
  "price": 1500
}

```

---

# ----------------------------------------

# **4. READ ALL PRODUCTS (GET /product)**

# ----------------------------------------

### **Purpose**

Retrieve every product stored so far.

### **Route Code**

```jsx
app.get('/product', (req, res) => {
  res.status(200).send(prodData);
});

```

### **Concepts**

- List all items in an array
- Use **200 OK**

### **Example Response**

```json
[
  { "id": 1, "name": "Keyboard", "price": 1500 },
  { "id": 2, "name": "Mouse", "price": 700 }
]

```

---

# ----------------------------------------

# **5. READ ONE PRODUCT (GET /product/:id)**

# ----------------------------------------

### **Purpose**

Retrieve one specific product using its ID.

### **Route Code**

```jsx
app.get('/product/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const prod = prodData.find(p => p.id === id);

  if (!prod) {
    return res.status(404).send("No Product Found!");
  }

  res.status(200).send(prod);
});

```

### **Concepts**

- `req.params.id` → URL parameters
- `.find()` → returns an object or `undefined`
- Must convert string → number
- **404 Not Found** for missing item

### **Example Request**

```bash
curl http://localhost:8000/product/1

```

### **Example Response**

```json
{
  "id": 1,
  "name": "Keyboard",
  "price": 1500
}

```

### **Not Found Example**

```json
"No Product Found!"

```

---

# ----------------------------------------

# **6. UPDATE PRODUCT (PUT /product/:id)**

# ----------------------------------------

### **Purpose**

Change the details of an existing product.

### **Route Code**

```jsx
app.put('/product/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const prod = prodData.find(p => p.id === id);

  if (!prod) {
    return res.status(404).send("No Product Found!");
  }

  const { name, price } = req.body;

  if (name) prod.name = name;
  if (price) prod.price = price;

  res.status(200).send(prod);
});

```

### **Concepts**

- Updating an object in an array
- PUT replaces fields you specify
- Use **200 OK**

### **Example Request**

```bash
curl -X PUT http://localhost:8000/product/1 \
-H "Content-Type: application/json" \
-d '{"name": "Mechanical Keyboard", "price": 2000}'

```

### **Example Response**

```json
{
  "id": 1,
  "name": "Mechanical Keyboard",
  "price": 2000
}

```

---

# ----------------------------------------

# **7. DELETE PRODUCT (DELETE /product/:id)**

# ----------------------------------------

### **Purpose**

Remove a product completely.

### **Corrected Route Code**

```jsx
app.delete('/product/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = prodData.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).send("No Product Found!");
  }

  prodData.splice(index, 1);
  res.status(204).send();
});

```

### **Concepts**

- `.findIndex()` gives array index
- `.splice()` removes item
- **204 No Content** means deletion successful

### **Example Request**

```bash
curl -X DELETE http://localhost:8000/product/1

```

### **Example Response**

*(empty body)*

Status: **204 No Content**

---

# ----------------------------------------

# **8. FULL ROUTE SUMMARY (DETAILED)**

# ----------------------------------------

| Method | Endpoint | Purpose | Status Codes | Uses | Notes |
| --- | --- | --- | --- | --- | --- |
| POST | /product | Add new product | 201, 400 | req.body | Creates object, auto-ID |
| GET | /product | Get all products | 200 | none | Returns entire array |
| GET | /product/:id | Get one product | 200, 404 | req.params | Uses `.find()` |
| PUT | /product/:id | Update product | 200, 404 | req.body + req.params | Mutates object |
| DELETE | /product/:id | Remove product | 204, 404 | req.params | Uses `.findIndex()` + `.splice()` |

---

# ----------------------------------------

# **9. CORE EXPRESS + JAVASCRIPT CONCEPTS**

# ----------------------------------------

### **Express Concepts**

- Routing: `app.get()`, `app.post()`, etc.
- Middleware: `express.json()`
- HTTP response status codes
- URL parameters with `req.params`

### **JavaScript Concepts**

- Arrays as in-memory storage
- `.find()` vs `.findIndex()`
- Auto-incrementing ID logic
- Object mutation
- JSON structure

## ----------------------------------------

# **10. NEXT STEPS**
# ----------------------------------------

**logging with morgan and winston reference:**

https://docs.chaicode.com/youtube/chai-aur-devops/node-logger/

Database design :

- https://app.eraser.io/workspace/c6d8QCWXRLiFaIlX3hSt
- https://www.datensen.com/moon-modeler-for-databases.html
