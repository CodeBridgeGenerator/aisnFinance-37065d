
import { faker } from "@faker-js/faker";
export default (user,count,dealIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
dealId: dealIdIds[i % dealIdIds.length],
instructionDate: faker.lorem.sentence(1),
surveyorName: faker.lorem.sentence(1),
surveyorCompany: faker.lorem.sentence(1),
surveyorEmail: faker.lorem.sentence(1),
surveyorPhone: faker.lorem.sentence(1),
inspectionDate: faker.lorem.sentence(1),
valuationCost: faker.lorem.sentence(1),
vatAmount: faker.lorem.sentence(1),
propertyAddress: faker.lorem.sentence(1),
estimatedValue: faker.lorem.sentence(1),
propertyDescription: faker.lorem.sentence(1),
propertyType: faker.lorem.sentence(1),
applicantName: faker.lorem.sentence(1),
accessArrangedThrough: faker.lorem.sentence(1),
invoiceEmail: faker.lorem.sentence(1),
status: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
