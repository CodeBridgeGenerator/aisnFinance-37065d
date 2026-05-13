/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from "primereact/calendar";
import { InputNumber } from 'primereact/inputnumber';


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const AssetsLiabilitiesEditDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [applicationId, setApplicationId] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount commercialApplications
                    client
                        .service("commercialApplications")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleCommercialApplicationsId } })
                        .then((res) => {
                            setApplicationId(res.data.map((e) => { return { name: e['status'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "CommercialApplications", type: "error", message: error.message || "Failed get commercialApplications" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            applicationId: _entity?.applicationId?._id,
customerName: _entity?.customerName,
date: _entity?.date,
incomeSelfMonthly: _entity?.incomeSelfMonthly,
incomePartnerMonthly: _entity?.incomePartnerMonthly,
incomeOtherMonthly: _entity?.incomeOtherMonthly,
totalMonthlyIncome: _entity?.totalMonthlyIncome,
expenditureMortgageRent: _entity?.expenditureMortgageRent,
expenditureLifeAssurance: _entity?.expenditureLifeAssurance,
expenditureCouncilTax: _entity?.expenditureCouncilTax,
expenditureUtilities: _entity?.expenditureUtilities,
expenditureInsurance: _entity?.expenditureInsurance,
expenditureTravel: _entity?.expenditureTravel,
expenditurePetrol: _entity?.expenditurePetrol,
expenditureCarInsurance: _entity?.expenditureCarInsurance,
expenditureFoodClothing: _entity?.expenditureFoodClothing,
expenditureExistingBorrowings: _entity?.expenditureExistingBorrowings,
expenditureOtherLoans: _entity?.expenditureOtherLoans,
expenditureEntertainment: _entity?.expenditureEntertainment,
expenditureOther: _entity?.expenditureOther,
totalMonthlyExpenditure: _entity?.totalMonthlyExpenditure,
monthlyDisposableIncome: _entity?.monthlyDisposableIncome,
assetCash: _entity?.assetCash,
assetShares: _entity?.assetShares,
assetLifePolicy: _entity?.assetLifePolicy,
assetDwellingHouse: _entity?.assetDwellingHouse,
assetOtherProperty1: _entity?.assetOtherProperty1,
assetOtherProperty2: _entity?.assetOtherProperty2,
assetOtherInvestments: _entity?.assetOtherInvestments,
totalAssets: _entity?.totalAssets,
liabilityOverdraft: _entity?.liabilityOverdraft,
liabilityMortgage: _entity?.liabilityMortgage,
liabilityCarLoan: _entity?.liabilityCarLoan,
liabilityPersonalLoan1: _entity?.liabilityPersonalLoan1,
liabilityPersonalLoan2: _entity?.liabilityPersonalLoan2,
liabilityPersonalLoan3: _entity?.liabilityPersonalLoan3,
liabilityCreditCard1: _entity?.liabilityCreditCard1,
liabilityCreditCard2: _entity?.liabilityCreditCard2,
liabilityCreditCard3: _entity?.liabilityCreditCard3,
liabilityPersonalTax: _entity?.liabilityPersonalTax,
liabilityPersonalGuarantees: _entity?.liabilityPersonalGuarantees,
liabilityOther: _entity?.liabilityOther,
totalLiabilities: _entity?.totalLiabilities,
        };

        setLoading(true);
        try {
            
        await client.service("assetsLiabilities").patch(_entity._id, _data);
        const eagerResult = await client
            .service("assetsLiabilities")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "applicationId",
                    service : "commercialApplications",
                    select:["status"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info assetsLiabilities updated successfully" });
        props.onEditResult(eagerResult.data[0]);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
        }
        setLoading(false);
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    const applicationIdOptions = applicationId.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Assets Liabilities" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="assetsLiabilities-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="applicationId">Application Id:</label>
                <Dropdown id="applicationId" value={_entity?.applicationId?._id} optionLabel="name" optionValue="value" options={applicationIdOptions} onChange={(e) => setValByKey("applicationId", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["applicationId"]) && (
              <p className="m-0" key="error-applicationId">
                {error["applicationId"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="customerName">Customer Name:</label>
                <InputText id="customerName" className="w-full mb-3 p-inputtext-sm" value={_entity?.customerName} onChange={(e) => setValByKey("customerName", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["customerName"]) && (
              <p className="m-0" key="error-customerName">
                {error["customerName"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="date">Date:</label>
                <Calendar id="date"  value={_entity?.date ? new Date(_entity?.date) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("date", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["date"]) && (
              <p className="m-0" key="error-date">
                {error["date"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="incomeSelfMonthly">Income Self Monthly:</label>
                <InputNumber id="incomeSelfMonthly" className="w-full mb-3 p-inputtext-sm" value={_entity?.incomeSelfMonthly} onChange={(e) => setValByKey("incomeSelfMonthly", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["incomeSelfMonthly"]) && (
              <p className="m-0" key="error-incomeSelfMonthly">
                {error["incomeSelfMonthly"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="incomePartnerMonthly">Income Partner Monthly:</label>
                <InputNumber id="incomePartnerMonthly" className="w-full mb-3 p-inputtext-sm" value={_entity?.incomePartnerMonthly} onChange={(e) => setValByKey("incomePartnerMonthly", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["incomePartnerMonthly"]) && (
              <p className="m-0" key="error-incomePartnerMonthly">
                {error["incomePartnerMonthly"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="incomeOtherMonthly">Income Other Monthly:</label>
                <InputNumber id="incomeOtherMonthly" className="w-full mb-3 p-inputtext-sm" value={_entity?.incomeOtherMonthly} onChange={(e) => setValByKey("incomeOtherMonthly", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["incomeOtherMonthly"]) && (
              <p className="m-0" key="error-incomeOtherMonthly">
                {error["incomeOtherMonthly"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="totalMonthlyIncome">Total Monthly Income:</label>
                <InputNumber id="totalMonthlyIncome" className="w-full mb-3 p-inputtext-sm" value={_entity?.totalMonthlyIncome} onChange={(e) => setValByKey("totalMonthlyIncome", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["totalMonthlyIncome"]) && (
              <p className="m-0" key="error-totalMonthlyIncome">
                {error["totalMonthlyIncome"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="expenditureMortgageRent">Expenditure Mortgage Rent:</label>
                <InputNumber id="expenditureMortgageRent" className="w-full mb-3 p-inputtext-sm" value={_entity?.expenditureMortgageRent} onChange={(e) => setValByKey("expenditureMortgageRent", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["expenditureMortgageRent"]) && (
              <p className="m-0" key="error-expenditureMortgageRent">
                {error["expenditureMortgageRent"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="expenditureLifeAssurance">Expenditure Life Assurance:</label>
                <InputNumber id="expenditureLifeAssurance" className="w-full mb-3 p-inputtext-sm" value={_entity?.expenditureLifeAssurance} onChange={(e) => setValByKey("expenditureLifeAssurance", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["expenditureLifeAssurance"]) && (
              <p className="m-0" key="error-expenditureLifeAssurance">
                {error["expenditureLifeAssurance"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="expenditureCouncilTax">Expenditure Council Tax:</label>
                <InputNumber id="expenditureCouncilTax" className="w-full mb-3 p-inputtext-sm" value={_entity?.expenditureCouncilTax} onChange={(e) => setValByKey("expenditureCouncilTax", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["expenditureCouncilTax"]) && (
              <p className="m-0" key="error-expenditureCouncilTax">
                {error["expenditureCouncilTax"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="expenditureUtilities">Expenditure Utilities:</label>
                <InputNumber id="expenditureUtilities" className="w-full mb-3 p-inputtext-sm" value={_entity?.expenditureUtilities} onChange={(e) => setValByKey("expenditureUtilities", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["expenditureUtilities"]) && (
              <p className="m-0" key="error-expenditureUtilities">
                {error["expenditureUtilities"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="expenditureInsurance">Expenditure Insurance:</label>
                <InputNumber id="expenditureInsurance" className="w-full mb-3 p-inputtext-sm" value={_entity?.expenditureInsurance} onChange={(e) => setValByKey("expenditureInsurance", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["expenditureInsurance"]) && (
              <p className="m-0" key="error-expenditureInsurance">
                {error["expenditureInsurance"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="expenditureTravel">Expenditure Travel:</label>
                <InputNumber id="expenditureTravel" className="w-full mb-3 p-inputtext-sm" value={_entity?.expenditureTravel} onChange={(e) => setValByKey("expenditureTravel", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["expenditureTravel"]) && (
              <p className="m-0" key="error-expenditureTravel">
                {error["expenditureTravel"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="expenditurePetrol">Expenditure Petrol:</label>
                <InputNumber id="expenditurePetrol" className="w-full mb-3 p-inputtext-sm" value={_entity?.expenditurePetrol} onChange={(e) => setValByKey("expenditurePetrol", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["expenditurePetrol"]) && (
              <p className="m-0" key="error-expenditurePetrol">
                {error["expenditurePetrol"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="expenditureCarInsurance">Expenditure Car Insurance:</label>
                <InputNumber id="expenditureCarInsurance" className="w-full mb-3 p-inputtext-sm" value={_entity?.expenditureCarInsurance} onChange={(e) => setValByKey("expenditureCarInsurance", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["expenditureCarInsurance"]) && (
              <p className="m-0" key="error-expenditureCarInsurance">
                {error["expenditureCarInsurance"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="expenditureFoodClothing">Expenditure Food Clothing:</label>
                <InputNumber id="expenditureFoodClothing" className="w-full mb-3 p-inputtext-sm" value={_entity?.expenditureFoodClothing} onChange={(e) => setValByKey("expenditureFoodClothing", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["expenditureFoodClothing"]) && (
              <p className="m-0" key="error-expenditureFoodClothing">
                {error["expenditureFoodClothing"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="expenditureExistingBorrowings">Expenditure Existing Borrowings:</label>
                <InputNumber id="expenditureExistingBorrowings" className="w-full mb-3 p-inputtext-sm" value={_entity?.expenditureExistingBorrowings} onChange={(e) => setValByKey("expenditureExistingBorrowings", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["expenditureExistingBorrowings"]) && (
              <p className="m-0" key="error-expenditureExistingBorrowings">
                {error["expenditureExistingBorrowings"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="expenditureOtherLoans">Expenditure Other Loans:</label>
                <InputNumber id="expenditureOtherLoans" className="w-full mb-3 p-inputtext-sm" value={_entity?.expenditureOtherLoans} onChange={(e) => setValByKey("expenditureOtherLoans", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["expenditureOtherLoans"]) && (
              <p className="m-0" key="error-expenditureOtherLoans">
                {error["expenditureOtherLoans"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="expenditureEntertainment">Expenditure Entertainment:</label>
                <InputNumber id="expenditureEntertainment" className="w-full mb-3 p-inputtext-sm" value={_entity?.expenditureEntertainment} onChange={(e) => setValByKey("expenditureEntertainment", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["expenditureEntertainment"]) && (
              <p className="m-0" key="error-expenditureEntertainment">
                {error["expenditureEntertainment"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="expenditureOther">Expenditure Other:</label>
                <InputNumber id="expenditureOther" className="w-full mb-3 p-inputtext-sm" value={_entity?.expenditureOther} onChange={(e) => setValByKey("expenditureOther", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["expenditureOther"]) && (
              <p className="m-0" key="error-expenditureOther">
                {error["expenditureOther"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="totalMonthlyExpenditure">Total Monthly Expenditure:</label>
                <InputNumber id="totalMonthlyExpenditure" className="w-full mb-3 p-inputtext-sm" value={_entity?.totalMonthlyExpenditure} onChange={(e) => setValByKey("totalMonthlyExpenditure", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["totalMonthlyExpenditure"]) && (
              <p className="m-0" key="error-totalMonthlyExpenditure">
                {error["totalMonthlyExpenditure"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="monthlyDisposableIncome">Monthly Disposable Income:</label>
                <InputNumber id="monthlyDisposableIncome" className="w-full mb-3 p-inputtext-sm" value={_entity?.monthlyDisposableIncome} onChange={(e) => setValByKey("monthlyDisposableIncome", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["monthlyDisposableIncome"]) && (
              <p className="m-0" key="error-monthlyDisposableIncome">
                {error["monthlyDisposableIncome"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="assetCash">Asset Cash:</label>
                <InputNumber id="assetCash" className="w-full mb-3 p-inputtext-sm" value={_entity?.assetCash} onChange={(e) => setValByKey("assetCash", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["assetCash"]) && (
              <p className="m-0" key="error-assetCash">
                {error["assetCash"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="assetShares">Asset Shares:</label>
                <InputNumber id="assetShares" className="w-full mb-3 p-inputtext-sm" value={_entity?.assetShares} onChange={(e) => setValByKey("assetShares", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["assetShares"]) && (
              <p className="m-0" key="error-assetShares">
                {error["assetShares"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="assetLifePolicy">Asset Life Policy:</label>
                <InputNumber id="assetLifePolicy" className="w-full mb-3 p-inputtext-sm" value={_entity?.assetLifePolicy} onChange={(e) => setValByKey("assetLifePolicy", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["assetLifePolicy"]) && (
              <p className="m-0" key="error-assetLifePolicy">
                {error["assetLifePolicy"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="assetDwellingHouse">Asset Dwelling House:</label>
                <InputNumber id="assetDwellingHouse" className="w-full mb-3 p-inputtext-sm" value={_entity?.assetDwellingHouse} onChange={(e) => setValByKey("assetDwellingHouse", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["assetDwellingHouse"]) && (
              <p className="m-0" key="error-assetDwellingHouse">
                {error["assetDwellingHouse"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="assetOtherProperty1">Asset Other Property 1:</label>
                <InputNumber id="assetOtherProperty1" className="w-full mb-3 p-inputtext-sm" value={_entity?.assetOtherProperty1} onChange={(e) => setValByKey("assetOtherProperty1", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["assetOtherProperty1"]) && (
              <p className="m-0" key="error-assetOtherProperty1">
                {error["assetOtherProperty1"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="assetOtherProperty2">Asset Other Property 2:</label>
                <InputNumber id="assetOtherProperty2" className="w-full mb-3 p-inputtext-sm" value={_entity?.assetOtherProperty2} onChange={(e) => setValByKey("assetOtherProperty2", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["assetOtherProperty2"]) && (
              <p className="m-0" key="error-assetOtherProperty2">
                {error["assetOtherProperty2"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="assetOtherInvestments">Asset Other Investments:</label>
                <InputNumber id="assetOtherInvestments" className="w-full mb-3 p-inputtext-sm" value={_entity?.assetOtherInvestments} onChange={(e) => setValByKey("assetOtherInvestments", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["assetOtherInvestments"]) && (
              <p className="m-0" key="error-assetOtherInvestments">
                {error["assetOtherInvestments"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="totalAssets">Total Assets:</label>
                <InputNumber id="totalAssets" className="w-full mb-3 p-inputtext-sm" value={_entity?.totalAssets} onChange={(e) => setValByKey("totalAssets", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["totalAssets"]) && (
              <p className="m-0" key="error-totalAssets">
                {error["totalAssets"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="liabilityOverdraft">Liability Overdraft:</label>
                <InputNumber id="liabilityOverdraft" className="w-full mb-3 p-inputtext-sm" value={_entity?.liabilityOverdraft} onChange={(e) => setValByKey("liabilityOverdraft", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["liabilityOverdraft"]) && (
              <p className="m-0" key="error-liabilityOverdraft">
                {error["liabilityOverdraft"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="liabilityMortgage">Liability Mortgage:</label>
                <InputNumber id="liabilityMortgage" className="w-full mb-3 p-inputtext-sm" value={_entity?.liabilityMortgage} onChange={(e) => setValByKey("liabilityMortgage", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["liabilityMortgage"]) && (
              <p className="m-0" key="error-liabilityMortgage">
                {error["liabilityMortgage"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="liabilityCarLoan">Liability Car Loan:</label>
                <InputNumber id="liabilityCarLoan" className="w-full mb-3 p-inputtext-sm" value={_entity?.liabilityCarLoan} onChange={(e) => setValByKey("liabilityCarLoan", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["liabilityCarLoan"]) && (
              <p className="m-0" key="error-liabilityCarLoan">
                {error["liabilityCarLoan"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="liabilityPersonalLoan1">Liability Personal Loan 1:</label>
                <InputNumber id="liabilityPersonalLoan1" className="w-full mb-3 p-inputtext-sm" value={_entity?.liabilityPersonalLoan1} onChange={(e) => setValByKey("liabilityPersonalLoan1", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["liabilityPersonalLoan1"]) && (
              <p className="m-0" key="error-liabilityPersonalLoan1">
                {error["liabilityPersonalLoan1"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="liabilityPersonalLoan2">Liability Personal Loan 2:</label>
                <InputNumber id="liabilityPersonalLoan2" className="w-full mb-3 p-inputtext-sm" value={_entity?.liabilityPersonalLoan2} onChange={(e) => setValByKey("liabilityPersonalLoan2", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["liabilityPersonalLoan2"]) && (
              <p className="m-0" key="error-liabilityPersonalLoan2">
                {error["liabilityPersonalLoan2"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="liabilityPersonalLoan3">Liability Personal Loan 3:</label>
                <InputNumber id="liabilityPersonalLoan3" className="w-full mb-3 p-inputtext-sm" value={_entity?.liabilityPersonalLoan3} onChange={(e) => setValByKey("liabilityPersonalLoan3", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["liabilityPersonalLoan3"]) && (
              <p className="m-0" key="error-liabilityPersonalLoan3">
                {error["liabilityPersonalLoan3"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="liabilityCreditCard1">Liability Credit Card 1:</label>
                <InputNumber id="liabilityCreditCard1" className="w-full mb-3 p-inputtext-sm" value={_entity?.liabilityCreditCard1} onChange={(e) => setValByKey("liabilityCreditCard1", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["liabilityCreditCard1"]) && (
              <p className="m-0" key="error-liabilityCreditCard1">
                {error["liabilityCreditCard1"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="liabilityCreditCard2">Liability Credit Card 2:</label>
                <InputNumber id="liabilityCreditCard2" className="w-full mb-3 p-inputtext-sm" value={_entity?.liabilityCreditCard2} onChange={(e) => setValByKey("liabilityCreditCard2", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["liabilityCreditCard2"]) && (
              <p className="m-0" key="error-liabilityCreditCard2">
                {error["liabilityCreditCard2"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="liabilityCreditCard3">Liability Credit Card 3:</label>
                <InputNumber id="liabilityCreditCard3" className="w-full mb-3 p-inputtext-sm" value={_entity?.liabilityCreditCard3} onChange={(e) => setValByKey("liabilityCreditCard3", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["liabilityCreditCard3"]) && (
              <p className="m-0" key="error-liabilityCreditCard3">
                {error["liabilityCreditCard3"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="liabilityPersonalTax">Liability Personal Tax:</label>
                <InputNumber id="liabilityPersonalTax" className="w-full mb-3 p-inputtext-sm" value={_entity?.liabilityPersonalTax} onChange={(e) => setValByKey("liabilityPersonalTax", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["liabilityPersonalTax"]) && (
              <p className="m-0" key="error-liabilityPersonalTax">
                {error["liabilityPersonalTax"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="liabilityPersonalGuarantees">Liability Personal Guarantees:</label>
                <InputNumber id="liabilityPersonalGuarantees" className="w-full mb-3 p-inputtext-sm" value={_entity?.liabilityPersonalGuarantees} onChange={(e) => setValByKey("liabilityPersonalGuarantees", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["liabilityPersonalGuarantees"]) && (
              <p className="m-0" key="error-liabilityPersonalGuarantees">
                {error["liabilityPersonalGuarantees"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="liabilityOther">Liability Other:</label>
                <InputNumber id="liabilityOther" className="w-full mb-3 p-inputtext-sm" value={_entity?.liabilityOther} onChange={(e) => setValByKey("liabilityOther", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["liabilityOther"]) && (
              <p className="m-0" key="error-liabilityOther">
                {error["liabilityOther"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="totalLiabilities">Total Liabilities:</label>
                <InputNumber id="totalLiabilities" className="w-full mb-3 p-inputtext-sm" value={_entity?.totalLiabilities} onChange={(e) => setValByKey("totalLiabilities", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["totalLiabilities"]) && (
              <p className="m-0" key="error-totalLiabilities">
                {error["totalLiabilities"]}
              </p>
            )}
          </small>
            </div>
                <div className="col-12">&nbsp;</div>
                <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(AssetsLiabilitiesEditDialogComponent);
