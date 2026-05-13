import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";
import { SplitButton } from "primereact/splitbutton";
import client from "../../../services/restClient";
import CommentsSection from "../../common/CommentsSection";
import ProjectLayout from "../../Layouts/ProjectLayout";

import DealStageHistoryPage from "../DealStageHistoryPage/DealStageHistoryPage";
import CommercialApplicationsPage from "../CommercialApplicationsPage/CommercialApplicationsPage";
import DueDiligencePage from "../DueDiligencePage/DueDiligencePage";
import FileAdminChecklistPage from "../FileAdminChecklistPage/FileAdminChecklistPage";
import AnnualClientReviewsPage from "../AnnualClientReviewsPage/AnnualClientReviewsPage";
import OfferLetterPage from "../OfferLetterPage/OfferLetterPage";
import RicsValuationPage from "../RicsValuationPage/RicsValuationPage";
import CreditPaperPage from "../CreditPaperPage/CreditPaperPage";
import FaciltyAgreementPage from "../FaciltyAgreementPage/FaciltyAgreementPage";
import LegalCooridinationPage from "../LegalCooridinationPage/LegalCooridinationPage";
import CompletitionStatementPage from "../CompletitionStatementPage/CompletitionStatementPage";
import DibursementPage from "../DibursementPage/DibursementPage";
import { Calendar } from 'primereact/calendar';

const SingleDealsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    const [clientId, setClientId] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("deals")
            .get(urlParams.singleDealsId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"clientId"] }})
            .then((res) => {
                set_entity(res || {});
                const clientId = Array.isArray(res.clientId)
            ? res.clientId.map((elem) => ({ _id: elem._id, clientType: elem.clientType }))
            : res.clientId
                ? [{ _id: res.clientId._id, clientType: res.clientId.clientType }]
                : [];
        setClientId(clientId);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Deals", type: "error", message: error.message || "Failed get deals" });
            });
    }, [props,urlParams.singleDealsId]);


    const goBack = () => {
        navigate("/app/deals");
    };

      const toggleHelpSidebar = () => {
    setHelpSidebarVisible(!isHelpSidebarVisible);
  };

  const copyPageLink = () => {
    const currentUrl = window.location.href;

    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        props.alert({
          title: "Link Copied",
          type: "success",
          message: "Page link copied to clipboard!",
        });
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
        props.alert({
          title: "Error",
          type: "error",
          message: "Failed to copy page link.",
        });
      });
  };

    const menuItems = [
        {
            label: "Copy link",
            icon: "pi pi-copy",
            command: () => copyPageLink(),
        },
        {
            label: "Help",
            icon: "pi pi-question-circle",
            command: () => toggleHelpSidebar(),
        },
    ];

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-12">
                <div className="flex align-items-center justify-content-between">
                <div className="flex align-items-center">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Deals</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>deals/{urlParams.singleDealsId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Status</label><p className="m-0 ml-3" >{_entity?.status}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Phase</label><p className="m-0 ml-3" >{_entity?.phase}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Approved At</label><p className="m-0 ml-3" ><Calendar id="approvedAt" value={new Date(_entity?.approvedAt)} disabled={true} hourFormat="12"   /></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Rejected At</label><p className="m-0 ml-3" ><Calendar id="rejectedAt" value={new Date(_entity?.rejectedAt)} disabled={true} hourFormat="12"   /></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Rejection Reason</label><p className="m-0 ml-3" >{_entity?.rejectionReason}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Client Id</label>
                    {clientId.map((elem) => (
                        <Link key={elem._id} to={`/clients/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.clientType}</p>
                            </div>
                        </Link>
                    ))}</div>

                    <div className="col-12">&nbsp;</div>
                </div>
            </div>
         </div>

      
    <div className="col-12 mt-2">
        <TabView>
        
                    <TabPanel header="Deal Stage History" leftIcon="pi pi-building-columns mr-2">
                        <DealStageHistoryPage/>
                    </TabPanel>
                    

                    <TabPanel header="Commercial Applications" leftIcon="pi pi-building-columns mr-2">
                        <CommercialApplicationsPage/>
                    </TabPanel>
                    

                    <TabPanel header="Due Diligence" leftIcon="pi pi-building-columns mr-2">
                        <DueDiligencePage/>
                    </TabPanel>
                    

                    <TabPanel header="File Admin Checklist" leftIcon="pi pi-building-columns mr-2">
                        <FileAdminChecklistPage/>
                    </TabPanel>
                    

                    <TabPanel header="Annual Client Reviews" leftIcon="pi pi-building-columns mr-2">
                        <AnnualClientReviewsPage/>
                    </TabPanel>
                    

                    <TabPanel header="Offer Letter" leftIcon="pi pi-building-columns mr-2">
                        <OfferLetterPage/>
                    </TabPanel>
                    

                    <TabPanel header="Rics Valuation" leftIcon="pi pi-building-columns mr-2">
                        <RicsValuationPage/>
                    </TabPanel>
                    

                    <TabPanel header="Credit Paper" leftIcon="pi pi-building-columns mr-2">
                        <CreditPaperPage/>
                    </TabPanel>
                    

                    <TabPanel header="Facilty Agreement" leftIcon="pi pi-building-columns mr-2">
                        <FaciltyAgreementPage/>
                    </TabPanel>
                    

                    <TabPanel header="Legal Cooridination" leftIcon="pi pi-building-columns mr-2">
                        <LegalCooridinationPage/>
                    </TabPanel>
                    

                    <TabPanel header="Completition Statement" leftIcon="pi pi-building-columns mr-2">
                        <CompletitionStatementPage/>
                    </TabPanel>
                    

                    <TabPanel header="Dibursement" leftIcon="pi pi-building-columns mr-2">
                        <DibursementPage/>
                    </TabPanel>
                    
        </TabView>
    </div>


      <CommentsSection
        recordId={urlParams.singleDealsId}
        user={props.user}
        alert={props.alert}
        serviceName="deals"
      />
      <div
        id="rightsidebar"
        className={classNames("overlay-auto z-1 surface-overlay shadow-2 absolute right-0 w-20rem animation-duration-150 animation-ease-in-out", { "hidden" : !isHelpSidebarVisible })}
        style={{ top: "60px", height: "calc(100% - 60px)" }}
      >
        <div className="flex flex-column h-full p-4">
          <span className="text-xl font-medium text-900 mb-3">Help bar</span>
          <div className="border-2 border-dashed surface-border border-round surface-section flex-auto"></div>
        </div>
      </div>
      </div>
        </ProjectLayout>
    );
};

const mapState = (state) => {
    const { user, isLoggedIn } = state.auth;
    return { user, isLoggedIn };
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(SingleDealsPage);
