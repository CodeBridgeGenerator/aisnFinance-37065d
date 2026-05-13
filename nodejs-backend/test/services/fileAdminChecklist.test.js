const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("fileAdminChecklist service", async () => {
  let thisService;
  let fileAdminChecklistCreated;
  let usersServiceResults;
  let users;

  const leadsCreated = await app.service("leads").Model.create({"deal":"parentObjectId","clientId":"parentObjectId","leadId":"parentObjectId","user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value"});
const clientsCreated = await app.service("clients").Model.create({"deal":"parentObjectId","clientId":"parentObjectId","leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value"});
const dealsCreated = await app.service("deals").Model.create({"deal":"parentObjectId","clientId":`${clientsCreated._id}`,"leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value","phase":"new value","approvedAt":"2026-05-13T19:45:54.641Z","rejectedAt":"2026-05-13T19:45:54.641Z"});
const dealsCreated = await app.service("deals").Model.create({"deal":`${dealsCreated._id}`,"clientId":"parentObjectId","leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value","phase":"new value","approvedAt":"2026-05-13T19:45:54.642Z","rejectedAt":"2026-05-13T19:45:54.642Z","adviserName":"new value","clientNames":"new value","checkedBy":"parentObjectId","checkedDate":"2026-05-13T19:45:54.641Z","providerName":"new value","lenderName":"new value","productName":"new value","applicationForm":"parentObjectId","dealId":"parentObjectId"});
const commercialApplicationsCreated = await app.service("commercialApplications").Model.create({"deal":`${dealsCreated._id}`,"clientId":"parentObjectId","leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value","phase":"new value","approvedAt":"2026-05-13T19:45:54.642Z","rejectedAt":"2026-05-13T19:45:54.642Z","adviserName":"new value","clientNames":"new value","checkedBy":"parentObjectId","checkedDate":"2026-05-13T19:45:54.641Z","providerName":"new value","lenderName":"new value","productName":"new value","applicationForm":"parentObjectId","dealId":`${dealsCreated._id}`,"contactByTelephone":true,"contactByPost":true,"contactByElectronicMedia":true,"contactForMarketResearch":true,"applicationDocuments":"new value"});

  beforeEach(async () => {
    thisService = await app.service("fileAdminChecklist");

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
    assert.ok(thisService, "Registered the service (fileAdminChecklist)");
  });

  describe("#create", () => {
    const options = {"deal":`${dealsCreated._id}`,"clientId":"parentObjectId","leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value","phase":"new value","approvedAt":"2026-05-13T19:45:54.642Z","rejectedAt":"2026-05-13T19:45:54.642Z","adviserName":"new value","clientNames":"new value","checkedBy":"parentObjectId","checkedDate":"2026-05-13T19:45:54.641Z","providerName":"new value","lenderName":"new value","productName":"new value","applicationForm":`${commercialApplicationsCreated._id}`,"dealId":`${dealsCreated._id}`,"contactByTelephone":true,"contactByPost":true,"contactByElectronicMedia":true,"contactForMarketResearch":true,"applicationDocuments":"new value","applicationFormDate":23,"identificationProof":true,"identificationProofDate":23,"factfindKyc":true,"factfindKycDate":23,"loanMemorandumPreparedOnFile":true,"boardSignOff":true,"offerLetterPreparedSent":true,"offerLetterPrepared":23,"facilityLetterPreparedChecked":true,"valuationsInstructed":true,"valuationsInstructedDate":23,"solicitorInstructed":true,"loanDrawnDown":true,"postDrawdownDirectDebitAccounts":true,"propertyInsuranceLandRegistryOnFile":true,"notes":"new value","completedByProfile":"parentObjectId"};

    beforeEach(async () => {
      fileAdminChecklistCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new fileAdminChecklist", () => {
      assert.strictEqual(fileAdminChecklistCreated.deal.toString(), options.deal.toString());
assert.strictEqual(fileAdminChecklistCreated.adviserName, options.adviserName);
assert.strictEqual(fileAdminChecklistCreated.clientNames, options.clientNames);
assert.strictEqual(fileAdminChecklistCreated.checkedBy.toString(), options.checkedBy.toString());
assert.strictEqual(fileAdminChecklistCreated.checkedDate.toISOString(), options.checkedDate);
assert.strictEqual(fileAdminChecklistCreated.providerName, options.providerName);
assert.strictEqual(fileAdminChecklistCreated.lenderName, options.lenderName);
assert.strictEqual(fileAdminChecklistCreated.productName, options.productName);
assert.strictEqual(fileAdminChecklistCreated.applicationForm.toString(), options.applicationForm.toString());
assert.strictEqual(fileAdminChecklistCreated.applicationFormDate, options.applicationFormDate);
assert.strictEqual(fileAdminChecklistCreated.identificationProof, options.identificationProof);
assert.strictEqual(fileAdminChecklistCreated.identificationProof, options.identificationProof);
assert.strictEqual(fileAdminChecklistCreated.identificationProofDate, options.identificationProofDate);
assert.strictEqual(fileAdminChecklistCreated.factfindKyc, options.factfindKyc);
assert.strictEqual(fileAdminChecklistCreated.factfindKyc, options.factfindKyc);
assert.strictEqual(fileAdminChecklistCreated.factfindKycDate, options.factfindKycDate);
assert.strictEqual(fileAdminChecklistCreated.loanMemorandumPreparedOnFile, options.loanMemorandumPreparedOnFile);
assert.strictEqual(fileAdminChecklistCreated.loanMemorandumPreparedOnFile, options.loanMemorandumPreparedOnFile);
assert.strictEqual(fileAdminChecklistCreated.boardSignOff, options.boardSignOff);
assert.strictEqual(fileAdminChecklistCreated.boardSignOff, options.boardSignOff);
assert.strictEqual(fileAdminChecklistCreated.offerLetterPreparedSent, options.offerLetterPreparedSent);
assert.strictEqual(fileAdminChecklistCreated.offerLetterPreparedSent, options.offerLetterPreparedSent);
assert.strictEqual(fileAdminChecklistCreated.offerLetterPrepared, options.offerLetterPrepared);
assert.strictEqual(fileAdminChecklistCreated.facilityLetterPreparedChecked, options.facilityLetterPreparedChecked);
assert.strictEqual(fileAdminChecklistCreated.facilityLetterPreparedChecked, options.facilityLetterPreparedChecked);
assert.strictEqual(fileAdminChecklistCreated.valuationsInstructed, options.valuationsInstructed);
assert.strictEqual(fileAdminChecklistCreated.valuationsInstructed, options.valuationsInstructed);
assert.strictEqual(fileAdminChecklistCreated.valuationsInstructedDate, options.valuationsInstructedDate);
assert.strictEqual(fileAdminChecklistCreated.solicitorInstructed, options.solicitorInstructed);
assert.strictEqual(fileAdminChecklistCreated.solicitorInstructed, options.solicitorInstructed);
assert.strictEqual(fileAdminChecklistCreated.loanDrawnDown, options.loanDrawnDown);
assert.strictEqual(fileAdminChecklistCreated.loanDrawnDown, options.loanDrawnDown);
assert.strictEqual(fileAdminChecklistCreated.postDrawdownDirectDebitAccounts, options.postDrawdownDirectDebitAccounts);
assert.strictEqual(fileAdminChecklistCreated.postDrawdownDirectDebitAccounts, options.postDrawdownDirectDebitAccounts);
assert.strictEqual(fileAdminChecklistCreated.propertyInsuranceLandRegistryOnFile, options.propertyInsuranceLandRegistryOnFile);
assert.strictEqual(fileAdminChecklistCreated.propertyInsuranceLandRegistryOnFile, options.propertyInsuranceLandRegistryOnFile);
assert.strictEqual(fileAdminChecklistCreated.notes, options.notes);
assert.strictEqual(fileAdminChecklistCreated.status, options.status);
assert.strictEqual(fileAdminChecklistCreated.completedByProfile.toString(), options.completedByProfile.toString());
    });
  });

  describe("#get", () => {
    it("should retrieve a fileAdminChecklist by ID", async () => {
      const retrieved = await thisService.Model.findById(fileAdminChecklistCreated._id);
      assert.strictEqual(retrieved._id.toString(), fileAdminChecklistCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"deal":`${dealsCreated._id}`,"adviserName":"updated value","clientNames":"updated value","checkedBy":`${profilesCreated._id}`,"checkedDate":"2026-05-13T19:45:54.641Z","providerName":"updated value","lenderName":"updated value","productName":"updated value","applicationForm":`${commercialApplicationsCreated._id}`,"applicationFormDate":100,"identificationProof":false,"identificationProofDate":100,"factfindKyc":false,"factfindKycDate":100,"loanMemorandumPreparedOnFile":false,"boardSignOff":false,"offerLetterPreparedSent":false,"offerLetterPrepared":100,"facilityLetterPreparedChecked":false,"valuationsInstructed":false,"valuationsInstructedDate":100,"solicitorInstructed":false,"loanDrawnDown":false,"postDrawdownDirectDebitAccounts":false,"propertyInsuranceLandRegistryOnFile":false,"notes":"updated value","status":"updated value","completedByProfile":`${profilesCreated._id}`};

    it("should update an existing fileAdminChecklist ", async () => {
      const fileAdminChecklistUpdated = await thisService.Model.findByIdAndUpdate(
        fileAdminChecklistCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(fileAdminChecklistUpdated.deal.toString(), options.deal.toString());
assert.strictEqual(fileAdminChecklistUpdated.adviserName, options.adviserName);
assert.strictEqual(fileAdminChecklistUpdated.clientNames, options.clientNames);
assert.strictEqual(fileAdminChecklistUpdated.checkedBy.toString(), options.checkedBy.toString());
assert.strictEqual(fileAdminChecklistUpdated.checkedDate.toISOString(), options.checkedDate);
assert.strictEqual(fileAdminChecklistUpdated.providerName, options.providerName);
assert.strictEqual(fileAdminChecklistUpdated.lenderName, options.lenderName);
assert.strictEqual(fileAdminChecklistUpdated.productName, options.productName);
assert.strictEqual(fileAdminChecklistUpdated.applicationForm.toString(), options.applicationForm.toString());
assert.strictEqual(fileAdminChecklistUpdated.applicationFormDate, options.applicationFormDate);
assert.strictEqual(fileAdminChecklistUpdated.identificationProof, options.identificationProof);
assert.strictEqual(fileAdminChecklistUpdated.identificationProof, options.identificationProof);
assert.strictEqual(fileAdminChecklistUpdated.identificationProofDate, options.identificationProofDate);
assert.strictEqual(fileAdminChecklistUpdated.factfindKyc, options.factfindKyc);
assert.strictEqual(fileAdminChecklistUpdated.factfindKyc, options.factfindKyc);
assert.strictEqual(fileAdminChecklistUpdated.factfindKycDate, options.factfindKycDate);
assert.strictEqual(fileAdminChecklistUpdated.loanMemorandumPreparedOnFile, options.loanMemorandumPreparedOnFile);
assert.strictEqual(fileAdminChecklistUpdated.loanMemorandumPreparedOnFile, options.loanMemorandumPreparedOnFile);
assert.strictEqual(fileAdminChecklistUpdated.boardSignOff, options.boardSignOff);
assert.strictEqual(fileAdminChecklistUpdated.boardSignOff, options.boardSignOff);
assert.strictEqual(fileAdminChecklistUpdated.offerLetterPreparedSent, options.offerLetterPreparedSent);
assert.strictEqual(fileAdminChecklistUpdated.offerLetterPreparedSent, options.offerLetterPreparedSent);
assert.strictEqual(fileAdminChecklistUpdated.offerLetterPrepared, options.offerLetterPrepared);
assert.strictEqual(fileAdminChecklistUpdated.facilityLetterPreparedChecked, options.facilityLetterPreparedChecked);
assert.strictEqual(fileAdminChecklistUpdated.facilityLetterPreparedChecked, options.facilityLetterPreparedChecked);
assert.strictEqual(fileAdminChecklistUpdated.valuationsInstructed, options.valuationsInstructed);
assert.strictEqual(fileAdminChecklistUpdated.valuationsInstructed, options.valuationsInstructed);
assert.strictEqual(fileAdminChecklistUpdated.valuationsInstructedDate, options.valuationsInstructedDate);
assert.strictEqual(fileAdminChecklistUpdated.solicitorInstructed, options.solicitorInstructed);
assert.strictEqual(fileAdminChecklistUpdated.solicitorInstructed, options.solicitorInstructed);
assert.strictEqual(fileAdminChecklistUpdated.loanDrawnDown, options.loanDrawnDown);
assert.strictEqual(fileAdminChecklistUpdated.loanDrawnDown, options.loanDrawnDown);
assert.strictEqual(fileAdminChecklistUpdated.postDrawdownDirectDebitAccounts, options.postDrawdownDirectDebitAccounts);
assert.strictEqual(fileAdminChecklistUpdated.postDrawdownDirectDebitAccounts, options.postDrawdownDirectDebitAccounts);
assert.strictEqual(fileAdminChecklistUpdated.propertyInsuranceLandRegistryOnFile, options.propertyInsuranceLandRegistryOnFile);
assert.strictEqual(fileAdminChecklistUpdated.propertyInsuranceLandRegistryOnFile, options.propertyInsuranceLandRegistryOnFile);
assert.strictEqual(fileAdminChecklistUpdated.notes, options.notes);
assert.strictEqual(fileAdminChecklistUpdated.status, options.status);
assert.strictEqual(fileAdminChecklistUpdated.completedByProfile.toString(), options.completedByProfile.toString());
    });
  });

  describe("#delete", async () => {
    it("should delete a fileAdminChecklist", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("leads").Model.findByIdAndDelete(leadsCreated._id);
await app.service("clients").Model.findByIdAndDelete(clientsCreated._id);
await app.service("deals").Model.findByIdAndDelete(dealsCreated._id);
await app.service("commercialApplications").Model.findByIdAndDelete(commercialApplicationsCreated._id);;

      const fileAdminChecklistDeleted = await thisService.Model.findByIdAndDelete(fileAdminChecklistCreated._id);
      assert.strictEqual(fileAdminChecklistDeleted._id.toString(), fileAdminChecklistCreated._id.toString());
    });
  });
});