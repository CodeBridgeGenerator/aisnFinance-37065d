const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("annualClientReviews service", async () => {
  let thisService;
  let annualClientReviewCreated;
  let usersServiceResults;
  let users;

  const leadsCreated = await app.service("leads").Model.create({"deal":"parentObjectId","clientId":"parentObjectId","leadId":"parentObjectId","user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value"});
const clientsCreated = await app.service("clients").Model.create({"deal":"parentObjectId","clientId":"parentObjectId","leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value"});
const dealsCreated = await app.service("deals").Model.create({"deal":"parentObjectId","clientId":`${clientsCreated._id}`,"leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value","phase":"new value","approvedAt":"2026-05-13T19:45:54.685Z","rejectedAt":"2026-05-13T19:45:54.685Z"});

  beforeEach(async () => {
    thisService = await app.service("annualClientReviews");

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
    assert.ok(thisService, "Registered the service (annualClientReviews)");
  });

  describe("#create", () => {
    const options = {"deal":`${dealsCreated._id}`,"clientId":`${clientsCreated._id}`,"leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value","phase":"new value","approvedAt":"2026-05-13T19:45:54.685Z","rejectedAt":"2026-05-13T19:45:54.685Z","clientProfile":"new value","reviewYear":23,"reviewDueDate":"2026-05-13T19:45:54.685Z","reminderDate":"2026-05-13T19:45:54.685Z","epcCertOnFile":true,"epcCertDocument":"new value","annualBuildingInsuranceOnFile":true,"buildingInsuranceExpiryDate":"2026-05-13T19:45:54.685Z","buildingInsuranceDocument":"new value","isBuildingInsuranceExpired":true,"gasCertOnFile":true,"gasCertDocument":"new value","electricPatCertOnFile":true,"electricPatCertDocument":"new value","companyAccountsOnFile":true,"landRegistryCheckOnFile":true,"landRegistryCheckDocument":"new value","creditReportOnFile":true,"creditReportDocument":"new value","comments":"new value","reviewedByProfile":"new value","reviewedAt":23};

    beforeEach(async () => {
      annualClientReviewCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new annualClientReview", () => {
      assert.strictEqual(annualClientReviewCreated.deal.toString(), options.deal.toString());
assert.strictEqual(annualClientReviewCreated.clientProfile, options.clientProfile);
assert.strictEqual(annualClientReviewCreated.reviewYear, options.reviewYear);
assert.strictEqual(annualClientReviewCreated.reviewDueDate.toISOString(), options.reviewDueDate);
assert.strictEqual(annualClientReviewCreated.reminderDate.toISOString(), options.reminderDate);
assert.strictEqual(annualClientReviewCreated.epcCertOnFile, options.epcCertOnFile);
assert.strictEqual(annualClientReviewCreated.epcCertOnFile, options.epcCertOnFile);
assert.strictEqual(annualClientReviewCreated.epcCertDocument, options.epcCertDocument);
assert.strictEqual(annualClientReviewCreated.annualBuildingInsuranceOnFile, options.annualBuildingInsuranceOnFile);
assert.strictEqual(annualClientReviewCreated.annualBuildingInsuranceOnFile, options.annualBuildingInsuranceOnFile);
assert.strictEqual(annualClientReviewCreated.buildingInsuranceExpiryDate.toISOString(), options.buildingInsuranceExpiryDate);
assert.strictEqual(annualClientReviewCreated.buildingInsuranceDocument, options.buildingInsuranceDocument);
assert.strictEqual(annualClientReviewCreated.isBuildingInsuranceExpired, options.isBuildingInsuranceExpired);
assert.strictEqual(annualClientReviewCreated.isBuildingInsuranceExpired, options.isBuildingInsuranceExpired);
assert.strictEqual(annualClientReviewCreated.gasCertOnFile, options.gasCertOnFile);
assert.strictEqual(annualClientReviewCreated.gasCertOnFile, options.gasCertOnFile);
assert.strictEqual(annualClientReviewCreated.gasCertDocument, options.gasCertDocument);
assert.strictEqual(annualClientReviewCreated.electricPatCertOnFile, options.electricPatCertOnFile);
assert.strictEqual(annualClientReviewCreated.electricPatCertOnFile, options.electricPatCertOnFile);
assert.strictEqual(annualClientReviewCreated.electricPatCertDocument, options.electricPatCertDocument);
assert.strictEqual(annualClientReviewCreated.companyAccountsOnFile, options.companyAccountsOnFile);
assert.strictEqual(annualClientReviewCreated.companyAccountsOnFile, options.companyAccountsOnFile);
assert.strictEqual(annualClientReviewCreated.landRegistryCheckOnFile, options.landRegistryCheckOnFile);
assert.strictEqual(annualClientReviewCreated.landRegistryCheckOnFile, options.landRegistryCheckOnFile);
assert.strictEqual(annualClientReviewCreated.landRegistryCheckDocument, options.landRegistryCheckDocument);
assert.strictEqual(annualClientReviewCreated.creditReportOnFile, options.creditReportOnFile);
assert.strictEqual(annualClientReviewCreated.creditReportOnFile, options.creditReportOnFile);
assert.strictEqual(annualClientReviewCreated.creditReportDocument, options.creditReportDocument);
assert.strictEqual(annualClientReviewCreated.comments, options.comments);
assert.strictEqual(annualClientReviewCreated.status, options.status);
assert.strictEqual(annualClientReviewCreated.reviewedByProfile, options.reviewedByProfile);
assert.strictEqual(annualClientReviewCreated.reviewedAt, options.reviewedAt);
    });
  });

  describe("#get", () => {
    it("should retrieve a annualClientReview by ID", async () => {
      const retrieved = await thisService.Model.findById(annualClientReviewCreated._id);
      assert.strictEqual(retrieved._id.toString(), annualClientReviewCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"deal":`${dealsCreated._id}`,"clientProfile":"updated value","reviewYear":100,"reviewDueDate":"2026-05-13T19:45:54.685Z","reminderDate":"2026-05-13T19:45:54.685Z","epcCertOnFile":false,"epcCertDocument":"updated value","annualBuildingInsuranceOnFile":false,"buildingInsuranceExpiryDate":"2026-05-13T19:45:54.685Z","buildingInsuranceDocument":"updated value","isBuildingInsuranceExpired":false,"gasCertOnFile":false,"gasCertDocument":"updated value","electricPatCertOnFile":false,"electricPatCertDocument":"updated value","companyAccountsOnFile":false,"landRegistryCheckOnFile":false,"landRegistryCheckDocument":"updated value","creditReportOnFile":false,"creditReportDocument":"updated value","comments":"updated value","status":"updated value","reviewedByProfile":"updated value","reviewedAt":100};

    it("should update an existing annualClientReview ", async () => {
      const annualClientReviewUpdated = await thisService.Model.findByIdAndUpdate(
        annualClientReviewCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(annualClientReviewUpdated.deal.toString(), options.deal.toString());
assert.strictEqual(annualClientReviewUpdated.clientProfile, options.clientProfile);
assert.strictEqual(annualClientReviewUpdated.reviewYear, options.reviewYear);
assert.strictEqual(annualClientReviewUpdated.reviewDueDate.toISOString(), options.reviewDueDate);
assert.strictEqual(annualClientReviewUpdated.reminderDate.toISOString(), options.reminderDate);
assert.strictEqual(annualClientReviewUpdated.epcCertOnFile, options.epcCertOnFile);
assert.strictEqual(annualClientReviewUpdated.epcCertOnFile, options.epcCertOnFile);
assert.strictEqual(annualClientReviewUpdated.epcCertDocument, options.epcCertDocument);
assert.strictEqual(annualClientReviewUpdated.annualBuildingInsuranceOnFile, options.annualBuildingInsuranceOnFile);
assert.strictEqual(annualClientReviewUpdated.annualBuildingInsuranceOnFile, options.annualBuildingInsuranceOnFile);
assert.strictEqual(annualClientReviewUpdated.buildingInsuranceExpiryDate.toISOString(), options.buildingInsuranceExpiryDate);
assert.strictEqual(annualClientReviewUpdated.buildingInsuranceDocument, options.buildingInsuranceDocument);
assert.strictEqual(annualClientReviewUpdated.isBuildingInsuranceExpired, options.isBuildingInsuranceExpired);
assert.strictEqual(annualClientReviewUpdated.isBuildingInsuranceExpired, options.isBuildingInsuranceExpired);
assert.strictEqual(annualClientReviewUpdated.gasCertOnFile, options.gasCertOnFile);
assert.strictEqual(annualClientReviewUpdated.gasCertOnFile, options.gasCertOnFile);
assert.strictEqual(annualClientReviewUpdated.gasCertDocument, options.gasCertDocument);
assert.strictEqual(annualClientReviewUpdated.electricPatCertOnFile, options.electricPatCertOnFile);
assert.strictEqual(annualClientReviewUpdated.electricPatCertOnFile, options.electricPatCertOnFile);
assert.strictEqual(annualClientReviewUpdated.electricPatCertDocument, options.electricPatCertDocument);
assert.strictEqual(annualClientReviewUpdated.companyAccountsOnFile, options.companyAccountsOnFile);
assert.strictEqual(annualClientReviewUpdated.companyAccountsOnFile, options.companyAccountsOnFile);
assert.strictEqual(annualClientReviewUpdated.landRegistryCheckOnFile, options.landRegistryCheckOnFile);
assert.strictEqual(annualClientReviewUpdated.landRegistryCheckOnFile, options.landRegistryCheckOnFile);
assert.strictEqual(annualClientReviewUpdated.landRegistryCheckDocument, options.landRegistryCheckDocument);
assert.strictEqual(annualClientReviewUpdated.creditReportOnFile, options.creditReportOnFile);
assert.strictEqual(annualClientReviewUpdated.creditReportOnFile, options.creditReportOnFile);
assert.strictEqual(annualClientReviewUpdated.creditReportDocument, options.creditReportDocument);
assert.strictEqual(annualClientReviewUpdated.comments, options.comments);
assert.strictEqual(annualClientReviewUpdated.status, options.status);
assert.strictEqual(annualClientReviewUpdated.reviewedByProfile, options.reviewedByProfile);
assert.strictEqual(annualClientReviewUpdated.reviewedAt, options.reviewedAt);
    });
  });

  describe("#delete", async () => {
    it("should delete a annualClientReview", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("leads").Model.findByIdAndDelete(leadsCreated._id);
await app.service("clients").Model.findByIdAndDelete(clientsCreated._id);
await app.service("deals").Model.findByIdAndDelete(dealsCreated._id);;

      const annualClientReviewDeleted = await thisService.Model.findByIdAndDelete(annualClientReviewCreated._id);
      assert.strictEqual(annualClientReviewDeleted._id.toString(), annualClientReviewCreated._id.toString());
    });
  });
});