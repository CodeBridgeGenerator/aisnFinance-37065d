const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("mortageDetails service", async () => {
  let thisService;
  let mortageDetailCreated;
  let usersServiceResults;
  let users;

  const leadsCreated = await app.service("leads").Model.create({"applicationId":"parentObjectId","dealId":"parentObjectId","clientId":"parentObjectId","leadId":"parentObjectId","user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value"});
const clientsCreated = await app.service("clients").Model.create({"applicationId":"parentObjectId","dealId":"parentObjectId","clientId":"parentObjectId","leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value"});
const dealsCreated = await app.service("deals").Model.create({"applicationId":"parentObjectId","dealId":"parentObjectId","clientId":`${clientsCreated._id}`,"leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value","phase":"new value","approvedAt":"2026-05-13T19:45:54.366Z","rejectedAt":"2026-05-13T19:45:54.366Z"});
const commercialApplicationsCreated = await app.service("commercialApplications").Model.create({"applicationId":"parentObjectId","dealId":`${dealsCreated._id}`,"clientId":`${clientsCreated._id}`,"leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value","phase":"new value","approvedAt":"2026-05-13T19:45:54.366Z","rejectedAt":"2026-05-13T19:45:54.366Z","contactByTelephone":true,"contactByPost":true,"contactByElectronicMedia":true,"contactForMarketResearch":true,"applicationDocuments":"new value"});

  beforeEach(async () => {
    thisService = await app.service("mortageDetails");

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
    assert.ok(thisService, "Registered the service (mortageDetails)");
  });

  describe("#create", () => {
    const options = {"applicationId":`${commercialApplicationsCreated._id}`,"dealId":`${dealsCreated._id}`,"clientId":`${clientsCreated._id}`,"leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value","phase":"new value","approvedAt":"2026-05-13T19:45:54.366Z","rejectedAt":"2026-05-13T19:45:54.366Z","contactByTelephone":true,"contactByPost":true,"contactByElectronicMedia":true,"contactForMarketResearch":true,"applicationDocuments":"new value","requestedLoanAmount":23,"requestedRepaymentTerm":"new value","purposeOfMortage":"new value","mortgageHolders":"new value","capitalRaisingFundUse":"new value","investmentPropertyOccupier":"new value","investmentPropertyOccupierDetails":true,"solicitorName":"new value","solicitorAddress":"new value","solicitorPhoneNo":"new value","solicitorEmail":"new value","intermediaryName":"new value","intermediaryAddress":"new value","intermediaryPhoneNo":"new value","intermediaryEmail":"new value"};

    beforeEach(async () => {
      mortageDetailCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new mortageDetail", () => {
      assert.strictEqual(mortageDetailCreated.applicationId.toString(), options.applicationId.toString());
assert.strictEqual(mortageDetailCreated.requestedLoanAmount, options.requestedLoanAmount);
assert.strictEqual(mortageDetailCreated.requestedRepaymentTerm, options.requestedRepaymentTerm);
assert.strictEqual(mortageDetailCreated.purposeOfMortage, options.purposeOfMortage);
assert.strictEqual(mortageDetailCreated.mortgageHolders, options.mortgageHolders);
assert.strictEqual(mortageDetailCreated.capitalRaisingFundUse, options.capitalRaisingFundUse);
assert.strictEqual(mortageDetailCreated.investmentPropertyOccupier, options.investmentPropertyOccupier);
assert.strictEqual(mortageDetailCreated.investmentPropertyOccupierDetails, options.investmentPropertyOccupierDetails);
assert.strictEqual(mortageDetailCreated.investmentPropertyOccupierDetails, options.investmentPropertyOccupierDetails);
assert.strictEqual(mortageDetailCreated.solicitorName, options.solicitorName);
assert.strictEqual(mortageDetailCreated.solicitorAddress, options.solicitorAddress);
assert.strictEqual(mortageDetailCreated.solicitorPhoneNo, options.solicitorPhoneNo);
assert.strictEqual(mortageDetailCreated.solicitorEmail, options.solicitorEmail);
assert.strictEqual(mortageDetailCreated.intermediaryName, options.intermediaryName);
assert.strictEqual(mortageDetailCreated.intermediaryAddress, options.intermediaryAddress);
assert.strictEqual(mortageDetailCreated.intermediaryPhoneNo, options.intermediaryPhoneNo);
assert.strictEqual(mortageDetailCreated.intermediaryEmail, options.intermediaryEmail);
    });
  });

  describe("#get", () => {
    it("should retrieve a mortageDetail by ID", async () => {
      const retrieved = await thisService.Model.findById(mortageDetailCreated._id);
      assert.strictEqual(retrieved._id.toString(), mortageDetailCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"applicationId":`${commercialApplicationsCreated._id}`,"requestedLoanAmount":100,"requestedRepaymentTerm":"updated value","purposeOfMortage":"updated value","mortgageHolders":"updated value","capitalRaisingFundUse":"updated value","investmentPropertyOccupier":"updated value","investmentPropertyOccupierDetails":false,"solicitorName":"updated value","solicitorAddress":"updated value","solicitorPhoneNo":"updated value","solicitorEmail":"updated value","intermediaryName":"updated value","intermediaryAddress":"updated value","intermediaryPhoneNo":"updated value","intermediaryEmail":"updated value"};

    it("should update an existing mortageDetail ", async () => {
      const mortageDetailUpdated = await thisService.Model.findByIdAndUpdate(
        mortageDetailCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(mortageDetailUpdated.applicationId.toString(), options.applicationId.toString());
assert.strictEqual(mortageDetailUpdated.requestedLoanAmount, options.requestedLoanAmount);
assert.strictEqual(mortageDetailUpdated.requestedRepaymentTerm, options.requestedRepaymentTerm);
assert.strictEqual(mortageDetailUpdated.purposeOfMortage, options.purposeOfMortage);
assert.strictEqual(mortageDetailUpdated.mortgageHolders, options.mortgageHolders);
assert.strictEqual(mortageDetailUpdated.capitalRaisingFundUse, options.capitalRaisingFundUse);
assert.strictEqual(mortageDetailUpdated.investmentPropertyOccupier, options.investmentPropertyOccupier);
assert.strictEqual(mortageDetailUpdated.investmentPropertyOccupierDetails, options.investmentPropertyOccupierDetails);
assert.strictEqual(mortageDetailUpdated.investmentPropertyOccupierDetails, options.investmentPropertyOccupierDetails);
assert.strictEqual(mortageDetailUpdated.solicitorName, options.solicitorName);
assert.strictEqual(mortageDetailUpdated.solicitorAddress, options.solicitorAddress);
assert.strictEqual(mortageDetailUpdated.solicitorPhoneNo, options.solicitorPhoneNo);
assert.strictEqual(mortageDetailUpdated.solicitorEmail, options.solicitorEmail);
assert.strictEqual(mortageDetailUpdated.intermediaryName, options.intermediaryName);
assert.strictEqual(mortageDetailUpdated.intermediaryAddress, options.intermediaryAddress);
assert.strictEqual(mortageDetailUpdated.intermediaryPhoneNo, options.intermediaryPhoneNo);
assert.strictEqual(mortageDetailUpdated.intermediaryEmail, options.intermediaryEmail);
    });
  });

  describe("#delete", async () => {
    it("should delete a mortageDetail", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("leads").Model.findByIdAndDelete(leadsCreated._id);
await app.service("clients").Model.findByIdAndDelete(clientsCreated._id);
await app.service("deals").Model.findByIdAndDelete(dealsCreated._id);
await app.service("commercialApplications").Model.findByIdAndDelete(commercialApplicationsCreated._id);;

      const mortageDetailDeleted = await thisService.Model.findByIdAndDelete(mortageDetailCreated._id);
      assert.strictEqual(mortageDetailDeleted._id.toString(), mortageDetailCreated._id.toString());
    });
  });
});