const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("dueDiligence service", async () => {
  let thisService;
  let dueDiligenceCreated;
  let usersServiceResults;
  let users;

  const leadsCreated = await app.service("leads").Model.create({"dealId":"parentObjectId","clientId":"parentObjectId","leadId":"parentObjectId","user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value"});
const clientsCreated = await app.service("clients").Model.create({"dealId":"parentObjectId","clientId":"parentObjectId","leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value"});
const dealsCreated = await app.service("deals").Model.create({"dealId":"parentObjectId","clientId":`${clientsCreated._id}`,"leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value","phase":"new value","approvedAt":"2026-05-13T19:45:54.611Z","rejectedAt":"2026-05-13T19:45:54.611Z"});

  beforeEach(async () => {
    thisService = await app.service("dueDiligence");

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
    assert.ok(thisService, "Registered the service (dueDiligence)");
  });

  describe("#create", () => {
    const options = {"dealId":`${dealsCreated._id}`,"clientId":`${clientsCreated._id}`,"leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value","phase":"new value","approvedAt":"2026-05-13T19:45:54.611Z","rejectedAt":"2026-05-13T19:45:54.611Z","reviewedBy":"parentObjectId","creditSafeResult":"new value","creditSafeDate":"2026-05-13T19:45:54.611Z","propertyDeskReviewNotes":"new value","residentialBtlDesktopVal":"new value","commercialValuationNotes":"new value","overallFindings":"new value","recommendation":"new value","reviewedAt":"2026-05-13T19:45:54.611Z"};

    beforeEach(async () => {
      dueDiligenceCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new dueDiligence", () => {
      assert.strictEqual(dueDiligenceCreated.dealId.toString(), options.dealId.toString());
assert.strictEqual(dueDiligenceCreated.reviewedBy.toString(), options.reviewedBy.toString());
assert.strictEqual(dueDiligenceCreated.creditSafeResult, options.creditSafeResult);
assert.strictEqual(dueDiligenceCreated.creditSafeDate.toISOString(), options.creditSafeDate);
assert.strictEqual(dueDiligenceCreated.propertyDeskReviewNotes, options.propertyDeskReviewNotes);
assert.strictEqual(dueDiligenceCreated.residentialBtlDesktopVal, options.residentialBtlDesktopVal);
assert.strictEqual(dueDiligenceCreated.commercialValuationNotes, options.commercialValuationNotes);
assert.strictEqual(dueDiligenceCreated.overallFindings, options.overallFindings);
assert.strictEqual(dueDiligenceCreated.recommendation, options.recommendation);
assert.strictEqual(dueDiligenceCreated.status, options.status);
assert.strictEqual(dueDiligenceCreated.reviewedAt.toISOString(), options.reviewedAt);
    });
  });

  describe("#get", () => {
    it("should retrieve a dueDiligence by ID", async () => {
      const retrieved = await thisService.Model.findById(dueDiligenceCreated._id);
      assert.strictEqual(retrieved._id.toString(), dueDiligenceCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"dealId":`${dealsCreated._id}`,"reviewedBy":`${profilesCreated._id}`,"creditSafeResult":"updated value","creditSafeDate":"2026-05-13T19:45:54.611Z","propertyDeskReviewNotes":"updated value","residentialBtlDesktopVal":"updated value","commercialValuationNotes":"updated value","overallFindings":"updated value","recommendation":"updated value","status":"updated value","reviewedAt":"2026-05-13T19:45:54.611Z"};

    it("should update an existing dueDiligence ", async () => {
      const dueDiligenceUpdated = await thisService.Model.findByIdAndUpdate(
        dueDiligenceCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(dueDiligenceUpdated.dealId.toString(), options.dealId.toString());
assert.strictEqual(dueDiligenceUpdated.reviewedBy.toString(), options.reviewedBy.toString());
assert.strictEqual(dueDiligenceUpdated.creditSafeResult, options.creditSafeResult);
assert.strictEqual(dueDiligenceUpdated.creditSafeDate.toISOString(), options.creditSafeDate);
assert.strictEqual(dueDiligenceUpdated.propertyDeskReviewNotes, options.propertyDeskReviewNotes);
assert.strictEqual(dueDiligenceUpdated.residentialBtlDesktopVal, options.residentialBtlDesktopVal);
assert.strictEqual(dueDiligenceUpdated.commercialValuationNotes, options.commercialValuationNotes);
assert.strictEqual(dueDiligenceUpdated.overallFindings, options.overallFindings);
assert.strictEqual(dueDiligenceUpdated.recommendation, options.recommendation);
assert.strictEqual(dueDiligenceUpdated.status, options.status);
assert.strictEqual(dueDiligenceUpdated.reviewedAt.toISOString(), options.reviewedAt);
    });
  });

  describe("#delete", async () => {
    it("should delete a dueDiligence", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("leads").Model.findByIdAndDelete(leadsCreated._id);
await app.service("clients").Model.findByIdAndDelete(clientsCreated._id);
await app.service("deals").Model.findByIdAndDelete(dealsCreated._id);;

      const dueDiligenceDeleted = await thisService.Model.findByIdAndDelete(dueDiligenceCreated._id);
      assert.strictEqual(dueDiligenceDeleted._id.toString(), dueDiligenceCreated._id.toString());
    });
  });
});