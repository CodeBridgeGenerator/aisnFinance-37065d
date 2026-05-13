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

import { InputNumber } from 'primereact/inputnumber';
import UploadFilesToS3 from "../../../services/UploadFilesToS3";

const SingleOfferLetterPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    const [dealId, setDealId] = useState([]);
const [clientProfile, setClientProfile] = useState([]);
const [generatedByProfile, setGeneratedByProfile] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("offerLetter")
            .get(urlParams.singleOfferLetterId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"dealId","clientProfile","generatedByProfile"] }})
            .then((res) => {
                set_entity(res || {});
                const dealId = Array.isArray(res.dealId)
            ? res.dealId.map((elem) => ({ _id: elem._id, status: elem.status }))
            : res.dealId
                ? [{ _id: res.dealId._id, status: res.dealId.status }]
                : [];
        setDealId(dealId);
const clientProfile = Array.isArray(res.clientProfile)
            ? res.clientProfile.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.clientProfile
                ? [{ _id: res.clientProfile._id, name: res.clientProfile.name }]
                : [];
        setClientProfile(clientProfile);
const generatedByProfile = Array.isArray(res.generatedByProfile)
            ? res.generatedByProfile.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.generatedByProfile
                ? [{ _id: res.generatedByProfile._id, name: res.generatedByProfile.name }]
                : [];
        setGeneratedByProfile(generatedByProfile);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "OfferLetter", type: "error", message: error.message || "Failed get offerLetter" });
            });
    }, [props,urlParams.singleOfferLetterId]);


    const goBack = () => {
        navigate("/app/offerLetter");
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
                    <h3 className="m-0">Offer Letter</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>offerLetter/{urlParams.singleOfferLetterId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Applicant Name</label><p className="m-0 ml-3" >{_entity?.applicantName}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Reference No</label><p className="m-0 ml-3" >{_entity?.referenceNo}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Validity Days</label><p className="m-0 ml-3" >{Number(_entity?.validityDays)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Security Description</label><p className="m-0 ml-3" >{_entity?.securityDescription}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Estimated Value</label><p className="m-0 ml-3" >{Number(_entity?.estimatedValue)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Purchase Price</label><p className="m-0 ml-3" ><InputNumber id="purchasePrice" value={Number(_entity?.purchasePrice)} mode="currency" currency="MYR" locale="en-US"   disabled={true} /></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Gross Loan Amount</label><p className="m-0 ml-3" >{Number(_entity?.grossLoanAmount)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Max Ltv Percentage</label><p className="m-0 ml-3" >{Number(_entity?.maxLtvPercentage)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Loan Term Months</label><p className="m-0 ml-3" >{Number(_entity?.loanTermMonths)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Arrangement Fee Percentage</label><p className="m-0 ml-3" >{Number(_entity?.arrangementFeePercentage)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Concessionary Interest Rate Monthly</label><p className="m-0 ml-3" >{Number(_entity?.concessionaryInterestRateMonthly)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Standard Interest Rate Monthly</label><p className="m-0 ml-3" >{Number(_entity?.standardInterestRateMonthly)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Monthly Interest Payments Charges</label><p className="m-0 ml-3" >{Number(_entity?.monthlyInterestPaymentsCharges)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Advance Interest Amount</label><p className="m-0 ml-3" >{Number(_entity?.advanceInterestAmount)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Exit Strategy Condition</label><p className="m-0 ml-3" >{_entity?.exitStrategyCondition}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Status</label><p className="m-0 ml-3" >{_entity?.status}</p></div>
<div className="col-12"><label className="text-sm text-gray-600">Generated Pdf Document</label><div className="m-0 ml-3" ><UploadFilesToS3 type={'single'}/></div></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Deal Id</label>
                    {dealId.map((elem) => (
                        <Link key={elem._id} to={`/deals/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.status}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Client Profile</label>
                    {clientProfile.map((elem) => (
                        <Link key={elem._id} to={`/profiles/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Generated By Profile</label>
                    {generatedByProfile.map((elem) => (
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

      


      <CommentsSection
        recordId={urlParams.singleOfferLetterId}
        user={props.user}
        alert={props.alert}
        serviceName="offerLetter"
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

export default connect(mapState, mapDispatch)(SingleOfferLetterPage);
