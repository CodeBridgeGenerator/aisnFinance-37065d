const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("commercialApplications service", async () => {
  let thisService;
  let commercialApplicationCreated;
  let usersServiceResults;
  let users;

  const leadsCreated = await app.service("leads").Model.create({"dealId":"parentObjectId","clientId":"parentObjectId","leadId":"parentObjectId","user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value"});
const clientsCreated = await app.service("clients").Model.create({"dealId":"parentObjectId","clientId":"parentObjectId","leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value"});
const dealsCreated = await app.service("deals").Model.create({"dealId":"parentObjectId","clientId":`${clientsCreated._id}`,"leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value","phase":"new value","approvedAt":"2026-05-13T19:45:54.340Z","rejectedAt":"2026-05-13T19:45:54.340Z"});

  beforeEach(async () => {
    thisService = await app.service("commercialApplications");

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
    assert.ok(thisService, "Registered the service (commercialApplications)");
  });

  describe("#create", () => {
    const options = {"dealId":`${dealsCreated._id}`,"clientId":`${clientsCreated._id}`,"leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value","phase":"new value","approvedAt":"2026-05-13T19:45:54.340Z","rejectedAt":"2026-05-13T19:45:54.340Z","contactByTelephone":true,"contactByPost":true,"contactByElectronicMedia":true,"contactForMarketResearch":true,"applicationDocuments":"new value"};

    beforeEach(async () => {
      commercialApplicationCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new commercialApplication", () => {
      assert.strictEqual(commercialApplicationCreated.dealId.toString(), options.dealId.toString());
assert.strictEqual(commercialApplicationCreated.status, options.status);
assert.strictEqual(commercialApplicationCreated.contactByTelephone, options.contactByTelephone);
assert.strictEqual(commercialApplicationCreated.contactByTelephone, options.contactByTelephone);
assert.strictEqual(commercialApplicationCreated.contactByPost, options.contactByPost);
assert.strictEqual(commercialApplicationCreated.contactByPost, options.contactByPost);
assert.strictEqual(commercialApplicationCreated.contactByElectronicMedia, options.contactByElectronicMedia);
assert.strictEqual(commercialApplicationCreated.contactByElectronicMedia, options.contactByElectronicMedia);
assert.strictEqual(commercialApplicationCreated.contactForMarketResearch, options.contactForMarketResearch);
assert.strictEqual(commercialApplicationCreated.contactForMarketResearch, options.contactForMarketResearch);
assert.strictEqual(commercialApplicationCreated.applicationDocuments, options.applicationDocuments);
    });
  });

  describe("#get", () => {
    it("should retrieve a commercialApplication by ID", async () => {
      const retrieved = await thisService.Model.findById(commercialApplicationCreated._id);
      assert.strictEqual(retrieved._id.toString(), commercialApplicationCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"dealId":`${dealsCreated._id}`,"status":"updated value","contactByTelephone":false,"contactByPost":false,"contactByElectronicMedia":false,"contactForMarketResearch":false,"applicationDocuments":"updated value"};

    it("should update an existing commercialApplication ", async () => {
      const commercialApplicationUpdated = await thisService.Model.findByIdAndUpdate(
        commercialApplicationCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(commercialApplicationUpdated.dealId.toString(), options.dealId.toString());
assert.strictEqual(commercialApplicationUpdated.status, options.status);
assert.strictEqual(commercialApplicationUpdated.contactByTelephone, options.contactByTelephone);
assert.strictEqual(commercialApplicationUpdated.contactByTelephone, options.contactByTelephone);
assert.strictEqual(commercialApplicationUpdated.contactByPost, options.contactByPost);
assert.strictEqual(commercialApplicationUpdated.contactByPost, options.contactByPost);
assert.strictEqual(commercialApplicationUpdated.contactByElectronicMedia, options.contactByElectronicMedia);
assert.strictEqual(commercialApplicationUpdated.contactByElectronicMedia, options.contactByElectronicMedia);
assert.strictEqual(commercialApplicationUpdated.contactForMarketResearch, options.contactForMarketResearch);
assert.strictEqual(commercialApplicationUpdated.contactForMarketResearch, options.contactForMarketResearch);
assert.strictEqual(commercialApplicationUpdated.applicationDocuments, options.applicationDocuments);
    });
  });

  describe("#delete", async () => {
    it("should delete a commercialApplication", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("leads").Model.findByIdAndDelete(leadsCreated._id);
await app.service("clients").Model.findByIdAndDelete(clientsCreated._id);
await app.service("deals").Model.findByIdAndDelete(dealsCreated._id);;

      const commercialApplicationDeleted = await thisService.Model.findByIdAndDelete(commercialApplicationCreated._id);
      assert.strictEqual(commercialApplicationDeleted._id.toString(), commercialApplicationCreated._id.toString());
    });
  });
});