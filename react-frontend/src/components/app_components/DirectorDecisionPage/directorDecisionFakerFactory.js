
import { faker } from "@faker-js/faker";
export default (user,count,creditpaperIdIds,directorProfileIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
creditpaperId: creditpaperIdIds[i % creditpaperIdIds.length],
directorProfileId: directorProfileIdIds[i % directorProfileIdIds.length],
recommendationText: faker.lorem.sentence(1),
decision: faker.lorem.sentence(1),
comments: faker.lorem.sentence(1),
signedAt: faker.lorem.sentence(1),
decidedAt: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
