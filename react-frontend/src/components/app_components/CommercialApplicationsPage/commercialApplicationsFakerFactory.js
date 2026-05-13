
import { faker } from "@faker-js/faker";
export default (user,count,dealIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
dealId: dealIdIds[i % dealIdIds.length],
status: faker.lorem.sentence(1),
contactByTelephone: faker.lorem.sentence(1),
contactByPost: faker.lorem.sentence(1),
contactByElectronicMedia: faker.lorem.sentence(1),
contactForMarketResearch: faker.lorem.sentence(1),
applicationDocuments: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
