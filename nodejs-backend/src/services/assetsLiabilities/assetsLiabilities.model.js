
    module.exports = function (app) {
        const modelName = "assets_liabilities";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            applicationId: { type: Schema.Types.ObjectId, ref: "commercial_applications", comment: "Application Id, dropdown, false, true, true, true, true, true, true, commercialApplications, commercial_applications, one-to-one, status," },
customerName: { type:  String , comment: "Customer Name, p, false, true, true, true, true, true, true, , , , ," },
date: { type: Date, comment: "Date, p_date, false, true, true, true, true, true, true, , , , ," },
incomeSelfMonthly: { type: Number, comment: "Income Self Monthly, p_number, false, true, true, true, true, true, true, , , , ," },
incomePartnerMonthly: { type: Number, comment: "Income Partner Monthly, p_number, false, true, true, true, true, true, true, , , , ," },
incomeOtherMonthly: { type: Number, comment: "Income Other Monthly, p_number, false, true, true, true, true, true, true, , , , ," },
totalMonthlyIncome: { type: Number, comment: "Total Monthly Income, p_number, false, true, true, true, true, true, true, , , , ," },
expenditureMortgageRent: { type: Number, comment: "Expenditure Mortgage Rent, p_number, false, true, true, true, true, true, true, , , , ," },
expenditureLifeAssurance: { type: Number, comment: "Expenditure Life Assurance, p_number, false, true, true, true, true, true, true, , , , ," },
expenditureCouncilTax: { type: Number, comment: "Expenditure Council Tax, p_number, false, true, true, true, true, true, true, , , , ," },
expenditureUtilities: { type: Number, comment: "Expenditure Utilities, p_number, false, true, true, true, true, true, true, , , , ," },
expenditureInsurance: { type: Number, comment: "Expenditure Insurance, p_number, false, true, true, true, true, true, true, , , , ," },
expenditureTravel: { type: Number, comment: "Expenditure Travel, p_number, false, true, true, true, true, true, true, , , , ," },
expenditurePetrol: { type: Number, comment: "Expenditure Petrol, p_number, false, true, true, true, true, true, true, , , , ," },
expenditureCarInsurance: { type: Number, comment: "Expenditure Car Insurance, p_number, false, true, true, true, true, true, true, , , , ," },
expenditureFoodClothing: { type: Number, comment: "Expenditure Food Clothing, p_number, false, true, true, true, true, true, true, , , , ," },
expenditureExistingBorrowings: { type: Number, comment: "Expenditure Existing Borrowings, p_number, false, true, true, true, true, true, true, , , , ," },
expenditureOtherLoans: { type: Number, comment: "Expenditure Other Loans, p_number, false, true, true, true, true, true, true, , , , ," },
expenditureEntertainment: { type: Number, comment: "Expenditure Entertainment, p_number, false, true, true, true, true, true, true, , , , ," },
expenditureOther: { type: Number, comment: "Expenditure Other, p_number, false, true, true, true, true, true, true, , , , ," },
totalMonthlyExpenditure: { type: Number, comment: "Total Monthly Expenditure, p_number, false, true, true, true, true, true, true, , , , ," },
monthlyDisposableIncome: { type: Number, comment: "Monthly Disposable Income, p_number, false, true, true, true, true, true, true, , , , ," },
assetCash: { type: Number, comment: "Asset Cash, p_number, false, true, true, true, true, true, true, , , , ," },
assetShares: { type: Number, comment: "Asset Shares, p_number, false, true, true, true, true, true, true, , , , ," },
assetLifePolicy: { type: Number, comment: "Asset Life Policy, p_number, false, true, true, true, true, true, true, , , , ," },
assetDwellingHouse: { type: Number, comment: "Asset Dwelling House, p_number, false, true, true, true, true, true, true, , , , ," },
assetOtherProperty1: { type: Number, comment: "Asset Other Property 1, p_number, false, true, true, true, true, true, true, , , , ," },
assetOtherProperty2: { type: Number, comment: "Asset Other Property 2, p_number, false, true, true, true, true, true, true, , , , ," },
assetOtherInvestments: { type: Number, comment: "Asset Other Investments, p_number, false, true, true, true, true, true, true, , , , ," },
totalAssets: { type: Number, comment: "Total Assets, p_number, false, true, true, true, true, true, true, , , , ," },
liabilityOverdraft: { type: Number, comment: "Liability Overdraft, p_number, false, true, true, true, true, true, true, , , , ," },
liabilityMortgage: { type: Number, comment: "Liability Mortgage, p_number, false, true, true, true, true, true, true, , , , ," },
liabilityCarLoan: { type: Number, comment: "Liability Car Loan, p_number, false, true, true, true, true, true, true, , , , ," },
liabilityPersonalLoan1: { type: Number, comment: "Liability Personal Loan 1, p_number, false, true, true, true, true, true, true, , , , ," },
liabilityPersonalLoan2: { type: Number, comment: "Liability Personal Loan 2, p_number, false, true, true, true, true, true, true, , , , ," },
liabilityPersonalLoan3: { type: Number, comment: "Liability Personal Loan 3, p_number, false, true, true, true, true, true, true, , , , ," },
liabilityCreditCard1: { type: Number, comment: "Liability Credit Card 1, p_number, false, true, true, true, true, true, true, , , , ," },
liabilityCreditCard2: { type: Number, comment: "Liability Credit Card 2, p_number, false, true, true, true, true, true, true, , , , ," },
liabilityCreditCard3: { type: Number, comment: "Liability Credit Card 3, p_number, false, true, true, true, true, true, true, , , , ," },
liabilityPersonalTax: { type: Number, comment: "Liability Personal Tax, p_number, false, true, true, true, true, true, true, , , , ," },
liabilityPersonalGuarantees: { type: Number, comment: "Liability Personal Guarantees, p_number, false, true, true, true, true, true, true, , , , ," },
liabilityOther: { type: Number, comment: "Liability Other, p_number, false, true, true, true, true, true, true, , , , ," },
totalLiabilities: { type: Number, comment: "Total Liabilities, p_number, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };