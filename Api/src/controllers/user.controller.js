const db = require("../config/database");

// ==> Método responsável por criar um novo 'Product':

exports.createUser = async (req, res) => {
  const { username, email, password} = req.body;
  const { rows } = await db.query(
    "INSERT INTO users (username) VALUES ($1,$2,$3)",
    [username, email, password]
  );

  res.status(201).send({
    message: "User added successfully!",
    body: {
      user: { username, email, password }
    },
  });
};

exports.listarAllUsers = async (req, res) => {
    const response = await db.query('SELECT * FROM users ORDER BY username ASC');
    res.status(200).send(response.rows);
};

exports.findUserById = async (req, res) => {
    const userId = parseInt(req.params.id);
    const response = await db.query('SELECT * FROM users WHERE userId = $1', [userId]);
    res.status(200).send(response.rows);
};

exports.updateUserById = async (req, res) => {
    const userId = parseInt(req.params.id);
    const { username, email, password } = req.body;
  
    const response = await db.query(
      "UPDATE users SET username = $1, email= $3,password =$4 WHERE userId = $2",
      [username, userId, email, password]
    );
  
    res.status(200).send({ message: "Product Updated Successfully!" });
};

exports.deleteUserById = async (req, res) => {
    const userId = parseInt(req.params.id);
    await db.query('DELETE FROM users WHERE userId = $1', [
      userId
    ]);
  
    res.status(200).send({ message: 'user deleted successfully!', userId });
};