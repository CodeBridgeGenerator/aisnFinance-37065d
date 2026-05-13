const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("offerLetter service", async () => {
  let thisService;
  let offerLetterCreated;
  let usersServiceResults;
  let users;

  const leadsCreated = await app.service("leads").Model.create({"dealId":"parentObjectId","clientId":"parentObjectId","leadId":"parentObjectId","user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value"});
const clientsCreated = await app.service("clients").Model.create({"dealId":"parentObjectId","clientId":"parentObjectId","leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value"});
const dealsCreated = await app.service("deals").Model.create({"dealId":"parentObjectId","clientId":`${clientsCreated._id}`,"leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value","phase":"new value","approvedAt":"2026-05-13T19:45:54.726Z","rejectedAt":"2026-05-13T19:45:54.726Z"});

  beforeEach(async () => {
    thisService = await app.service("offerLetter");

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
    assert.ok(thisService, "Registered the service (offerLetter)");
  });

  describe("#create", () => {
    const options = {"dealId":`${dealsCreated._id}`,"clientId":`${clientsCreated._id}`,"leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value","phase":"new value","approvedAt":"2026-05-13T19:45:54.726Z","rejectedAt":"2026-05-13T19:45:54.726Z","clientProfile":"parentObjectId","applicantName":"new value","referenceNo":"new value","approvalDate":"2026-05-13T19:45:54.726Z","validityDays":23,"securityDescription":"new value","estimatedValue":23,"purchasePrice":23,"grossLoanAmount":23,"maxLtvPercentage":23,"loanTermMonths":23,"arrangementFeePercentage":23,"concessionaryInterestRateMonthly":23,"standardInterestRateMonthly":23,"monthlyInterestPaymentsCharges":23,"advanceInterestAmount":23,"exitStrategyCondition":"new value","generatedPdfDocument":"new value","generatedByProfile":"parentObjectId"};

    beforeEach(async () => {
      offerLetterCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new offerLetter", () => {
      assert.strictEqual(offerLetterCreated.dealId.toString(), options.dealId.toString());
assert.strictEqual(offerLetterCreated.clientProfile.toString(), options.clientProfile.toString());
assert.strictEqual(offerLetterCreated.applicantName, options.applicantName);
assert.strictEqual(offerLetterCreated.referenceNo, options.referenceNo);
assert.strictEqual(offerLetterCreated.approvalDate.toISOString(), options.approvalDate);
assert.strictEqual(offerLetterCreated.validityDays, options.validityDays);
assert.strictEqual(offerLetterCreated.securityDescription, options.securityDescription);
assert.strictEqual(offerLetterCreated.estimatedValue, options.estimatedValue);
assert.strictEqual(offerLetterCreated.purchasePrice, options.purchasePrice);
assert.strictEqual(offerLetterCreated.grossLoanAmount, options.grossLoanAmount);
assert.strictEqual(offerLetterCreated.maxLtvPercentage, options.maxLtvPercentage);
assert.strictEqual(offerLetterCreated.loanTermMonths, options.loanTermMonths);
assert.strictEqual(offerLetterCreated.arrangementFeePercentage, options.arrangementFeePercentage);
assert.strictEqual(offerLetterCreated.concessionaryInterestRateMonthly, options.concessionaryInterestRateMonthly);
assert.strictEqual(offerLetterCreated.standardInterestRateMonthly, options.standardInterestRateMonthly);
assert.strictEqual(offerLetterCreated.monthlyInterestPaymentsCharges, options.monthlyInterestPaymentsCharges);
assert.strictEqual(offerLetterCreated.advanceInterestAmount, options.advanceInterestAmount);
assert.strictEqual(offerLetterCreated.exitStrategyCondition, options.exitStrategyCondition);
assert.strictEqual(offerLetterCreated.status, options.status);
assert.strictEqual(offerLetterCreated.generatedPdfDocument, options.generatedPdfDocument);
assert.strictEqual(offerLetterCreated.generatedByProfile.toString(), options.generatedByProfile.toString());
    });
  });

  describe("#get", () => {
    it("should retrieve a offerLetter by ID", async () => {
      const retrieved = await thisService.Model.findById(offerLetterCreated._id);
      assert.strictEqual(retrieved._id.toString(), offerLetterCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"dealId":`${dealsCreated._id}`,"clientProfile":`${profilesCreated._id}`,"applicantName":"updated value","referenceNo":"updated value","approvalDate":"2026-05-13T19:45:54.726Z","validityDays":100,"securityDescription":"updated value","estimatedValue":100,"purchasePrice":100,"grossLoanAmount":100,"maxLtvPercentage":100,"loanTermMonths":100,"arrangementFeePercentage":100,"concessionaryInterestRateMonthly":100,"standardInterestRateMonthly":100,"monthlyInterestPaymentsCharges":100,"advanceInterestAmount":100,"exitStrategyCondition":"updated value","status":"updated value","generatedPdfDocument":"updated value","generatedByProfile":`${profilesCreated._id}`};

    it("should update an existing offerLetter ", async () => {
      const offerLetterUpdated = await thisService.Model.findByIdAndUpdate(
        offerLetterCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(offerLetterUpdated.dealId.toString(), options.dealId.toString());
assert.strictEqual(offerLetterUpdated.clientProfile.toString(), options.clientProfile.toString());
assert.strictEqual(offerLetterUpdated.applicantName, options.applicantName);
assert.strictEqual(offerLetterUpdated.referenceNo, options.referenceNo);
assert.strictEqual(offerLetterUpdated.approvalDate.toISOString(), options.approvalDate);
assert.strictEqual(offerLetterUpdated.validityDays, options.validityDays);
assert.strictEqual(offerLetterUpdated.securityDescription, options.securityDescription);
assert.strictEqual(offerLetterUpdated.estimatedValue, options.estimatedValue);
assert.strictEqual(offerLetterUpdated.purchasePrice, options.purchasePrice);
assert.strictEqual(offerLetterUpdated.grossLoanAmount, options.grossLoanAmount);
assert.strictEqual(offerLetterUpdated.maxLtvPercentage, options.maxLtvPercentage);
assert.strictEqual(offerLetterUpdated.loanTermMonths, options.loanTermMonths);
assert.strictEqual(offerLetterUpdated.arrangementFeePercentage, options.arrangementFeePercentage);
assert.strictEqual(offerLetterUpdated.concessionaryInterestRateMonthly, options.concessionaryInterestRateMonthly);
assert.strictEqual(offerLetterUpdated.standardInterestRateMonthly, options.standardInterestRateMonthly);
assert.strictEqual(offerLetterUpdated.monthlyInterestPaymentsCharges, options.monthlyInterestPaymentsCharges);
assert.strictEqual(offerLetterUpdated.advanceInterestAmount, options.advanceInterestAmount);
assert.strictEqual(offerLetterUpdated.exitStrategyCondition, options.exitStrategyCondition);
assert.strictEqual(offerLetterUpdated.status, options.status);
assert.strictEqual(offerLetterUpdated.generatedPdfDocument, options.generatedPdfDocument);
assert.strictEqual(offerLetterUpdated.generatedByProfile.toString(), options.generatedByProfile.toString());
    });
  });

  describe("#delete", async () => {
    it("should delete a offerLetter", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("leads").Model.findByIdAndDelete(leadsCreated._id);
await app.service("clients").Model.findByIdAndDelete(clientsCreated._id);
await app.service("deals").Model.findByIdAndDelete(dealsCreated._id);;

      const offerLetterDeleted = await thisService.Model.findByIdAndDelete(offerLetterCreated._id);
      assert.strictEqual(offerLetterDeleted._id.toString(), offerLetterCreated._id.toString());
    });
  });
});