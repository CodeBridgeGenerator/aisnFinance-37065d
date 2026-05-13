const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("leads service", async () => {
  let thisService;
  let leadCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("leads");

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
    assert.ok(thisService, "Registered the service (leads)");
  });

  describe("#create", () => {
    const options = {"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value"};

    beforeEach(async () => {
      leadCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new lead", () => {
      assert.strictEqual(leadCreated.user.toString(), options.user.toString());
assert.strictEqual(leadCreated.name, options.name);
assert.strictEqual(leadCreated.contactNo, options.contactNo);
assert.strictEqual(leadCreated.assignedSalesperson.toString(), options.assignedSalesperson.toString());
assert.strictEqual(leadCreated.assignedAdmin.toString(), options.assignedAdmin.toString());
assert.strictEqual(leadCreated.status, options.status);
assert.strictEqual(leadCreated.rejectionReason, options.rejectionReason);
    });
  });

  describe("#get", () => {
    it("should retrieve a lead by ID", async () => {
      const retrieved = await thisService.Model.findById(leadCreated._id);
      assert.strictEqual(retrieved._id.toString(), leadCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"user":`${usersCreated._id}`,"name":"updated value","contactNo":100,"assignedSalesperson":`${profilesCreated._id}`,"assignedAdmin":`${profilesCreated._id}`,"status":"updated value","rejectionReason":"updated value"};

    it("should update an existing lead ", async () => {
      const leadUpdated = await thisService.Model.findByIdAndUpdate(
        leadCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(leadUpdated.user.toString(), options.user.toString());
assert.strictEqual(leadUpdated.name, options.name);
assert.strictEqual(leadUpdated.contactNo, options.contactNo);
assert.strictEqual(leadUpdated.assignedSalesperson.toString(), options.assignedSalesperson.toString());
assert.strictEqual(leadUpdated.assignedAdmin.toString(), options.assignedAdmin.toString());
assert.strictEqual(leadUpdated.status, options.status);
assert.strictEqual(leadUpdated.rejectionReason, options.rejectionReason);
    });
  });

  describe("#delete", async () => {
    it("should delete a lead", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const leadDeleted = await thisService.Model.findByIdAndDelete(leadCreated._id);
      assert.strictEqual(leadDeleted._id.toString(), leadCreated._id.toString());
    });
  });
});