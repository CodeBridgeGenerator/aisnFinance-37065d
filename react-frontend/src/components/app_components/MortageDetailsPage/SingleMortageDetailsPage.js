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


const SingleMortageDetailsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    const [applicationId, setApplicationId] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("mortageDetails")
            .get(urlParams.singleMortageDetailsId, { query: { $populate: [            {
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
                props.alert({ title: "MortageDetails", type: "error", message: error.message || "Failed get mortageDetails" });
            });
    }, [props,urlParams.singleMortageDetailsId]);


    const goBack = () => {
        navigate("/app/mortageDetails");
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
                    <h3 className="m-0">Mortage Details</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>mortageDetails/{urlParams.singleMortageDetailsId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Requested Loan Amount</label><p className="m-0 ml-3" >{Number(_entity?.requestedLoanAmount)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Requested Repayment Term</label><p className="m-0 ml-3" >{_entity?.requestedRepaymentTerm}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Purpose Of Mortage</label><p className="m-0 ml-3" >{_entity?.purposeOfMortage}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Mortgage Holders</label><p className="m-0 ml-3" >{_entity?.mortgageHolders}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Capital Raising Fund Use</label><p className="m-0 ml-3" >{_entity?.capitalRaisingFundUse}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Investment Property Occupier</label><p className="m-0 ml-3" >{_entity?.investmentPropertyOccupier}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Investment Property Occupier Details</label><p className="m-0" ><i id="investmentPropertyOccupierDetails" className={`pi ${_entity?.investmentPropertyOccupierDetails?"pi-check": "pi-times"}`}  ></i></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Solicitor Name</label><p className="m-0 ml-3" >{_entity?.solicitorName}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Solicitor Address</label><p className="m-0 ml-3" >{_entity?.solicitorAddress}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Solicitor Phone No</label><p className="m-0 ml-3" >{_entity?.solicitorPhoneNo}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Solicitor Email</label><p className="m-0 ml-3" >{_entity?.solicitorEmail}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Intermediary Name</label><p className="m-0 ml-3" >{_entity?.intermediaryName}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Intermediary Address</label><p className="m-0 ml-3" >{_entity?.intermediaryAddress}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Intermediary Phone No</label><p className="m-0 ml-3" >{_entity?.intermediaryPhoneNo}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Intermediary Email</label><p className="m-0 ml-3" >{_entity?.intermediaryEmail}</p></div>
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
        recordId={urlParams.singleMortageDetailsId}
        user={props.user}
        alert={props.alert}
        serviceName="mortageDetails"
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

export default connect(mapState, mapDispatch)(SingleMortageDetailsPage);
