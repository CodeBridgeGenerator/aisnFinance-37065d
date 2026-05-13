
import { faker } from "@faker-js/faker";
export default (user,count,dealIdIds,reviewedByIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
dealId: dealIdIds[i % dealIdIds.length],
reviewedBy: reviewedByIds[i % reviewedByIds.length],
creditSafeResult: faker.lorem.sentence(1),
creditSafeDate: faker.lorem.sentence(1),
propertyDeskReviewNotes: faker.lorem.sentence(1),
residentialBtlDesktopVal: faker.lorem.sentence(1),
commercialValuationNotes: faker.lorem.sentence(1),
overallFindings: faker.lorem.sentence(1),
recommendation: faker.lorem.sentence(1),
status: faker.lorem.sentence(1),
reviewedAt: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
