
    module.exports = function (app) {
        const modelName = "business_details";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            applicationId: { type: Schema.Types.ObjectId, ref: "commercial_applications", comment: "Application Id, dropdown, false, true, true, true, true, true, true, commercialApplications, commercial_applications, one-to-one, status," },
tradingName: { type:  String , comment: "Trading Name, p, false, true, true, true, true, true, true, , , , ," },
registeredName: { type:  String , comment: "Registered Name, p, false, true, true, true, true, true, true, , , , ," },
businessStartDate: { type: Date, comment: "Business Start Date, p_date, false, true, true, true, true, true, true, , , , ," },
natureOfBusiness: { type:  String , comment: "Nature Of Business, p, false, true, true, true, true, true, true, , , , ," },
businessAddress: { type:  String , comment: "Business Address, p, false, true, true, true, true, true, true, , , , ," },
correspondenceAddress: { type:  String , comment: "Correspondence Address, p, false, true, true, true, true, true, true, , , , ," },
sharedMailbox: { type: Boolean, required: false, comment: "Shared Mailbox, p_boolean, false, true, true, true, true, true, true, , , , ," },
phone: { type:  String , comment: "Phone, p, false, true, true, true, true, true, true, , , , ," },
fax: { type:  String , comment: "Fax, p, false, true, true, true, true, true, true, , , , ," },
email: { type:  String , comment: "Email, p, false, true, true, true, true, true, true, , , , ," },
website: { type:  String , comment: "Website, p, false, true, true, true, true, true, true, , , , ," },
registeredAddress: { type:  String , comment: "Registered Address, p, false, true, true, true, true, true, true, , , , ," },
companyRegNo: { type:  String , comment: "Company Reg No, p, false, true, true, true, true, true, true, , , , ," },
countryOfRegistration: { type:  String , comment: "Country Of Registration, p, false, true, true, true, true, true, true, , , , ," },
incorporatedDate: { type:  String , comment: "Incorporated Date, p, false, true, true, true, true, true, true, , , , ," },
businessType: { type:  String , comment: "Business Type, p, false, true, true, true, true, true, true, , , , ," },
numPartners: { type: Number, comment: "Num Partners, p_number, false, true, true, true, true, true, true, , , , ," },
numDirectors: { type: Number, comment: "Num Directors, p_number, false, true, true, true, true, true, true, , , , ," },
numBeneficiaries: { type: Number, comment: "Num Beneficiaries, p_number, false, true, true, true, true, true, true, , , , ," },
shareholders: { type: Number, comment: "Shareholders, p_number, false, true, true, true, true, true, true, , , , ," },
anticipatedTurnover: { type: Number, comment: "Anticipated Turnover, p_number, false, true, true, true, true, true, true, , , , ," },
numEmployees: { type: Number, comment: "Num Employees, p_number, false, true, true, true, true, true, true, , , , ," },
madeCva: { type: Boolean, required: false, comment: "Made Cva, p_boolean, false, true, true, true, true, true, true, , , , ," },
propertyRepossessed: { type: Boolean, required: false, comment: "Property Repossessed, p_boolean, false, true, true, true, true, true, true, , , , ," },
courtOrder: { type: Boolean, required: false, comment: "Court Order, p_boolean, false, true, true, true, true, true, true, , , , ," },
missedRepayments: { type: Boolean, required: false, comment: "Missed Repayments, p_boolean, false, true, true, true, true, true, true, , , , ," },
brokenCreditAgreement: { type: Boolean, required: false, comment: "Broken Credit Agreement, p_boolean, false, true, true, true, true, true, true, , , , ," },
adverseCreditDetails: { type:  String , comment: "Adverse Credit Details, p, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };