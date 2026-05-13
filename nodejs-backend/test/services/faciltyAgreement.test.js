const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("faciltyAgreement service", async () => {
  let thisService;
  let faciltyAgreementCreated;
  let usersServiceResults;
  let users;

  const leadsCreated = await app.service("leads").Model.create({"dealId":"parentObjectId","clientId":"parentObjectId","leadId":"parentObjectId","user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value"});
const clientsCreated = await app.service("clients").Model.create({"dealId":"parentObjectId","clientId":"parentObjectId","leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value"});
const dealsCreated = await app.service("deals").Model.create({"dealId":"parentObjectId","clientId":`${clientsCreated._id}`,"leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value","phase":"new value","approvedAt":"2026-05-13T19:45:54.878Z","rejectedAt":"2026-05-13T19:45:54.878Z"});

  beforeEach(async () => {
    thisService = await app.service("faciltyAgreement");

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
    assert.ok(thisService, "Registered the service (faciltyAgreement)");
  });

  describe("#create", () => {
    const options = {"dealId":`${dealsCreated._id}`,"clientId":`${clientsCreated._id}`,"leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value","phase":"new value","approvedAt":"2026-05-13T19:45:54.878Z","rejectedAt":"2026-05-13T19:45:54.878Z","agreementDate":"2026-05-13T19:45:54.878Z","lenderName":"new value","borrowerName":"new value","borrowerAddress":"new value","facilityAmount":23,"marketValuePercentage":23,"loanAdvance":23,"loanTerm":23,"finalRepaymentDate":"2026-05-13T19:45:54.879Z","standardRatePerAnnum":23,"concessionaryRatePerMonth":23,"arrangementFeeAmount":23,"propertyAddress":"new value","propertyTitleNumber":"new value","securityDescription":"new value","lendersSolicitorsName":"new value","monthlyInterestRate":23,"borrowerSignatoryName":"new value","businessPurposeDeclarationDate":"2026-05-13T19:45:54.879Z"};

    beforeEach(async () => {
      faciltyAgreementCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new faciltyAgreement", () => {
      assert.strictEqual(faciltyAgreementCreated.dealId.toString(), options.dealId.toString());
assert.strictEqual(faciltyAgreementCreated.agreementDate.toISOString(), options.agreementDate);
assert.strictEqual(faciltyAgreementCreated.lenderName, options.lenderName);
assert.strictEqual(faciltyAgreementCreated.borrowerName, options.borrowerName);
assert.strictEqual(faciltyAgreementCreated.borrowerAddress, options.borrowerAddress);
assert.strictEqual(faciltyAgreementCreated.facilityAmount, options.facilityAmount);
assert.strictEqual(faciltyAgreementCreated.marketValuePercentage, options.marketValuePercentage);
assert.strictEqual(faciltyAgreementCreated.loanAdvance, options.loanAdvance);
assert.strictEqual(faciltyAgreementCreated.loanTerm, options.loanTerm);
assert.strictEqual(faciltyAgreementCreated.finalRepaymentDate.toISOString(), options.finalRepaymentDate);
assert.strictEqual(faciltyAgreementCreated.standardRatePerAnnum, options.standardRatePerAnnum);
assert.strictEqual(faciltyAgreementCreated.concessionaryRatePerMonth, options.concessionaryRatePerMonth);
assert.strictEqual(faciltyAgreementCreated.arrangementFeeAmount, options.arrangementFeeAmount);
assert.strictEqual(faciltyAgreementCreated.propertyAddress, options.propertyAddress);
assert.strictEqual(faciltyAgreementCreated.propertyTitleNumber, options.propertyTitleNumber);
assert.strictEqual(faciltyAgreementCreated.securityDescription, options.securityDescription);
assert.strictEqual(faciltyAgreementCreated.lendersSolicitorsName, options.lendersSolicitorsName);
assert.strictEqual(faciltyAgreementCreated.monthlyInterestRate, options.monthlyInterestRate);
assert.strictEqual(faciltyAgreementCreated.borrowerSignatoryName, options.borrowerSignatoryName);
assert.strictEqual(faciltyAgreementCreated.businessPurposeDeclarationDate.toISOString(), options.businessPurposeDeclarationDate);
assert.strictEqual(faciltyAgreementCreated.status, options.status);
    });
  });

  describe("#get", () => {
    it("should retrieve a faciltyAgreement by ID", async () => {
      const retrieved = await thisService.Model.findById(faciltyAgreementCreated._id);
      assert.strictEqual(retrieved._id.toString(), faciltyAgreementCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"dealId":`${dealsCreated._id}`,"agreementDate":"2026-05-13T19:45:54.878Z","lenderName":"updated value","borrowerName":"updated value","borrowerAddress":"updated value","facilityAmount":100,"marketValuePercentage":100,"loanAdvance":100,"loanTerm":100,"finalRepaymentDate":"2026-05-13T19:45:54.879Z","standardRatePerAnnum":100,"concessionaryRatePerMonth":100,"arrangementFeeAmount":100,"propertyAddress":"updated value","propertyTitleNumber":"updated value","securityDescription":"updated value","lendersSolicitorsName":"updated value","monthlyInterestRate":100,"borrowerSignatoryName":"updated value","businessPurposeDeclarationDate":"2026-05-13T19:45:54.879Z","status":"updated value"};

    it("should update an existing faciltyAgreement ", async () => {
      const faciltyAgreementUpdated = await thisService.Model.findByIdAndUpdate(
        faciltyAgreementCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(faciltyAgreementUpdated.dealId.toString(), options.dealId.toString());
assert.strictEqual(faciltyAgreementUpdated.agreementDate.toISOString(), options.agreementDate);
assert.strictEqual(faciltyAgreementUpdated.lenderName, options.lenderName);
assert.strictEqual(faciltyAgreementUpdated.borrowerName, options.borrowerName);
assert.strictEqual(faciltyAgreementUpdated.borrowerAddress, options.borrowerAddress);
assert.strictEqual(faciltyAgreementUpdated.facilityAmount, options.facilityAmount);
assert.strictEqual(faciltyAgreementUpdated.marketValuePercentage, options.marketValuePercentage);
assert.strictEqual(faciltyAgreementUpdated.loanAdvance, options.loanAdvance);
assert.strictEqual(faciltyAgreementUpdated.loanTerm, options.loanTerm);
assert.strictEqual(faciltyAgreementUpdated.finalRepaymentDate.toISOString(), options.finalRepaymentDate);
assert.strictEqual(faciltyAgreementUpdated.standardRatePerAnnum, options.standardRatePerAnnum);
assert.strictEqual(faciltyAgreementUpdated.concessionaryRatePerMonth, options.concessionaryRatePerMonth);
assert.strictEqual(faciltyAgreementUpdated.arrangementFeeAmount, options.arrangementFeeAmount);
assert.strictEqual(faciltyAgreementUpdated.propertyAddress, options.propertyAddress);
assert.strictEqual(faciltyAgreementUpdated.propertyTitleNumber, options.propertyTitleNumber);
assert.strictEqual(faciltyAgreementUpdated.securityDescription, options.securityDescription);
assert.strictEqual(faciltyAgreementUpdated.lendersSolicitorsName, options.lendersSolicitorsName);
assert.strictEqual(faciltyAgreementUpdated.monthlyInterestRate, options.monthlyInterestRate);
assert.strictEqual(faciltyAgreementUpdated.borrowerSignatoryName, options.borrowerSignatoryName);
assert.strictEqual(faciltyAgreementUpdated.businessPurposeDeclarationDate.toISOString(), options.businessPurposeDeclarationDate);
assert.strictEqual(faciltyAgreementUpdated.status, options.status);
    });
  });

  describe("#delete", async () => {
    it("should delete a faciltyAgreement", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("leads").Model.findByIdAndDelete(leadsCreated._id);
await app.service("clients").Model.findByIdAndDelete(clientsCreated._id);
await app.service("deals").Model.findByIdAndDelete(dealsCreated._id);;

      const faciltyAgreementDeleted = await thisService.Model.findByIdAndDelete(faciltyAgreementCreated._id);
      assert.strictEqual(faciltyAgreementDeleted._id.toString(), faciltyAgreementCreated._id.toString());
    });
  });
});