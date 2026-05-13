const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("creditPaper service", async () => {
  let thisService;
  let creditPaperCreated;
  let usersServiceResults;
  let users;

  const leadsCreated = await app.service("leads").Model.create({"dealId":"parentObjectId","clientId":"parentObjectId","leadId":"parentObjectId","user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value"});
const clientsCreated = await app.service("clients").Model.create({"dealId":"parentObjectId","clientId":"parentObjectId","leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value"});
const dealsCreated = await app.service("deals").Model.create({"dealId":"parentObjectId","clientId":`${clientsCreated._id}`,"leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value","phase":"new value","approvedAt":"2026-05-13T19:45:54.836Z","rejectedAt":"2026-05-13T19:45:54.836Z"});

  beforeEach(async () => {
    thisService = await app.service("creditPaper");

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
    assert.ok(thisService, "Registered the service (creditPaper)");
  });

  describe("#create", () => {
    const options = {"dealId":`${dealsCreated._id}`,"clientId":`${clientsCreated._id}`,"leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value","phase":"new value","approvedAt":"2026-05-13T19:45:54.836Z","rejectedAt":"2026-05-13T19:45:54.836Z","preparedBy":"parentObjectId","borrowerName":"new value","loanAmount":23,"loanPurpose":"new value","propertyAddress":"new value","purchasePrice":23,"ltvPercentage":23,"repaymentTermRequested":23,"standardInterestRate":23,"executiveSummaryRecommendation":"new value","borrowerDob":"2026-05-13T19:45:54.836Z","employmentIncomeAfterTax":23,"totalDeclaredIncome":23,"existingMortgageOutstanding":23,"monthlyMortgagePayment":23,"primaryResidenceValue":23,"creditProfileSummary":"new value","propertyType":"new value","estimatedPropertyValue":23,"exitStrategySummary":"new value","preparedDate":"2026-05-13T19:45:54.836Z"};

    beforeEach(async () => {
      creditPaperCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new creditPaper", () => {
      assert.strictEqual(creditPaperCreated.dealId.toString(), options.dealId.toString());
assert.strictEqual(creditPaperCreated.preparedBy.toString(), options.preparedBy.toString());
assert.strictEqual(creditPaperCreated.borrowerName, options.borrowerName);
assert.strictEqual(creditPaperCreated.loanAmount, options.loanAmount);
assert.strictEqual(creditPaperCreated.loanPurpose, options.loanPurpose);
assert.strictEqual(creditPaperCreated.propertyAddress, options.propertyAddress);
assert.strictEqual(creditPaperCreated.purchasePrice, options.purchasePrice);
assert.strictEqual(creditPaperCreated.ltvPercentage, options.ltvPercentage);
assert.strictEqual(creditPaperCreated.repaymentTermRequested, options.repaymentTermRequested);
assert.strictEqual(creditPaperCreated.standardInterestRate, options.standardInterestRate);
assert.strictEqual(creditPaperCreated.executiveSummaryRecommendation, options.executiveSummaryRecommendation);
assert.strictEqual(creditPaperCreated.borrowerDob.toISOString(), options.borrowerDob);
assert.strictEqual(creditPaperCreated.employmentIncomeAfterTax, options.employmentIncomeAfterTax);
assert.strictEqual(creditPaperCreated.totalDeclaredIncome, options.totalDeclaredIncome);
assert.strictEqual(creditPaperCreated.existingMortgageOutstanding, options.existingMortgageOutstanding);
assert.strictEqual(creditPaperCreated.monthlyMortgagePayment, options.monthlyMortgagePayment);
assert.strictEqual(creditPaperCreated.primaryResidenceValue, options.primaryResidenceValue);
assert.strictEqual(creditPaperCreated.creditProfileSummary, options.creditProfileSummary);
assert.strictEqual(creditPaperCreated.propertyType, options.propertyType);
assert.strictEqual(creditPaperCreated.estimatedPropertyValue, options.estimatedPropertyValue);
assert.strictEqual(creditPaperCreated.exitStrategySummary, options.exitStrategySummary);
assert.strictEqual(creditPaperCreated.preparedBy.toString(), options.preparedBy.toString());
assert.strictEqual(creditPaperCreated.preparedDate.toISOString(), options.preparedDate);
assert.strictEqual(creditPaperCreated.status, options.status);
    });
  });

  describe("#get", () => {
    it("should retrieve a creditPaper by ID", async () => {
      const retrieved = await thisService.Model.findById(creditPaperCreated._id);
      assert.strictEqual(retrieved._id.toString(), creditPaperCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"dealId":`${dealsCreated._id}`,"preparedBy":`${profilesCreated._id}`,"borrowerName":"updated value","loanAmount":100,"loanPurpose":"updated value","propertyAddress":"updated value","purchasePrice":100,"ltvPercentage":100,"repaymentTermRequested":100,"standardInterestRate":100,"executiveSummaryRecommendation":"updated value","borrowerDob":"2026-05-13T19:45:54.836Z","employmentIncomeAfterTax":100,"totalDeclaredIncome":100,"existingMortgageOutstanding":100,"monthlyMortgagePayment":100,"primaryResidenceValue":100,"creditProfileSummary":"updated value","propertyType":"updated value","estimatedPropertyValue":100,"exitStrategySummary":"updated value","preparedDate":"2026-05-13T19:45:54.836Z","status":"updated value"};

    it("should update an existing creditPaper ", async () => {
      const creditPaperUpdated = await thisService.Model.findByIdAndUpdate(
        creditPaperCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(creditPaperUpdated.dealId.toString(), options.dealId.toString());
assert.strictEqual(creditPaperUpdated.preparedBy.toString(), options.preparedBy.toString());
assert.strictEqual(creditPaperUpdated.borrowerName, options.borrowerName);
assert.strictEqual(creditPaperUpdated.loanAmount, options.loanAmount);
assert.strictEqual(creditPaperUpdated.loanPurpose, options.loanPurpose);
assert.strictEqual(creditPaperUpdated.propertyAddress, options.propertyAddress);
assert.strictEqual(creditPaperUpdated.purchasePrice, options.purchasePrice);
assert.strictEqual(creditPaperUpdated.ltvPercentage, options.ltvPercentage);
assert.strictEqual(creditPaperUpdated.repaymentTermRequested, options.repaymentTermRequested);
assert.strictEqual(creditPaperUpdated.standardInterestRate, options.standardInterestRate);
assert.strictEqual(creditPaperUpdated.executiveSummaryRecommendation, options.executiveSummaryRecommendation);
assert.strictEqual(creditPaperUpdated.borrowerDob.toISOString(), options.borrowerDob);
assert.strictEqual(creditPaperUpdated.employmentIncomeAfterTax, options.employmentIncomeAfterTax);
assert.strictEqual(creditPaperUpdated.totalDeclaredIncome, options.totalDeclaredIncome);
assert.strictEqual(creditPaperUpdated.existingMortgageOutstanding, options.existingMortgageOutstanding);
assert.strictEqual(creditPaperUpdated.monthlyMortgagePayment, options.monthlyMortgagePayment);
assert.strictEqual(creditPaperUpdated.primaryResidenceValue, options.primaryResidenceValue);
assert.strictEqual(creditPaperUpdated.creditProfileSummary, options.creditProfileSummary);
assert.strictEqual(creditPaperUpdated.propertyType, options.propertyType);
assert.strictEqual(creditPaperUpdated.estimatedPropertyValue, options.estimatedPropertyValue);
assert.strictEqual(creditPaperUpdated.exitStrategySummary, options.exitStrategySummary);
assert.strictEqual(creditPaperUpdated.preparedBy.toString(), options.preparedBy.toString());
assert.strictEqual(creditPaperUpdated.preparedDate.toISOString(), options.preparedDate);
assert.strictEqual(creditPaperUpdated.status, options.status);
    });
  });

  describe("#delete", async () => {
    it("should delete a creditPaper", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("leads").Model.findByIdAndDelete(leadsCreated._id);
await app.service("clients").Model.findByIdAndDelete(clientsCreated._id);
await app.service("deals").Model.findByIdAndDelete(dealsCreated._id);;

      const creditPaperDeleted = await thisService.Model.findByIdAndDelete(creditPaperCreated._id);
      assert.strictEqual(creditPaperDeleted._id.toString(), creditPaperCreated._id.toString());
    });
  });
});