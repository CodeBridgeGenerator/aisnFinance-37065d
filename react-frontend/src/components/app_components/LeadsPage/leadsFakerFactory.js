
import { faker } from "@faker-js/faker";
export default (user,count,userIds,assignedSalespersonIds,assignedAdminIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
user: userIds[i % userIds.length],
name: faker.lorem.sentence(1),
contactNo: faker.lorem.sentence(1),
assignedSalesperson: assignedSalespersonIds[i % assignedSalespersonIds.length],
assignedAdmin: assignedAdminIds[i % assignedAdminIds.length],
status: faker.lorem.sentence(1),
rejectionReason: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
