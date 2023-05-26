const { db } = require("../config/config");
const collection = db.collection("Branches");

// add branch
exports.addBranch = async (req, res) => {
    const data = req.body;
    try {
        await collection.add(data);
        res.status(200).send("Branch added successfully");
    } catch (err) {
        res.status(500).send({ message: "Error adding branch", error: err.message });
    }
}

// get all branches
exports.getBranches = async (req, res) => {
    try {
        const branches = await collection.get();
        const branchList = [];
        branches.forEach((branch) => {
            branchList.push(branch.data());
        });
        return res.status(200).json(branchList);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


// get brach by name
exports.getBranchById = async (req, res) => {
    const { id } = req.params;
    try{
            const snapshot = await collection.where("code","==", id).get();
            let item = [];
            snapshot.forEach((doc) => {
                    item.push(doc.data());
            });
            res.status(200).send(item);

    }catch(err){
            console.log(err);
    }
};

// get church by pastor

exports.getBranchByPastor = async (req, res) => {
    const { id } = req.params;
    try{
            const snapshot = await collection.where("code","==", id).get();
            let item = [];
            snapshot.forEach((doc) => {
                    item.push(doc.data());
            });
            res.status(200).send(item);

    }catch(err){
            console.log(err);
    }
};


// update branch
exports.updateBranch = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        await collection.doc(id).update(data);
        res.status(200).send("Branch updated successfully");
    } catch (err) {
        res.status(500).send({ message: "Error updating branch", error: err.message });
    }
}


