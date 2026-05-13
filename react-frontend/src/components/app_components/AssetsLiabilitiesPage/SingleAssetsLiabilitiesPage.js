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


const SingleAssetsLiabilitiesPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    const [applicationId, setApplicationId] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("assetsLiabilities")
            .get(urlParams.singleAssetsLiabilitiesId, { query: { $populate: [            {
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
                props.alert({ title: "AssetsLiabilities", type: "error", message: error.message || "Failed get assetsLiabilities" });
            });
    }, [props,urlParams.singleAssetsLiabilitiesId]);


    const goBack = () => {
        navigate("/app/assetsLiabilities");
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
                    <h3 className="m-0">Assets Liabilities</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>assetsLiabilities/{urlParams.singleAssetsLiabilitiesId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Customer Name</label><p className="m-0 ml-3" >{_entity?.customerName}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Income Self Monthly</label><p className="m-0 ml-3" >{Number(_entity?.incomeSelfMonthly)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Income Partner Monthly</label><p className="m-0 ml-3" >{Number(_entity?.incomePartnerMonthly)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Income Other Monthly</label><p className="m-0 ml-3" >{Number(_entity?.incomeOtherMonthly)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Total Monthly Income</label><p className="m-0 ml-3" >{Number(_entity?.totalMonthlyIncome)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Expenditure Mortgage Rent</label><p className="m-0 ml-3" >{Number(_entity?.expenditureMortgageRent)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Expenditure Life Assurance</label><p className="m-0 ml-3" >{Number(_entity?.expenditureLifeAssurance)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Expenditure Council Tax</label><p className="m-0 ml-3" >{Number(_entity?.expenditureCouncilTax)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Expenditure Utilities</label><p className="m-0 ml-3" >{Number(_entity?.expenditureUtilities)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Expenditure Insurance</label><p className="m-0 ml-3" >{Number(_entity?.expenditureInsurance)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Expenditure Travel</label><p className="m-0 ml-3" >{Number(_entity?.expenditureTravel)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Expenditure Petrol</label><p className="m-0 ml-3" >{Number(_entity?.expenditurePetrol)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Expenditure Car Insurance</label><p className="m-0 ml-3" >{Number(_entity?.expenditureCarInsurance)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Expenditure Food Clothing</label><p className="m-0 ml-3" >{Number(_entity?.expenditureFoodClothing)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Expenditure Existing Borrowings</label><p className="m-0 ml-3" >{Number(_entity?.expenditureExistingBorrowings)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Expenditure Other Loans</label><p className="m-0 ml-3" >{Number(_entity?.expenditureOtherLoans)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Expenditure Entertainment</label><p className="m-0 ml-3" >{Number(_entity?.expenditureEntertainment)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Expenditure Other</label><p className="m-0 ml-3" >{Number(_entity?.expenditureOther)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Total Monthly Expenditure</label><p className="m-0 ml-3" >{Number(_entity?.totalMonthlyExpenditure)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Monthly Disposable Income</label><p className="m-0 ml-3" >{Number(_entity?.monthlyDisposableIncome)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Asset Cash</label><p className="m-0 ml-3" >{Number(_entity?.assetCash)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Asset Shares</label><p className="m-0 ml-3" >{Number(_entity?.assetShares)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Asset Life Policy</label><p className="m-0 ml-3" >{Number(_entity?.assetLifePolicy)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Asset Dwelling House</label><p className="m-0 ml-3" >{Number(_entity?.assetDwellingHouse)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Asset Other Property 1</label><p className="m-0 ml-3" >{Number(_entity?.assetOtherProperty1)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Asset Other Property 2</label><p className="m-0 ml-3" >{Number(_entity?.assetOtherProperty2)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Asset Other Investments</label><p className="m-0 ml-3" >{Number(_entity?.assetOtherInvestments)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Total Assets</label><p className="m-0 ml-3" >{Number(_entity?.totalAssets)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Liability Overdraft</label><p className="m-0 ml-3" >{Number(_entity?.liabilityOverdraft)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Liability Mortgage</label><p className="m-0 ml-3" >{Number(_entity?.liabilityMortgage)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Liability Car Loan</label><p className="m-0 ml-3" >{Number(_entity?.liabilityCarLoan)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Liability Personal Loan 1</label><p className="m-0 ml-3" >{Number(_entity?.liabilityPersonalLoan1)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Liability Personal Loan 2</label><p className="m-0 ml-3" >{Number(_entity?.liabilityPersonalLoan2)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Liability Personal Loan 3</label><p className="m-0 ml-3" >{Number(_entity?.liabilityPersonalLoan3)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Liability Credit Card 1</label><p className="m-0 ml-3" >{Number(_entity?.liabilityCreditCard1)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Liability Credit Card 2</label><p className="m-0 ml-3" >{Number(_entity?.liabilityCreditCard2)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Liability Credit Card 3</label><p className="m-0 ml-3" >{Number(_entity?.liabilityCreditCard3)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Liability Personal Tax</label><p className="m-0 ml-3" >{Number(_entity?.liabilityPersonalTax)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Liability Personal Guarantees</label><p className="m-0 ml-3" >{Number(_entity?.liabilityPersonalGuarantees)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Liability Other</label><p className="m-0 ml-3" >{Number(_entity?.liabilityOther)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Total Liabilities</label><p className="m-0 ml-3" >{Number(_entity?.totalLiabilities)}</p></div>
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
        recordId={urlParams.singleAssetsLiabilitiesId}
        user={props.user}
        alert={props.alert}
        serviceName="assetsLiabilities"
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

export default connect(mapState, mapDispatch)(SingleAssetsLiabilitiesPage);
