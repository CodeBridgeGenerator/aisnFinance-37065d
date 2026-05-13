
    module.exports = function (app) {
        const modelName = "facilty_agreement";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            dealId: { type: Schema.Types.ObjectId, ref: "deals", comment: "Deal Id, dropdown, false, true, true, true, true, true, true, deals, deals, one-to-one, status," },
agreementDate: { type: Date, comment: "Agreement Date, p_date, false, true, true, true, true, true, true, , , , ," },
lenderName: { type:  String , comment: "Lender Name, p, false, true, true, true, true, true, true, , , , ," },
borrowerName: { type:  String , comment: "Borrower Name, p, false, true, true, true, true, true, true, , , , ," },
borrowerAddress: { type:  String , comment: "Borrower Address, p, false, true, true, true, true, true, true, , , , ," },
facilityAmount: { type: Number, comment: "Facility Amount, p_number, false, true, true, true, true, true, true, , , , ," },
marketValuePercentage: { type: Number, comment: "Market Value Percentage, p_number, false, true, true, true, true, true, true, , , , ," },
loanAdvance: { type: Number, comment: "Loan Advance, p_number, false, true, true, true, true, true, true, , , , ," },
loanTerm: { type: Number, comment: "Loan Term, p_number, false, true, true, true, true, true, true, , , , ," },
finalRepaymentDate: { type: Date, comment: "Final Repayment Date, p_date, false, true, true, true, true, true, true, , , , ," },
standardRatePerAnnum: { type: Number, comment: "Standard Rate Per Annum, p_number, false, true, true, true, true, true, true, , , , ," },
concessionaryRatePerMonth: { type: Number, comment: "Concessionary Rate Per Month, p_number, false, true, true, true, true, true, true, , , , ," },
arrangementFeeAmount: { type: Number, comment: "Arrangement Fee Amount, p_number, false, true, true, true, true, true, true, , , , ," },
propertyAddress: { type:  String , comment: "Property Address, p, false, true, true, true, true, true, true, , , , ," },
propertyTitleNumber: { type:  String , comment: "Property Title Number, p, false, true, true, true, true, true, true, , , , ," },
securityDescription: { type:  String , comment: "Security Description, p, false, true, true, true, true, true, true, , , , ," },
lendersSolicitorsName: { type:  String , comment: "Lenders Solicitors Name, p, false, true, true, true, true, true, true, , , , ," },
monthlyInterestRate: { type: Number, comment: "Monthly Interest Rate, p_number, false, true, true, true, true, true, true, , , , ," },
borrowerSignatoryName: { type:  String , comment: "Borrower Signatory Name, p, false, true, true, true, true, true, true, , , , ," },
businessPurposeDeclarationDate: { type: Date, comment: "Business Purpose Declaration Date, p_date, false, true, true, true, true, true, true, , , , ," },
status: { type:  String , comment: "Status, p, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };