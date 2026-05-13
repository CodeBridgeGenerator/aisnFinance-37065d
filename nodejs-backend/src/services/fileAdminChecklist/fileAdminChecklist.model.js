
    module.exports = function (app) {
        const modelName = "file_admin_checklist";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            deal: { type: Schema.Types.ObjectId, ref: "deals", comment: "Deal, dropdown, false, true, true, true, true, true, true, deals, deals, one-to-one, status," },
adviserName: { type:  String , comment: "Adviser Name, p, false, true, true, true, true, true, true, , , , ," },
clientNames: { type:  String , comment: "Client Names, p, false, true, true, true, true, true, true, , , , ," },
checkedBy: { type: Schema.Types.ObjectId, ref: "profiles", comment: "Checked By, dropdown, false, true, true, true, true, true, true, profiles, profiles, one-to-one, name," },
checkedDate: { type: Date, comment: "Checked Date, p_date, false, true, true, true, true, true, true, , , , ," },
providerName: { type:  String , comment: "Provider Name, p, false, true, true, true, true, true, true, , , , ," },
lenderName: { type:  String , comment: "Lender Name, p, false, true, true, true, true, true, true, , , , ," },
productName: { type:  String , comment: "Product Name, p, false, true, true, true, true, true, true, , , , ," },
applicationForm: { type: Schema.Types.ObjectId, ref: "commercial_applications", comment: "Application Form, dropdown, false, true, true, true, true, true, true, commercialApplications, commercial_applications, one-to-one, status," },
applicationFormDate: { type: Number, comment: "Application Form Date, p_number, false, true, true, true, true, true, true, , , , ," },
identificationProof: { type: Boolean, required: false, comment: "Identification Proof, p_boolean, false, true, true, true, true, true, true, , , , ," },
identificationProofDate: { type: Number, comment: "Identification Proof Date, p_number, false, true, true, true, true, true, true, , , , ," },
factfindKyc: { type: Boolean, required: false, comment: "Factfind Kyc, p_boolean, false, true, true, true, true, true, true, , , , ," },
factfindKycDate: { type: Number, comment: "Factfind Kyc Date, p_number, false, true, true, true, true, true, true, , , , ," },
loanMemorandumPreparedOnFile: { type: Boolean, required: false, comment: "Loan Memorandum Prepared On File, p_boolean, false, true, true, true, true, true, true, , , , ," },
boardSignOff: { type: Boolean, required: false, comment: "Board Sign Off, p_boolean, false, true, true, true, true, true, true, , , , ," },
offerLetterPreparedSent: { type: Boolean, required: false, comment: "Offer Letter Prepared Sent, p_boolean, false, true, true, true, true, true, true, , , , ," },
offerLetterPrepared: { type: Number, comment: "Offer Letter Prepared, p_number, false, true, true, true, true, true, true, , , , ," },
facilityLetterPreparedChecked: { type: Boolean, required: false, comment: "Facility Letter Prepared Checked, p_boolean, false, true, true, true, true, true, true, , , , ," },
valuationsInstructed: { type: Boolean, required: false, comment: "Valuations Instructed, p_boolean, false, true, true, true, true, true, true, , , , ," },
valuationsInstructedDate: { type: Number, comment: "Valuations Instructed Date, p_number, false, true, true, true, true, true, true, , , , ," },
solicitorInstructed: { type: Boolean, required: false, comment: "Solicitor Instructed, p_boolean, false, true, true, true, true, true, true, , , , ," },
loanDrawnDown: { type: Boolean, required: false, comment: "Loan Drawn Down, p_boolean, false, true, true, true, true, true, true, , , , ," },
postDrawdownDirectDebitAccounts: { type: Boolean, required: false, comment: "Post Drawdown Direct Debit Accounts, p_boolean, false, true, true, true, true, true, true, , , , ," },
propertyInsuranceLandRegistryOnFile: { type: Boolean, required: false, comment: "Property Insurance Land Registry On File, p_boolean, false, true, true, true, true, true, true, , , , ," },
notes: { type:  String , comment: "Notes, p, false, true, true, true, true, true, true, , , , ," },
status: { type:  String , comment: "Status, p, false, true, true, true, true, true, true, , , , ," },
completedByProfile: { type: Schema.Types.ObjectId, ref: "profiles", comment: "Completed By Profile, dropdown, false, true, true, true, true, true, true, profiles, profiles, one-to-one, name," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };