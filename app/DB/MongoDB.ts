import mongoose from "mongoose"
const schema = mongoose.Schema;
const model = mongoose.model;
const objectId = schema.ObjectId;

const userSchema = new schema({
    email: String,
    password: String
})

const bookingDetailsSchema = new schema({
    userId: String, // Changed from objectId to String to match what's stored in cookies
    name:String,
    startLocation:String,
    endLocation:String,
    startDate:String,
    endDate: String,
    passengers: Number,
    travelAssistance: Boolean,
})

const userModel = mongoose.models.user || model("user", userSchema);
const bookingDetailsModel = mongoose.models.booking || model("booking", bookingDetailsSchema);


export {userModel, bookingDetailsModel};

