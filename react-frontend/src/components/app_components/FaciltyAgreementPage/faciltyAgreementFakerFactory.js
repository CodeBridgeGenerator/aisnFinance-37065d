
import { faker } from "@faker-js/faker";
export default (user,count,dealIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
dealId: dealIdIds[i % dealIdIds.length],
agreementDate: faker.lorem.sentence(1),
lenderName: faker.lorem.sentence(1),
borrowerName: faker.lorem.sentence(1),
borrowerAddress: faker.lorem.sentence(1),
facilityAmount: faker.lorem.sentence(1),
marketValuePercentage: faker.lorem.sentence(1),
loanAdvance: faker.lorem.sentence(1),
loanTerm: faker.lorem.sentence(1),
finalRepaymentDate: faker.lorem.sentence(1),
standardRatePerAnnum: faker.lorem.sentence(1),
concessionaryRatePerMonth: faker.lorem.sentence(1),
arrangementFeeAmount: faker.lorem.sentence(1),
propertyAddress: faker.lorem.sentence(1),
propertyTitleNumber: faker.lorem.sentence(1),
securityDescription: faker.lorem.sentence(1),
lendersSolicitorsName: faker.lorem.sentence(1),
monthlyInterestRate: faker.lorem.sentence(1),
borrowerSignatoryName: faker.lorem.sentence(1),
businessPurposeDeclarationDate: faker.lorem.sentence(1),
status: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
