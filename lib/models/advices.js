import mongoose from "mongoose";

const {Schema} = mongoose 

const AdvicesSchema = new Schema({
    quote: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
}, {timestamps: true});

export default mongoose.models.Advices || mongoose.model("Advices", AdvicesSchema)


