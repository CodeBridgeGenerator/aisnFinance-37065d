
    module.exports = function (app) {
        const modelName = "commercial_applications";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            dealId: { type: Schema.Types.ObjectId, ref: "deals", comment: "Deal Id, dropdown, false, true, true, true, true, true, true, deals, deals, one-to-one, status," },
status: { type:  String , comment: "Status, p, false, true, true, true, true, true, true, , , , ," },
contactByTelephone: { type: Boolean, required: false, comment: "Contact By Telephone, p_boolean, false, true, true, true, true, true, true, , , , ," },
contactByPost: { type: Boolean, required: false, comment: "Contact By Post, p_boolean, false, true, true, true, true, true, true, , , , ," },
contactByElectronicMedia: { type: Boolean, required: false, comment: "Contact By Electronic Media, p_boolean, false, true, true, true, true, true, true, , , , ," },
contactForMarketResearch: { type: Boolean, required: false, comment: "Contact For Market Research, p_boolean, false, true, true, true, true, true, true, , , , ," },
applicationDocuments: { type:  [Schema.Types.ObjectId], ref: "document_storages" , description: "isArray", comment: "Application Documents, file_upload, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };