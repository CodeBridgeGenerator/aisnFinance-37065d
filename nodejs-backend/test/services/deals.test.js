const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("deals service", async () => {
  let thisService;
  let dealCreated;
  let usersServiceResults;
  let users;

  const leadsCreated = await app.service("leads").Model.create({"clientId":"parentObjectId","leadId":"parentObjectId","user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value"});
const clientsCreated = await app.service("clients").Model.create({"clientId":"parentObjectId","leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value"});

  beforeEach(async () => {
    thisService = await app.service("deals");

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
    assert.ok(thisService, "Registered the service (deals)");
  });

  describe("#create", () => {
    const options = {"clientId":`${clientsCreated._id}`,"leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value","phase":"new value","approvedAt":"2026-05-13T19:45:54.293Z","rejectedAt":"2026-05-13T19:45:54.293Z"};

    beforeEach(async () => {
      dealCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new deal", () => {
      assert.strictEqual(dealCreated.clientId.toString(), options.clientId.toString());
assert.strictEqual(dealCreated.status, options.status);
assert.strictEqual(dealCreated.phase, options.phase);
assert.strictEqual(dealCreated.approvedAt.toISOString(), options.approvedAt);
assert.strictEqual(dealCreated.rejectedAt.toISOString(), options.rejectedAt);
assert.strictEqual(dealCreated.rejectionReason, options.rejectionReason);
    });
  });

  describe("#get", () => {
    it("should retrieve a deal by ID", async () => {
      const retrieved = await thisService.Model.findById(dealCreated._id);
      assert.strictEqual(retrieved._id.toString(), dealCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"clientId":`${clientsCreated._id}`,"status":"updated value","phase":"updated value","approvedAt":"2026-05-13T19:45:54.293Z","rejectedAt":"2026-05-13T19:45:54.293Z","rejectionReason":"updated value"};

    it("should update an existing deal ", async () => {
      const dealUpdated = await thisService.Model.findByIdAndUpdate(
        dealCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(dealUpdated.clientId.toString(), options.clientId.toString());
assert.strictEqual(dealUpdated.status, options.status);
assert.strictEqual(dealUpdated.phase, options.phase);
assert.strictEqual(dealUpdated.approvedAt.toISOString(), options.approvedAt);
assert.strictEqual(dealUpdated.rejectedAt.toISOString(), options.rejectedAt);
assert.strictEqual(dealUpdated.rejectionReason, options.rejectionReason);
    });
  });

  describe("#delete", async () => {
    it("should delete a deal", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("leads").Model.findByIdAndDelete(leadsCreated._id);
await app.service("clients").Model.findByIdAndDelete(clientsCreated._id);;

      const dealDeleted = await thisService.Model.findByIdAndDelete(dealCreated._id);
      assert.strictEqual(dealDeleted._id.toString(), dealCreated._id.toString());
    });
  });
});