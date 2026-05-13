
import { faker } from "@faker-js/faker";
export default (user,count,leadIdIds,profileIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
leadId: leadIdIds[i % leadIdIds.length],
profileId: profileIdIds[i % profileIdIds.length],
clientType: faker.lorem.sentence(1),
status: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
