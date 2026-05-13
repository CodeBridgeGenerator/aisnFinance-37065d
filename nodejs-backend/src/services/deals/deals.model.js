
    module.exports = function (app) {
        const modelName = "deals";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            clientId: { type: Schema.Types.ObjectId, ref: "clients", comment: "Client Id, dropdown, false, true, true, true, true, true, true, clients, clients, one-to-one, clientType," },
status: { type:  String , comment: "Status, p, false, true, true, true, true, true, true, , , , ," },
phase: { type:  String , comment: "Phase, p, false, true, true, true, true, true, true, , , , ," },
approvedAt: { type: Date, comment: "Approved At, calendar_24, false, true, true, true, true, true, true, , , , ," },
rejectedAt: { type: Date, comment: "Rejected At, calendar_24, false, true, true, true, true, true, true, , , , ," },
rejectionReason: { type:  String , comment: "Rejection Reason, p, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };