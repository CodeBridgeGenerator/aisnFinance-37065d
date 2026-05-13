
import { faker } from "@faker-js/faker";
export default (user,count,clientIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
clientId: clientIdIds[i % clientIdIds.length],
status: faker.lorem.sentence(1),
phase: faker.lorem.sentence(1),
approvedAt: faker.lorem.sentence(1),
rejectedAt: faker.lorem.sentence(1),
rejectionReason: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
