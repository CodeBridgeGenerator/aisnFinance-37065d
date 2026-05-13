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


const SingleAnnualClientReviewsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    const [deal, setDeal] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("annualClientReviews")
            .get(urlParams.singleAnnualClientReviewsId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"deal"] }})
            .then((res) => {
                set_entity(res || {});
                const deal = Array.isArray(res.deal)
            ? res.deal.map((elem) => ({ _id: elem._id, status: elem.status }))
            : res.deal
                ? [{ _id: res.deal._id, status: res.deal.status }]
                : [];
        setDeal(deal);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "AnnualClientReviews", type: "error", message: error.message || "Failed get annualClientReviews" });
            });
    }, [props,urlParams.singleAnnualClientReviewsId]);


    const goBack = () => {
        navigate("/app/annualClientReviews");
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
                    <h3 className="m-0">Annual Client Reviews</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>annualClientReviews/{urlParams.singleAnnualClientReviewsId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Client Profile</label><p className="m-0 ml-3" >{_entity?.clientProfile}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Review Year</label><p className="m-0 ml-3" >{Number(_entity?.reviewYear)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Epc Cert On File</label><p className="m-0" ><i id="epcCertOnFile" className={`pi ${_entity?.epcCertOnFile?"pi-check": "pi-times"}`}  ></i></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Epc Cert Document</label><p className="m-0 ml-3" >{_entity?.epcCertDocument}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Annual Building Insurance On File</label><p className="m-0" ><i id="annualBuildingInsuranceOnFile" className={`pi ${_entity?.annualBuildingInsuranceOnFile?"pi-check": "pi-times"}`}  ></i></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Building Insurance Document</label><p className="m-0 ml-3" >{_entity?.buildingInsuranceDocument}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Is Building Insurance Expired</label><p className="m-0" ><i id="isBuildingInsuranceExpired" className={`pi ${_entity?.isBuildingInsuranceExpired?"pi-check": "pi-times"}`}  ></i></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Gas Cert On File</label><p className="m-0" ><i id="gasCertOnFile" className={`pi ${_entity?.gasCertOnFile?"pi-check": "pi-times"}`}  ></i></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Gas Cert Document</label><p className="m-0 ml-3" >{_entity?.gasCertDocument}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Electric Pat Cert On File</label><p className="m-0" ><i id="electricPatCertOnFile" className={`pi ${_entity?.electricPatCertOnFile?"pi-check": "pi-times"}`}  ></i></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Electric Pat Cert Document</label><p className="m-0 ml-3" >{_entity?.electricPatCertDocument}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Company Accounts On File</label><p className="m-0" ><i id="companyAccountsOnFile" className={`pi ${_entity?.companyAccountsOnFile?"pi-check": "pi-times"}`}  ></i></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Land Registry Check On File</label><p className="m-0" ><i id="landRegistryCheckOnFile" className={`pi ${_entity?.landRegistryCheckOnFile?"pi-check": "pi-times"}`}  ></i></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Land Registry Check Document</label><p className="m-0 ml-3" >{_entity?.landRegistryCheckDocument}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Credit Report On File</label><p className="m-0" ><i id="creditReportOnFile" className={`pi ${_entity?.creditReportOnFile?"pi-check": "pi-times"}`}  ></i></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Credit Report Document</label><p className="m-0 ml-3" >{_entity?.creditReportDocument}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Comments</label><p className="m-0 ml-3" >{_entity?.comments}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Status</label><p className="m-0 ml-3" >{_entity?.status}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Reviewed By Profile</label><p className="m-0 ml-3" >{_entity?.reviewedByProfile}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Reviewed At</label><p className="m-0 ml-3" >{Number(_entity?.reviewedAt)}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Deal</label>
                    {deal.map((elem) => (
                        <Link key={elem._id} to={`/deals/${elem._id}`}>
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
        recordId={urlParams.singleAnnualClientReviewsId}
        user={props.user}
        alert={props.alert}
        serviceName="annualClientReviews"
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

export default connect(mapState, mapDispatch)(SingleAnnualClientReviewsPage);
