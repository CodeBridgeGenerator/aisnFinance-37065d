
    module.exports = function (app) {
        const modelName = "security_properties";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            applicationId: { type: Schema.Types.ObjectId, ref: "commercial_applications", comment: "Application Id, dropdown, false, true, true, true, true, true, true, commercialApplications, commercial_applications, one-to-one, status," },
propertyType: { type:  String , comment: "Property Type, p, false, true, true, true, true, true, true, , , , ," },
address: { type:  String , comment: "Address, p, false, true, true, true, true, true, true, , , , ," },
postcode: { type:  String , comment: "Postcode, p, false, true, true, true, true, true, true, , , , ," },
description: { type:  String , comment: "Description, p, false, true, true, true, true, true, true, , , , ," },
tenure: { type:  String , comment: "Tenure, p, false, true, true, true, true, true, true, , , , ," },
vacantPossessionOnCompletion: { type: Boolean, required: false, comment: "Vacant Possession On Completion, p_boolean, false, true, true, true, true, true, true, , , , ," },
leaseholdUnexpiredTermYears: { type: Number, comment: "Leasehold Unexpired Term Years, p_number, false, true, true, true, true, true, true, , , , ," },
leaseholdUnexpiredTermMonths: { type: Number, comment: "Leasehold Unexpired Term Months, p_number, false, true, true, true, true, true, true, , , , ," },
leaseholdGroundRentPerAnnum: { type: Number, comment: "Leasehold Ground Rent Per Annum, p_number, false, true, true, true, true, true, true, , , , ," },
lettingRentalIncomePerAnnum: { type: Number, comment: "Letting Rental Income Per Annum, p_number, false, true, true, true, true, true, true, , , , ," },
lettingRentReviewDate: { type: Date, comment: "Letting Rent Review Date, p_date, false, true, true, true, true, true, true, , , , ," },
valuationContactName: { type:  String , comment: "Valuation Contact Name, p, false, true, true, true, true, true, true, , , , ," },
valuationContactPhoneNo: { type:  String , comment: "Valuation Contact Phone No, p, false, true, true, true, true, true, true, , , , ," },
valuationContactEmail: { type:  String , comment: "Valuation Contact Email, p, false, true, true, true, true, true, true, , , , ," },
purchasePrice: { type: Number, comment: "Purchase Price, p_number, false, true, true, true, true, true, true, , , , ," },
purchaseCurrentValue: { type: Number, comment: "Purchase Current Value, p_number, false, true, true, true, true, true, true, , , , ," },
purchaseDeposit: { type: Number, comment: "Purchase Deposit, p_number, false, true, true, true, true, true, true, , , , ," },
purchaseDepositSources: { type:  String , comment: "Purchase Deposit Sources, p, false, true, true, true, true, true, true, , , , ," },
purchaseOtherDepositSource: { type:  String , comment: "Purchase Other Deposit Source, p, false, true, true, true, true, true, true, , , , ," },
purchaseRepaymentDetails: { type:  String , comment: "Purchase Repayment Details, p, false, true, true, true, true, true, true, , , , ," },
ownedPropertyAcquiredDate: { type: Date, comment: "Owned Property Acquired Date, p_date, false, true, true, true, true, true, true, , , , ," },
ownedPropertyPurchasePrice: { type: Number, comment: "Owned Property Purchase Price, p_number, false, true, true, true, true, true, true, , , , ," },
ownedPropertyMostRecentValuation: { type: Number, comment: "Owned Property Most Recent Valuation, p_number, false, true, true, true, true, true, true, , , , ," },
ownedPropertyValuationDate: { type:  String , comment: "Owned Property Valuation Date, p, false, true, true, true, true, true, true, , , , ," },
ownedPropertyOutstandingMortgage: { type: Number, comment: "Owned Property Outstanding Mortgage, p_number, false, true, true, true, true, true, true, , , , ," },
ownedPropertyCurrentLenderName: { type:  String , comment: "Owned Property Current Lender Name, p, false, true, true, true, true, true, true, , , , ," },
ownedPropertycurrentLenderAddress: { type:  String , comment: "Owned Propertycurrent Lender Address, p, false, true, true, true, true, true, true, , , , ," },
ownedPropertymortgageAccountNumber: { type:  String , comment: "Owned Propertymortgage Account Number, p, false, true, true, true, true, true, true, , , , ," },
ownedPropertyhasOtherCharges: { type: Boolean, required: false, comment: "Owned Propertyhas Other Charges, p_boolean, false, true, true, true, true, true, true, , , , ," },
ownedPropertyotherChargesDetails: { type:  String , comment: "Owned Propertyother Charges Details, p, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };