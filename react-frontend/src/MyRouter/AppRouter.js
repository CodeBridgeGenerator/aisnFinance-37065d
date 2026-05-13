import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';

import SingleLeadsPage from "../components/app_components/LeadsPage/SingleLeadsPage";
import LeadProjectLayoutPage from "../components/app_components/LeadsPage/LeadProjectLayoutPage";
import SingleClientsPage from "../components/app_components/ClientsPage/SingleClientsPage";
import ClientProjectLayoutPage from "../components/app_components/ClientsPage/ClientProjectLayoutPage";
import SingleDealsPage from "../components/app_components/DealsPage/SingleDealsPage";
import DealProjectLayoutPage from "../components/app_components/DealsPage/DealProjectLayoutPage";
import SingleDealStageHistoryPage from "../components/app_components/DealStageHistoryPage/SingleDealStageHistoryPage";
import DealStageHistoryProjectLayoutPage from "../components/app_components/DealStageHistoryPage/DealStageHistoryProjectLayoutPage";
import SingleCommercialApplicationsPage from "../components/app_components/CommercialApplicationsPage/SingleCommercialApplicationsPage";
import CommercialApplicationProjectLayoutPage from "../components/app_components/CommercialApplicationsPage/CommercialApplicationProjectLayoutPage";
import SingleMortageDetailsPage from "../components/app_components/MortageDetailsPage/SingleMortageDetailsPage";
import MortageDetailProjectLayoutPage from "../components/app_components/MortageDetailsPage/MortageDetailProjectLayoutPage";
import SinglePersonalDetailsPage from "../components/app_components/PersonalDetailsPage/SinglePersonalDetailsPage";
import PersonalDetailProjectLayoutPage from "../components/app_components/PersonalDetailsPage/PersonalDetailProjectLayoutPage";
import SingleBusinessDetailsPage from "../components/app_components/BusinessDetailsPage/SingleBusinessDetailsPage";
import BusinessDetailProjectLayoutPage from "../components/app_components/BusinessDetailsPage/BusinessDetailProjectLayoutPage";
import SingleSecurityPropertiesPage from "../components/app_components/SecurityPropertiesPage/SingleSecurityPropertiesPage";
import SecurityPropertyProjectLayoutPage from "../components/app_components/SecurityPropertiesPage/SecurityPropertyProjectLayoutPage";
import SingleAssetsLiabilitiesPage from "../components/app_components/AssetsLiabilitiesPage/SingleAssetsLiabilitiesPage";
import AssetsLiabilityProjectLayoutPage from "../components/app_components/AssetsLiabilitiesPage/AssetsLiabilityProjectLayoutPage";
import SingleDueDiligencePage from "../components/app_components/DueDiligencePage/SingleDueDiligencePage";
import DueDiligenceProjectLayoutPage from "../components/app_components/DueDiligencePage/DueDiligenceProjectLayoutPage";
import SingleFileAdminChecklistPage from "../components/app_components/FileAdminChecklistPage/SingleFileAdminChecklistPage";
import FileAdminChecklistProjectLayoutPage from "../components/app_components/FileAdminChecklistPage/FileAdminChecklistProjectLayoutPage";
import SingleAnnualClientReviewsPage from "../components/app_components/AnnualClientReviewsPage/SingleAnnualClientReviewsPage";
import AnnualClientReviewProjectLayoutPage from "../components/app_components/AnnualClientReviewsPage/AnnualClientReviewProjectLayoutPage";
import SingleOfferLetterPage from "../components/app_components/OfferLetterPage/SingleOfferLetterPage";
import OfferLetterProjectLayoutPage from "../components/app_components/OfferLetterPage/OfferLetterProjectLayoutPage";
import SingleRicsValuationPage from "../components/app_components/RicsValuationPage/SingleRicsValuationPage";
import RicsValuationProjectLayoutPage from "../components/app_components/RicsValuationPage/RicsValuationProjectLayoutPage";
import SingleDirectorDecisionPage from "../components/app_components/DirectorDecisionPage/SingleDirectorDecisionPage";
import DirectorDecisionProjectLayoutPage from "../components/app_components/DirectorDecisionPage/DirectorDecisionProjectLayoutPage";
import SingleCreditPaperPage from "../components/app_components/CreditPaperPage/SingleCreditPaperPage";
import CreditPaperProjectLayoutPage from "../components/app_components/CreditPaperPage/CreditPaperProjectLayoutPage";
import SingleFaciltyAgreementPage from "../components/app_components/FaciltyAgreementPage/SingleFaciltyAgreementPage";
import FaciltyAgreementProjectLayoutPage from "../components/app_components/FaciltyAgreementPage/FaciltyAgreementProjectLayoutPage";
import SingleLegalCooridinationPage from "../components/app_components/LegalCooridinationPage/SingleLegalCooridinationPage";
import LegalCooridinationProjectLayoutPage from "../components/app_components/LegalCooridinationPage/LegalCooridinationProjectLayoutPage";
import SingleCompletitionStatementPage from "../components/app_components/CompletitionStatementPage/SingleCompletitionStatementPage";
import CompletitionStatementProjectLayoutPage from "../components/app_components/CompletitionStatementPage/CompletitionStatementProjectLayoutPage";
import SingleDibursementPage from "../components/app_components/DibursementPage/SingleDibursementPage";
import DibursementProjectLayoutPage from "../components/app_components/DibursementPage/DibursementProjectLayoutPage";
//  ~cb-add-import~

const AppRouter = () => {
    return (
        <Routes>
            {/* ~cb-add-unprotected-route~ */}
<Route path="/leads/:singleLeadsId" exact element={<SingleLeadsPage />} />
<Route path="/leads" exact element={<LeadProjectLayoutPage />} />
<Route path="/clients/:singleClientsId" exact element={<SingleClientsPage />} />
<Route path="/clients" exact element={<ClientProjectLayoutPage />} />
<Route path="/deals/:singleDealsId" exact element={<SingleDealsPage />} />
<Route path="/deals" exact element={<DealProjectLayoutPage />} />
<Route path="/dealStageHistory/:singleDealStageHistoryId" exact element={<SingleDealStageHistoryPage />} />
<Route path="/dealStageHistory" exact element={<DealStageHistoryProjectLayoutPage />} />
<Route path="/commercialApplications/:singleCommercialApplicationsId" exact element={<SingleCommercialApplicationsPage />} />
<Route path="/commercialApplications" exact element={<CommercialApplicationProjectLayoutPage />} />
<Route path="/mortageDetails/:singleMortageDetailsId" exact element={<SingleMortageDetailsPage />} />
<Route path="/mortageDetails" exact element={<MortageDetailProjectLayoutPage />} />
<Route path="/personalDetails/:singlePersonalDetailsId" exact element={<SinglePersonalDetailsPage />} />
<Route path="/personalDetails" exact element={<PersonalDetailProjectLayoutPage />} />
<Route path="/businessDetails/:singleBusinessDetailsId" exact element={<SingleBusinessDetailsPage />} />
<Route path="/businessDetails" exact element={<BusinessDetailProjectLayoutPage />} />
<Route path="/securityProperties/:singleSecurityPropertiesId" exact element={<SingleSecurityPropertiesPage />} />
<Route path="/securityProperties" exact element={<SecurityPropertyProjectLayoutPage />} />
<Route path="/assetsLiabilities/:singleAssetsLiabilitiesId" exact element={<SingleAssetsLiabilitiesPage />} />
<Route path="/assetsLiabilities" exact element={<AssetsLiabilityProjectLayoutPage />} />
<Route path="/dueDiligence/:singleDueDiligenceId" exact element={<SingleDueDiligencePage />} />
<Route path="/dueDiligence" exact element={<DueDiligenceProjectLayoutPage />} />
<Route path="/fileAdminChecklist/:singleFileAdminChecklistId" exact element={<SingleFileAdminChecklistPage />} />
<Route path="/fileAdminChecklist" exact element={<FileAdminChecklistProjectLayoutPage />} />
<Route path="/annualClientReviews/:singleAnnualClientReviewsId" exact element={<SingleAnnualClientReviewsPage />} />
<Route path="/annualClientReviews" exact element={<AnnualClientReviewProjectLayoutPage />} />
<Route path="/offerLetter/:singleOfferLetterId" exact element={<SingleOfferLetterPage />} />
<Route path="/offerLetter" exact element={<OfferLetterProjectLayoutPage />} />
<Route path="/ricsValuation/:singleRicsValuationId" exact element={<SingleRicsValuationPage />} />
<Route path="/ricsValuation" exact element={<RicsValuationProjectLayoutPage />} />
<Route path="/directorDecision/:singleDirectorDecisionId" exact element={<SingleDirectorDecisionPage />} />
<Route path="/directorDecision" exact element={<DirectorDecisionProjectLayoutPage />} />
<Route path="/creditPaper/:singleCreditPaperId" exact element={<SingleCreditPaperPage />} />
<Route path="/creditPaper" exact element={<CreditPaperProjectLayoutPage />} />
<Route path="/faciltyAgreement/:singleFaciltyAgreementId" exact element={<SingleFaciltyAgreementPage />} />
<Route path="/faciltyAgreement" exact element={<FaciltyAgreementProjectLayoutPage />} />
<Route path="/legalCooridination/:singleLegalCooridinationId" exact element={<SingleLegalCooridinationPage />} />
<Route path="/legalCooridination" exact element={<LegalCooridinationProjectLayoutPage />} />
<Route path="/completitionStatement/:singleCompletitionStatementId" exact element={<SingleCompletitionStatementPage />} />
<Route path="/completitionStatement" exact element={<CompletitionStatementProjectLayoutPage />} />
<Route path="/dibursement/:singleDibursementId" exact element={<SingleDibursementPage />} />
<Route path="/dibursement" exact element={<DibursementProjectLayoutPage />} />
            <Route element={<ProtectedRoute redirectPath={'/login'} />}>{/* ~cb-add-protected-route~ */}</Route>
        </Routes>
    );
};

const mapState = (state) => {
    const { isLoggedIn } = state.auth;
    return { isLoggedIn };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data)
});

export default connect(mapState, mapDispatch)(AppRouter);
