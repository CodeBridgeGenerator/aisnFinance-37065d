
import { faker } from "@faker-js/faker";
export default (user,count,applicationIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
applicationId: applicationIdIds[i % applicationIdIds.length],
customerName: faker.lorem.sentence(1),
date: faker.lorem.sentence(1),
incomeSelfMonthly: faker.lorem.sentence(1),
incomePartnerMonthly: faker.lorem.sentence(1),
incomeOtherMonthly: faker.lorem.sentence(1),
totalMonthlyIncome: faker.lorem.sentence(1),
expenditureMortgageRent: faker.lorem.sentence(1),
expenditureLifeAssurance: faker.lorem.sentence(1),
expenditureCouncilTax: faker.lorem.sentence(1),
expenditureUtilities: faker.lorem.sentence(1),
expenditureInsurance: faker.lorem.sentence(1),
expenditureTravel: faker.lorem.sentence(1),
expenditurePetrol: faker.lorem.sentence(1),
expenditureCarInsurance: faker.lorem.sentence(1),
expenditureFoodClothing: faker.lorem.sentence(1),
expenditureExistingBorrowings: faker.lorem.sentence(1),
expenditureOtherLoans: faker.lorem.sentence(1),
expenditureEntertainment: faker.lorem.sentence(1),
expenditureOther: faker.lorem.sentence(1),
totalMonthlyExpenditure: faker.lorem.sentence(1),
monthlyDisposableIncome: faker.lorem.sentence(1),
assetCash: faker.lorem.sentence(1),
assetShares: faker.lorem.sentence(1),
assetLifePolicy: faker.lorem.sentence(1),
assetDwellingHouse: faker.lorem.sentence(1),
assetOtherProperty1: faker.lorem.sentence(1),
assetOtherProperty2: faker.lorem.sentence(1),
assetOtherInvestments: faker.lorem.sentence(1),
totalAssets: faker.lorem.sentence(1),
liabilityOverdraft: faker.lorem.sentence(1),
liabilityMortgage: faker.lorem.sentence(1),
liabilityCarLoan: faker.lorem.sentence(1),
liabilityPersonalLoan1: faker.lorem.sentence(1),
liabilityPersonalLoan2: faker.lorem.sentence(1),
liabilityPersonalLoan3: faker.lorem.sentence(1),
liabilityCreditCard1: faker.lorem.sentence(1),
liabilityCreditCard2: faker.lorem.sentence(1),
liabilityCreditCard3: faker.lorem.sentence(1),
liabilityPersonalTax: faker.lorem.sentence(1),
liabilityPersonalGuarantees: faker.lorem.sentence(1),
liabilityOther: faker.lorem.sentence(1),
totalLiabilities: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
