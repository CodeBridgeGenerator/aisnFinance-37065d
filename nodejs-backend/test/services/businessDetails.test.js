const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("businessDetails service", async () => {
  let thisService;
  let businessDetailCreated;
  let usersServiceResults;
  let users;

  const leadsCreated = await app.service("leads").Model.create({"applicationId":"parentObjectId","dealId":"parentObjectId","clientId":"parentObjectId","leadId":"parentObjectId","user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value"});
const clientsCreated = await app.service("clients").Model.create({"applicationId":"parentObjectId","dealId":"parentObjectId","clientId":"parentObjectId","leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value"});
const dealsCreated = await app.service("deals").Model.create({"applicationId":"parentObjectId","dealId":"parentObjectId","clientId":`${clientsCreated._id}`,"leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value","phase":"new value","approvedAt":"2026-05-13T19:45:54.459Z","rejectedAt":"2026-05-13T19:45:54.459Z"});
const commercialApplicationsCreated = await app.service("commercialApplications").Model.create({"applicationId":"parentObjectId","dealId":`${dealsCreated._id}`,"clientId":`${clientsCreated._id}`,"leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value","phase":"new value","approvedAt":"2026-05-13T19:45:54.459Z","rejectedAt":"2026-05-13T19:45:54.459Z","contactByTelephone":true,"contactByPost":true,"contactByElectronicMedia":true,"contactForMarketResearch":true,"applicationDocuments":"new value"});

  beforeEach(async () => {
    thisService = await app.service("businessDetails");

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
    assert.ok(thisService, "Registered the service (businessDetails)");
  });

  describe("#create", () => {
    const options = {"applicationId":`${commercialApplicationsCreated._id}`,"dealId":`${dealsCreated._id}`,"clientId":`${clientsCreated._id}`,"leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value","phase":"new value","approvedAt":"2026-05-13T19:45:54.459Z","rejectedAt":"2026-05-13T19:45:54.459Z","contactByTelephone":true,"contactByPost":true,"contactByElectronicMedia":true,"contactForMarketResearch":true,"applicationDocuments":"new value","tradingName":"new value","registeredName":"new value","businessStartDate":"2026-05-13T19:45:54.459Z","natureOfBusiness":"new value","businessAddress":"new value","correspondenceAddress":"new value","sharedMailbox":true,"phone":"new value","fax":"new value","email":"new value","website":"new value","registeredAddress":"new value","companyRegNo":"new value","countryOfRegistration":"new value","incorporatedDate":"new value","businessType":"new value","numPartners":23,"numDirectors":23,"numBeneficiaries":23,"shareholders":23,"anticipatedTurnover":23,"numEmployees":23,"madeCva":true,"propertyRepossessed":true,"courtOrder":true,"missedRepayments":true,"brokenCreditAgreement":true,"adverseCreditDetails":"new value"};

    beforeEach(async () => {
      businessDetailCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new businessDetail", () => {
      assert.strictEqual(businessDetailCreated.applicationId.toString(), options.applicationId.toString());
assert.strictEqual(businessDetailCreated.tradingName, options.tradingName);
assert.strictEqual(businessDetailCreated.registeredName, options.registeredName);
assert.strictEqual(businessDetailCreated.businessStartDate.toISOString(), options.businessStartDate);
assert.strictEqual(businessDetailCreated.natureOfBusiness, options.natureOfBusiness);
assert.strictEqual(businessDetailCreated.businessAddress, options.businessAddress);
assert.strictEqual(businessDetailCreated.correspondenceAddress, options.correspondenceAddress);
assert.strictEqual(businessDetailCreated.sharedMailbox, options.sharedMailbox);
assert.strictEqual(businessDetailCreated.sharedMailbox, options.sharedMailbox);
assert.strictEqual(businessDetailCreated.phone, options.phone);
assert.strictEqual(businessDetailCreated.fax, options.fax);
assert.strictEqual(businessDetailCreated.email, options.email);
assert.strictEqual(businessDetailCreated.website, options.website);
assert.strictEqual(businessDetailCreated.registeredAddress, options.registeredAddress);
assert.strictEqual(businessDetailCreated.companyRegNo, options.companyRegNo);
assert.strictEqual(businessDetailCreated.countryOfRegistration, options.countryOfRegistration);
assert.strictEqual(businessDetailCreated.incorporatedDate, options.incorporatedDate);
assert.strictEqual(businessDetailCreated.businessType, options.businessType);
assert.strictEqual(businessDetailCreated.numPartners, options.numPartners);
assert.strictEqual(businessDetailCreated.numDirectors, options.numDirectors);
assert.strictEqual(businessDetailCreated.numBeneficiaries, options.numBeneficiaries);
assert.strictEqual(businessDetailCreated.shareholders, options.shareholders);
assert.strictEqual(businessDetailCreated.anticipatedTurnover, options.anticipatedTurnover);
assert.strictEqual(businessDetailCreated.numEmployees, options.numEmployees);
assert.strictEqual(businessDetailCreated.madeCva, options.madeCva);
assert.strictEqual(businessDetailCreated.madeCva, options.madeCva);
assert.strictEqual(businessDetailCreated.propertyRepossessed, options.propertyRepossessed);
assert.strictEqual(businessDetailCreated.propertyRepossessed, options.propertyRepossessed);
assert.strictEqual(businessDetailCreated.courtOrder, options.courtOrder);
assert.strictEqual(businessDetailCreated.courtOrder, options.courtOrder);
assert.strictEqual(businessDetailCreated.missedRepayments, options.missedRepayments);
assert.strictEqual(businessDetailCreated.missedRepayments, options.missedRepayments);
assert.strictEqual(businessDetailCreated.brokenCreditAgreement, options.brokenCreditAgreement);
assert.strictEqual(businessDetailCreated.brokenCreditAgreement, options.brokenCreditAgreement);
assert.strictEqual(businessDetailCreated.adverseCreditDetails, options.adverseCreditDetails);
    });
  });

  describe("#get", () => {
    it("should retrieve a businessDetail by ID", async () => {
      const retrieved = await thisService.Model.findById(businessDetailCreated._id);
      assert.strictEqual(retrieved._id.toString(), businessDetailCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"applicationId":`${commercialApplicationsCreated._id}`,"tradingName":"updated value","registeredName":"updated value","businessStartDate":"2026-05-13T19:45:54.459Z","natureOfBusiness":"updated value","businessAddress":"updated value","correspondenceAddress":"updated value","sharedMailbox":false,"phone":"updated value","fax":"updated value","email":"updated value","website":"updated value","registeredAddress":"updated value","companyRegNo":"updated value","countryOfRegistration":"updated value","incorporatedDate":"updated value","businessType":"updated value","numPartners":100,"numDirectors":100,"numBeneficiaries":100,"shareholders":100,"anticipatedTurnover":100,"numEmployees":100,"madeCva":false,"propertyRepossessed":false,"courtOrder":false,"missedRepayments":false,"brokenCreditAgreement":false,"adverseCreditDetails":"updated value"};

    it("should update an existing businessDetail ", async () => {
      const businessDetailUpdated = await thisService.Model.findByIdAndUpdate(
        businessDetailCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(businessDetailUpdated.applicationId.toString(), options.applicationId.toString());
assert.strictEqual(businessDetailUpdated.tradingName, options.tradingName);
assert.strictEqual(businessDetailUpdated.registeredName, options.registeredName);
assert.strictEqual(businessDetailUpdated.businessStartDate.toISOString(), options.businessStartDate);
assert.strictEqual(businessDetailUpdated.natureOfBusiness, options.natureOfBusiness);
assert.strictEqual(businessDetailUpdated.businessAddress, options.businessAddress);
assert.strictEqual(businessDetailUpdated.correspondenceAddress, options.correspondenceAddress);
assert.strictEqual(businessDetailUpdated.sharedMailbox, options.sharedMailbox);
assert.strictEqual(businessDetailUpdated.sharedMailbox, options.sharedMailbox);
assert.strictEqual(businessDetailUpdated.phone, options.phone);
assert.strictEqual(businessDetailUpdated.fax, options.fax);
assert.strictEqual(businessDetailUpdated.email, options.email);
assert.strictEqual(businessDetailUpdated.website, options.website);
assert.strictEqual(businessDetailUpdated.registeredAddress, options.registeredAddress);
assert.strictEqual(businessDetailUpdated.companyRegNo, options.companyRegNo);
assert.strictEqual(businessDetailUpdated.countryOfRegistration, options.countryOfRegistration);
assert.strictEqual(businessDetailUpdated.incorporatedDate, options.incorporatedDate);
assert.strictEqual(businessDetailUpdated.businessType, options.businessType);
assert.strictEqual(businessDetailUpdated.numPartners, options.numPartners);
assert.strictEqual(businessDetailUpdated.numDirectors, options.numDirectors);
assert.strictEqual(businessDetailUpdated.numBeneficiaries, options.numBeneficiaries);
assert.strictEqual(businessDetailUpdated.shareholders, options.shareholders);
assert.strictEqual(businessDetailUpdated.anticipatedTurnover, options.anticipatedTurnover);
assert.strictEqual(businessDetailUpdated.numEmployees, options.numEmployees);
assert.strictEqual(businessDetailUpdated.madeCva, options.madeCva);
assert.strictEqual(businessDetailUpdated.madeCva, options.madeCva);
assert.strictEqual(businessDetailUpdated.propertyRepossessed, options.propertyRepossessed);
assert.strictEqual(businessDetailUpdated.propertyRepossessed, options.propertyRepossessed);
assert.strictEqual(businessDetailUpdated.courtOrder, options.courtOrder);
assert.strictEqual(businessDetailUpdated.courtOrder, options.courtOrder);
assert.strictEqual(businessDetailUpdated.missedRepayments, options.missedRepayments);
assert.strictEqual(businessDetailUpdated.missedRepayments, options.missedRepayments);
assert.strictEqual(businessDetailUpdated.brokenCreditAgreement, options.brokenCreditAgreement);
assert.strictEqual(businessDetailUpdated.brokenCreditAgreement, options.brokenCreditAgreement);
assert.strictEqual(businessDetailUpdated.adverseCreditDetails, options.adverseCreditDetails);
    });
  });

  describe("#delete", async () => {
    it("should delete a businessDetail", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("leads").Model.findByIdAndDelete(leadsCreated._id);
await app.service("clients").Model.findByIdAndDelete(clientsCreated._id);
await app.service("deals").Model.findByIdAndDelete(dealsCreated._id);
await app.service("commercialApplications").Model.findByIdAndDelete(commercialApplicationsCreated._id);;

      const businessDetailDeleted = await thisService.Model.findByIdAndDelete(businessDetailCreated._id);
      assert.strictEqual(businessDetailDeleted._id.toString(), businessDetailCreated._id.toString());
    });
  });
});