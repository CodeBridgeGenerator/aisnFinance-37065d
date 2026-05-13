
import { faker } from "@faker-js/faker";
export default (user,count,dealIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
dealId: dealIdIds[i % dealIdIds.length],
borrower: faker.lorem.sentence(1),
property: faker.lorem.sentence(1),
loanAdvance: faker.lorem.sentence(1),
firstMonthInterestRate: faker.lorem.sentence(1),
firstMonthInterestAmount: faker.lorem.sentence(1),
arrangementFee: faker.lorem.sentence(1),
lendersBankTransferFee: faker.lorem.sentence(1),
otherDeductions: faker.lorem.sentence(1),
netLoanAdvance: faker.lorem.sentence(1),
amountToBeTransferredToSolicitor: faker.lorem.sentence(1),
lender: faker.lorem.sentence(1),
statementDate: faker.lorem.sentence(1),
authorisedSignatory: faker.lorem.sentence(1),
status: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
