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


const SingleSecurityPropertiesPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    const [applicationId, setApplicationId] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("securityProperties")
            .get(urlParams.singleSecurityPropertiesId, { query: { $populate: [            {
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
                props.alert({ title: "SecurityProperties", type: "error", message: error.message || "Failed get securityProperties" });
            });
    }, [props,urlParams.singleSecurityPropertiesId]);


    const goBack = () => {
        navigate("/app/securityProperties");
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
                    <h3 className="m-0">Security Properties</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>securityProperties/{urlParams.singleSecurityPropertiesId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Property Type</label><p className="m-0 ml-3" >{_entity?.propertyType}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Address</label><p className="m-0 ml-3" >{_entity?.address}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Postcode</label><p className="m-0 ml-3" >{_entity?.postcode}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Description</label><p className="m-0 ml-3" >{_entity?.description}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Tenure</label><p className="m-0 ml-3" >{_entity?.tenure}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Vacant Possession On Completion</label><p className="m-0" ><i id="vacantPossessionOnCompletion" className={`pi ${_entity?.vacantPossessionOnCompletion?"pi-check": "pi-times"}`}  ></i></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Leasehold Unexpired Term Years</label><p className="m-0 ml-3" >{Number(_entity?.leaseholdUnexpiredTermYears)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Leasehold Unexpired Term Months</label><p className="m-0 ml-3" >{Number(_entity?.leaseholdUnexpiredTermMonths)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Leasehold Ground Rent Per Annum</label><p className="m-0 ml-3" >{Number(_entity?.leaseholdGroundRentPerAnnum)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Letting Rental Income Per Annum</label><p className="m-0 ml-3" >{Number(_entity?.lettingRentalIncomePerAnnum)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Valuation Contact Name</label><p className="m-0 ml-3" >{_entity?.valuationContactName}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Valuation Contact Phone No</label><p className="m-0 ml-3" >{_entity?.valuationContactPhoneNo}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Valuation Contact Email</label><p className="m-0 ml-3" >{_entity?.valuationContactEmail}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Purchase Price</label><p className="m-0 ml-3" >{Number(_entity?.purchasePrice)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Purchase Current Value</label><p className="m-0 ml-3" >{Number(_entity?.purchaseCurrentValue)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Purchase Deposit</label><p className="m-0 ml-3" >{Number(_entity?.purchaseDeposit)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Purchase Deposit Sources</label><p className="m-0 ml-3" >{_entity?.purchaseDepositSources}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Purchase Other Deposit Source</label><p className="m-0 ml-3" >{_entity?.purchaseOtherDepositSource}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Purchase Repayment Details</label><p className="m-0 ml-3" >{_entity?.purchaseRepaymentDetails}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Owned Property Purchase Price</label><p className="m-0 ml-3" >{Number(_entity?.ownedPropertyPurchasePrice)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Owned Property Most Recent Valuation</label><p className="m-0 ml-3" >{Number(_entity?.ownedPropertyMostRecentValuation)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Owned Property Valuation Date</label><p className="m-0 ml-3" >{_entity?.ownedPropertyValuationDate}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Owned Property Outstanding Mortgage</label><p className="m-0 ml-3" >{Number(_entity?.ownedPropertyOutstandingMortgage)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Owned Property Current Lender Name</label><p className="m-0 ml-3" >{_entity?.ownedPropertyCurrentLenderName}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Owned Propertycurrent Lender Address</label><p className="m-0 ml-3" >{_entity?.ownedPropertycurrentLenderAddress}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Owned Propertymortgage Account Number</label><p className="m-0 ml-3" >{_entity?.ownedPropertymortgageAccountNumber}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Owned Propertyhas Other Charges</label><p className="m-0" ><i id="ownedPropertyhasOtherCharges" className={`pi ${_entity?.ownedPropertyhasOtherCharges?"pi-check": "pi-times"}`}  ></i></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Owned Propertyother Charges Details</label><p className="m-0 ml-3" >{_entity?.ownedPropertyotherChargesDetails}</p></div>
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
        recordId={urlParams.singleSecurityPropertiesId}
        user={props.user}
        alert={props.alert}
        serviceName="securityProperties"
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

export default connect(mapState, mapDispatch)(SingleSecurityPropertiesPage);
