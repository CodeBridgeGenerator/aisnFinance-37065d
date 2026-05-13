
import { faker } from "@faker-js/faker";
export default (user,count,dealIds,checkedByIds,applicationFormIds,completedByProfileIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
deal: dealIds[i % dealIds.length],
adviserName: faker.lorem.sentence(1),
clientNames: faker.lorem.sentence(1),
checkedBy: checkedByIds[i % checkedByIds.length],
checkedDate: faker.lorem.sentence(1),
providerName: faker.lorem.sentence(1),
lenderName: faker.lorem.sentence(1),
productName: faker.lorem.sentence(1),
applicationForm: applicationFormIds[i % applicationFormIds.length],
applicationFormDate: faker.lorem.sentence(1),
identificationProof: faker.lorem.sentence(1),
identificationProofDate: faker.lorem.sentence(1),
factfindKyc: faker.lorem.sentence(1),
factfindKycDate: faker.lorem.sentence(1),
loanMemorandumPreparedOnFile: faker.lorem.sentence(1),
boardSignOff: faker.lorem.sentence(1),
offerLetterPreparedSent: faker.lorem.sentence(1),
offerLetterPrepared: faker.lorem.sentence(1),
facilityLetterPreparedChecked: faker.lorem.sentence(1),
valuationsInstructed: faker.lorem.sentence(1),
valuationsInstructedDate: faker.lorem.sentence(1),
solicitorInstructed: faker.lorem.sentence(1),
loanDrawnDown: faker.lorem.sentence(1),
postDrawdownDirectDebitAccounts: faker.lorem.sentence(1),
propertyInsuranceLandRegistryOnFile: faker.lorem.sentence(1),
notes: faker.lorem.sentence(1),
status: faker.lorem.sentence(1),
completedByProfile: completedByProfileIds[i % completedByProfileIds.length],

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
