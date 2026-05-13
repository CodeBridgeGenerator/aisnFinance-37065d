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


const SingleBusinessDetailsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    const [applicationId, setApplicationId] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("businessDetails")
            .get(urlParams.singleBusinessDetailsId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"applicationId"] }})
            .then((res) => {
                set_entity(res || {});
                const applicationId = Array.isArray(res.applicationId)
            ? res.applicationId.map((elem) => ({ _id: elem._id, status: elem.status }))
            : res.applicationId
                ? [{ _id: res.applicationId._id, status: res.applicationId.status }]
                : [];
        setApplicationId(applicationId);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "BusinessDetails", type: "error", message: error.message || "Failed get businessDetails" });
            });
    }, [props,urlParams.singleBusinessDetailsId]);


    const goBack = () => {
        navigate("/app/businessDetails");
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
                    <h3 className="m-0">Business Details</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>businessDetails/{urlParams.singleBusinessDetailsId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Trading Name</label><p className="m-0 ml-3" >{_entity?.tradingName}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Registered Name</label><p className="m-0 ml-3" >{_entity?.registeredName}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Nature Of Business</label><p className="m-0 ml-3" >{_entity?.natureOfBusiness}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Business Address</label><p className="m-0 ml-3" >{_entity?.businessAddress}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Correspondence Address</label><p className="m-0 ml-3" >{_entity?.correspondenceAddress}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Shared Mailbox</label><p className="m-0" ><i id="sharedMailbox" className={`pi ${_entity?.sharedMailbox?"pi-check": "pi-times"}`}  ></i></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Phone</label><p className="m-0 ml-3" >{_entity?.phone}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Fax</label><p className="m-0 ml-3" >{_entity?.fax}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Email</label><p className="m-0 ml-3" >{_entity?.email}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Website</label><p className="m-0 ml-3" >{_entity?.website}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Registered Address</label><p className="m-0 ml-3" >{_entity?.registeredAddress}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Company Reg No</label><p className="m-0 ml-3" >{_entity?.companyRegNo}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Country Of Registration</label><p className="m-0 ml-3" >{_entity?.countryOfRegistration}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Incorporated Date</label><p className="m-0 ml-3" >{_entity?.incorporatedDate}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Business Type</label><p className="m-0 ml-3" >{_entity?.businessType}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Num Partners</label><p className="m-0 ml-3" >{Number(_entity?.numPartners)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Num Directors</label><p className="m-0 ml-3" >{Number(_entity?.numDirectors)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Num Beneficiaries</label><p className="m-0 ml-3" >{Number(_entity?.numBeneficiaries)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Shareholders</label><p className="m-0 ml-3" >{Number(_entity?.shareholders)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Anticipated Turnover</label><p className="m-0 ml-3" >{Number(_entity?.anticipatedTurnover)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Num Employees</label><p className="m-0 ml-3" >{Number(_entity?.numEmployees)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Made Cva</label><p className="m-0" ><i id="madeCva" className={`pi ${_entity?.madeCva?"pi-check": "pi-times"}`}  ></i></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Property Repossessed</label><p className="m-0" ><i id="propertyRepossessed" className={`pi ${_entity?.propertyRepossessed?"pi-check": "pi-times"}`}  ></i></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Court Order</label><p className="m-0" ><i id="courtOrder" className={`pi ${_entity?.courtOrder?"pi-check": "pi-times"}`}  ></i></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Missed Repayments</label><p className="m-0" ><i id="missedRepayments" className={`pi ${_entity?.missedRepayments?"pi-check": "pi-times"}`}  ></i></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Broken Credit Agreement</label><p className="m-0" ><i id="brokenCreditAgreement" className={`pi ${_entity?.brokenCreditAgreement?"pi-check": "pi-times"}`}  ></i></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Adverse Credit Details</label><p className="m-0 ml-3" >{_entity?.adverseCreditDetails}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Application Id</label>
                    {applicationId.map((elem) => (
                        <Link key={elem._id} to={`/commercialApplications/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.status}</p>
                            </div>
                        </Link>
                    ))}</div>

                    <div className="col-12">&nbsp;</div>
                </div>
            </div>
         </div>

      


      <CommentsSection
        recordId={urlParams.singleBusinessDetailsId}
        user={props.user}
        alert={props.alert}
        serviceName="businessDetails"
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

export default connect(mapState, mapDispatch)(SingleBusinessDetailsPage);
