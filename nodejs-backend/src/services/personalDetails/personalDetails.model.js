
    module.exports = function (app) {
        const modelName = "personal_details";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            commercialApplicationsId: { type: Schema.Types.ObjectId, ref: "commercial_applications", comment: "Commercial Applications Id, dropdown, false, true, true, true, true, true, true, commercialApplications, commercial_applications, one-to-one, status," },
title: { type:  String , comment: "Title, p, false, true, true, true, true, true, true, , , , ," },
firstName: { type:  String , comment: "First Name, p, false, true, true, true, true, true, true, , , , ," },
middleName: { type:  String , comment: "Middle Name, p, false, true, true, true, true, true, true, , , , ," },
lastName: { type:  String , comment: "Last Name, p, false, true, true, true, true, true, true, , , , ," },
previousSurname: { type:  String , comment: "Previous Surname, p, false, true, true, true, true, true, true, , , , ," },
dateOfBirth: { type: Date, comment: "Date Of Birth, p_date, false, true, true, true, true, true, true, , , , ," },
nationality: { type:  String , comment: "Nationality, p, false, true, true, true, true, true, true, , , , ," },
countryOfResidence: { type:  String , comment: "Country Of Residence, p, false, true, true, true, true, true, true, , , , ," },
residentialAddress: { type:  String , comment: "Residential Address, p, false, true, true, true, true, true, true, , , , ," },
postcode: { type:  String , comment: "Postcode, p, false, true, true, true, true, true, true, , , , ," },
previousAddress: { type:  String , comment: "Previous Address, p, false, true, true, true, true, true, true, , , , ," },
contactPreference: { type:  String , comment: "Contact Preference, p, false, true, true, true, true, true, true, , , , ," },
phoneHome: { type:  String , comment: "Phone Home, p, false, true, true, true, true, true, true, , , , ," },
phoneMobile: { type:  String , comment: "Phone Mobile, p, false, true, true, true, true, true, true, , , , ," },
email: { type:  String , comment: "Email, p, false, true, true, true, true, true, true, , , , ," },
capacityRole: { type:  String , comment: "Capacity Role, p, false, true, true, true, true, true, true, , , , ," },
sharesHeldPct: { type: Number, comment: "Shares Held Pct, p_number, false, true, true, true, true, true, true, , , , ," },
everBankrupt: { type: Boolean, required: false, comment: "Ever Bankrupt, p_boolean, false, true, true, true, true, true, true, , , , ," },
missedRepayments: { type: Boolean, required: false, comment: "Missed Repayments, p_boolean, false, true, true, true, true, true, true, , , , ," },
ivaCva: { type: Boolean, required: false, comment: "Iva Cva, p_boolean, false, true, true, true, true, true, true, , , , ," },
propertyRepossessed: { type: Boolean, required: false, comment: "Property Repossessed, p_boolean, false, true, true, true, true, true, true, , , , ," },
courtOrder: { type: Boolean, required: false, comment: "Court Order, p_boolean, false, true, true, true, true, true, true, , , , ," },
brokenCreditAgreement: { type: Boolean, required: false, comment: "Broken Credit Agreement, p_boolean, false, true, true, true, true, true, true, , , , ," },
associatedBusinessFailure: { type: Boolean, required: false, comment: "Associated Business Failure, p_boolean, false, true, true, true, true, true, true, , , , ," },
adverseCreditDetails: { type:  String , comment: "Adverse Credit Details, p, false, true, true, true, true, true, true, , , , ," },
employerName: { type:  String , comment: "Employer Name, p, false, true, true, true, true, true, true, , , , ," },
jobTitle: { type:  String , comment: "Job Title, p, false, true, true, true, true, true, true, , , , ," },
annualSalary: { type: Number, comment: "Annual Salary, p_number, false, true, true, true, true, true, true, , , , ," },
employmentContinues: { type: Boolean, required: false, comment: "Employment Continues, p_boolean, false, true, true, true, true, true, true, , , , ," },
signature: { type:  String , comment: "Signature, p, false, true, true, true, true, true, true, , , , ," },
signedDate: { type: Date, comment: "Signed Date, p_date, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };