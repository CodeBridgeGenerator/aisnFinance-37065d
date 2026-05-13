
    module.exports = function (app) {
        const modelName = "mortage_details";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            applicationId: { type: Schema.Types.ObjectId, ref: "commercial_applications", comment: "Application Id, dropdown, false, true, true, true, true, true, true, commercialApplications, commercial_applications, one-to-one, status," },
requestedLoanAmount: { type: Number, max: 10000000, comment: "Requested Loan Amount, p_number, false, true, true, true, true, true, true, , , , ," },
requestedRepaymentTerm: { type:  String , comment: "Requested Repayment Term, p, false, true, true, true, true, true, true, , , , ," },
purposeOfMortage: { type:  String , comment: "Purpose Of Mortage, p, false, true, true, true, true, true, true, , , , ," },
mortgageHolders: { type:  String , comment: "Mortgage Holders, p, false, true, true, true, true, true, true, , , , ," },
capitalRaisingFundUse: { type:  String , comment: "Capital Raising Fund Use, p, false, true, true, true, true, true, true, , , , ," },
investmentPropertyOccupier: { type:  String , comment: "Investment Property Occupier, p, false, true, true, true, true, true, true, , , , ," },
investmentPropertyOccupierDetails: { type: Boolean, required: false, comment: "Investment Property Occupier Details, p_boolean, false, true, true, true, true, true, true, , , , ," },
solicitorName: { type:  String , comment: "Solicitor Name, p, false, true, true, true, true, true, true, , , , ," },
solicitorAddress: { type:  String , comment: "Solicitor Address, p, false, true, true, true, true, true, true, , , , ," },
solicitorPhoneNo: { type:  String , comment: "Solicitor Phone No, p, false, true, true, true, true, true, true, , , , ," },
solicitorEmail: { type:  String , comment: "Solicitor Email, p, false, true, true, true, true, true, true, , , , ," },
intermediaryName: { type:  String , comment: "Intermediary Name, p, false, true, true, true, true, true, true, , , , ," },
intermediaryAddress: { type:  String , comment: "Intermediary Address, p, false, true, true, true, true, true, true, , , , ," },
intermediaryPhoneNo: { type:  String , comment: "Intermediary Phone No, p, false, true, true, true, true, true, true, , , , ," },
intermediaryEmail: { type:  String , comment: "Intermediary Email, p, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };