const express = require("express");
const db = require("./db");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Test API
app.get("/", (req, res) => {
  res.send("Server Running 🚀");
});

// Get all parcels
app.get("/all", (req, res) => {
  db.query("SELECT * FROM parcels", (err, result) => {
    if (err) return res.send(err);
    res.send(result);
  });
});





app.get("/add-test", (req, res) => {
  db.query(
    "INSERT INTO parcels (tracking_id, sender_name, receiver_name) VALUES ('ABC123', 'Harshit', 'Rahul')",
    (err) => {
      if (err) return res.send(err);
      res.send("Test Data Added ✅");
    }
  );
});

app.get("/add-status", (req, res) => {
  const { tracking_id, status, location } = req.query;

  const sql = "INSERT INTO parcel_status (tracking_id, status, location) VALUES (?, ?, ?)";

  db.query(sql, [tracking_id, status, location], (err, result) => {
    if (err) {
      console.log(err);
      res.send("Error");
    } else {
      res.send("Status Added ✅");
    }
  });
});


app.get("/track/:id", (req, res) => {
  const id = req.params.id;

const sql = `
  SELECT p.tracking_id, s.status, s.location, s.updated_at
  FROM parcels p
  JOIN parcel_status s ON p.tracking_id = s.tracking_id
  WHERE p.tracking_id = ?
  ORDER BY s.id ASC
`;

  db.query(sql, [id], (err, result) => {
    if (err) return res.send(err);
    res.send(result);
  });
});

// Add Parcel
app.post("/add-parcel", (req, res) => {
  const { tracking_id, sender_name, receiver_name } = req.body;

  db.query(
    "INSERT INTO parcels (tracking_id, sender_name, receiver_name) VALUES (?, ?, ?)",
    [tracking_id, sender_name, receiver_name],
    (err) => {
      if (err) return res.send(err);
      res.send("Parcel Added ✅");
    }
  );
});

// Update Status
app.post("/update-status", (req, res) => {
  const { tracking_id, status, location } = req.body;

  db.query(
    "INSERT INTO parcel_status (tracking_id, status, location) VALUES (?, ?, ?)",
    [tracking_id, status, location],
    (err) => {
      if (err) return res.send(err);
      res.send("Status Updated ✅");
    }
  );
});

app.post("/add", (req, res) => {
  const { id, sender, receiver } = req.body;

  if (!id || !sender || !receiver) {
    return res.send("All fields required ❌");
  }

  const sql = "INSERT INTO parcels (tracking_id, sender_name, receiver_name) VALUES (?, ?, ?)";

  db.query(sql, [id, sender, receiver], (err) => {
    if (err) {
      console.log(err);
      res.send("Error ❌");
    } else {
      res.send("Parcel Added ✅");
    }
  });
});

// DELETE PARCEL
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  const sql1 = "DELETE FROM parcel_status WHERE tracking_id = ?";
  const sql2 = "DELETE FROM parcels WHERE tracking_id = ?";

  db.query(sql1, [id], (err) => {
    if (err) return res.send(err);

    db.query(sql2, [id], (err) => {
      if (err) return res.send(err);

      res.send("Deleted Successfully ✅");
    });
  });
});

app.get("/parcels", (req, res) => {
const sql = `
SELECT tracking_id, sender_name, receiver_name 
FROM parcels
`;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.json([]);
    } else {
      res.json(result);
    }
  });
});;

app.listen(5000, () => {
  console.log("Server started on port 5000 🔥");
});

