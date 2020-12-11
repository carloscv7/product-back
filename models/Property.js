const {Schema, model} = require("mongoose");

const propertySchema = new Schema(
    {
        _owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "La propiedad debe tener un dueño."]
        },
        title: {
            type: String,
            required: [true, "La propiedad debe tener titulo"]
        },
        address: {
            type: String,
            required: [true, "La propiedad debe tener dirección"]
        },
        description: {
            type: String,
            minlength: [50, "La descripción es muy pequeña"]
        },
        images: {
            type: [String],
            minlength: [1, "Debes agregar por lo menos una imagen"]
        },
        price: {
            type: Number,
            min: [1, "El precio de la propiedad es muy bajo"],
            required: [true, "Debes agregar un precio"]
        },
        capacity: {
            type: Number,
            required: [true, "Debes agregar la capacidad de tu propiedad"]          
        }
    },
    {
        timestamps: true
    }
);

module.exports = model("Property", propertySchema);