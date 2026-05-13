
import { faker } from "@faker-js/faker";
export default (user,count,dealIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
deal: dealIds[i % dealIds.length],
clientProfile: faker.lorem.sentence(1),
reviewYear: faker.lorem.sentence(1),
reviewDueDate: faker.lorem.sentence(1),
reminderDate: faker.lorem.sentence(1),
epcCertOnFile: faker.lorem.sentence(1),
epcCertDocument: faker.lorem.sentence(1),
annualBuildingInsuranceOnFile: faker.lorem.sentence(1),
buildingInsuranceExpiryDate: faker.lorem.sentence(1),
buildingInsuranceDocument: faker.lorem.sentence(1),
isBuildingInsuranceExpired: faker.lorem.sentence(1),
gasCertOnFile: faker.lorem.sentence(1),
gasCertDocument: faker.lorem.sentence(1),
electricPatCertOnFile: faker.lorem.sentence(1),
electricPatCertDocument: faker.lorem.sentence(1),
companyAccountsOnFile: faker.lorem.sentence(1),
landRegistryCheckOnFile: faker.lorem.sentence(1),
landRegistryCheckDocument: faker.lorem.sentence(1),
creditReportOnFile: faker.lorem.sentence(1),
creditReportDocument: faker.lorem.sentence(1),
comments: faker.lorem.sentence(1),
status: faker.lorem.sentence(1),
reviewedByProfile: faker.lorem.sentence(1),
reviewedAt: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
