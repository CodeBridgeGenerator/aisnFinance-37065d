const leads = require("./leads/leads.service.js");
const clients = require("./clients/clients.service.js");
const deals = require("./deals/deals.service.js");
const dealStageHistory = require("./dealStageHistory/dealStageHistory.service.js");
const commercialApplications = require("./commercialApplications/commercialApplications.service.js");
const mortageDetails = require("./mortageDetails/mortageDetails.service.js");
const personalDetails = require("./personalDetails/personalDetails.service.js");
const businessDetails = require("./businessDetails/businessDetails.service.js");
const securityProperties = require("./securityProperties/securityProperties.service.js");
const assetsLiabilities = require("./assetsLiabilities/assetsLiabilities.service.js");
const dueDiligence = require("./dueDiligence/dueDiligence.service.js");
const fileAdminChecklist = require("./fileAdminChecklist/fileAdminChecklist.service.js");
const annualClientReviews = require("./annualClientReviews/annualClientReviews.service.js");
const offerLetter = require("./offerLetter/offerLetter.service.js");
const ricsValuation = require("./ricsValuation/ricsValuation.service.js");
const directorDecision = require("./directorDecision/directorDecision.service.js");
const creditPaper = require("./creditPaper/creditPaper.service.js");
const faciltyAgreement = require("./faciltyAgreement/faciltyAgreement.service.js");
const legalCooridination = require("./legalCooridination/legalCooridination.service.js");
const completitionStatement = require("./completitionStatement/completitionStatement.service.js");
const dibursement = require("./dibursement/dibursement.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(leads);
  app.configure(clients);
  app.configure(deals);
  app.configure(dealStageHistory);
  app.configure(commercialApplications);
  app.configure(mortageDetails);
  app.configure(personalDetails);
  app.configure(businessDetails);
  app.configure(securityProperties);
  app.configure(assetsLiabilities);
  app.configure(dueDiligence);
  app.configure(fileAdminChecklist);
  app.configure(annualClientReviews);
  app.configure(offerLetter);
  app.configure(ricsValuation);
  app.configure(directorDecision);
  app.configure(creditPaper);
  app.configure(faciltyAgreement);
  app.configure(legalCooridination);
  app.configure(completitionStatement);
  app.configure(dibursement);
    // ~cb-add-configure-service-name~
};
