const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("directorDecision service", async () => {
  let thisService;
  let directorDecisionCreated;
  let usersServiceResults;
  let users;

  const leadsCreated = await app.service("leads").Model.create({"creditpaperId":"parentObjectId","dealId":"parentObjectId","clientId":"parentObjectId","leadId":"parentObjectId","user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value"});
const clientsCreated = await app.service("clients").Model.create({"creditpaperId":"parentObjectId","dealId":"parentObjectId","clientId":"parentObjectId","leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value"});
const dealsCreated = await app.service("deals").Model.create({"creditpaperId":"parentObjectId","dealId":"parentObjectId","clientId":`${clientsCreated._id}`,"leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value","phase":"new value","approvedAt":"2026-05-13T19:45:54.803Z","rejectedAt":"2026-05-13T19:45:54.804Z"});
const creditPaperCreated = await app.service("creditPaper").Model.create({"creditpaperId":"parentObjectId","dealId":`${dealsCreated._id}`,"clientId":`${clientsCreated._id}`,"leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value","phase":"new value","approvedAt":"2026-05-13T19:45:54.803Z","rejectedAt":"2026-05-13T19:45:54.804Z","preparedBy":"parentObjectId","borrowerName":"new value","loanAmount":23,"loanPurpose":"new value","propertyAddress":"new value","purchasePrice":23,"ltvPercentage":23,"repaymentTermRequested":23,"standardInterestRate":23,"executiveSummaryRecommendation":"new value","borrowerDob":"2026-05-13T19:45:54.804Z","employmentIncomeAfterTax":23,"totalDeclaredIncome":23,"existingMortgageOutstanding":23,"monthlyMortgagePayment":23,"primaryResidenceValue":23,"creditProfileSummary":"new value","propertyType":"new value","estimatedPropertyValue":23,"exitStrategySummary":"new value","preparedDate":"2026-05-13T19:45:54.804Z"});

  beforeEach(async () => {
    thisService = await app.service("directorDecision");

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
    assert.ok(thisService, "Registered the service (directorDecision)");
  });

  describe("#create", () => {
    const options = {"creditpaperId":`${creditPaperCreated._id}`,"dealId":`${dealsCreated._id}`,"clientId":`${clientsCreated._id}`,"leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value","phase":"new value","approvedAt":"2026-05-13T19:45:54.803Z","rejectedAt":"2026-05-13T19:45:54.804Z","preparedBy":"parentObjectId","borrowerName":"new value","loanAmount":23,"loanPurpose":"new value","propertyAddress":"new value","purchasePrice":23,"ltvPercentage":23,"repaymentTermRequested":23,"standardInterestRate":23,"executiveSummaryRecommendation":"new value","borrowerDob":"2026-05-13T19:45:54.804Z","employmentIncomeAfterTax":23,"totalDeclaredIncome":23,"existingMortgageOutstanding":23,"monthlyMortgagePayment":23,"primaryResidenceValue":23,"creditProfileSummary":"new value","propertyType":"new value","estimatedPropertyValue":23,"exitStrategySummary":"new value","preparedDate":"2026-05-13T19:45:54.804Z","directorProfileId":"parentObjectId","recommendationText":"new value","decision":"new value","comments":"new value","signedAt":"2026-05-13T19:45:54.804Z","decidedAt":"2026-05-13T19:45:54.804Z"};

    beforeEach(async () => {
      directorDecisionCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new directorDecision", () => {
      assert.strictEqual(directorDecisionCreated.creditpaperId.toString(), options.creditpaperId.toString());
assert.strictEqual(directorDecisionCreated.directorProfileId.toString(), options.directorProfileId.toString());
assert.strictEqual(directorDecisionCreated.recommendationText, options.recommendationText);
assert.strictEqual(directorDecisionCreated.decision, options.decision);
assert.strictEqual(directorDecisionCreated.comments, options.comments);
assert.strictEqual(directorDecisionCreated.signedAt.toISOString(), options.signedAt);
assert.strictEqual(directorDecisionCreated.decidedAt.toISOString(), options.decidedAt);
    });
  });

  describe("#get", () => {
    it("should retrieve a directorDecision by ID", async () => {
      const retrieved = await thisService.Model.findById(directorDecisionCreated._id);
      assert.strictEqual(retrieved._id.toString(), directorDecisionCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"creditpaperId":`${creditPaperCreated._id}`,"directorProfileId":`${profilesCreated._id}`,"recommendationText":"updated value","decision":"updated value","comments":"updated value","signedAt":"2026-05-13T19:45:54.804Z","decidedAt":"2026-05-13T19:45:54.804Z"};

    it("should update an existing directorDecision ", async () => {
      const directorDecisionUpdated = await thisService.Model.findByIdAndUpdate(
        directorDecisionCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(directorDecisionUpdated.creditpaperId.toString(), options.creditpaperId.toString());
assert.strictEqual(directorDecisionUpdated.directorProfileId.toString(), options.directorProfileId.toString());
assert.strictEqual(directorDecisionUpdated.recommendationText, options.recommendationText);
assert.strictEqual(directorDecisionUpdated.decision, options.decision);
assert.strictEqual(directorDecisionUpdated.comments, options.comments);
assert.strictEqual(directorDecisionUpdated.signedAt.toISOString(), options.signedAt);
assert.strictEqual(directorDecisionUpdated.decidedAt.toISOString(), options.decidedAt);
    });
  });

  describe("#delete", async () => {
    it("should delete a directorDecision", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("leads").Model.findByIdAndDelete(leadsCreated._id);
await app.service("clients").Model.findByIdAndDelete(clientsCreated._id);
await app.service("deals").Model.findByIdAndDelete(dealsCreated._id);
await app.service("creditPaper").Model.findByIdAndDelete(creditPaperCreated._id);;

      const directorDecisionDeleted = await thisService.Model.findByIdAndDelete(directorDecisionCreated._id);
      assert.strictEqual(directorDecisionDeleted._id.toString(), directorDecisionCreated._id.toString());
    });
  });
});