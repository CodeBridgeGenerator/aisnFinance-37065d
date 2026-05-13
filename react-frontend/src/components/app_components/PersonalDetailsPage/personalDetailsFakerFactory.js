
import { faker } from "@faker-js/faker";
export default (user,count,commercialApplicationsIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
commercialApplicationsId: commercialApplicationsIdIds[i % commercialApplicationsIdIds.length],
title: faker.lorem.sentence(1),
firstName: faker.lorem.sentence(1),
middleName: faker.lorem.sentence(1),
lastName: faker.lorem.sentence(1),
previousSurname: faker.lorem.sentence(1),
dateOfBirth: faker.lorem.sentence(1),
nationality: faker.lorem.sentence(1),
countryOfResidence: faker.lorem.sentence(1),
residentialAddress: faker.lorem.sentence(1),
postcode: faker.lorem.sentence(1),
previousAddress: faker.lorem.sentence(1),
contactPreference: faker.lorem.sentence(1),
phoneHome: faker.lorem.sentence(1),
phoneMobile: faker.lorem.sentence(1),
email: faker.internet.email(),
capacityRole: faker.lorem.sentence(1),
sharesHeldPct: faker.lorem.sentence(1),
everBankrupt: faker.lorem.sentence(1),
missedRepayments: faker.lorem.sentence(1),
ivaCva: faker.lorem.sentence(1),
propertyRepossessed: faker.lorem.sentence(1),
courtOrder: faker.lorem.sentence(1),
brokenCreditAgreement: faker.lorem.sentence(1),
associatedBusinessFailure: faker.lorem.sentence(1),
adverseCreditDetails: faker.lorem.sentence(1),
employerName: faker.lorem.sentence(1),
jobTitle: faker.lorem.sentence(1),
annualSalary: faker.lorem.sentence(1),
employmentContinues: faker.lorem.sentence(1),
signature: faker.lorem.sentence(1),
signedDate: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
