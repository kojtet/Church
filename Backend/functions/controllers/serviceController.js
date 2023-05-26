const { db } = require("../config/config");
const collection = db.collection("Services");
const branchCollection = db.collection("Branches");


// add a service
exports.addService = async (req, res) => {
    const data = req.body;
    const dateCreated = new Date().toDateString(); 

    try {
      await collection.add({ ...data, dateCreated });
      res.status(200).send("Service added successfully");
    } catch (err) {
      res.status(500).send({ message: "Error adding service", error: err.message });
    }
  }

// get all services
exports.getServices = async (req, res) => {
    try {
        const services = await collection.orderBy("dateCreated").get();
        const serviceList = [];
        services.forEach((service) => {
            serviceList.push(service.data());
        });
        return res.status(200).json(serviceList);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// get branch services
exports.getBranchServices = async (req, res) => {
    const { id } = req.params;
    try {
        const services = await collection.where("branchId", "==", id).get();
        const serviceList = [];
        services.forEach((service) => {
            serviceList.push(service.data());
        });
        return res.status(200).json(serviceList);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

//get services by church
exports.getChurchServices = async (req, res) => {
    const { id } = req.params;
    try {
        const services = await collection.where("branch", "==", id).orderBy("dateCreated").get();
        const serviceList = [];
        services.forEach((service) => {
            serviceList.push(service.data());
        });
        return res.status(200).json(serviceList);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


// get api details
exports.getServiceDetails = async (req, res) => {
    try {
        const services = await collection.get();
        const branchServices = await branchCollection.get();
        const serviceList = [];
        services.forEach((service) => {
            serviceList.push(service.data());
        });
        const branchServiceList = [];
        branchServices.forEach((service) => {
            branchServiceList.push(service.data());
        });
    
        const sumOverallAttendance = () => {
            let attendance = 0;
            serviceList.forEach((service) => {
                attendance += service.attendance;
            });

            return attendance;
        }

        const sumOffertory = () => {
            let offertory = 0;
            serviceList.forEach((service) => {
                offertory += service.offertory;
            });

            return offertory;
        }

        return res.status(200).json({
            servicesAll: serviceList,
            services: serviceList.length,
            branches: branchServiceList.length,
            overallAttendance: sumOverallAttendance(),
            overallOffertory: sumOffertory()
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}