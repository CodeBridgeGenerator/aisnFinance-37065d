
    module.exports = function (app) {
        const modelName = "dibursement";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            dealId: { type: Schema.Types.ObjectId, ref: "deals", comment: "Deal Id, dropdown, false, true, true, true, true, true, true, deals, deals, one-to-one, status," },
grossLoanAmount: { type: Number, comment: "Gross Loan Amount, p_number, false, true, true, true, true, true, true, , , , ," },
totalDeductions: { type: Number, comment: "Total Deductions, p_number, false, true, true, true, true, true, true, , , , ," },
netAmountTransferred: { type: Number, comment: "Net Amount Transferred, p_number, false, true, true, true, true, true, true, , , , ," },
directorAapprovedAt: { type: Date, comment: "Director Aapproved At, p_date, false, true, true, true, true, true, true, , , , ," },
directorUserId: { type: Schema.Types.ObjectId, ref: "profiles", comment: "Director User Id, dropdown, false, true, true, true, true, true, true, profiles, profiles, one-to-one, name," },
fundsTransferredAt: { type: Date, comment: "Funds Transferred At, p_date, false, true, true, true, true, true, true, , , , ," },
solicitorReceivedAt: { type: Date, comment: "Solicitor Received At, p_date, false, true, true, true, true, true, true, , , , ," },
clientSolicitorReceivedAt: { type: Date, comment: "Client Solicitor Received At, p_date, false, true, true, true, true, true, true, , , , ," },
clientProgressNotifiedAt: { type: Date, comment: "Client Progress Notified At, p_date, false, true, true, true, true, true, true, , , , ," },
status: { type:  String , comment: "Status, p, false, true, true, true, true, true, true, , , , ," },
notes: { type:  String , comment: "Notes, p, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };