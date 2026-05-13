const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("personalDetails service", async () => {
  let thisService;
  let personalDetailCreated;
  let usersServiceResults;
  let users;

  const leadsCreated = await app.service("leads").Model.create({"commercialApplicationsId":"parentObjectId","dealId":"parentObjectId","clientId":"parentObjectId","leadId":"parentObjectId","user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value"});
const clientsCreated = await app.service("clients").Model.create({"commercialApplicationsId":"parentObjectId","dealId":"parentObjectId","clientId":"parentObjectId","leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value"});
const dealsCreated = await app.service("deals").Model.create({"commercialApplicationsId":"parentObjectId","dealId":"parentObjectId","clientId":`${clientsCreated._id}`,"leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value","phase":"new value","approvedAt":"2026-05-13T19:45:54.405Z","rejectedAt":"2026-05-13T19:45:54.405Z"});
const commercialApplicationsCreated = await app.service("commercialApplications").Model.create({"commercialApplicationsId":"parentObjectId","dealId":`${dealsCreated._id}`,"clientId":`${clientsCreated._id}`,"leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value","phase":"new value","approvedAt":"2026-05-13T19:45:54.405Z","rejectedAt":"2026-05-13T19:45:54.405Z","contactByTelephone":true,"contactByPost":true,"contactByElectronicMedia":true,"contactForMarketResearch":true,"applicationDocuments":"new value"});

  beforeEach(async () => {
    thisService = await app.service("personalDetails");

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
    assert.ok(thisService, "Registered the service (personalDetails)");
  });

  describe("#create", () => {
    const options = {"commercialApplicationsId":`${commercialApplicationsCreated._id}`,"dealId":`${dealsCreated._id}`,"clientId":`${clientsCreated._id}`,"leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value","phase":"new value","approvedAt":"2026-05-13T19:45:54.405Z","rejectedAt":"2026-05-13T19:45:54.405Z","contactByTelephone":true,"contactByPost":true,"contactByElectronicMedia":true,"contactForMarketResearch":true,"applicationDocuments":"new value","title":"new value","firstName":"new value","middleName":"new value","lastName":"new value","previousSurname":"new value","dateOfBirth":"2026-05-13T19:45:54.405Z","nationality":"new value","countryOfResidence":"new value","residentialAddress":"new value","postcode":"new value","previousAddress":"new value","contactPreference":"new value","phoneHome":"new value","phoneMobile":"new value","email":"new value","capacityRole":"new value","sharesHeldPct":23,"everBankrupt":true,"missedRepayments":true,"ivaCva":true,"propertyRepossessed":true,"courtOrder":true,"brokenCreditAgreement":true,"associatedBusinessFailure":true,"adverseCreditDetails":"new value","employerName":"new value","jobTitle":"new value","annualSalary":23,"employmentContinues":true,"signature":"new value","signedDate":"2026-05-13T19:45:54.405Z"};

    beforeEach(async () => {
      personalDetailCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new personalDetail", () => {
      assert.strictEqual(personalDetailCreated.commercialApplicationsId.toString(), options.commercialApplicationsId.toString());
assert.strictEqual(personalDetailCreated.title, options.title);
assert.strictEqual(personalDetailCreated.firstName, options.firstName);
assert.strictEqual(personalDetailCreated.middleName, options.middleName);
assert.strictEqual(personalDetailCreated.lastName, options.lastName);
assert.strictEqual(personalDetailCreated.previousSurname, options.previousSurname);
assert.strictEqual(personalDetailCreated.dateOfBirth.toISOString(), options.dateOfBirth);
assert.strictEqual(personalDetailCreated.nationality, options.nationality);
assert.strictEqual(personalDetailCreated.countryOfResidence, options.countryOfResidence);
assert.strictEqual(personalDetailCreated.residentialAddress, options.residentialAddress);
assert.strictEqual(personalDetailCreated.postcode, options.postcode);
assert.strictEqual(personalDetailCreated.previousAddress, options.previousAddress);
assert.strictEqual(personalDetailCreated.contactPreference, options.contactPreference);
assert.strictEqual(personalDetailCreated.phoneHome, options.phoneHome);
assert.strictEqual(personalDetailCreated.phoneMobile, options.phoneMobile);
assert.strictEqual(personalDetailCreated.email, options.email);
assert.strictEqual(personalDetailCreated.capacityRole, options.capacityRole);
assert.strictEqual(personalDetailCreated.sharesHeldPct, options.sharesHeldPct);
assert.strictEqual(personalDetailCreated.everBankrupt, options.everBankrupt);
assert.strictEqual(personalDetailCreated.everBankrupt, options.everBankrupt);
assert.strictEqual(personalDetailCreated.missedRepayments, options.missedRepayments);
assert.strictEqual(personalDetailCreated.missedRepayments, options.missedRepayments);
assert.strictEqual(personalDetailCreated.ivaCva, options.ivaCva);
assert.strictEqual(personalDetailCreated.ivaCva, options.ivaCva);
assert.strictEqual(personalDetailCreated.propertyRepossessed, options.propertyRepossessed);
assert.strictEqual(personalDetailCreated.propertyRepossessed, options.propertyRepossessed);
assert.strictEqual(personalDetailCreated.courtOrder, options.courtOrder);
assert.strictEqual(personalDetailCreated.courtOrder, options.courtOrder);
assert.strictEqual(personalDetailCreated.brokenCreditAgreement, options.brokenCreditAgreement);
assert.strictEqual(personalDetailCreated.brokenCreditAgreement, options.brokenCreditAgreement);
assert.strictEqual(personalDetailCreated.associatedBusinessFailure, options.associatedBusinessFailure);
assert.strictEqual(personalDetailCreated.associatedBusinessFailure, options.associatedBusinessFailure);
assert.strictEqual(personalDetailCreated.adverseCreditDetails, options.adverseCreditDetails);
assert.strictEqual(personalDetailCreated.employerName, options.employerName);
assert.strictEqual(personalDetailCreated.jobTitle, options.jobTitle);
assert.strictEqual(personalDetailCreated.annualSalary, options.annualSalary);
assert.strictEqual(personalDetailCreated.employmentContinues, options.employmentContinues);
assert.strictEqual(personalDetailCreated.employmentContinues, options.employmentContinues);
assert.strictEqual(personalDetailCreated.signature, options.signature);
assert.strictEqual(personalDetailCreated.signedDate.toISOString(), options.signedDate);
    });
  });

  describe("#get", () => {
    it("should retrieve a personalDetail by ID", async () => {
      const retrieved = await thisService.Model.findById(personalDetailCreated._id);
      assert.strictEqual(retrieved._id.toString(), personalDetailCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"commercialApplicationsId":`${commercialApplicationsCreated._id}`,"title":"updated value","firstName":"updated value","middleName":"updated value","lastName":"updated value","previousSurname":"updated value","dateOfBirth":"2026-05-13T19:45:54.405Z","nationality":"updated value","countryOfResidence":"updated value","residentialAddress":"updated value","postcode":"updated value","previousAddress":"updated value","contactPreference":"updated value","phoneHome":"updated value","phoneMobile":"updated value","email":"updated value","capacityRole":"updated value","sharesHeldPct":100,"everBankrupt":false,"missedRepayments":false,"ivaCva":false,"propertyRepossessed":false,"courtOrder":false,"brokenCreditAgreement":false,"associatedBusinessFailure":false,"adverseCreditDetails":"updated value","employerName":"updated value","jobTitle":"updated value","annualSalary":100,"employmentContinues":false,"signature":"updated value","signedDate":"2026-05-13T19:45:54.405Z"};

    it("should update an existing personalDetail ", async () => {
      const personalDetailUpdated = await thisService.Model.findByIdAndUpdate(
        personalDetailCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(personalDetailUpdated.commercialApplicationsId.toString(), options.commercialApplicationsId.toString());
assert.strictEqual(personalDetailUpdated.title, options.title);
assert.strictEqual(personalDetailUpdated.firstName, options.firstName);
assert.strictEqual(personalDetailUpdated.middleName, options.middleName);
assert.strictEqual(personalDetailUpdated.lastName, options.lastName);
assert.strictEqual(personalDetailUpdated.previousSurname, options.previousSurname);
assert.strictEqual(personalDetailUpdated.dateOfBirth.toISOString(), options.dateOfBirth);
assert.strictEqual(personalDetailUpdated.nationality, options.nationality);
assert.strictEqual(personalDetailUpdated.countryOfResidence, options.countryOfResidence);
assert.strictEqual(personalDetailUpdated.residentialAddress, options.residentialAddress);
assert.strictEqual(personalDetailUpdated.postcode, options.postcode);
assert.strictEqual(personalDetailUpdated.previousAddress, options.previousAddress);
assert.strictEqual(personalDetailUpdated.contactPreference, options.contactPreference);
assert.strictEqual(personalDetailUpdated.phoneHome, options.phoneHome);
assert.strictEqual(personalDetailUpdated.phoneMobile, options.phoneMobile);
assert.strictEqual(personalDetailUpdated.email, options.email);
assert.strictEqual(personalDetailUpdated.capacityRole, options.capacityRole);
assert.strictEqual(personalDetailUpdated.sharesHeldPct, options.sharesHeldPct);
assert.strictEqual(personalDetailUpdated.everBankrupt, options.everBankrupt);
assert.strictEqual(personalDetailUpdated.everBankrupt, options.everBankrupt);
assert.strictEqual(personalDetailUpdated.missedRepayments, options.missedRepayments);
assert.strictEqual(personalDetailUpdated.missedRepayments, options.missedRepayments);
assert.strictEqual(personalDetailUpdated.ivaCva, options.ivaCva);
assert.strictEqual(personalDetailUpdated.ivaCva, options.ivaCva);
assert.strictEqual(personalDetailUpdated.propertyRepossessed, options.propertyRepossessed);
assert.strictEqual(personalDetailUpdated.propertyRepossessed, options.propertyRepossessed);
assert.strictEqual(personalDetailUpdated.courtOrder, options.courtOrder);
assert.strictEqual(personalDetailUpdated.courtOrder, options.courtOrder);
assert.strictEqual(personalDetailUpdated.brokenCreditAgreement, options.brokenCreditAgreement);
assert.strictEqual(personalDetailUpdated.brokenCreditAgreement, options.brokenCreditAgreement);
assert.strictEqual(personalDetailUpdated.associatedBusinessFailure, options.associatedBusinessFailure);
assert.strictEqual(personalDetailUpdated.associatedBusinessFailure, options.associatedBusinessFailure);
assert.strictEqual(personalDetailUpdated.adverseCreditDetails, options.adverseCreditDetails);
assert.strictEqual(personalDetailUpdated.employerName, options.employerName);
assert.strictEqual(personalDetailUpdated.jobTitle, options.jobTitle);
assert.strictEqual(personalDetailUpdated.annualSalary, options.annualSalary);
assert.strictEqual(personalDetailUpdated.employmentContinues, options.employmentContinues);
assert.strictEqual(personalDetailUpdated.employmentContinues, options.employmentContinues);
assert.strictEqual(personalDetailUpdated.signature, options.signature);
assert.strictEqual(personalDetailUpdated.signedDate.toISOString(), options.signedDate);
    });
  });

  describe("#delete", async () => {
    it("should delete a personalDetail", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("leads").Model.findByIdAndDelete(leadsCreated._id);
await app.service("clients").Model.findByIdAndDelete(clientsCreated._id);
await app.service("deals").Model.findByIdAndDelete(dealsCreated._id);
await app.service("commercialApplications").Model.findByIdAndDelete(commercialApplicationsCreated._id);;

      const personalDetailDeleted = await thisService.Model.findByIdAndDelete(personalDetailCreated._id);
      assert.strictEqual(personalDetailDeleted._id.toString(), personalDetailCreated._id.toString());
    });
  });
});