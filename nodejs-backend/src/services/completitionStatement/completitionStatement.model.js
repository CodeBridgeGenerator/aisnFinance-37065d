
    module.exports = function (app) {
        const modelName = "completition_statement";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            dealId: { type: Schema.Types.ObjectId, ref: "deals", comment: "Deal Id, dropdown, false, true, true, true, true, true, true, deals, deals, one-to-one, status," },
borrower: { type:  String , comment: "Borrower, p, false, true, true, true, true, true, true, , , , ," },
property: { type:  String , comment: "Property, p, false, true, true, true, true, true, true, , , , ," },
loanAdvance: { type:  String , comment: "Loan Advance, p, false, true, true, true, true, true, true, , , , ," },
firstMonthInterestRate: { type: Number, comment: "First Month Interest Rate, p_number, false, true, true, true, true, true, true, , , , ," },
firstMonthInterestAmount: { type:  String , comment: "First Month Interest Amount, p, false, true, true, true, true, true, true, , , , ," },
arrangementFee: { type:  String , comment: "Arrangement Fee, p, false, true, true, true, true, true, true, , , , ," },
lendersBankTransferFee: { type:  String , comment: "Lenders Bank Transfer Fee, p, false, true, true, true, true, true, true, , , , ," },
otherDeductions: { type:  String , comment: "Other Deductions, p, false, true, true, true, true, true, true, , , , ," },
netLoanAdvance: { type:  String , comment: "Net Loan Advance, p, false, true, true, true, true, true, true, , , , ," },
amountToBeTransferredToSolicitor: { type:  String , comment: "Amount To Be Transferred To Solicitor, p, false, true, true, true, true, true, true, , , , ," },
lender: { type:  String , comment: "Lender, p, false, true, true, true, true, true, true, , , , ," },
statementDate: { type: Date, comment: "Statement Date, p_date, false, true, true, true, true, true, true, , , , ," },
authorisedSignatory: { type:  String , comment: "Authorised Signatory, p, false, true, true, true, true, true, true, , , , ," },
status: { type:  String , comment: "Status, p, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };