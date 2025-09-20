import { MongoClient, ObjectId } from "mongodb";
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

  if (req.method === "POST") {
    const { token, amount } = req.body;

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;

      const user = await users.findOne({ _id: new ObjectId(userId) });
      if (!user) return res.status(404).json({ error: "User not found" });

      const newBalance = (user.balance || 0) + amount;
      await users.updateOne({ _id: user._id }, { $set: { balance: newBalance } });

      return res.json({ balance: newBalance });
    } catch (e) {
      return res.status(401).json({ error: "Invalid token" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
