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

import DirectorDecisionPage from "../DirectorDecisionPage/DirectorDecisionPage";
import { InputNumber } from 'primereact/inputnumber';

const SingleCreditPaperPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    const [dealId, setDealId] = useState([]);
const [preparedBy, setPreparedBy] = useState([]);
const [preparedBy, setPreparedBy] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("creditPaper")
            .get(urlParams.singleCreditPaperId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"dealId","preparedBy","preparedBy"] }})
            .then((res) => {
                set_entity(res || {});
                const dealId = Array.isArray(res.dealId)
            ? res.dealId.map((elem) => ({ _id: elem._id, status: elem.status }))
            : res.dealId
                ? [{ _id: res.dealId._id, status: res.dealId.status }]
                : [];
        setDealId(dealId);
const preparedBy = Array.isArray(res.preparedBy)
            ? res.preparedBy.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.preparedBy
                ? [{ _id: res.preparedBy._id, name: res.preparedBy.name }]
                : [];
        setPreparedBy(preparedBy);
const preparedBy = Array.isArray(res.preparedBy)
            ? res.preparedBy.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.preparedBy
                ? [{ _id: res.preparedBy._id, name: res.preparedBy.name }]
                : [];
        setPreparedBy(preparedBy);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "CreditPaper", type: "error", message: error.message || "Failed get creditPaper" });
            });
    }, [props,urlParams.singleCreditPaperId]);


    const goBack = () => {
        navigate("/app/creditPaper");
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
                    <h3 className="m-0">Credit Paper</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>creditPaper/{urlParams.singleCreditPaperId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Borrower Name</label><p className="m-0 ml-3" >{_entity?.borrowerName}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Loan Amount</label><p className="m-0 ml-3" ><InputNumber id="loanAmount" value={Number(_entity?.loanAmount)} mode="currency" currency="MYR" locale="en-US"   disabled={true} /></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Loan Purpose</label><p className="m-0 ml-3" >{_entity?.loanPurpose}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Property Address</label><p className="m-0 ml-3" >{_entity?.propertyAddress}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Purchase Price</label><p className="m-0 ml-3" ><InputNumber id="purchasePrice" value={Number(_entity?.purchasePrice)} mode="currency" currency="MYR" locale="en-US"   disabled={true} /></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Ltv Percentage</label><p className="m-0 ml-3" >{Number(_entity?.ltvPercentage)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Repayment Term Requested</label><p className="m-0 ml-3" >{Number(_entity?.repaymentTermRequested)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Standard Interest Rate</label><p className="m-0 ml-3" >{Number(_entity?.standardInterestRate)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Executive Summary Recommendation</label><p className="m-0 ml-3" >{_entity?.executiveSummaryRecommendation}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Employment Income After Tax</label><p className="m-0 ml-3" >{Number(_entity?.employmentIncomeAfterTax)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Total Declared Income</label><p className="m-0 ml-3" >{Number(_entity?.totalDeclaredIncome)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Existing Mortgage Outstanding</label><p className="m-0 ml-3" >{Number(_entity?.existingMortgageOutstanding)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Monthly Mortgage Payment</label><p className="m-0 ml-3" >{Number(_entity?.monthlyMortgagePayment)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Primary Residence Value</label><p className="m-0 ml-3" >{Number(_entity?.primaryResidenceValue)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Credit Profile Summary</label><p className="m-0 ml-3" >{_entity?.creditProfileSummary}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Property Type</label><p className="m-0 ml-3" >{_entity?.propertyType}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Estimated Property Value</label><p className="m-0 ml-3" >{Number(_entity?.estimatedPropertyValue)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Exit Strategy Summary</label><p className="m-0 ml-3" >{_entity?.exitStrategySummary}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Status</label><p className="m-0 ml-3" >{_entity?.status}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Deal Id</label>
                    {dealId.map((elem) => (
                        <Link key={elem._id} to={`/deals/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.status}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Prepared By</label>
                    {preparedBy.map((elem) => (
                        <Link key={elem._id} to={`/profiles/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Prepared By</label>
                    {preparedBy.map((elem) => (
                        <Link key={elem._id} to={`/profiles/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>

                    <div className="col-12">&nbsp;</div>
                </div>
            </div>
         </div>

      
    <div className="col-12 mt-2">
        <TabView>
        
                    <TabPanel header="Director Decision" leftIcon="pi pi-building-columns mr-2">
                        <DirectorDecisionPage/>
                    </TabPanel>
                    
        </TabView>
    </div>


      <CommentsSection
        recordId={urlParams.singleCreditPaperId}
        user={props.user}
        alert={props.alert}
        serviceName="creditPaper"
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

export default connect(mapState, mapDispatch)(SingleCreditPaperPage);
