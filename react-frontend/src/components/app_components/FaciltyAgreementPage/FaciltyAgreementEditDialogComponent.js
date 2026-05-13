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

const FaciltyAgreementEditDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [dealId, setDealId] = useState([])

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

    const onSave = async () => {
        let _data = {
            dealId: _entity?.dealId?._id,
agreementDate: _entity?.agreementDate,
lenderName: _entity?.lenderName,
borrowerName: _entity?.borrowerName,
borrowerAddress: _entity?.borrowerAddress,
facilityAmount: _entity?.facilityAmount,
marketValuePercentage: _entity?.marketValuePercentage,
loanAdvance: _entity?.loanAdvance,
loanTerm: _entity?.loanTerm,
finalRepaymentDate: _entity?.finalRepaymentDate,
standardRatePerAnnum: _entity?.standardRatePerAnnum,
concessionaryRatePerMonth: _entity?.concessionaryRatePerMonth,
arrangementFeeAmount: _entity?.arrangementFeeAmount,
propertyAddress: _entity?.propertyAddress,
propertyTitleNumber: _entity?.propertyTitleNumber,
securityDescription: _entity?.securityDescription,
lendersSolicitorsName: _entity?.lendersSolicitorsName,
monthlyInterestRate: _entity?.monthlyInterestRate,
borrowerSignatoryName: _entity?.borrowerSignatoryName,
businessPurposeDeclarationDate: _entity?.businessPurposeDeclarationDate,
status: _entity?.status,
        };

        setLoading(true);
        try {
            
        await client.service("faciltyAgreement").patch(_entity._id, _data);
        const eagerResult = await client
            .service("faciltyAgreement")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "dealId",
                    service : "deals",
                    select:["status"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info faciltyAgreement updated successfully" });
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

    return (
        <Dialog header="Edit Facilty Agreement" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="faciltyAgreement-edit-dialog-component">
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
                <label htmlFor="agreementDate">Agreement Date:</label>
                <Calendar id="agreementDate"  value={_entity?.agreementDate ? new Date(_entity?.agreementDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("agreementDate", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["agreementDate"]) && (
              <p className="m-0" key="error-agreementDate">
                {error["agreementDate"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="lenderName">Lender Name:</label>
                <InputText id="lenderName" className="w-full mb-3 p-inputtext-sm" value={_entity?.lenderName} onChange={(e) => setValByKey("lenderName", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["lenderName"]) && (
              <p className="m-0" key="error-lenderName">
                {error["lenderName"]}
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
                <label htmlFor="borrowerAddress">Borrower Address:</label>
                <InputText id="borrowerAddress" className="w-full mb-3 p-inputtext-sm" value={_entity?.borrowerAddress} onChange={(e) => setValByKey("borrowerAddress", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["borrowerAddress"]) && (
              <p className="m-0" key="error-borrowerAddress">
                {error["borrowerAddress"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="facilityAmount">Facility Amount:</label>
                <InputNumber id="facilityAmount" className="w-full mb-3 p-inputtext-sm" value={_entity?.facilityAmount} onChange={(e) => setValByKey("facilityAmount", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["facilityAmount"]) && (
              <p className="m-0" key="error-facilityAmount">
                {error["facilityAmount"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="marketValuePercentage">Market Value Percentage:</label>
                <InputNumber id="marketValuePercentage" className="w-full mb-3 p-inputtext-sm" value={_entity?.marketValuePercentage} onChange={(e) => setValByKey("marketValuePercentage", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["marketValuePercentage"]) && (
              <p className="m-0" key="error-marketValuePercentage">
                {error["marketValuePercentage"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="loanAdvance">Loan Advance:</label>
                <InputNumber id="loanAdvance" className="w-full mb-3 p-inputtext-sm" value={_entity?.loanAdvance} onChange={(e) => setValByKey("loanAdvance", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["loanAdvance"]) && (
              <p className="m-0" key="error-loanAdvance">
                {error["loanAdvance"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="loanTerm">Loan Term:</label>
                <InputNumber id="loanTerm" className="w-full mb-3 p-inputtext-sm" value={_entity?.loanTerm} onChange={(e) => setValByKey("loanTerm", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["loanTerm"]) && (
              <p className="m-0" key="error-loanTerm">
                {error["loanTerm"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="finalRepaymentDate">Final Repayment Date:</label>
                <Calendar id="finalRepaymentDate"  value={_entity?.finalRepaymentDate ? new Date(_entity?.finalRepaymentDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("finalRepaymentDate", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["finalRepaymentDate"]) && (
              <p className="m-0" key="error-finalRepaymentDate">
                {error["finalRepaymentDate"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="standardRatePerAnnum">Standard Rate Per Annum:</label>
                <InputNumber id="standardRatePerAnnum" className="w-full mb-3 p-inputtext-sm" value={_entity?.standardRatePerAnnum} onChange={(e) => setValByKey("standardRatePerAnnum", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["standardRatePerAnnum"]) && (
              <p className="m-0" key="error-standardRatePerAnnum">
                {error["standardRatePerAnnum"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="concessionaryRatePerMonth">Concessionary Rate Per Month:</label>
                <InputNumber id="concessionaryRatePerMonth" className="w-full mb-3 p-inputtext-sm" value={_entity?.concessionaryRatePerMonth} onChange={(e) => setValByKey("concessionaryRatePerMonth", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["concessionaryRatePerMonth"]) && (
              <p className="m-0" key="error-concessionaryRatePerMonth">
                {error["concessionaryRatePerMonth"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="arrangementFeeAmount">Arrangement Fee Amount:</label>
                <InputNumber id="arrangementFeeAmount" className="w-full mb-3 p-inputtext-sm" value={_entity?.arrangementFeeAmount} onChange={(e) => setValByKey("arrangementFeeAmount", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["arrangementFeeAmount"]) && (
              <p className="m-0" key="error-arrangementFeeAmount">
                {error["arrangementFeeAmount"]}
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
                <label htmlFor="propertyTitleNumber">Property Title Number:</label>
                <InputText id="propertyTitleNumber" className="w-full mb-3 p-inputtext-sm" value={_entity?.propertyTitleNumber} onChange={(e) => setValByKey("propertyTitleNumber", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["propertyTitleNumber"]) && (
              <p className="m-0" key="error-propertyTitleNumber">
                {error["propertyTitleNumber"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="securityDescription">Security Description:</label>
                <InputText id="securityDescription" className="w-full mb-3 p-inputtext-sm" value={_entity?.securityDescription} onChange={(e) => setValByKey("securityDescription", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["securityDescription"]) && (
              <p className="m-0" key="error-securityDescription">
                {error["securityDescription"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="lendersSolicitorsName">Lenders Solicitors Name:</label>
                <InputText id="lendersSolicitorsName" className="w-full mb-3 p-inputtext-sm" value={_entity?.lendersSolicitorsName} onChange={(e) => setValByKey("lendersSolicitorsName", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["lendersSolicitorsName"]) && (
              <p className="m-0" key="error-lendersSolicitorsName">
                {error["lendersSolicitorsName"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="monthlyInterestRate">Monthly Interest Rate:</label>
                <InputNumber id="monthlyInterestRate" className="w-full mb-3 p-inputtext-sm" value={_entity?.monthlyInterestRate} onChange={(e) => setValByKey("monthlyInterestRate", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["monthlyInterestRate"]) && (
              <p className="m-0" key="error-monthlyInterestRate">
                {error["monthlyInterestRate"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="borrowerSignatoryName">Borrower Signatory Name:</label>
                <InputText id="borrowerSignatoryName" className="w-full mb-3 p-inputtext-sm" value={_entity?.borrowerSignatoryName} onChange={(e) => setValByKey("borrowerSignatoryName", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["borrowerSignatoryName"]) && (
              <p className="m-0" key="error-borrowerSignatoryName">
                {error["borrowerSignatoryName"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="businessPurposeDeclarationDate">Business Purpose Declaration Date:</label>
                <Calendar id="businessPurposeDeclarationDate"  value={_entity?.businessPurposeDeclarationDate ? new Date(_entity?.businessPurposeDeclarationDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("businessPurposeDeclarationDate", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["businessPurposeDeclarationDate"]) && (
              <p className="m-0" key="error-businessPurposeDeclarationDate">
                {error["businessPurposeDeclarationDate"]}
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

export default connect(mapState, mapDispatch)(FaciltyAgreementEditDialogComponent);
