
import { faker } from "@faker-js/faker";
export default (user,count,dealIdIds,preparedByIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
dealId: dealIdIds[i % dealIdIds.length],
preparedBy: preparedByIds[i % preparedByIds.length],
borrowerName: faker.lorem.sentence(1),
loanAmount: faker.lorem.sentence(1),
loanPurpose: faker.lorem.sentence(1),
propertyAddress: faker.lorem.sentence(1),
purchasePrice: faker.lorem.sentence(1),
ltvPercentage: faker.lorem.sentence(1),
repaymentTermRequested: faker.lorem.sentence(1),
standardInterestRate: faker.lorem.sentence(1),
executiveSummaryRecommendation: faker.lorem.sentence(1),
borrowerDob: faker.lorem.sentence(1),
employmentIncomeAfterTax: faker.lorem.sentence(1),
totalDeclaredIncome: faker.lorem.sentence(1),
existingMortgageOutstanding: faker.lorem.sentence(1),
monthlyMortgagePayment: faker.lorem.sentence(1),
primaryResidenceValue: faker.lorem.sentence(1),
creditProfileSummary: faker.lorem.sentence(1),
propertyType: faker.lorem.sentence(1),
estimatedPropertyValue: faker.lorem.sentence(1),
exitStrategySummary: faker.lorem.sentence(1),
preparedBy: preparedByIds[i % preparedByIds.length],
preparedDate: faker.lorem.sentence(1),
status: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
