const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("legalCooridination service", async () => {
  let thisService;
  let legalCooridinationCreated;
  let usersServiceResults;
  let users;

  const leadsCreated = await app.service("leads").Model.create({"dealId":"parentObjectId","clientId":"parentObjectId","leadId":"parentObjectId","user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value"});
const clientsCreated = await app.service("clients").Model.create({"dealId":"parentObjectId","clientId":"parentObjectId","leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value"});
const dealsCreated = await app.service("deals").Model.create({"dealId":"parentObjectId","clientId":`${clientsCreated._id}`,"leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value","phase":"new value","approvedAt":"2026-05-13T19:45:54.917Z","rejectedAt":"2026-05-13T19:45:54.917Z"});

  beforeEach(async () => {
    thisService = await app.service("legalCooridination");

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
    assert.ok(thisService, "Registered the service (legalCooridination)");
  });

  describe("#create", () => {
    const options = {"dealId":`${dealsCreated._id}`,"clientId":`${clientsCreated._id}`,"leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value","phase":"new value","approvedAt":"2026-05-13T19:45:54.917Z","rejectedAt":"2026-05-13T19:45:54.917Z","aisnSolicitorFirm":"new value","aisnSolicitorContact":"new value","aisnSolicitorPhone":"new value","aisnSolicitorEmail":"new value","clientSolicitorFirm":"new value","clientSolicitorContact":"new value","clientSolicitorPhone":"new value","clientSolicitorEmail":"new value","docsSentToSolicitorAt":"new value","docsSentChecklist":"new value","securityDocsPreparedAt":"new value","expectedCompletionDate":"2026-05-13T19:45:54.917Z","actualCompletionDate":"2026-05-13T19:45:54.917Z","completionTimelineNotes":"new value","clientNotifiedAt":"2026-05-13T19:45:54.917Z","notificationTemplateUsed":"new value","notes":"new value"};

    beforeEach(async () => {
      legalCooridinationCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new legalCooridination", () => {
      assert.strictEqual(legalCooridinationCreated.dealId.toString(), options.dealId.toString());
assert.strictEqual(legalCooridinationCreated.aisnSolicitorFirm, options.aisnSolicitorFirm);
assert.strictEqual(legalCooridinationCreated.aisnSolicitorContact, options.aisnSolicitorContact);
assert.strictEqual(legalCooridinationCreated.aisnSolicitorPhone, options.aisnSolicitorPhone);
assert.strictEqual(legalCooridinationCreated.aisnSolicitorEmail, options.aisnSolicitorEmail);
assert.strictEqual(legalCooridinationCreated.clientSolicitorFirm, options.clientSolicitorFirm);
assert.strictEqual(legalCooridinationCreated.clientSolicitorContact, options.clientSolicitorContact);
assert.strictEqual(legalCooridinationCreated.clientSolicitorPhone, options.clientSolicitorPhone);
assert.strictEqual(legalCooridinationCreated.clientSolicitorEmail, options.clientSolicitorEmail);
assert.strictEqual(legalCooridinationCreated.docsSentToSolicitorAt, options.docsSentToSolicitorAt);
assert.strictEqual(legalCooridinationCreated.docsSentChecklist, options.docsSentChecklist);
assert.strictEqual(legalCooridinationCreated.securityDocsPreparedAt, options.securityDocsPreparedAt);
assert.strictEqual(legalCooridinationCreated.expectedCompletionDate.toISOString(), options.expectedCompletionDate);
assert.strictEqual(legalCooridinationCreated.actualCompletionDate.toISOString(), options.actualCompletionDate);
assert.strictEqual(legalCooridinationCreated.completionTimelineNotes, options.completionTimelineNotes);
assert.strictEqual(legalCooridinationCreated.status, options.status);
assert.strictEqual(legalCooridinationCreated.clientNotifiedAt.toISOString(), options.clientNotifiedAt);
assert.strictEqual(legalCooridinationCreated.notificationTemplateUsed, options.notificationTemplateUsed);
assert.strictEqual(legalCooridinationCreated.notes, options.notes);
    });
  });

  describe("#get", () => {
    it("should retrieve a legalCooridination by ID", async () => {
      const retrieved = await thisService.Model.findById(legalCooridinationCreated._id);
      assert.strictEqual(retrieved._id.toString(), legalCooridinationCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"dealId":`${dealsCreated._id}`,"aisnSolicitorFirm":"updated value","aisnSolicitorContact":"updated value","aisnSolicitorPhone":"updated value","aisnSolicitorEmail":"updated value","clientSolicitorFirm":"updated value","clientSolicitorContact":"updated value","clientSolicitorPhone":"updated value","clientSolicitorEmail":"updated value","docsSentToSolicitorAt":"updated value","docsSentChecklist":"updated value","securityDocsPreparedAt":"updated value","expectedCompletionDate":"2026-05-13T19:45:54.917Z","actualCompletionDate":"2026-05-13T19:45:54.917Z","completionTimelineNotes":"updated value","status":"updated value","clientNotifiedAt":"2026-05-13T19:45:54.917Z","notificationTemplateUsed":"updated value","notes":"updated value"};

    it("should update an existing legalCooridination ", async () => {
      const legalCooridinationUpdated = await thisService.Model.findByIdAndUpdate(
        legalCooridinationCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(legalCooridinationUpdated.dealId.toString(), options.dealId.toString());
assert.strictEqual(legalCooridinationUpdated.aisnSolicitorFirm, options.aisnSolicitorFirm);
assert.strictEqual(legalCooridinationUpdated.aisnSolicitorContact, options.aisnSolicitorContact);
assert.strictEqual(legalCooridinationUpdated.aisnSolicitorPhone, options.aisnSolicitorPhone);
assert.strictEqual(legalCooridinationUpdated.aisnSolicitorEmail, options.aisnSolicitorEmail);
assert.strictEqual(legalCooridinationUpdated.clientSolicitorFirm, options.clientSolicitorFirm);
assert.strictEqual(legalCooridinationUpdated.clientSolicitorContact, options.clientSolicitorContact);
assert.strictEqual(legalCooridinationUpdated.clientSolicitorPhone, options.clientSolicitorPhone);
assert.strictEqual(legalCooridinationUpdated.clientSolicitorEmail, options.clientSolicitorEmail);
assert.strictEqual(legalCooridinationUpdated.docsSentToSolicitorAt, options.docsSentToSolicitorAt);
assert.strictEqual(legalCooridinationUpdated.docsSentChecklist, options.docsSentChecklist);
assert.strictEqual(legalCooridinationUpdated.securityDocsPreparedAt, options.securityDocsPreparedAt);
assert.strictEqual(legalCooridinationUpdated.expectedCompletionDate.toISOString(), options.expectedCompletionDate);
assert.strictEqual(legalCooridinationUpdated.actualCompletionDate.toISOString(), options.actualCompletionDate);
assert.strictEqual(legalCooridinationUpdated.completionTimelineNotes, options.completionTimelineNotes);
assert.strictEqual(legalCooridinationUpdated.status, options.status);
assert.strictEqual(legalCooridinationUpdated.clientNotifiedAt.toISOString(), options.clientNotifiedAt);
assert.strictEqual(legalCooridinationUpdated.notificationTemplateUsed, options.notificationTemplateUsed);
assert.strictEqual(legalCooridinationUpdated.notes, options.notes);
    });
  });

  describe("#delete", async () => {
    it("should delete a legalCooridination", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("leads").Model.findByIdAndDelete(leadsCreated._id);
await app.service("clients").Model.findByIdAndDelete(clientsCreated._id);
await app.service("deals").Model.findByIdAndDelete(dealsCreated._id);;

      const legalCooridinationDeleted = await thisService.Model.findByIdAndDelete(legalCooridinationCreated._id);
      assert.strictEqual(legalCooridinationDeleted._id.toString(), legalCooridinationCreated._id.toString());
    });
  });
});