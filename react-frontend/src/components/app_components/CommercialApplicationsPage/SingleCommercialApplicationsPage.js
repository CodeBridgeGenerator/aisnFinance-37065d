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

import MortageDetailsPage from "../MortageDetailsPage/MortageDetailsPage";
import PersonalDetailsPage from "../PersonalDetailsPage/PersonalDetailsPage";
import BusinessDetailsPage from "../BusinessDetailsPage/BusinessDetailsPage";
import SecurityPropertiesPage from "../SecurityPropertiesPage/SecurityPropertiesPage";
import AssetsLiabilitiesPage from "../AssetsLiabilitiesPage/AssetsLiabilitiesPage";
import FileAdminChecklistPage from "../FileAdminChecklistPage/FileAdminChecklistPage";
import UploadFilesToS3 from "../../../services/UploadFilesToS3";

const SingleCommercialApplicationsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    const [dealId, setDealId] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("commercialApplications")
            .get(urlParams.singleCommercialApplicationsId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"dealId"] }})
            .then((res) => {
                set_entity(res || {});
                const dealId = Array.isArray(res.dealId)
            ? res.dealId.map((elem) => ({ _id: elem._id, status: elem.status }))
            : res.dealId
                ? [{ _id: res.dealId._id, status: res.dealId.status }]
                : [];
        setDealId(dealId);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "CommercialApplications", type: "error", message: error.message || "Failed get commercialApplications" });
            });
    }, [props,urlParams.singleCommercialApplicationsId]);


    const goBack = () => {
        navigate("/app/commercialApplications");
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
                    <h3 className="m-0">Commercial Applications</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>commercialApplications/{urlParams.singleCommercialApplicationsId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Status</label><p className="m-0 ml-3" >{_entity?.status}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Contact By Telephone</label><p className="m-0" ><i id="contactByTelephone" className={`pi ${_entity?.contactByTelephone?"pi-check": "pi-times"}`}  ></i></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Contact By Post</label><p className="m-0" ><i id="contactByPost" className={`pi ${_entity?.contactByPost?"pi-check": "pi-times"}`}  ></i></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Contact By Electronic Media</label><p className="m-0" ><i id="contactByElectronicMedia" className={`pi ${_entity?.contactByElectronicMedia?"pi-check": "pi-times"}`}  ></i></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Contact For Market Research</label><p className="m-0" ><i id="contactForMarketResearch" className={`pi ${_entity?.contactForMarketResearch?"pi-check": "pi-times"}`}  ></i></p></div>
<div className="col-12"><label className="text-sm text-gray-600">Application Documents</label><div className="m-0 ml-3" ><UploadFilesToS3 type={'single'}/></div></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Deal Id</label>
                    {dealId.map((elem) => (
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

      
    <div className="col-12 mt-2">
        <TabView>
        
                    <TabPanel header="Mortage Details" leftIcon="pi pi-building-columns mr-2">
                        <MortageDetailsPage/>
                    </TabPanel>
                    

                    <TabPanel header="Personal Details" leftIcon="pi pi-building-columns mr-2">
                        <PersonalDetailsPage/>
                    </TabPanel>
                    

                    <TabPanel header="Business Details" leftIcon="pi pi-building-columns mr-2">
                        <BusinessDetailsPage/>
                    </TabPanel>
                    

                    <TabPanel header="Security Properties" leftIcon="pi pi-building-columns mr-2">
                        <SecurityPropertiesPage/>
                    </TabPanel>
                    

                    <TabPanel header="Assets Liabilities" leftIcon="pi pi-building-columns mr-2">
                        <AssetsLiabilitiesPage/>
                    </TabPanel>
                    

                    <TabPanel header="File Admin Checklist" leftIcon="pi pi-building-columns mr-2">
                        <FileAdminChecklistPage/>
                    </TabPanel>
                    
        </TabView>
    </div>


      <CommentsSection
        recordId={urlParams.singleCommercialApplicationsId}
        user={props.user}
        alert={props.alert}
        serviceName="commercialApplications"
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

export default connect(mapState, mapDispatch)(SingleCommercialApplicationsPage);
