
    module.exports = function (app) {
        const modelName = "credit_paper";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            dealId: { type: Schema.Types.ObjectId, ref: "deals", comment: "Deal Id, dropdown, false, true, true, true, true, true, true, deals, deals, one-to-one, status," },
preparedBy: { type: Schema.Types.ObjectId, ref: "profiles", comment: "Prepared By, dropdown, false, true, true, true, true, true, true, profiles, profiles, one-to-one, name," },
borrowerName: { type:  String , comment: "Borrower Name, p, false, true, true, true, true, true, true, , , , ," },
loanAmount: { type: Number, comment: "Loan Amount, currency, false, true, true, true, true, true, true, , , , ," },
loanPurpose: { type:  String , comment: "Loan Purpose, p, false, true, true, true, true, true, true, , , , ," },
propertyAddress: { type:  String , comment: "Property Address, p, false, true, true, true, true, true, true, , , , ," },
purchasePrice: { type: Number, comment: "Purchase Price, currency, false, true, true, true, true, true, true, , , , ," },
ltvPercentage: { type: Number, comment: "Ltv Percentage, p_number, false, true, true, true, true, true, true, , , , ," },
repaymentTermRequested: { type: Number, comment: "Repayment Term Requested, p_number, false, true, true, true, true, true, true, , , , ," },
standardInterestRate: { type: Number, comment: "Standard Interest Rate, p_number, false, true, true, true, true, true, true, , , , ," },
executiveSummaryRecommendation: { type:  String , comment: "Executive Summary Recommendation, p, false, true, true, true, true, true, true, , , , ," },
borrowerDob: { type: Date, comment: "Borrower Dob, p_date, false, true, true, true, true, true, true, , , , ," },
employmentIncomeAfterTax: { type: Number, comment: "Employment Income After Tax, p_number, false, true, true, true, true, true, true, , , , ," },
totalDeclaredIncome: { type: Number, comment: "Total Declared Income, p_number, false, true, true, true, true, true, true, , , , ," },
existingMortgageOutstanding: { type: Number, comment: "Existing Mortgage Outstanding, p_number, false, true, true, true, true, true, true, , , , ," },
monthlyMortgagePayment: { type: Number, comment: "Monthly Mortgage Payment, p_number, false, true, true, true, true, true, true, , , , ," },
primaryResidenceValue: { type: Number, comment: "Primary Residence Value, p_number, false, true, true, true, true, true, true, , , , ," },
creditProfileSummary: { type:  String , comment: "Credit Profile Summary, p, false, true, true, true, true, true, true, , , , ," },
propertyType: { type:  String , comment: "Property Type, p, false, true, true, true, true, true, true, , , , ," },
estimatedPropertyValue: { type: Number, comment: "Estimated Property Value, p_number, false, true, true, true, true, true, true, , , , ," },
exitStrategySummary: { type:  String , comment: "Exit Strategy Summary, p, false, true, true, true, true, true, true, , , , ," },
preparedBy: { type: Schema.Types.ObjectId, ref: "profiles", comment: "Prepared By, dropdown, false, true, true, true, true, true, true, profiles, profiles, one-to-one, name," },
preparedDate: { type: Date, comment: "Prepared Date, p_date, false, true, true, true, true, true, true, , , , ," },
status: { type:  String , comment: "Status, p, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };