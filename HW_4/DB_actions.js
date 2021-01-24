
const mongoose = require('mongoose');



const createDB = () => {
    mongoose.connect('mongodb://localhost:27017');
    const VisitSchema = mongoose.Schema({name: String, ip: String, time: Object});
    Visit = mongoose.model('Visits', VisitSchema);
    return Visit;
}

 const writeData = async (Visit, name, ip) => {
    visit = new Visit({name:name, ip:ip, time: Date()});
    await visit.save((error, savedVisit) => {
        if(error){
        throw error;
      };
      console.log(`Welcome, ${savedVisit.name}! Current time is: ${savedVisit.time}`);
    })
}

 const getData = (Visit, query) => {
	 let results = [];
	return Visit.find(query, (err, visits) => {
		if (err) return handleError(err);
		let findData = [];
		visits.map((item) => {
			findData.push(item);
		})
		results = findData;
	}).then(() => {return results});
}

module.exports.createDB = createDB;
module.exports.writeData = writeData;
module.exports.getData = getData;
