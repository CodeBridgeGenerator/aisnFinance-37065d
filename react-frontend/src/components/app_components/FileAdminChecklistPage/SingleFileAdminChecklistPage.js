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


const SingleFileAdminChecklistPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    const [deal, setDeal] = useState([]);
const [checkedBy, setCheckedBy] = useState([]);
const [applicationForm, setApplicationForm] = useState([]);
const [completedByProfile, setCompletedByProfile] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("fileAdminChecklist")
            .get(urlParams.singleFileAdminChecklistId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"deal","checkedBy","applicationForm","completedByProfile"] }})
            .then((res) => {
                set_entity(res || {});
                const deal = Array.isArray(res.deal)
            ? res.deal.map((elem) => ({ _id: elem._id, status: elem.status }))
            : res.deal
                ? [{ _id: res.deal._id, status: res.deal.status }]
                : [];
        setDeal(deal);
const checkedBy = Array.isArray(res.checkedBy)
            ? res.checkedBy.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.checkedBy
                ? [{ _id: res.checkedBy._id, name: res.checkedBy.name }]
                : [];
        setCheckedBy(checkedBy);
const applicationForm = Array.isArray(res.applicationForm)
            ? res.applicationForm.map((elem) => ({ _id: elem._id, status: elem.status }))
            : res.applicationForm
                ? [{ _id: res.applicationForm._id, status: res.applicationForm.status }]
                : [];
        setApplicationForm(applicationForm);
const completedByProfile = Array.isArray(res.completedByProfile)
            ? res.completedByProfile.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.completedByProfile
                ? [{ _id: res.completedByProfile._id, name: res.completedByProfile.name }]
                : [];
        setCompletedByProfile(completedByProfile);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "FileAdminChecklist", type: "error", message: error.message || "Failed get fileAdminChecklist" });
            });
    }, [props,urlParams.singleFileAdminChecklistId]);


    const goBack = () => {
        navigate("/app/fileAdminChecklist");
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
                    <h3 className="m-0">File Admin Checklist</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>fileAdminChecklist/{urlParams.singleFileAdminChecklistId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Adviser Name</label><p className="m-0 ml-3" >{_entity?.adviserName}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Client Names</label><p className="m-0 ml-3" >{_entity?.clientNames}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Provider Name</label><p className="m-0 ml-3" >{_entity?.providerName}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Lender Name</label><p className="m-0 ml-3" >{_entity?.lenderName}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Product Name</label><p className="m-0 ml-3" >{_entity?.productName}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Application Form Date</label><p className="m-0 ml-3" >{Number(_entity?.applicationFormDate)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Identification Proof</label><p className="m-0" ><i id="identificationProof" className={`pi ${_entity?.identificationProof?"pi-check": "pi-times"}`}  ></i></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Identification Proof Date</label><p className="m-0 ml-3" >{Number(_entity?.identificationProofDate)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Factfind Kyc</label><p className="m-0" ><i id="factfindKyc" className={`pi ${_entity?.factfindKyc?"pi-check": "pi-times"}`}  ></i></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Factfind Kyc Date</label><p className="m-0 ml-3" >{Number(_entity?.factfindKycDate)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Loan Memorandum Prepared On File</label><p className="m-0" ><i id="loanMemorandumPreparedOnFile" className={`pi ${_entity?.loanMemorandumPreparedOnFile?"pi-check": "pi-times"}`}  ></i></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Board Sign Off</label><p className="m-0" ><i id="boardSignOff" className={`pi ${_entity?.boardSignOff?"pi-check": "pi-times"}`}  ></i></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Offer Letter Prepared Sent</label><p className="m-0" ><i id="offerLetterPreparedSent" className={`pi ${_entity?.offerLetterPreparedSent?"pi-check": "pi-times"}`}  ></i></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Offer Letter Prepared</label><p className="m-0 ml-3" >{Number(_entity?.offerLetterPrepared)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Facility Letter Prepared Checked</label><p className="m-0" ><i id="facilityLetterPreparedChecked" className={`pi ${_entity?.facilityLetterPreparedChecked?"pi-check": "pi-times"}`}  ></i></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Valuations Instructed</label><p className="m-0" ><i id="valuationsInstructed" className={`pi ${_entity?.valuationsInstructed?"pi-check": "pi-times"}`}  ></i></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Valuations Instructed Date</label><p className="m-0 ml-3" >{Number(_entity?.valuationsInstructedDate)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Solicitor Instructed</label><p className="m-0" ><i id="solicitorInstructed" className={`pi ${_entity?.solicitorInstructed?"pi-check": "pi-times"}`}  ></i></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Loan Drawn Down</label><p className="m-0" ><i id="loanDrawnDown" className={`pi ${_entity?.loanDrawnDown?"pi-check": "pi-times"}`}  ></i></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Post Drawdown Direct Debit Accounts</label><p className="m-0" ><i id="postDrawdownDirectDebitAccounts" className={`pi ${_entity?.postDrawdownDirectDebitAccounts?"pi-check": "pi-times"}`}  ></i></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Property Insurance Land Registry On File</label><p className="m-0" ><i id="propertyInsuranceLandRegistryOnFile" className={`pi ${_entity?.propertyInsuranceLandRegistryOnFile?"pi-check": "pi-times"}`}  ></i></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Notes</label><p className="m-0 ml-3" >{_entity?.notes}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Status</label><p className="m-0 ml-3" >{_entity?.status}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Deal</label>
                    {deal.map((elem) => (
                        <Link key={elem._id} to={`/deals/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.status}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Checked By</label>
                    {checkedBy.map((elem) => (
                        <Link key={elem._id} to={`/profiles/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Application Form</label>
                    {applicationForm.map((elem) => (
                        <Link key={elem._id} to={`/commercialApplications/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.status}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Completed By Profile</label>
                    {completedByProfile.map((elem) => (
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
        recordId={urlParams.singleFileAdminChecklistId}
        user={props.user}
        alert={props.alert}
        serviceName="fileAdminChecklist"
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

export default connect(mapState, mapDispatch)(SingleFileAdminChecklistPage);
