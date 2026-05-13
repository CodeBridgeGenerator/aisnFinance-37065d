const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("completitionStatement service", async () => {
  let thisService;
  let completitionStatementCreated;
  let usersServiceResults;
  let users;

  const leadsCreated = await app.service("leads").Model.create({"dealId":"parentObjectId","clientId":"parentObjectId","leadId":"parentObjectId","user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value"});
const clientsCreated = await app.service("clients").Model.create({"dealId":"parentObjectId","clientId":"parentObjectId","leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value"});
const dealsCreated = await app.service("deals").Model.create({"dealId":"parentObjectId","clientId":`${clientsCreated._id}`,"leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value","phase":"new value","approvedAt":"2026-05-13T19:45:54.953Z","rejectedAt":"2026-05-13T19:45:54.953Z"});

  beforeEach(async () => {
    thisService = await app.service("completitionStatement");

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
    assert.ok(thisService, "Registered the service (completitionStatement)");
  });

  describe("#create", () => {
    const options = {"dealId":`${dealsCreated._id}`,"clientId":`${clientsCreated._id}`,"leadId":`${leadsCreated._id}`,"user":"parentObjectId","name":"new value","contactNo":23,"assignedSalesperson":"parentObjectId","assignedAdmin":"parentObjectId","status":"new value","rejectionReason":"new value","profileId":"parentObjectId","clientType":"new value","phase":"new value","approvedAt":"2026-05-13T19:45:54.953Z","rejectedAt":"2026-05-13T19:45:54.953Z","borrower":"new value","property":"new value","loanAdvance":"new value","firstMonthInterestRate":23,"firstMonthInterestAmount":"new value","arrangementFee":"new value","lendersBankTransferFee":"new value","otherDeductions":"new value","netLoanAdvance":"new value","amountToBeTransferredToSolicitor":"new value","lender":"new value","statementDate":"2026-05-13T19:45:54.953Z","authorisedSignatory":"new value"};

    beforeEach(async () => {
      completitionStatementCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new completitionStatement", () => {
      assert.strictEqual(completitionStatementCreated.dealId.toString(), options.dealId.toString());
assert.strictEqual(completitionStatementCreated.borrower, options.borrower);
assert.strictEqual(completitionStatementCreated.property, options.property);
assert.strictEqual(completitionStatementCreated.loanAdvance, options.loanAdvance);
assert.strictEqual(completitionStatementCreated.firstMonthInterestRate, options.firstMonthInterestRate);
assert.strictEqual(completitionStatementCreated.firstMonthInterestAmount, options.firstMonthInterestAmount);
assert.strictEqual(completitionStatementCreated.arrangementFee, options.arrangementFee);
assert.strictEqual(completitionStatementCreated.lendersBankTransferFee, options.lendersBankTransferFee);
assert.strictEqual(completitionStatementCreated.otherDeductions, options.otherDeductions);
assert.strictEqual(completitionStatementCreated.netLoanAdvance, options.netLoanAdvance);
assert.strictEqual(completitionStatementCreated.amountToBeTransferredToSolicitor, options.amountToBeTransferredToSolicitor);
assert.strictEqual(completitionStatementCreated.lender, options.lender);
assert.strictEqual(completitionStatementCreated.statementDate.toISOString(), options.statementDate);
assert.strictEqual(completitionStatementCreated.authorisedSignatory, options.authorisedSignatory);
assert.strictEqual(completitionStatementCreated.status, options.status);
    });
  });

  describe("#get", () => {
    it("should retrieve a completitionStatement by ID", async () => {
      const retrieved = await thisService.Model.findById(completitionStatementCreated._id);
      assert.strictEqual(retrieved._id.toString(), completitionStatementCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"dealId":`${dealsCreated._id}`,"borrower":"updated value","property":"updated value","loanAdvance":"updated value","firstMonthInterestRate":100,"firstMonthInterestAmount":"updated value","arrangementFee":"updated value","lendersBankTransferFee":"updated value","otherDeductions":"updated value","netLoanAdvance":"updated value","amountToBeTransferredToSolicitor":"updated value","lender":"updated value","statementDate":"2026-05-13T19:45:54.953Z","authorisedSignatory":"updated value","status":"updated value"};

    it("should update an existing completitionStatement ", async () => {
      const completitionStatementUpdated = await thisService.Model.findByIdAndUpdate(
        completitionStatementCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(completitionStatementUpdated.dealId.toString(), options.dealId.toString());
assert.strictEqual(completitionStatementUpdated.borrower, options.borrower);
assert.strictEqual(completitionStatementUpdated.property, options.property);
assert.strictEqual(completitionStatementUpdated.loanAdvance, options.loanAdvance);
assert.strictEqual(completitionStatementUpdated.firstMonthInterestRate, options.firstMonthInterestRate);
assert.strictEqual(completitionStatementUpdated.firstMonthInterestAmount, options.firstMonthInterestAmount);
assert.strictEqual(completitionStatementUpdated.arrangementFee, options.arrangementFee);
assert.strictEqual(completitionStatementUpdated.lendersBankTransferFee, options.lendersBankTransferFee);
assert.strictEqual(completitionStatementUpdated.otherDeductions, options.otherDeductions);
assert.strictEqual(completitionStatementUpdated.netLoanAdvance, options.netLoanAdvance);
assert.strictEqual(completitionStatementUpdated.amountToBeTransferredToSolicitor, options.amountToBeTransferredToSolicitor);
assert.strictEqual(completitionStatementUpdated.lender, options.lender);
assert.strictEqual(completitionStatementUpdated.statementDate.toISOString(), options.statementDate);
assert.strictEqual(completitionStatementUpdated.authorisedSignatory, options.authorisedSignatory);
assert.strictEqual(completitionStatementUpdated.status, options.status);
    });
  });

  describe("#delete", async () => {
    it("should delete a completitionStatement", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("leads").Model.findByIdAndDelete(leadsCreated._id);
await app.service("clients").Model.findByIdAndDelete(clientsCreated._id);
await app.service("deals").Model.findByIdAndDelete(dealsCreated._id);;

      const completitionStatementDeleted = await thisService.Model.findByIdAndDelete(completitionStatementCreated._id);
      assert.strictEqual(completitionStatementDeleted._id.toString(), completitionStatementCreated._id.toString());
    });
  });
});