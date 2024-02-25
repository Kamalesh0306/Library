import cors from "cors";
import express from "express";
import mysql from "mysql";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "kamalSan@0306",
  database: "test",
});

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books(`title`, `descp`, `price`, `cover`,`sub`,`author`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.descp,
    req.body.price,
    req.body.cover,
    req.body.sub,
    req.body.author,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = " DELETE FROM books WHERE id = ? ";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE books SET `title`= ?, `descp`= ?, `price`= ?, `cover`= ?, `sub`= ?, `author`= ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.descp,
    req.body.price,
    req.body.cover,
    req.body.sub,
    req.body.author,
    
  ];

  db.query(q, [...values,bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});


app.get('/all-books', async (req, res) => {
  try {
    // Define the SQL query to fetch all books from the database
    const sql = "SELECT id ,title, author, price, cover, sub, descp FROM books";

    // Execute the query
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Error: mysql' });
      } else {
        // Respond with the fetched books
        res.status(200).json({ success: true, books: result });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Query to check if email and password exist in the databas
    const query = `SELECT * FROM users WHERE email = ? AND password = ?`;
    db.query(query, [email, password], (error, results) => {
      if (error) {
        console.error('Error executing MySQL query: ', error);
        res.json("fail");
        return;
      }

      if (results.length > 0) {
        res.json("exist");
      } else {
        res.json("notexist");
      }
    });
  } catch (e) {
    console.error('Error: ', e);
    res.json("fail");
  }
});

// Route to handle signup
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Query to check if email exists in the database
    const query = `SELECT * FROM users WHERE email = ?`;
    db.query(query, [email], (error, results) => {
      if (error) {
        console.error('Error executing MySQL query: ', error);
        res.json("fail");
        return;
      }

      if (results.length > 0) {
        res.json("exist");
      } else {
        // Insert new user into the database
        const insertQuery = `INSERT INTO users (email, password) VALUES (?, ?)`;
        db.query(insertQuery, [email, password], (insertError, insertResults) => {
          if (insertError) {
            console.error('Error inserting new user: ', insertError);
            res.json("fail");
            return;
          }
          res.json("notexist");
        });
      }
    });
  } catch (e) {
    console.error('Error: ', e);
    res.json("fail");
  }
});

db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
    } else {
      console.log('Connected to MySQL');
    }
  });

app.listen(8800, () => {
    console.log("Connected to backend.");
  });