
import { faker } from "@faker-js/faker";
export default (user,count,dealIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
dealId: dealIdIds[i % dealIdIds.length],
aisnSolicitorFirm: faker.lorem.sentence(1),
aisnSolicitorContact: faker.lorem.sentence(1),
aisnSolicitorPhone: faker.lorem.sentence(1),
aisnSolicitorEmail: faker.lorem.sentence(1),
clientSolicitorFirm: faker.lorem.sentence(1),
clientSolicitorContact: faker.lorem.sentence(1),
clientSolicitorPhone: faker.lorem.sentence(1),
clientSolicitorEmail: faker.lorem.sentence(1),
docsSentToSolicitorAt: faker.lorem.sentence(1),
docsSentChecklist: faker.lorem.sentence(1),
securityDocsPreparedAt: faker.lorem.sentence(1),
expectedCompletionDate: faker.lorem.sentence(1),
actualCompletionDate: faker.lorem.sentence(1),
completionTimelineNotes: faker.lorem.sentence(1),
status: faker.lorem.sentence(1),
clientNotifiedAt: faker.lorem.sentence(1),
notificationTemplateUsed: faker.lorem.sentence(1),
notes: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
