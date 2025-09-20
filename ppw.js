import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

let client;
let users;

async function init() {
  if (!client) {
    client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    const db = client.db("fravicoTech");
    users = db.collection("users");
  }
}

export default async function handler(req, res) {
  await init();

  if (req.method === "POST" && req.body.action === "signup") {
    const { username, email, password } = req.body;
    const existing = await users.findOne({ email });
    if (existing) return res.status(400).json({ error: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    await users.insertOne({ username, email, password: hashed, balance: 0 });

    return res.status(201).json({ message: "Account created!" });
  }

  if (req.method === "POST" && req.body.action === "login") {
    const { email, password } = req.body;
    const user = await users.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    return res.json({ token, username: user.username, balance: user.balance });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
