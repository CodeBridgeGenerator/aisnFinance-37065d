
import { faker } from "@faker-js/faker";
export default (user,count,dealIdIds,directorUserIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
dealId: dealIdIds[i % dealIdIds.length],
grossLoanAmount: faker.lorem.sentence(""),
totalDeductions: faker.lorem.sentence(""),
netAmountTransferred: faker.lorem.sentence(""),
directorAapprovedAt: faker.lorem.sentence(""),
directorUserId: directorUserIdIds[i % directorUserIdIds.length],
fundsTransferredAt: faker.lorem.sentence(""),
solicitorReceivedAt: faker.lorem.sentence(""),
clientSolicitorReceivedAt: faker.lorem.sentence(""),
clientProgressNotifiedAt: faker.lorem.sentence(""),
status: faker.lorem.sentence(""),
notes: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
