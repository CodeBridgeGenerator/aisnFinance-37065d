const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("ricsValuation service", async () => {
  let thisService;
  let ricsValuationCreated;
  let usersServiceResults;
  let users;

  const leadsCreated = await app.service("leads").Model.create({"dealId":"parentObjectId","clientId":"parentObjectId","leadId":"parentObjectId","user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value"});
const clientsCreated = await app.service("clients").Model.create({"dealId":"parentObjectId","clientId":"parentObjectId","leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value"});
const dealsCreated = await app.service("deals").Model.create({"dealId":"parentObjectId","clientId":`${clientsCreated._id}`,"leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value","phase":"new value","approvedAt":"2026-05-13T19:45:54.765Z","rejectedAt":"2026-05-13T19:45:54.765Z"});

  beforeEach(async () => {
    thisService = await app.service("ricsValuation");

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
    assert.ok(thisService, "Registered the service (ricsValuation)");
  });

  describe("#create", () => {
    const options = {"dealId":`${dealsCreated._id}`,"clientId":`${clientsCreated._id}`,"leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value","phase":"new value","approvedAt":"2026-05-13T19:45:54.765Z","rejectedAt":"2026-05-13T19:45:54.765Z","instructionDate":"2026-05-13T19:45:54.765Z","surveyorName":"new value","surveyorCompany":"new value","surveyorEmail":"new value","surveyorPhone":23,"inspectionDate":"2026-05-13T19:45:54.765Z","valuationCost":23,"vatAmount":23,"propertyAddress":"new value","estimatedValue":23,"propertyDescription":"new value","propertyType":"new value","applicantName":"new value","accessArrangedThrough":"new value","invoiceEmail":"new value"};

    beforeEach(async () => {
      ricsValuationCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new ricsValuation", () => {
      assert.strictEqual(ricsValuationCreated.dealId.toString(), options.dealId.toString());
assert.strictEqual(ricsValuationCreated.instructionDate.toISOString(), options.instructionDate);
assert.strictEqual(ricsValuationCreated.surveyorName, options.surveyorName);
assert.strictEqual(ricsValuationCreated.surveyorCompany, options.surveyorCompany);
assert.strictEqual(ricsValuationCreated.surveyorEmail, options.surveyorEmail);
assert.strictEqual(ricsValuationCreated.surveyorPhone, options.surveyorPhone);
assert.strictEqual(ricsValuationCreated.inspectionDate.toISOString(), options.inspectionDate);
assert.strictEqual(ricsValuationCreated.valuationCost, options.valuationCost);
assert.strictEqual(ricsValuationCreated.vatAmount, options.vatAmount);
assert.strictEqual(ricsValuationCreated.propertyAddress, options.propertyAddress);
assert.strictEqual(ricsValuationCreated.estimatedValue, options.estimatedValue);
assert.strictEqual(ricsValuationCreated.propertyDescription, options.propertyDescription);
assert.strictEqual(ricsValuationCreated.propertyType, options.propertyType);
assert.strictEqual(ricsValuationCreated.applicantName, options.applicantName);
assert.strictEqual(ricsValuationCreated.accessArrangedThrough, options.accessArrangedThrough);
assert.strictEqual(ricsValuationCreated.invoiceEmail, options.invoiceEmail);
assert.strictEqual(ricsValuationCreated.status, options.status);
    });
  });

  describe("#get", () => {
    it("should retrieve a ricsValuation by ID", async () => {
      const retrieved = await thisService.Model.findById(ricsValuationCreated._id);
      assert.strictEqual(retrieved._id.toString(), ricsValuationCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"dealId":`${dealsCreated._id}`,"instructionDate":"2026-05-13T19:45:54.765Z","surveyorName":"updated value","surveyorCompany":"updated value","surveyorEmail":"updated value","surveyorPhone":100,"inspectionDate":"2026-05-13T19:45:54.765Z","valuationCost":100,"vatAmount":100,"propertyAddress":"updated value","estimatedValue":100,"propertyDescription":"updated value","propertyType":"updated value","applicantName":"updated value","accessArrangedThrough":"updated value","invoiceEmail":"updated value","status":"updated value"};

    it("should update an existing ricsValuation ", async () => {
      const ricsValuationUpdated = await thisService.Model.findByIdAndUpdate(
        ricsValuationCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(ricsValuationUpdated.dealId.toString(), options.dealId.toString());
assert.strictEqual(ricsValuationUpdated.instructionDate.toISOString(), options.instructionDate);
assert.strictEqual(ricsValuationUpdated.surveyorName, options.surveyorName);
assert.strictEqual(ricsValuationUpdated.surveyorCompany, options.surveyorCompany);
assert.strictEqual(ricsValuationUpdated.surveyorEmail, options.surveyorEmail);
assert.strictEqual(ricsValuationUpdated.surveyorPhone, options.surveyorPhone);
assert.strictEqual(ricsValuationUpdated.inspectionDate.toISOString(), options.inspectionDate);
assert.strictEqual(ricsValuationUpdated.valuationCost, options.valuationCost);
assert.strictEqual(ricsValuationUpdated.vatAmount, options.vatAmount);
assert.strictEqual(ricsValuationUpdated.propertyAddress, options.propertyAddress);
assert.strictEqual(ricsValuationUpdated.estimatedValue, options.estimatedValue);
assert.strictEqual(ricsValuationUpdated.propertyDescription, options.propertyDescription);
assert.strictEqual(ricsValuationUpdated.propertyType, options.propertyType);
assert.strictEqual(ricsValuationUpdated.applicantName, options.applicantName);
assert.strictEqual(ricsValuationUpdated.accessArrangedThrough, options.accessArrangedThrough);
assert.strictEqual(ricsValuationUpdated.invoiceEmail, options.invoiceEmail);
assert.strictEqual(ricsValuationUpdated.status, options.status);
    });
  });

  describe("#delete", async () => {
    it("should delete a ricsValuation", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("leads").Model.findByIdAndDelete(leadsCreated._id);
await app.service("clients").Model.findByIdAndDelete(clientsCreated._id);
await app.service("deals").Model.findByIdAndDelete(dealsCreated._id);;

      const ricsValuationDeleted = await thisService.Model.findByIdAndDelete(ricsValuationCreated._id);
      assert.strictEqual(ricsValuationDeleted._id.toString(), ricsValuationCreated._id.toString());
    });
  });
});