
    module.exports = function (app) {
        const modelName = "deal_stage_history";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            dealId: { type: Schema.Types.ObjectId, ref: "deals", comment: "Deal Id, dropdown, false, true, true, true, true, true, true, deals, deals, one-to-one, status," },
fromStage: { type:  String , comment: "From Stage, p, false, true, true, true, true, true, true, , , , ," },
toStage: { type:  String , comment: "To Stage, p, false, true, true, true, true, true, true, , , , ," },
changedAt: { type: Date, comment: "Changed At, calendar_24, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };