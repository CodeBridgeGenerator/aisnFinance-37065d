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
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from "primereact/calendar";


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

const CreditPaperEditDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [dealId, setDealId] = useState([])
const [preparedBy, setPreparedBy] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount deals
                    client
                        .service("deals")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleDealsId } })
                        .then((res) => {
                            setDealId(res.data.map((e) => { return { name: e['status'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Deals", type: "error", message: error.message || "Failed get deals" });
                        });
                }, []);
 useEffect(() => {
                    //on mount profiles
                    client
                        .service("profiles")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleProfilesId } })
                        .then((res) => {
                            setPreparedBy(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Profiles", type: "error", message: error.message || "Failed get profiles" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            dealId: _entity?.dealId?._id,
preparedBy: _entity?.preparedBy?._id,
borrowerName: _entity?.borrowerName,
loanAmount: _entity?.loanAmount,
loanPurpose: _entity?.loanPurpose,
propertyAddress: _entity?.propertyAddress,
purchasePrice: _entity?.purchasePrice,
ltvPercentage: _entity?.ltvPercentage,
repaymentTermRequested: _entity?.repaymentTermRequested,
standardInterestRate: _entity?.standardInterestRate,
executiveSummaryRecommendation: _entity?.executiveSummaryRecommendation,
borrowerDob: _entity?.borrowerDob,
employmentIncomeAfterTax: _entity?.employmentIncomeAfterTax,
totalDeclaredIncome: _entity?.totalDeclaredIncome,
existingMortgageOutstanding: _entity?.existingMortgageOutstanding,
monthlyMortgagePayment: _entity?.monthlyMortgagePayment,
primaryResidenceValue: _entity?.primaryResidenceValue,
creditProfileSummary: _entity?.creditProfileSummary,
propertyType: _entity?.propertyType,
estimatedPropertyValue: _entity?.estimatedPropertyValue,
exitStrategySummary: _entity?.exitStrategySummary,
preparedBy: _entity?.preparedBy?._id,
preparedDate: _entity?.preparedDate,
status: _entity?.status,
        };

        setLoading(true);
        try {
            
        await client.service("creditPaper").patch(_entity._id, _data);
        const eagerResult = await client
            .service("creditPaper")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "dealId",
                    service : "deals",
                    select:["status"]},{
                    path : "preparedBy",
                    service : "profiles",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info creditPaper updated successfully" });
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

    const dealIdOptions = dealId.map((elem) => ({ name: elem.name, value: elem.value }));
const preparedByOptions = preparedBy.map((elem) => ({ name: elem.name, value: elem.value }));
const preparedByOptions = preparedBy.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Credit Paper" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="creditPaper-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="dealId">Deal Id:</label>
                <Dropdown id="dealId" value={_entity?.dealId?._id} optionLabel="name" optionValue="value" options={dealIdOptions} onChange={(e) => setValByKey("dealId", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["dealId"]) && (
              <p className="m-0" key="error-dealId">
                {error["dealId"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="preparedBy">Prepared By:</label>
                <Dropdown id="preparedBy" value={_entity?.preparedBy?._id} optionLabel="name" optionValue="value" options={preparedByOptions} onChange={(e) => setValByKey("preparedBy", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["preparedBy"]) && (
              <p className="m-0" key="error-preparedBy">
                {error["preparedBy"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="borrowerName">Borrower Name:</label>
                <InputText id="borrowerName" className="w-full mb-3 p-inputtext-sm" value={_entity?.borrowerName} onChange={(e) => setValByKey("borrowerName", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["borrowerName"]) && (
              <p className="m-0" key="error-borrowerName">
                {error["borrowerName"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="loanAmount">Loan Amount:</label>
                <InputNumber id="loanAmount" className="w-full mb-3" mode="currency" currency="MYR" locale="en-US" value={_entity?.loanAmount} onValueChange={(e) => setValByKey("loanAmount", e.value)} useGrouping={false}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["loanAmount"]) && (
              <p className="m-0" key="error-loanAmount">
                {error["loanAmount"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="loanPurpose">Loan Purpose:</label>
                <InputText id="loanPurpose" className="w-full mb-3 p-inputtext-sm" value={_entity?.loanPurpose} onChange={(e) => setValByKey("loanPurpose", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["loanPurpose"]) && (
              <p className="m-0" key="error-loanPurpose">
                {error["loanPurpose"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="propertyAddress">Property Address:</label>
                <InputText id="propertyAddress" className="w-full mb-3 p-inputtext-sm" value={_entity?.propertyAddress} onChange={(e) => setValByKey("propertyAddress", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["propertyAddress"]) && (
              <p className="m-0" key="error-propertyAddress">
                {error["propertyAddress"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="purchasePrice">Purchase Price:</label>
                <InputNumber id="purchasePrice" className="w-full mb-3" mode="currency" currency="MYR" locale="en-US" value={_entity?.purchasePrice} onValueChange={(e) => setValByKey("purchasePrice", e.value)} useGrouping={false}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["purchasePrice"]) && (
              <p className="m-0" key="error-purchasePrice">
                {error["purchasePrice"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="ltvPercentage">Ltv Percentage:</label>
                <InputNumber id="ltvPercentage" className="w-full mb-3 p-inputtext-sm" value={_entity?.ltvPercentage} onChange={(e) => setValByKey("ltvPercentage", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["ltvPercentage"]) && (
              <p className="m-0" key="error-ltvPercentage">
                {error["ltvPercentage"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="repaymentTermRequested">Repayment Term Requested:</label>
                <InputNumber id="repaymentTermRequested" className="w-full mb-3 p-inputtext-sm" value={_entity?.repaymentTermRequested} onChange={(e) => setValByKey("repaymentTermRequested", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["repaymentTermRequested"]) && (
              <p className="m-0" key="error-repaymentTermRequested">
                {error["repaymentTermRequested"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="standardInterestRate">Standard Interest Rate:</label>
                <InputNumber id="standardInterestRate" className="w-full mb-3 p-inputtext-sm" value={_entity?.standardInterestRate} onChange={(e) => setValByKey("standardInterestRate", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["standardInterestRate"]) && (
              <p className="m-0" key="error-standardInterestRate">
                {error["standardInterestRate"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="executiveSummaryRecommendation">Executive Summary Recommendation:</label>
                <InputText id="executiveSummaryRecommendation" className="w-full mb-3 p-inputtext-sm" value={_entity?.executiveSummaryRecommendation} onChange={(e) => setValByKey("executiveSummaryRecommendation", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["executiveSummaryRecommendation"]) && (
              <p className="m-0" key="error-executiveSummaryRecommendation">
                {error["executiveSummaryRecommendation"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="borrowerDob">Borrower Dob:</label>
                <Calendar id="borrowerDob"  value={_entity?.borrowerDob ? new Date(_entity?.borrowerDob) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("borrowerDob", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["borrowerDob"]) && (
              <p className="m-0" key="error-borrowerDob">
                {error["borrowerDob"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="employmentIncomeAfterTax">Employment Income After Tax:</label>
                <InputNumber id="employmentIncomeAfterTax" className="w-full mb-3 p-inputtext-sm" value={_entity?.employmentIncomeAfterTax} onChange={(e) => setValByKey("employmentIncomeAfterTax", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["employmentIncomeAfterTax"]) && (
              <p className="m-0" key="error-employmentIncomeAfterTax">
                {error["employmentIncomeAfterTax"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="totalDeclaredIncome">Total Declared Income:</label>
                <InputNumber id="totalDeclaredIncome" className="w-full mb-3 p-inputtext-sm" value={_entity?.totalDeclaredIncome} onChange={(e) => setValByKey("totalDeclaredIncome", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["totalDeclaredIncome"]) && (
              <p className="m-0" key="error-totalDeclaredIncome">
                {error["totalDeclaredIncome"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="existingMortgageOutstanding">Existing Mortgage Outstanding:</label>
                <InputNumber id="existingMortgageOutstanding" className="w-full mb-3 p-inputtext-sm" value={_entity?.existingMortgageOutstanding} onChange={(e) => setValByKey("existingMortgageOutstanding", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["existingMortgageOutstanding"]) && (
              <p className="m-0" key="error-existingMortgageOutstanding">
                {error["existingMortgageOutstanding"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="monthlyMortgagePayment">Monthly Mortgage Payment:</label>
                <InputNumber id="monthlyMortgagePayment" className="w-full mb-3 p-inputtext-sm" value={_entity?.monthlyMortgagePayment} onChange={(e) => setValByKey("monthlyMortgagePayment", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["monthlyMortgagePayment"]) && (
              <p className="m-0" key="error-monthlyMortgagePayment">
                {error["monthlyMortgagePayment"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="primaryResidenceValue">Primary Residence Value:</label>
                <InputNumber id="primaryResidenceValue" className="w-full mb-3 p-inputtext-sm" value={_entity?.primaryResidenceValue} onChange={(e) => setValByKey("primaryResidenceValue", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["primaryResidenceValue"]) && (
              <p className="m-0" key="error-primaryResidenceValue">
                {error["primaryResidenceValue"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="creditProfileSummary">Credit Profile Summary:</label>
                <InputText id="creditProfileSummary" className="w-full mb-3 p-inputtext-sm" value={_entity?.creditProfileSummary} onChange={(e) => setValByKey("creditProfileSummary", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["creditProfileSummary"]) && (
              <p className="m-0" key="error-creditProfileSummary">
                {error["creditProfileSummary"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="propertyType">Property Type:</label>
                <InputText id="propertyType" className="w-full mb-3 p-inputtext-sm" value={_entity?.propertyType} onChange={(e) => setValByKey("propertyType", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["propertyType"]) && (
              <p className="m-0" key="error-propertyType">
                {error["propertyType"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="estimatedPropertyValue">Estimated Property Value:</label>
                <InputNumber id="estimatedPropertyValue" className="w-full mb-3 p-inputtext-sm" value={_entity?.estimatedPropertyValue} onChange={(e) => setValByKey("estimatedPropertyValue", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["estimatedPropertyValue"]) && (
              <p className="m-0" key="error-estimatedPropertyValue">
                {error["estimatedPropertyValue"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="exitStrategySummary">Exit Strategy Summary:</label>
                <InputText id="exitStrategySummary" className="w-full mb-3 p-inputtext-sm" value={_entity?.exitStrategySummary} onChange={(e) => setValByKey("exitStrategySummary", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["exitStrategySummary"]) && (
              <p className="m-0" key="error-exitStrategySummary">
                {error["exitStrategySummary"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="preparedBy">Prepared By:</label>
                <Dropdown id="preparedBy" value={_entity?.preparedBy?._id} optionLabel="name" optionValue="value" options={preparedByOptions} onChange={(e) => setValByKey("preparedBy", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["preparedBy"]) && (
              <p className="m-0" key="error-preparedBy">
                {error["preparedBy"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="preparedDate">Prepared Date:</label>
                <Calendar id="preparedDate"  value={_entity?.preparedDate ? new Date(_entity?.preparedDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("preparedDate", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["preparedDate"]) && (
              <p className="m-0" key="error-preparedDate">
                {error["preparedDate"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="status">Status:</label>
                <InputText id="status" className="w-full mb-3 p-inputtext-sm" value={_entity?.status} onChange={(e) => setValByKey("status", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["status"]) && (
              <p className="m-0" key="error-status">
                {error["status"]}
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

export default connect(mapState, mapDispatch)(CreditPaperEditDialogComponent);
