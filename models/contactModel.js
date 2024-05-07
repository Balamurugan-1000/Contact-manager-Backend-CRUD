import mongoose from "mongoose";

const { Schema } = mongoose;


const contactSchema = new Schema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        // ref : "User"
    },
    name: {
        type: String,
        required: [true, "Please Add the name "]
    },
    email: {
        type: String,
        required: [true, "Please Add the Email "]
    },

    phone: {
        type: Number,
        required: [true, "Please Add the phone "]
    }
}, {
    timestamps: true
})

export default mongoose.model("contacts", contactSchema)