const mongoose =require("mongoose");
const Schema=mongoose.Schema;

const lawyerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  image: {
    type: String,  // URL of the lawyer's image
  },
  experience: {
    type: Number,
    required: true
  },
  contact_info: {
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  }
});

// Export the schema as a model
const Lawyer=mongoose.model('Lawyer', lawyerSchema);
module.exports = Lawyer;