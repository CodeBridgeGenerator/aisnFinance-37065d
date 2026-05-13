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
import { Checkbox } from 'primereact/checkbox';
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

const SecurityPropertiesEditDialogComponent = (props) => {
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
propertyType: _entity?.propertyType,
address: _entity?.address,
postcode: _entity?.postcode,
description: _entity?.description,
tenure: _entity?.tenure,
vacantPossessionOnCompletion: _entity?.vacantPossessionOnCompletion,
leaseholdUnexpiredTermYears: _entity?.leaseholdUnexpiredTermYears,
leaseholdUnexpiredTermMonths: _entity?.leaseholdUnexpiredTermMonths,
leaseholdGroundRentPerAnnum: _entity?.leaseholdGroundRentPerAnnum,
lettingRentalIncomePerAnnum: _entity?.lettingRentalIncomePerAnnum,
lettingRentReviewDate: _entity?.lettingRentReviewDate,
valuationContactName: _entity?.valuationContactName,
valuationContactPhoneNo: _entity?.valuationContactPhoneNo,
valuationContactEmail: _entity?.valuationContactEmail,
purchasePrice: _entity?.purchasePrice,
purchaseCurrentValue: _entity?.purchaseCurrentValue,
purchaseDeposit: _entity?.purchaseDeposit,
purchaseDepositSources: _entity?.purchaseDepositSources,
purchaseOtherDepositSource: _entity?.purchaseOtherDepositSource,
purchaseRepaymentDetails: _entity?.purchaseRepaymentDetails,
ownedPropertyAcquiredDate: _entity?.ownedPropertyAcquiredDate,
ownedPropertyPurchasePrice: _entity?.ownedPropertyPurchasePrice,
ownedPropertyMostRecentValuation: _entity?.ownedPropertyMostRecentValuation,
ownedPropertyValuationDate: _entity?.ownedPropertyValuationDate,
ownedPropertyOutstandingMortgage: _entity?.ownedPropertyOutstandingMortgage,
ownedPropertyCurrentLenderName: _entity?.ownedPropertyCurrentLenderName,
ownedPropertycurrentLenderAddress: _entity?.ownedPropertycurrentLenderAddress,
ownedPropertymortgageAccountNumber: _entity?.ownedPropertymortgageAccountNumber,
ownedPropertyhasOtherCharges: _entity?.ownedPropertyhasOtherCharges,
ownedPropertyotherChargesDetails: _entity?.ownedPropertyotherChargesDetails,
        };

        setLoading(true);
        try {
            
        await client.service("securityProperties").patch(_entity._id, _data);
        const eagerResult = await client
            .service("securityProperties")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "applicationId",
                    service : "commercialApplications",
                    select:["status"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info securityProperties updated successfully" });
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
        <Dialog header="Edit Security Properties" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="securityProperties-edit-dialog-component">
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
                <label htmlFor="address">Address:</label>
                <InputText id="address" className="w-full mb-3 p-inputtext-sm" value={_entity?.address} onChange={(e) => setValByKey("address", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["address"]) && (
              <p className="m-0" key="error-address">
                {error["address"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="postcode">Postcode:</label>
                <InputText id="postcode" className="w-full mb-3 p-inputtext-sm" value={_entity?.postcode} onChange={(e) => setValByKey("postcode", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["postcode"]) && (
              <p className="m-0" key="error-postcode">
                {error["postcode"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="description">Description:</label>
                <InputText id="description" className="w-full mb-3 p-inputtext-sm" value={_entity?.description} onChange={(e) => setValByKey("description", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["description"]) && (
              <p className="m-0" key="error-description">
                {error["description"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="tenure">Tenure:</label>
                <InputText id="tenure" className="w-full mb-3 p-inputtext-sm" value={_entity?.tenure} onChange={(e) => setValByKey("tenure", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["tenure"]) && (
              <p className="m-0" key="error-tenure">
                {error["tenure"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="vacantPossessionOnCompletion">Vacant Possession On Completion:</label>
                <Checkbox id="vacantPossessionOnCompletion" className="ml-3" checked={_entity?.vacantPossessionOnCompletion} onChange={(e) => setValByKey("vacantPossessionOnCompletion", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["vacantPossessionOnCompletion"]) && (
              <p className="m-0" key="error-vacantPossessionOnCompletion">
                {error["vacantPossessionOnCompletion"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="leaseholdUnexpiredTermYears">Leasehold Unexpired Term Years:</label>
                <InputNumber id="leaseholdUnexpiredTermYears" className="w-full mb-3 p-inputtext-sm" value={_entity?.leaseholdUnexpiredTermYears} onChange={(e) => setValByKey("leaseholdUnexpiredTermYears", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["leaseholdUnexpiredTermYears"]) && (
              <p className="m-0" key="error-leaseholdUnexpiredTermYears">
                {error["leaseholdUnexpiredTermYears"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="leaseholdUnexpiredTermMonths">Leasehold Unexpired Term Months:</label>
                <InputNumber id="leaseholdUnexpiredTermMonths" className="w-full mb-3 p-inputtext-sm" value={_entity?.leaseholdUnexpiredTermMonths} onChange={(e) => setValByKey("leaseholdUnexpiredTermMonths", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["leaseholdUnexpiredTermMonths"]) && (
              <p className="m-0" key="error-leaseholdUnexpiredTermMonths">
                {error["leaseholdUnexpiredTermMonths"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="leaseholdGroundRentPerAnnum">Leasehold Ground Rent Per Annum:</label>
                <InputNumber id="leaseholdGroundRentPerAnnum" className="w-full mb-3 p-inputtext-sm" value={_entity?.leaseholdGroundRentPerAnnum} onChange={(e) => setValByKey("leaseholdGroundRentPerAnnum", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["leaseholdGroundRentPerAnnum"]) && (
              <p className="m-0" key="error-leaseholdGroundRentPerAnnum">
                {error["leaseholdGroundRentPerAnnum"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="lettingRentalIncomePerAnnum">Letting Rental Income Per Annum:</label>
                <InputNumber id="lettingRentalIncomePerAnnum" className="w-full mb-3 p-inputtext-sm" value={_entity?.lettingRentalIncomePerAnnum} onChange={(e) => setValByKey("lettingRentalIncomePerAnnum", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["lettingRentalIncomePerAnnum"]) && (
              <p className="m-0" key="error-lettingRentalIncomePerAnnum">
                {error["lettingRentalIncomePerAnnum"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="lettingRentReviewDate">Letting Rent Review Date:</label>
                <Calendar id="lettingRentReviewDate"  value={_entity?.lettingRentReviewDate ? new Date(_entity?.lettingRentReviewDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("lettingRentReviewDate", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["lettingRentReviewDate"]) && (
              <p className="m-0" key="error-lettingRentReviewDate">
                {error["lettingRentReviewDate"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="valuationContactName">Valuation Contact Name:</label>
                <InputText id="valuationContactName" className="w-full mb-3 p-inputtext-sm" value={_entity?.valuationContactName} onChange={(e) => setValByKey("valuationContactName", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["valuationContactName"]) && (
              <p className="m-0" key="error-valuationContactName">
                {error["valuationContactName"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="valuationContactPhoneNo">Valuation Contact Phone No:</label>
                <InputText id="valuationContactPhoneNo" className="w-full mb-3 p-inputtext-sm" value={_entity?.valuationContactPhoneNo} onChange={(e) => setValByKey("valuationContactPhoneNo", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["valuationContactPhoneNo"]) && (
              <p className="m-0" key="error-valuationContactPhoneNo">
                {error["valuationContactPhoneNo"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="valuationContactEmail">Valuation Contact Email:</label>
                <InputText id="valuationContactEmail" className="w-full mb-3 p-inputtext-sm" value={_entity?.valuationContactEmail} onChange={(e) => setValByKey("valuationContactEmail", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["valuationContactEmail"]) && (
              <p className="m-0" key="error-valuationContactEmail">
                {error["valuationContactEmail"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="purchasePrice">Purchase Price:</label>
                <InputNumber id="purchasePrice" className="w-full mb-3 p-inputtext-sm" value={_entity?.purchasePrice} onChange={(e) => setValByKey("purchasePrice", e.value)}  useGrouping={false}/>
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
                <label htmlFor="purchaseCurrentValue">Purchase Current Value:</label>
                <InputNumber id="purchaseCurrentValue" className="w-full mb-3 p-inputtext-sm" value={_entity?.purchaseCurrentValue} onChange={(e) => setValByKey("purchaseCurrentValue", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["purchaseCurrentValue"]) && (
              <p className="m-0" key="error-purchaseCurrentValue">
                {error["purchaseCurrentValue"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="purchaseDeposit">Purchase Deposit:</label>
                <InputNumber id="purchaseDeposit" className="w-full mb-3 p-inputtext-sm" value={_entity?.purchaseDeposit} onChange={(e) => setValByKey("purchaseDeposit", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["purchaseDeposit"]) && (
              <p className="m-0" key="error-purchaseDeposit">
                {error["purchaseDeposit"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="purchaseDepositSources">Purchase Deposit Sources:</label>
                <InputText id="purchaseDepositSources" className="w-full mb-3 p-inputtext-sm" value={_entity?.purchaseDepositSources} onChange={(e) => setValByKey("purchaseDepositSources", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["purchaseDepositSources"]) && (
              <p className="m-0" key="error-purchaseDepositSources">
                {error["purchaseDepositSources"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="purchaseOtherDepositSource">Purchase Other Deposit Source:</label>
                <InputText id="purchaseOtherDepositSource" className="w-full mb-3 p-inputtext-sm" value={_entity?.purchaseOtherDepositSource} onChange={(e) => setValByKey("purchaseOtherDepositSource", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["purchaseOtherDepositSource"]) && (
              <p className="m-0" key="error-purchaseOtherDepositSource">
                {error["purchaseOtherDepositSource"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="purchaseRepaymentDetails">Purchase Repayment Details:</label>
                <InputText id="purchaseRepaymentDetails" className="w-full mb-3 p-inputtext-sm" value={_entity?.purchaseRepaymentDetails} onChange={(e) => setValByKey("purchaseRepaymentDetails", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["purchaseRepaymentDetails"]) && (
              <p className="m-0" key="error-purchaseRepaymentDetails">
                {error["purchaseRepaymentDetails"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="ownedPropertyAcquiredDate">Owned Property Acquired Date:</label>
                <Calendar id="ownedPropertyAcquiredDate"  value={_entity?.ownedPropertyAcquiredDate ? new Date(_entity?.ownedPropertyAcquiredDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("ownedPropertyAcquiredDate", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["ownedPropertyAcquiredDate"]) && (
              <p className="m-0" key="error-ownedPropertyAcquiredDate">
                {error["ownedPropertyAcquiredDate"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="ownedPropertyPurchasePrice">Owned Property Purchase Price:</label>
                <InputNumber id="ownedPropertyPurchasePrice" className="w-full mb-3 p-inputtext-sm" value={_entity?.ownedPropertyPurchasePrice} onChange={(e) => setValByKey("ownedPropertyPurchasePrice", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["ownedPropertyPurchasePrice"]) && (
              <p className="m-0" key="error-ownedPropertyPurchasePrice">
                {error["ownedPropertyPurchasePrice"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="ownedPropertyMostRecentValuation">Owned Property Most Recent Valuation:</label>
                <InputNumber id="ownedPropertyMostRecentValuation" className="w-full mb-3 p-inputtext-sm" value={_entity?.ownedPropertyMostRecentValuation} onChange={(e) => setValByKey("ownedPropertyMostRecentValuation", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["ownedPropertyMostRecentValuation"]) && (
              <p className="m-0" key="error-ownedPropertyMostRecentValuation">
                {error["ownedPropertyMostRecentValuation"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="ownedPropertyValuationDate">Owned Property Valuation Date:</label>
                <InputText id="ownedPropertyValuationDate" className="w-full mb-3 p-inputtext-sm" value={_entity?.ownedPropertyValuationDate} onChange={(e) => setValByKey("ownedPropertyValuationDate", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["ownedPropertyValuationDate"]) && (
              <p className="m-0" key="error-ownedPropertyValuationDate">
                {error["ownedPropertyValuationDate"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="ownedPropertyOutstandingMortgage">Owned Property Outstanding Mortgage:</label>
                <InputNumber id="ownedPropertyOutstandingMortgage" className="w-full mb-3 p-inputtext-sm" value={_entity?.ownedPropertyOutstandingMortgage} onChange={(e) => setValByKey("ownedPropertyOutstandingMortgage", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["ownedPropertyOutstandingMortgage"]) && (
              <p className="m-0" key="error-ownedPropertyOutstandingMortgage">
                {error["ownedPropertyOutstandingMortgage"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="ownedPropertyCurrentLenderName">Owned Property Current Lender Name:</label>
                <InputText id="ownedPropertyCurrentLenderName" className="w-full mb-3 p-inputtext-sm" value={_entity?.ownedPropertyCurrentLenderName} onChange={(e) => setValByKey("ownedPropertyCurrentLenderName", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["ownedPropertyCurrentLenderName"]) && (
              <p className="m-0" key="error-ownedPropertyCurrentLenderName">
                {error["ownedPropertyCurrentLenderName"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="ownedPropertycurrentLenderAddress">Owned Propertycurrent Lender Address:</label>
                <InputText id="ownedPropertycurrentLenderAddress" className="w-full mb-3 p-inputtext-sm" value={_entity?.ownedPropertycurrentLenderAddress} onChange={(e) => setValByKey("ownedPropertycurrentLenderAddress", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["ownedPropertycurrentLenderAddress"]) && (
              <p className="m-0" key="error-ownedPropertycurrentLenderAddress">
                {error["ownedPropertycurrentLenderAddress"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="ownedPropertymortgageAccountNumber">Owned Propertymortgage Account Number:</label>
                <InputText id="ownedPropertymortgageAccountNumber" className="w-full mb-3 p-inputtext-sm" value={_entity?.ownedPropertymortgageAccountNumber} onChange={(e) => setValByKey("ownedPropertymortgageAccountNumber", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["ownedPropertymortgageAccountNumber"]) && (
              <p className="m-0" key="error-ownedPropertymortgageAccountNumber">
                {error["ownedPropertymortgageAccountNumber"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="ownedPropertyhasOtherCharges">Owned Propertyhas Other Charges:</label>
                <Checkbox id="ownedPropertyhasOtherCharges" className="ml-3" checked={_entity?.ownedPropertyhasOtherCharges} onChange={(e) => setValByKey("ownedPropertyhasOtherCharges", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["ownedPropertyhasOtherCharges"]) && (
              <p className="m-0" key="error-ownedPropertyhasOtherCharges">
                {error["ownedPropertyhasOtherCharges"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="ownedPropertyotherChargesDetails">Owned Propertyother Charges Details:</label>
                <InputText id="ownedPropertyotherChargesDetails" className="w-full mb-3 p-inputtext-sm" value={_entity?.ownedPropertyotherChargesDetails} onChange={(e) => setValByKey("ownedPropertyotherChargesDetails", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["ownedPropertyotherChargesDetails"]) && (
              <p className="m-0" key="error-ownedPropertyotherChargesDetails">
                {error["ownedPropertyotherChargesDetails"]}
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

export default connect(mapState, mapDispatch)(SecurityPropertiesEditDialogComponent);
