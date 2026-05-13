
    module.exports = function (app) {
        const modelName = "clients";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            leadId: { type: Schema.Types.ObjectId, ref: "leads", comment: "Lead Id, dropdown, false, true, true, true, true, true, true, leads, leads, one-to-one, name," },
profileId: { type: Schema.Types.ObjectId, ref: "profiles", comment: "Profile Id, dropdown, false, true, true, true, true, true, true, profiles, profiles, one-to-one, name," },
clientType: { type:  String , comment: "Client Type, p, false, true, true, true, true, true, true, , , , ," },
status: { type:  String , comment: "Status, p, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };