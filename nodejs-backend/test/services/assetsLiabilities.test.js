const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("assetsLiabilities service", async () => {
  let thisService;
  let assetsLiabilityCreated;
  let usersServiceResults;
  let users;

  const leadsCreated = await app.service("leads").Model.create({"applicationId":"parentObjectId","dealId":"parentObjectId","clientId":"parentObjectId","leadId":"parentObjectId","user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value"});
const clientsCreated = await app.service("clients").Model.create({"applicationId":"parentObjectId","dealId":"parentObjectId","clientId":"parentObjectId","leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value"});
const dealsCreated = await app.service("deals").Model.create({"applicationId":"parentObjectId","dealId":"parentObjectId","clientId":`${clientsCreated._id}`,"leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value","phase":"new value","approvedAt":"2026-05-13T19:45:54.555Z","rejectedAt":"2026-05-13T19:45:54.555Z"});
const commercialApplicationsCreated = await app.service("commercialApplications").Model.create({"applicationId":"parentObjectId","dealId":`${dealsCreated._id}`,"clientId":`${clientsCreated._id}`,"leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value","phase":"new value","approvedAt":"2026-05-13T19:45:54.555Z","rejectedAt":"2026-05-13T19:45:54.555Z","contactByTelephone":true,"contactByPost":true,"contactByElectronicMedia":true,"contactForMarketResearch":true,"applicationDocuments":"new value"});

  beforeEach(async () => {
    thisService = await app.service("assetsLiabilities");

    // Create users here
    usersServiceResults = await app.service("users").Model.create(usersRefData);
    users = {
      createdBy: usersServiceResults[0]._id,
      updatedBy: usersServiceResults[0]._id,
    };
  });

  after(async () => {
    if (usersServiceResults) {
      await Promise.all(
        usersServiceResults.map((i) =>
          app.service("users").Model.findByIdAndDelete(i._id)
        )
      );
    }
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (assetsLiabilities)");
  });

  describe("#create", () => {
    const options = {"applicationId":`${commercialApplicationsCreated._id}`,"dealId":`${dealsCreated._id}`,"clientId":`${clientsCreated._id}`,"leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value","phase":"new value","approvedAt":"2026-05-13T19:45:54.555Z","rejectedAt":"2026-05-13T19:45:54.555Z","contactByTelephone":true,"contactByPost":true,"contactByElectronicMedia":true,"contactForMarketResearch":true,"applicationDocuments":"new value","customerName":"new value","date":"2026-05-13T19:45:54.555Z","incomeSelfMonthly":23,"incomePartnerMonthly":23,"incomeOtherMonthly":23,"totalMonthlyIncome":23,"expenditureMortgageRent":23,"expenditureLifeAssurance":23,"expenditureCouncilTax":23,"expenditureUtilities":23,"expenditureInsurance":23,"expenditureTravel":23,"expenditurePetrol":23,"expenditureCarInsurance":23,"expenditureFoodClothing":23,"expenditureExistingBorrowings":23,"expenditureOtherLoans":23,"expenditureEntertainment":23,"expenditureOther":23,"totalMonthlyExpenditure":23,"monthlyDisposableIncome":23,"assetCash":23,"assetShares":23,"assetLifePolicy":23,"assetDwellingHouse":23,"assetOtherProperty1":23,"assetOtherProperty2":23,"assetOtherInvestments":23,"totalAssets":23,"liabilityOverdraft":23,"liabilityMortgage":23,"liabilityCarLoan":23,"liabilityPersonalLoan1":23,"liabilityPersonalLoan2":23,"liabilityPersonalLoan3":23,"liabilityCreditCard1":23,"liabilityCreditCard2":23,"liabilityCreditCard3":23,"liabilityPersonalTax":23,"liabilityPersonalGuarantees":23,"liabilityOther":23,"totalLiabilities":23};

    beforeEach(async () => {
      assetsLiabilityCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new assetsLiability", () => {
      assert.strictEqual(assetsLiabilityCreated.applicationId.toString(), options.applicationId.toString());
assert.strictEqual(assetsLiabilityCreated.customerName, options.customerName);
assert.strictEqual(assetsLiabilityCreated.date.toISOString(), options.date);
assert.strictEqual(assetsLiabilityCreated.incomeSelfMonthly, options.incomeSelfMonthly);
assert.strictEqual(assetsLiabilityCreated.incomePartnerMonthly, options.incomePartnerMonthly);
assert.strictEqual(assetsLiabilityCreated.incomeOtherMonthly, options.incomeOtherMonthly);
assert.strictEqual(assetsLiabilityCreated.totalMonthlyIncome, options.totalMonthlyIncome);
assert.strictEqual(assetsLiabilityCreated.expenditureMortgageRent, options.expenditureMortgageRent);
assert.strictEqual(assetsLiabilityCreated.expenditureLifeAssurance, options.expenditureLifeAssurance);
assert.strictEqual(assetsLiabilityCreated.expenditureCouncilTax, options.expenditureCouncilTax);
assert.strictEqual(assetsLiabilityCreated.expenditureUtilities, options.expenditureUtilities);
assert.strictEqual(assetsLiabilityCreated.expenditureInsurance, options.expenditureInsurance);
assert.strictEqual(assetsLiabilityCreated.expenditureTravel, options.expenditureTravel);
assert.strictEqual(assetsLiabilityCreated.expenditurePetrol, options.expenditurePetrol);
assert.strictEqual(assetsLiabilityCreated.expenditureCarInsurance, options.expenditureCarInsurance);
assert.strictEqual(assetsLiabilityCreated.expenditureFoodClothing, options.expenditureFoodClothing);
assert.strictEqual(assetsLiabilityCreated.expenditureExistingBorrowings, options.expenditureExistingBorrowings);
assert.strictEqual(assetsLiabilityCreated.expenditureOtherLoans, options.expenditureOtherLoans);
assert.strictEqual(assetsLiabilityCreated.expenditureEntertainment, options.expenditureEntertainment);
assert.strictEqual(assetsLiabilityCreated.expenditureOther, options.expenditureOther);
assert.strictEqual(assetsLiabilityCreated.totalMonthlyExpenditure, options.totalMonthlyExpenditure);
assert.strictEqual(assetsLiabilityCreated.monthlyDisposableIncome, options.monthlyDisposableIncome);
assert.strictEqual(assetsLiabilityCreated.assetCash, options.assetCash);
assert.strictEqual(assetsLiabilityCreated.assetShares, options.assetShares);
assert.strictEqual(assetsLiabilityCreated.assetLifePolicy, options.assetLifePolicy);
assert.strictEqual(assetsLiabilityCreated.assetDwellingHouse, options.assetDwellingHouse);
assert.strictEqual(assetsLiabilityCreated.assetOtherProperty1, options.assetOtherProperty1);
assert.strictEqual(assetsLiabilityCreated.assetOtherProperty2, options.assetOtherProperty2);
assert.strictEqual(assetsLiabilityCreated.assetOtherInvestments, options.assetOtherInvestments);
assert.strictEqual(assetsLiabilityCreated.totalAssets, options.totalAssets);
assert.strictEqual(assetsLiabilityCreated.liabilityOverdraft, options.liabilityOverdraft);
assert.strictEqual(assetsLiabilityCreated.liabilityMortgage, options.liabilityMortgage);
assert.strictEqual(assetsLiabilityCreated.liabilityCarLoan, options.liabilityCarLoan);
assert.strictEqual(assetsLiabilityCreated.liabilityPersonalLoan1, options.liabilityPersonalLoan1);
assert.strictEqual(assetsLiabilityCreated.liabilityPersonalLoan2, options.liabilityPersonalLoan2);
assert.strictEqual(assetsLiabilityCreated.liabilityPersonalLoan3, options.liabilityPersonalLoan3);
assert.strictEqual(assetsLiabilityCreated.liabilityCreditCard1, options.liabilityCreditCard1);
assert.strictEqual(assetsLiabilityCreated.liabilityCreditCard2, options.liabilityCreditCard2);
assert.strictEqual(assetsLiabilityCreated.liabilityCreditCard3, options.liabilityCreditCard3);
assert.strictEqual(assetsLiabilityCreated.liabilityPersonalTax, options.liabilityPersonalTax);
assert.strictEqual(assetsLiabilityCreated.liabilityPersonalGuarantees, options.liabilityPersonalGuarantees);
assert.strictEqual(assetsLiabilityCreated.liabilityOther, options.liabilityOther);
assert.strictEqual(assetsLiabilityCreated.totalLiabilities, options.totalLiabilities);
    });
  });

  describe("#get", () => {
    it("should retrieve a assetsLiability by ID", async () => {
      const retrieved = await thisService.Model.findById(assetsLiabilityCreated._id);
      assert.strictEqual(retrieved._id.toString(), assetsLiabilityCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"applicationId":`${commercialApplicationsCreated._id}`,"customerName":"updated value","date":"2026-05-13T19:45:54.555Z","incomeSelfMonthly":100,"incomePartnerMonthly":100,"incomeOtherMonthly":100,"totalMonthlyIncome":100,"expenditureMortgageRent":100,"expenditureLifeAssurance":100,"expenditureCouncilTax":100,"expenditureUtilities":100,"expenditureInsurance":100,"expenditureTravel":100,"expenditurePetrol":100,"expenditureCarInsurance":100,"expenditureFoodClothing":100,"expenditureExistingBorrowings":100,"expenditureOtherLoans":100,"expenditureEntertainment":100,"expenditureOther":100,"totalMonthlyExpenditure":100,"monthlyDisposableIncome":100,"assetCash":100,"assetShares":100,"assetLifePolicy":100,"assetDwellingHouse":100,"assetOtherProperty1":100,"assetOtherProperty2":100,"assetOtherInvestments":100,"totalAssets":100,"liabilityOverdraft":100,"liabilityMortgage":100,"liabilityCarLoan":100,"liabilityPersonalLoan1":100,"liabilityPersonalLoan2":100,"liabilityPersonalLoan3":100,"liabilityCreditCard1":100,"liabilityCreditCard2":100,"liabilityCreditCard3":100,"liabilityPersonalTax":100,"liabilityPersonalGuarantees":100,"liabilityOther":100,"totalLiabilities":100};

    it("should update an existing assetsLiability ", async () => {
      const assetsLiabilityUpdated = await thisService.Model.findByIdAndUpdate(
        assetsLiabilityCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(assetsLiabilityUpdated.applicationId.toString(), options.applicationId.toString());
assert.strictEqual(assetsLiabilityUpdated.customerName, options.customerName);
assert.strictEqual(assetsLiabilityUpdated.date.toISOString(), options.date);
assert.strictEqual(assetsLiabilityUpdated.incomeSelfMonthly, options.incomeSelfMonthly);
assert.strictEqual(assetsLiabilityUpdated.incomePartnerMonthly, options.incomePartnerMonthly);
assert.strictEqual(assetsLiabilityUpdated.incomeOtherMonthly, options.incomeOtherMonthly);
assert.strictEqual(assetsLiabilityUpdated.totalMonthlyIncome, options.totalMonthlyIncome);
assert.strictEqual(assetsLiabilityUpdated.expenditureMortgageRent, options.expenditureMortgageRent);
assert.strictEqual(assetsLiabilityUpdated.expenditureLifeAssurance, options.expenditureLifeAssurance);
assert.strictEqual(assetsLiabilityUpdated.expenditureCouncilTax, options.expenditureCouncilTax);
assert.strictEqual(assetsLiabilityUpdated.expenditureUtilities, options.expenditureUtilities);
assert.strictEqual(assetsLiabilityUpdated.expenditureInsurance, options.expenditureInsurance);
assert.strictEqual(assetsLiabilityUpdated.expenditureTravel, options.expenditureTravel);
assert.strictEqual(assetsLiabilityUpdated.expenditurePetrol, options.expenditurePetrol);
assert.strictEqual(assetsLiabilityUpdated.expenditureCarInsurance, options.expenditureCarInsurance);
assert.strictEqual(assetsLiabilityUpdated.expenditureFoodClothing, options.expenditureFoodClothing);
assert.strictEqual(assetsLiabilityUpdated.expenditureExistingBorrowings, options.expenditureExistingBorrowings);
assert.strictEqual(assetsLiabilityUpdated.expenditureOtherLoans, options.expenditureOtherLoans);
assert.strictEqual(assetsLiabilityUpdated.expenditureEntertainment, options.expenditureEntertainment);
assert.strictEqual(assetsLiabilityUpdated.expenditureOther, options.expenditureOther);
assert.strictEqual(assetsLiabilityUpdated.totalMonthlyExpenditure, options.totalMonthlyExpenditure);
assert.strictEqual(assetsLiabilityUpdated.monthlyDisposableIncome, options.monthlyDisposableIncome);
assert.strictEqual(assetsLiabilityUpdated.assetCash, options.assetCash);
assert.strictEqual(assetsLiabilityUpdated.assetShares, options.assetShares);
assert.strictEqual(assetsLiabilityUpdated.assetLifePolicy, options.assetLifePolicy);
assert.strictEqual(assetsLiabilityUpdated.assetDwellingHouse, options.assetDwellingHouse);
assert.strictEqual(assetsLiabilityUpdated.assetOtherProperty1, options.assetOtherProperty1);
assert.strictEqual(assetsLiabilityUpdated.assetOtherProperty2, options.assetOtherProperty2);
assert.strictEqual(assetsLiabilityUpdated.assetOtherInvestments, options.assetOtherInvestments);
assert.strictEqual(assetsLiabilityUpdated.totalAssets, options.totalAssets);
assert.strictEqual(assetsLiabilityUpdated.liabilityOverdraft, options.liabilityOverdraft);
assert.strictEqual(assetsLiabilityUpdated.liabilityMortgage, options.liabilityMortgage);
assert.strictEqual(assetsLiabilityUpdated.liabilityCarLoan, options.liabilityCarLoan);
assert.strictEqual(assetsLiabilityUpdated.liabilityPersonalLoan1, options.liabilityPersonalLoan1);
assert.strictEqual(assetsLiabilityUpdated.liabilityPersonalLoan2, options.liabilityPersonalLoan2);
assert.strictEqual(assetsLiabilityUpdated.liabilityPersonalLoan3, options.liabilityPersonalLoan3);
assert.strictEqual(assetsLiabilityUpdated.liabilityCreditCard1, options.liabilityCreditCard1);
assert.strictEqual(assetsLiabilityUpdated.liabilityCreditCard2, options.liabilityCreditCard2);
assert.strictEqual(assetsLiabilityUpdated.liabilityCreditCard3, options.liabilityCreditCard3);
assert.strictEqual(assetsLiabilityUpdated.liabilityPersonalTax, options.liabilityPersonalTax);
assert.strictEqual(assetsLiabilityUpdated.liabilityPersonalGuarantees, options.liabilityPersonalGuarantees);
assert.strictEqual(assetsLiabilityUpdated.liabilityOther, options.liabilityOther);
assert.strictEqual(assetsLiabilityUpdated.totalLiabilities, options.totalLiabilities);
    });
  });

  describe("#delete", async () => {
    it("should delete a assetsLiability", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("leads").Model.findByIdAndDelete(leadsCreated._id);
await app.service("clients").Model.findByIdAndDelete(clientsCreated._id);
await app.service("deals").Model.findByIdAndDelete(dealsCreated._id);
await app.service("commercialApplications").Model.findByIdAndDelete(commercialApplicationsCreated._id);;

      const assetsLiabilityDeleted = await thisService.Model.findByIdAndDelete(assetsLiabilityCreated._id);
      assert.strictEqual(assetsLiabilityDeleted._id.toString(), assetsLiabilityCreated._id.toString());
    });
  });
});