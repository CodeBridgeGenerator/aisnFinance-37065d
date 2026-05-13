
    module.exports = function (app) {
        const modelName = "legal_cooridination";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            dealId: { type: Schema.Types.ObjectId, ref: "deals", comment: "Deal Id, dropdown, false, true, true, true, true, true, true, deals, deals, one-to-one, status," },
aisnSolicitorFirm: { type:  String , comment: "Aisn Solicitor Firm, p, false, true, true, true, true, true, true, , , , ," },
aisnSolicitorContact: { type:  String , comment: "Aisn Solicitor Contact, p, false, true, true, true, true, true, true, , , , ," },
aisnSolicitorPhone: { type:  String , comment: "Aisn Solicitor Phone, p, false, true, true, true, true, true, true, , , , ," },
aisnSolicitorEmail: { type:  String , comment: "Aisn Solicitor Email, p, false, true, true, true, true, true, true, , , , ," },
clientSolicitorFirm: { type:  String , comment: "Client Solicitor Firm, p, false, true, true, true, true, true, true, , , , ," },
clientSolicitorContact: { type:  String , comment: "Client Solicitor Contact, p, false, true, true, true, true, true, true, , , , ," },
clientSolicitorPhone: { type:  String , comment: "Client Solicitor Phone, p, false, true, true, true, true, true, true, , , , ," },
clientSolicitorEmail: { type:  String , comment: "Client Solicitor Email, p, false, true, true, true, true, true, true, , , , ," },
docsSentToSolicitorAt: { type:  String , comment: "Docs Sent To Solicitor At, p, false, true, true, true, true, true, true, , , , ," },
docsSentChecklist: { type:  String , comment: "Docs Sent Checklist, p, false, true, true, true, true, true, true, , , , ," },
securityDocsPreparedAt: { type:  String , comment: "Security Docs Prepared At, p, false, true, true, true, true, true, true, , , , ," },
expectedCompletionDate: { type: Date, comment: "Expected Completion Date, p_date, false, true, true, true, true, true, true, , , , ," },
actualCompletionDate: { type: Date, comment: "Actual Completion Date, p_date, false, true, true, true, true, true, true, , , , ," },
completionTimelineNotes: { type:  String , comment: "Completion Timeline Notes, p, false, true, true, true, true, true, true, , , , ," },
status: { type:  String , comment: "Status, p, false, true, true, true, true, true, true, , , , ," },
clientNotifiedAt: { type: Date, comment: "Client Notified At, p_date, false, true, true, true, true, true, true, , , , ," },
notificationTemplateUsed: { type:  String , comment: "Notification Template Used, p, false, true, true, true, true, true, true, , , , ," },
notes: { type:  String , comment: "Notes, p, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };