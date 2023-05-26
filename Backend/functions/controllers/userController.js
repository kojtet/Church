const { db } = require("../config/config");
const collection = db.collection("Pastors");


// get all pastors
exports.getPastors = async (req, res) => {
    try {
      const snapshot = await collection.get();
      const items = [];
      snapshot.forEach((doc) => {
        items.push(doc.data());
      });
      res.status(200).send(items);
    } catch (err) {
      res.status(500).send(err);
    }
  };


// get pastor by id
exports.getPastorById = async (req, res) => {
    const { id } = req.params;
    try {
      const snapshot = await collection.doc(id).get();
      const item = snapshot.data();
      res.status(200).send(item);
    } catch (err) {
      res.statatus(500).send(err);
    }
  };

  // add pastor
exports.addPastor = async (req, res) => {
  try{
    const { name, email, church } = req.body;
    const snapshot = await collection.doc(email).get();
    if(snapshot.exists){
      res.status(400).send("Pastor already exists")
    }else{
      await collection.doc(email).set({
        name,
        email,
        church
      })
      res.status(200).send("Pastor added successfully")
    }
  }
  catch(err){
    res.status.send(err.message)
  }
}
  