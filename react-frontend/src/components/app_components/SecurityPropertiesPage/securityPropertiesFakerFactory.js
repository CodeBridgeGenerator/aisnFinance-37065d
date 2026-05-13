
import { faker } from "@faker-js/faker";
export default (user,count,applicationIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
applicationId: applicationIdIds[i % applicationIdIds.length],
propertyType: faker.lorem.sentence(1),
address: faker.lorem.sentence(1),
postcode: faker.lorem.sentence(1),
description: faker.lorem.sentence(1),
tenure: faker.lorem.sentence(1),
vacantPossessionOnCompletion: faker.lorem.sentence(1),
leaseholdUnexpiredTermYears: faker.lorem.sentence(1),
leaseholdUnexpiredTermMonths: faker.lorem.sentence(1),
leaseholdGroundRentPerAnnum: faker.lorem.sentence(1),
lettingRentalIncomePerAnnum: faker.lorem.sentence(1),
lettingRentReviewDate: faker.lorem.sentence(1),
valuationContactName: faker.lorem.sentence(1),
valuationContactPhoneNo: faker.lorem.sentence(1),
valuationContactEmail: faker.lorem.sentence(1),
purchasePrice: faker.lorem.sentence(1),
purchaseCurrentValue: faker.lorem.sentence(1),
purchaseDeposit: faker.lorem.sentence(1),
purchaseDepositSources: faker.lorem.sentence(1),
purchaseOtherDepositSource: faker.lorem.sentence(1),
purchaseRepaymentDetails: faker.lorem.sentence(1),
ownedPropertyAcquiredDate: faker.lorem.sentence(1),
ownedPropertyPurchasePrice: faker.lorem.sentence(1),
ownedPropertyMostRecentValuation: faker.lorem.sentence(1),
ownedPropertyValuationDate: faker.lorem.sentence(1),
ownedPropertyOutstandingMortgage: faker.lorem.sentence(1),
ownedPropertyCurrentLenderName: faker.lorem.sentence(1),
ownedPropertycurrentLenderAddress: faker.lorem.sentence(1),
ownedPropertymortgageAccountNumber: faker.lorem.sentence(1),
ownedPropertyhasOtherCharges: faker.lorem.sentence(1),
ownedPropertyotherChargesDetails: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
