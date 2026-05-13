
import { faker } from "@faker-js/faker";
export default (user,count,dealIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
dealId: dealIdIds[i % dealIdIds.length],
fromStage: faker.lorem.sentence(1),
toStage: faker.lorem.sentence(1),
changedAt: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
