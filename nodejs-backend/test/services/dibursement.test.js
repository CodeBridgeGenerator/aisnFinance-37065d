const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("dibursement service", async () => {
  let thisService;
  let dibursementCreated;
  let usersServiceResults;
  let users;

  const leadsCreated = await app.service("leads").Model.create({"dealId":"parentObjectId","clientId":"parentObjectId","leadId":"parentObjectId","user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value"});
const clientsCreated = await app.service("clients").Model.create({"dealId":"parentObjectId","clientId":"parentObjectId","leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value"});
const dealsCreated = await app.service("deals").Model.create({"dealId":"parentObjectId","clientId":`${clientsCreated._id}`,"leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value","phase":"new value","approvedAt":"2026-05-13T19:45:54.985Z","rejectedAt":"2026-05-13T19:45:54.985Z"});

  beforeEach(async () => {
    thisService = await app.service("dibursement");

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
    assert.ok(thisService, "Registered the service (dibursement)");
  });

  describe("#create", () => {
    const options = {"dealId":`${dealsCreated._id}`,"clientId":`${clientsCreated._id}`,"leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value","phase":"new value","approvedAt":"2026-05-13T19:45:54.985Z","rejectedAt":"2026-05-13T19:45:54.985Z","grossLoanAmount":23,"totalDeductions":23,"netAmountTransferred":23,"directorAapprovedAt":"2026-05-13T19:45:54.985Z","directorUserId":"parentObjectId","fundsTransferredAt":"2026-05-13T19:45:54.985Z","solicitorReceivedAt":"2026-05-13T19:45:54.985Z","clientSolicitorReceivedAt":"2026-05-13T19:45:54.985Z","clientProgressNotifiedAt":"2026-05-13T19:45:54.985Z","notes":"new value"};

    beforeEach(async () => {
      dibursementCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new dibursement", () => {
      assert.strictEqual(dibursementCreated.dealId.toString(), options.dealId.toString());
assert.strictEqual(dibursementCreated.grossLoanAmount, options.grossLoanAmount);
assert.strictEqual(dibursementCreated.totalDeductions, options.totalDeductions);
assert.strictEqual(dibursementCreated.netAmountTransferred, options.netAmountTransferred);
assert.strictEqual(dibursementCreated.directorAapprovedAt.toISOString(), options.directorAapprovedAt);
assert.strictEqual(dibursementCreated.directorUserId.toString(), options.directorUserId.toString());
assert.strictEqual(dibursementCreated.fundsTransferredAt.toISOString(), options.fundsTransferredAt);
assert.strictEqual(dibursementCreated.solicitorReceivedAt.toISOString(), options.solicitorReceivedAt);
assert.strictEqual(dibursementCreated.clientSolicitorReceivedAt.toISOString(), options.clientSolicitorReceivedAt);
assert.strictEqual(dibursementCreated.clientProgressNotifiedAt.toISOString(), options.clientProgressNotifiedAt);
assert.strictEqual(dibursementCreated.status, options.status);
assert.strictEqual(dibursementCreated.notes, options.notes);
    });
  });

  describe("#get", () => {
    it("should retrieve a dibursement by ID", async () => {
      const retrieved = await thisService.Model.findById(dibursementCreated._id);
      assert.strictEqual(retrieved._id.toString(), dibursementCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"dealId":`${dealsCreated._id}`,"grossLoanAmount":100,"totalDeductions":100,"netAmountTransferred":100,"directorAapprovedAt":"2026-05-13T19:45:54.985Z","directorUserId":`${profilesCreated._id}`,"fundsTransferredAt":"2026-05-13T19:45:54.985Z","solicitorReceivedAt":"2026-05-13T19:45:54.985Z","clientSolicitorReceivedAt":"2026-05-13T19:45:54.985Z","clientProgressNotifiedAt":"2026-05-13T19:45:54.985Z","status":"updated value","notes":"updated value"};

    it("should update an existing dibursement ", async () => {
      const dibursementUpdated = await thisService.Model.findByIdAndUpdate(
        dibursementCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(dibursementUpdated.dealId.toString(), options.dealId.toString());
assert.strictEqual(dibursementUpdated.grossLoanAmount, options.grossLoanAmount);
assert.strictEqual(dibursementUpdated.totalDeductions, options.totalDeductions);
assert.strictEqual(dibursementUpdated.netAmountTransferred, options.netAmountTransferred);
assert.strictEqual(dibursementUpdated.directorAapprovedAt.toISOString(), options.directorAapprovedAt);
assert.strictEqual(dibursementUpdated.directorUserId.toString(), options.directorUserId.toString());
assert.strictEqual(dibursementUpdated.fundsTransferredAt.toISOString(), options.fundsTransferredAt);
assert.strictEqual(dibursementUpdated.solicitorReceivedAt.toISOString(), options.solicitorReceivedAt);
assert.strictEqual(dibursementUpdated.clientSolicitorReceivedAt.toISOString(), options.clientSolicitorReceivedAt);
assert.strictEqual(dibursementUpdated.clientProgressNotifiedAt.toISOString(), options.clientProgressNotifiedAt);
assert.strictEqual(dibursementUpdated.status, options.status);
assert.strictEqual(dibursementUpdated.notes, options.notes);
    });
  });

  describe("#delete", async () => {
    it("should delete a dibursement", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("leads").Model.findByIdAndDelete(leadsCreated._id);
await app.service("clients").Model.findByIdAndDelete(clientsCreated._id);
await app.service("deals").Model.findByIdAndDelete(dealsCreated._id);;

      const dibursementDeleted = await thisService.Model.findByIdAndDelete(dibursementCreated._id);
      assert.strictEqual(dibursementDeleted._id.toString(), dibursementCreated._id.toString());
    });
  });
});