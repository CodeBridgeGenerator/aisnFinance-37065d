
    module.exports = function (app) {
        const modelName = "leads";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            user: { type: Schema.Types.ObjectId, ref: "users", comment: "User, dropdown, false, true, true, true, true, true, true, users, users, one-to-one, name," },
name: { type:  String , comment: "Name, p, false, true, true, true, true, true, true, , , , ," },
contactNo: { type: Number, comment: "Contact No, p_number, false, true, true, true, true, true, true, , , , ," },
assignedSalesperson: { type: Schema.Types.ObjectId, ref: "profiles", comment: "Assigned Salesperson, dropdown, false, true, true, true, true, true, true, profiles, profiles, one-to-one, name," },
assignedAdmin: { type: Schema.Types.ObjectId, ref: "profiles", comment: "Assigned Admin, dropdown, false, true, true, true, true, true, true, profiles, profiles, one-to-one, name," },
status: { type:  String , comment: "Status, p, false, true, true, true, true, true, true, , , , ," },
rejectionReason: { type:  String , comment: "Rejection Reason, p, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };