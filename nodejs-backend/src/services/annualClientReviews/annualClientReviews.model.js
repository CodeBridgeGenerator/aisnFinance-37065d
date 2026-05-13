
    module.exports = function (app) {
        const modelName = "annual_client_reviews";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            deal: { type: Schema.Types.ObjectId, ref: "deals", comment: "Deal, dropdown, false, true, true, true, true, true, true, deals, deals, one-to-one, status," },
clientProfile: { type:  String , comment: "Client Profile, p, false, true, true, true, true, true, true, , , , ," },
reviewYear: { type: Number, comment: "Review Year, p_number, false, true, true, true, true, true, true, , , , ," },
reviewDueDate: { type: Date, comment: "Review Due Date, p_date, false, true, true, true, true, true, true, , , , ," },
reminderDate: { type: Date, comment: "Reminder Date, p_date, false, true, true, true, true, true, true, , , , ," },
epcCertOnFile: { type: Boolean, required: false, comment: "Epc Cert On File, p_boolean, false, true, true, true, true, true, true, , , , ," },
epcCertDocument: { type:  String , comment: "Epc Cert Document, p, false, true, true, true, true, true, true, , , , ," },
annualBuildingInsuranceOnFile: { type: Boolean, required: false, comment: "Annual Building Insurance On File, p_boolean, false, true, true, true, true, true, true, , , , ," },
buildingInsuranceExpiryDate: { type: Date, comment: "Building Insurance Expiry Date, p_date, false, true, true, true, true, true, true, , , , ," },
buildingInsuranceDocument: { type:  String , comment: "Building Insurance Document, p, false, true, true, true, true, true, true, , , , ," },
isBuildingInsuranceExpired: { type: Boolean, required: false, comment: "Is Building Insurance Expired, p_boolean, false, true, true, true, true, true, true, , , , ," },
gasCertOnFile: { type: Boolean, required: false, comment: "Gas Cert On File, p_boolean, false, true, true, true, true, true, true, , , , ," },
gasCertDocument: { type:  String , comment: "Gas Cert Document, p, false, true, true, true, true, true, true, , , , ," },
electricPatCertOnFile: { type: Boolean, required: false, comment: "Electric Pat Cert On File, p_boolean, false, true, true, true, true, true, true, , , , ," },
electricPatCertDocument: { type:  String , comment: "Electric Pat Cert Document, p, false, true, true, true, true, true, true, , , , ," },
companyAccountsOnFile: { type: Boolean, required: false, comment: "Company Accounts On File, p_boolean, false, true, true, true, true, true, true, , , , ," },
landRegistryCheckOnFile: { type: Boolean, required: false, comment: "Land Registry Check On File, p_boolean, false, true, true, true, true, true, true, , , , ," },
landRegistryCheckDocument: { type:  String , comment: "Land Registry Check Document, p, false, true, true, true, true, true, true, , , , ," },
creditReportOnFile: { type: Boolean, required: false, comment: "Credit Report On File, p_boolean, false, true, true, true, true, true, true, , , , ," },
creditReportDocument: { type:  String , comment: "Credit Report Document, p, false, true, true, true, true, true, true, , , , ," },
comments: { type:  String , comment: "Comments, p, false, true, true, true, true, true, true, , , , ," },
status: { type:  String , comment: "Status, p, false, true, true, true, true, true, true, , , , ," },
reviewedByProfile: { type:  String , comment: "Reviewed By Profile, p, false, true, true, true, true, true, true, , , , ," },
reviewedAt: { type: Number, comment: "Reviewed At, p_number, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };