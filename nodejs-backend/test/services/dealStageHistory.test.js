const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("dealStageHistory service", async () => {
  let thisService;
  let dealStageHistoryCreated;
  let usersServiceResults;
  let users;

  const leadsCreated = await app.service("leads").Model.create({"dealId":"parentObjectId","clientId":"parentObjectId","leadId":"parentObjectId","user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value"});
const clientsCreated = await app.service("clients").Model.create({"dealId":"parentObjectId","clientId":"parentObjectId","leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value"});
const dealsCreated = await app.service("deals").Model.create({"dealId":"parentObjectId","clientId":`${clientsCreated._id}`,"leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value","phase":"new value","approvedAt":"2026-05-13T19:45:54.316Z","rejectedAt":"2026-05-13T19:45:54.316Z"});

  beforeEach(async () => {
    thisService = await app.service("dealStageHistory");

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
    assert.ok(thisService, "Registered the service (dealStageHistory)");
  });

  describe("#create", () => {
    const options = {"dealId":`${dealsCreated._id}`,"clientId":`${clientsCreated._id}`,"leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value","phase":"new value","approvedAt":"2026-05-13T19:45:54.316Z","rejectedAt":"2026-05-13T19:45:54.316Z","fromStage":"new value","toStage":"new value","changedAt":"2026-05-13T19:45:54.316Z"};

    beforeEach(async () => {
      dealStageHistoryCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new dealStageHistory", () => {
      assert.strictEqual(dealStageHistoryCreated.dealId.toString(), options.dealId.toString());
assert.strictEqual(dealStageHistoryCreated.fromStage, options.fromStage);
assert.strictEqual(dealStageHistoryCreated.toStage, options.toStage);
assert.strictEqual(dealStageHistoryCreated.changedAt.toISOString(), options.changedAt);
    });
  });

  describe("#get", () => {
    it("should retrieve a dealStageHistory by ID", async () => {
      const retrieved = await thisService.Model.findById(dealStageHistoryCreated._id);
      assert.strictEqual(retrieved._id.toString(), dealStageHistoryCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"dealId":`${dealsCreated._id}`,"fromStage":"updated value","toStage":"updated value","changedAt":"2026-05-13T19:45:54.316Z"};

    it("should update an existing dealStageHistory ", async () => {
      const dealStageHistoryUpdated = await thisService.Model.findByIdAndUpdate(
        dealStageHistoryCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(dealStageHistoryUpdated.dealId.toString(), options.dealId.toString());
assert.strictEqual(dealStageHistoryUpdated.fromStage, options.fromStage);
assert.strictEqual(dealStageHistoryUpdated.toStage, options.toStage);
assert.strictEqual(dealStageHistoryUpdated.changedAt.toISOString(), options.changedAt);
    });
  });

  describe("#delete", async () => {
    it("should delete a dealStageHistory", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("leads").Model.findByIdAndDelete(leadsCreated._id);
await app.service("clients").Model.findByIdAndDelete(clientsCreated._id);
await app.service("deals").Model.findByIdAndDelete(dealsCreated._id);;

      const dealStageHistoryDeleted = await thisService.Model.findByIdAndDelete(dealStageHistoryCreated._id);
      assert.strictEqual(dealStageHistoryDeleted._id.toString(), dealStageHistoryCreated._id.toString());
    });
  });
});