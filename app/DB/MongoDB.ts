import mongoose from "mongoose"
const schema = mongoose.Schema;
const model = mongoose.model;

const userSchema = new schema({
    email: String,
    password: String
})

const bookingDetailsSchema = new schema({
    userId: String,
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

