
import { faker } from "@faker-js/faker";
export default (user,count,applicationIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
applicationId: applicationIdIds[i % applicationIdIds.length],
tradingName: faker.lorem.sentence(1),
registeredName: faker.lorem.sentence(1),
businessStartDate: faker.lorem.sentence(1),
natureOfBusiness: faker.lorem.sentence(1),
businessAddress: faker.lorem.sentence(1),
correspondenceAddress: faker.lorem.sentence(1),
sharedMailbox: faker.lorem.sentence(1),
phone: faker.lorem.sentence(1),
fax: faker.lorem.sentence(1),
email: faker.internet.email(),
website: faker.lorem.sentence(1),
registeredAddress: faker.lorem.sentence(1),
companyRegNo: faker.lorem.sentence(1),
countryOfRegistration: faker.lorem.sentence(1),
incorporatedDate: faker.lorem.sentence(1),
businessType: faker.lorem.sentence(1),
numPartners: faker.lorem.sentence(1),
numDirectors: faker.lorem.sentence(1),
numBeneficiaries: faker.lorem.sentence(1),
shareholders: faker.lorem.sentence(1),
anticipatedTurnover: faker.lorem.sentence(1),
numEmployees: faker.lorem.sentence(1),
madeCva: faker.lorem.sentence(1),
propertyRepossessed: faker.lorem.sentence(1),
courtOrder: faker.lorem.sentence(1),
missedRepayments: faker.lorem.sentence(1),
brokenCreditAgreement: faker.lorem.sentence(1),
adverseCreditDetails: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
