
import { faker } from "@faker-js/faker";
export default (user,count,dealIdIds,clientProfileIds,generatedByProfileIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
dealId: dealIdIds[i % dealIdIds.length],
clientProfile: clientProfileIds[i % clientProfileIds.length],
applicantName: faker.lorem.sentence(1),
referenceNo: faker.lorem.sentence(1),
approvalDate: faker.lorem.sentence(1),
validityDays: faker.lorem.sentence(1),
securityDescription: faker.lorem.sentence(1),
estimatedValue: faker.lorem.sentence(1),
purchasePrice: faker.lorem.sentence(1),
grossLoanAmount: faker.lorem.sentence(1),
maxLtvPercentage: faker.lorem.sentence(1),
loanTermMonths: faker.lorem.sentence(1),
arrangementFeePercentage: faker.lorem.sentence(1),
concessionaryInterestRateMonthly: faker.lorem.sentence(1),
standardInterestRateMonthly: faker.lorem.sentence(1),
monthlyInterestPaymentsCharges: faker.lorem.sentence(1),
advanceInterestAmount: faker.lorem.sentence(1),
exitStrategyCondition: faker.lorem.sentence(1),
status: faker.lorem.sentence(1),
generatedPdfDocument: faker.lorem.sentence(1),
generatedByProfile: generatedByProfileIds[i % generatedByProfileIds.length],

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
