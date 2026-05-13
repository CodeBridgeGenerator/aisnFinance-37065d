
import { faker } from "@faker-js/faker";
export default (user,count,applicationIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
applicationId: applicationIdIds[i % applicationIdIds.length],
requestedLoanAmount: faker.lorem.sentence(1),
requestedRepaymentTerm: faker.lorem.sentence(1),
purposeOfMortage: faker.lorem.sentence(1),
mortgageHolders: faker.lorem.sentence(1),
capitalRaisingFundUse: faker.lorem.sentence(1),
investmentPropertyOccupier: faker.lorem.sentence(1),
investmentPropertyOccupierDetails: faker.lorem.sentence(1),
solicitorName: faker.lorem.sentence(1),
solicitorAddress: faker.lorem.sentence(1),
solicitorPhoneNo: faker.lorem.sentence(1),
solicitorEmail: faker.lorem.sentence(1),
intermediaryName: faker.lorem.sentence(1),
intermediaryAddress: faker.lorem.sentence(1),
intermediaryPhoneNo: faker.lorem.sentence(1),
intermediaryEmail: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
