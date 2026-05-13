const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("securityProperties service", async () => {
  let thisService;
  let securityPropertyCreated;
  let usersServiceResults;
  let users;

  const leadsCreated = await app.service("leads").Model.create({"applicationId":"parentObjectId","dealId":"parentObjectId","clientId":"parentObjectId","leadId":"parentObjectId","user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value"});
const clientsCreated = await app.service("clients").Model.create({"applicationId":"parentObjectId","dealId":"parentObjectId","clientId":"parentObjectId","leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value"});
const dealsCreated = await app.service("deals").Model.create({"applicationId":"parentObjectId","dealId":"parentObjectId","clientId":`${clientsCreated._id}`,"leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value","phase":"new value","approvedAt":"2026-05-13T19:45:54.505Z","rejectedAt":"2026-05-13T19:45:54.505Z"});
const commercialApplicationsCreated = await app.service("commercialApplications").Model.create({"applicationId":"parentObjectId","dealId":`${dealsCreated._id}`,"clientId":`${clientsCreated._id}`,"leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value","phase":"new value","approvedAt":"2026-05-13T19:45:54.505Z","rejectedAt":"2026-05-13T19:45:54.505Z","contactByTelephone":true,"contactByPost":true,"contactByElectronicMedia":true,"contactForMarketResearch":true,"applicationDocuments":"new value"});

  beforeEach(async () => {
    thisService = await app.service("securityProperties");

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
    assert.ok(thisService, "Registered the service (securityProperties)");
  });

  describe("#create", () => {
    const options = {"applicationId":`${commercialApplicationsCreated._id}`,"dealId":`${dealsCreated._id}`,"clientId":`${clientsCreated._id}`,"leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value","phase":"new value","approvedAt":"2026-05-13T19:45:54.505Z","rejectedAt":"2026-05-13T19:45:54.505Z","contactByTelephone":true,"contactByPost":true,"contactByElectronicMedia":true,"contactForMarketResearch":true,"applicationDocuments":"new value","propertyType":"new value","address":"new value","postcode":"new value","description":"new value","tenure":"new value","vacantPossessionOnCompletion":true,"leaseholdUnexpiredTermYears":23,"leaseholdUnexpiredTermMonths":23,"leaseholdGroundRentPerAnnum":23,"lettingRentalIncomePerAnnum":23,"lettingRentReviewDate":"2026-05-13T19:45:54.505Z","valuationContactName":"new value","valuationContactPhoneNo":"new value","valuationContactEmail":"new value","purchasePrice":23,"purchaseCurrentValue":23,"purchaseDeposit":23,"purchaseDepositSources":"new value","purchaseOtherDepositSource":"new value","purchaseRepaymentDetails":"new value","ownedPropertyAcquiredDate":"2026-05-13T19:45:54.505Z","ownedPropertyPurchasePrice":23,"ownedPropertyMostRecentValuation":23,"ownedPropertyValuationDate":"new value","ownedPropertyOutstandingMortgage":23,"ownedPropertyCurrentLenderName":"new value","ownedPropertycurrentLenderAddress":"new value","ownedPropertymortgageAccountNumber":"new value","ownedPropertyhasOtherCharges":true,"ownedPropertyotherChargesDetails":"new value"};

    beforeEach(async () => {
      securityPropertyCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new securityProperty", () => {
      assert.strictEqual(securityPropertyCreated.applicationId.toString(), options.applicationId.toString());
assert.strictEqual(securityPropertyCreated.propertyType, options.propertyType);
assert.strictEqual(securityPropertyCreated.address, options.address);
assert.strictEqual(securityPropertyCreated.postcode, options.postcode);
assert.strictEqual(securityPropertyCreated.description, options.description);
assert.strictEqual(securityPropertyCreated.tenure, options.tenure);
assert.strictEqual(securityPropertyCreated.vacantPossessionOnCompletion, options.vacantPossessionOnCompletion);
assert.strictEqual(securityPropertyCreated.vacantPossessionOnCompletion, options.vacantPossessionOnCompletion);
assert.strictEqual(securityPropertyCreated.leaseholdUnexpiredTermYears, options.leaseholdUnexpiredTermYears);
assert.strictEqual(securityPropertyCreated.leaseholdUnexpiredTermMonths, options.leaseholdUnexpiredTermMonths);
assert.strictEqual(securityPropertyCreated.leaseholdGroundRentPerAnnum, options.leaseholdGroundRentPerAnnum);
assert.strictEqual(securityPropertyCreated.lettingRentalIncomePerAnnum, options.lettingRentalIncomePerAnnum);
assert.strictEqual(securityPropertyCreated.lettingRentReviewDate.toISOString(), options.lettingRentReviewDate);
assert.strictEqual(securityPropertyCreated.valuationContactName, options.valuationContactName);
assert.strictEqual(securityPropertyCreated.valuationContactPhoneNo, options.valuationContactPhoneNo);
assert.strictEqual(securityPropertyCreated.valuationContactEmail, options.valuationContactEmail);
assert.strictEqual(securityPropertyCreated.purchasePrice, options.purchasePrice);
assert.strictEqual(securityPropertyCreated.purchaseCurrentValue, options.purchaseCurrentValue);
assert.strictEqual(securityPropertyCreated.purchaseDeposit, options.purchaseDeposit);
assert.strictEqual(securityPropertyCreated.purchaseDepositSources, options.purchaseDepositSources);
assert.strictEqual(securityPropertyCreated.purchaseOtherDepositSource, options.purchaseOtherDepositSource);
assert.strictEqual(securityPropertyCreated.purchaseRepaymentDetails, options.purchaseRepaymentDetails);
assert.strictEqual(securityPropertyCreated.ownedPropertyAcquiredDate.toISOString(), options.ownedPropertyAcquiredDate);
assert.strictEqual(securityPropertyCreated.ownedPropertyPurchasePrice, options.ownedPropertyPurchasePrice);
assert.strictEqual(securityPropertyCreated.ownedPropertyMostRecentValuation, options.ownedPropertyMostRecentValuation);
assert.strictEqual(securityPropertyCreated.ownedPropertyValuationDate, options.ownedPropertyValuationDate);
assert.strictEqual(securityPropertyCreated.ownedPropertyOutstandingMortgage, options.ownedPropertyOutstandingMortgage);
assert.strictEqual(securityPropertyCreated.ownedPropertyCurrentLenderName, options.ownedPropertyCurrentLenderName);
assert.strictEqual(securityPropertyCreated.ownedPropertycurrentLenderAddress, options.ownedPropertycurrentLenderAddress);
assert.strictEqual(securityPropertyCreated.ownedPropertymortgageAccountNumber, options.ownedPropertymortgageAccountNumber);
assert.strictEqual(securityPropertyCreated.ownedPropertyhasOtherCharges, options.ownedPropertyhasOtherCharges);
assert.strictEqual(securityPropertyCreated.ownedPropertyhasOtherCharges, options.ownedPropertyhasOtherCharges);
assert.strictEqual(securityPropertyCreated.ownedPropertyotherChargesDetails, options.ownedPropertyotherChargesDetails);
    });
  });

  describe("#get", () => {
    it("should retrieve a securityProperty by ID", async () => {
      const retrieved = await thisService.Model.findById(securityPropertyCreated._id);
      assert.strictEqual(retrieved._id.toString(), securityPropertyCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"applicationId":`${commercialApplicationsCreated._id}`,"propertyType":"updated value","address":"updated value","postcode":"updated value","description":"updated value","tenure":"updated value","vacantPossessionOnCompletion":false,"leaseholdUnexpiredTermYears":100,"leaseholdUnexpiredTermMonths":100,"leaseholdGroundRentPerAnnum":100,"lettingRentalIncomePerAnnum":100,"lettingRentReviewDate":"2026-05-13T19:45:54.505Z","valuationContactName":"updated value","valuationContactPhoneNo":"updated value","valuationContactEmail":"updated value","purchasePrice":100,"purchaseCurrentValue":100,"purchaseDeposit":100,"purchaseDepositSources":"updated value","purchaseOtherDepositSource":"updated value","purchaseRepaymentDetails":"updated value","ownedPropertyAcquiredDate":"2026-05-13T19:45:54.505Z","ownedPropertyPurchasePrice":100,"ownedPropertyMostRecentValuation":100,"ownedPropertyValuationDate":"updated value","ownedPropertyOutstandingMortgage":100,"ownedPropertyCurrentLenderName":"updated value","ownedPropertycurrentLenderAddress":"updated value","ownedPropertymortgageAccountNumber":"updated value","ownedPropertyhasOtherCharges":false,"ownedPropertyotherChargesDetails":"updated value"};

    it("should update an existing securityProperty ", async () => {
      const securityPropertyUpdated = await thisService.Model.findByIdAndUpdate(
        securityPropertyCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(securityPropertyUpdated.applicationId.toString(), options.applicationId.toString());
assert.strictEqual(securityPropertyUpdated.propertyType, options.propertyType);
assert.strictEqual(securityPropertyUpdated.address, options.address);
assert.strictEqual(securityPropertyUpdated.postcode, options.postcode);
assert.strictEqual(securityPropertyUpdated.description, options.description);
assert.strictEqual(securityPropertyUpdated.tenure, options.tenure);
assert.strictEqual(securityPropertyUpdated.vacantPossessionOnCompletion, options.vacantPossessionOnCompletion);
assert.strictEqual(securityPropertyUpdated.vacantPossessionOnCompletion, options.vacantPossessionOnCompletion);
assert.strictEqual(securityPropertyUpdated.leaseholdUnexpiredTermYears, options.leaseholdUnexpiredTermYears);
assert.strictEqual(securityPropertyUpdated.leaseholdUnexpiredTermMonths, options.leaseholdUnexpiredTermMonths);
assert.strictEqual(securityPropertyUpdated.leaseholdGroundRentPerAnnum, options.leaseholdGroundRentPerAnnum);
assert.strictEqual(securityPropertyUpdated.lettingRentalIncomePerAnnum, options.lettingRentalIncomePerAnnum);
assert.strictEqual(securityPropertyUpdated.lettingRentReviewDate.toISOString(), options.lettingRentReviewDate);
assert.strictEqual(securityPropertyUpdated.valuationContactName, options.valuationContactName);
assert.strictEqual(securityPropertyUpdated.valuationContactPhoneNo, options.valuationContactPhoneNo);
assert.strictEqual(securityPropertyUpdated.valuationContactEmail, options.valuationContactEmail);
assert.strictEqual(securityPropertyUpdated.purchasePrice, options.purchasePrice);
assert.strictEqual(securityPropertyUpdated.purchaseCurrentValue, options.purchaseCurrentValue);
assert.strictEqual(securityPropertyUpdated.purchaseDeposit, options.purchaseDeposit);
assert.strictEqual(securityPropertyUpdated.purchaseDepositSources, options.purchaseDepositSources);
assert.strictEqual(securityPropertyUpdated.purchaseOtherDepositSource, options.purchaseOtherDepositSource);
assert.strictEqual(securityPropertyUpdated.purchaseRepaymentDetails, options.purchaseRepaymentDetails);
assert.strictEqual(securityPropertyUpdated.ownedPropertyAcquiredDate.toISOString(), options.ownedPropertyAcquiredDate);
assert.strictEqual(securityPropertyUpdated.ownedPropertyPurchasePrice, options.ownedPropertyPurchasePrice);
assert.strictEqual(securityPropertyUpdated.ownedPropertyMostRecentValuation, options.ownedPropertyMostRecentValuation);
assert.strictEqual(securityPropertyUpdated.ownedPropertyValuationDate, options.ownedPropertyValuationDate);
assert.strictEqual(securityPropertyUpdated.ownedPropertyOutstandingMortgage, options.ownedPropertyOutstandingMortgage);
assert.strictEqual(securityPropertyUpdated.ownedPropertyCurrentLenderName, options.ownedPropertyCurrentLenderName);
assert.strictEqual(securityPropertyUpdated.ownedPropertycurrentLenderAddress, options.ownedPropertycurrentLenderAddress);
assert.strictEqual(securityPropertyUpdated.ownedPropertymortgageAccountNumber, options.ownedPropertymortgageAccountNumber);
assert.strictEqual(securityPropertyUpdated.ownedPropertyhasOtherCharges, options.ownedPropertyhasOtherCharges);
assert.strictEqual(securityPropertyUpdated.ownedPropertyhasOtherCharges, options.ownedPropertyhasOtherCharges);
assert.strictEqual(securityPropertyUpdated.ownedPropertyotherChargesDetails, options.ownedPropertyotherChargesDetails);
    });
  });

  describe("#delete", async () => {
    it("should delete a securityProperty", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("leads").Model.findByIdAndDelete(leadsCreated._id);
await app.service("clients").Model.findByIdAndDelete(clientsCreated._id);
await app.service("deals").Model.findByIdAndDelete(dealsCreated._id);
await app.service("commercialApplications").Model.findByIdAndDelete(commercialApplicationsCreated._id);;

      const securityPropertyDeleted = await thisService.Model.findByIdAndDelete(securityPropertyCreated._id);
      assert.strictEqual(securityPropertyDeleted._id.toString(), securityPropertyCreated._id.toString());
    });
  });
});