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
import UploadFilesToS3 from "../../../services/UploadFilesToS3";


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

const OfferLetterEditDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [dealId, setDealId] = useState([])
const [clientProfile, setClientProfile] = useState([])
const [generatedByProfile, setGeneratedByProfile] = useState([])

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
                            setClientProfile(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Profiles", type: "error", message: error.message || "Failed get profiles" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            dealId: _entity?.dealId?._id,
clientProfile: _entity?.clientProfile?._id,
applicantName: _entity?.applicantName,
referenceNo: _entity?.referenceNo,
approvalDate: _entity?.approvalDate,
validityDays: _entity?.validityDays,
securityDescription: _entity?.securityDescription,
estimatedValue: _entity?.estimatedValue,
purchasePrice: _entity?.purchasePrice,
grossLoanAmount: _entity?.grossLoanAmount,
maxLtvPercentage: _entity?.maxLtvPercentage,
loanTermMonths: _entity?.loanTermMonths,
arrangementFeePercentage: _entity?.arrangementFeePercentage,
concessionaryInterestRateMonthly: _entity?.concessionaryInterestRateMonthly,
standardInterestRateMonthly: _entity?.standardInterestRateMonthly,
monthlyInterestPaymentsCharges: _entity?.monthlyInterestPaymentsCharges,
advanceInterestAmount: _entity?.advanceInterestAmount,
exitStrategyCondition: _entity?.exitStrategyCondition,
status: _entity?.status,
generatedPdfDocument: _entity?.generatedPdfDocument,
generatedByProfile: _entity?.generatedByProfile?._id,
        };

        setLoading(true);
        try {
            
        await client.service("offerLetter").patch(_entity._id, _data);
        const eagerResult = await client
            .service("offerLetter")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "dealId",
                    service : "deals",
                    select:["status"]},{
                    path : "clientProfile",
                    service : "profiles",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info offerLetter updated successfully" });
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
const clientProfileOptions = clientProfile.map((elem) => ({ name: elem.name, value: elem.value }));
const generatedByProfileOptions = generatedByProfile.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Offer Letter" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="offerLetter-edit-dialog-component">
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
                <label htmlFor="clientProfile">Client Profile:</label>
                <Dropdown id="clientProfile" value={_entity?.clientProfile?._id} optionLabel="name" optionValue="value" options={clientProfileOptions} onChange={(e) => setValByKey("clientProfile", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["clientProfile"]) && (
              <p className="m-0" key="error-clientProfile">
                {error["clientProfile"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="applicantName">Applicant Name:</label>
                <InputText id="applicantName" className="w-full mb-3 p-inputtext-sm" value={_entity?.applicantName} onChange={(e) => setValByKey("applicantName", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["applicantName"]) && (
              <p className="m-0" key="error-applicantName">
                {error["applicantName"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="referenceNo">Reference No:</label>
                <InputText id="referenceNo" className="w-full mb-3 p-inputtext-sm" value={_entity?.referenceNo} onChange={(e) => setValByKey("referenceNo", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["referenceNo"]) && (
              <p className="m-0" key="error-referenceNo">
                {error["referenceNo"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="approvalDate">Approval Date:</label>
                <Calendar id="approvalDate"  value={_entity?.approvalDate ? new Date(_entity?.approvalDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("approvalDate", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["approvalDate"]) && (
              <p className="m-0" key="error-approvalDate">
                {error["approvalDate"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="validityDays">Validity Days:</label>
                <InputNumber id="validityDays" className="w-full mb-3 p-inputtext-sm" value={_entity?.validityDays} onChange={(e) => setValByKey("validityDays", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["validityDays"]) && (
              <p className="m-0" key="error-validityDays">
                {error["validityDays"]}
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
                <label htmlFor="estimatedValue">Estimated Value:</label>
                <InputNumber id="estimatedValue" className="w-full mb-3 p-inputtext-sm" value={_entity?.estimatedValue} onChange={(e) => setValByKey("estimatedValue", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["estimatedValue"]) && (
              <p className="m-0" key="error-estimatedValue">
                {error["estimatedValue"]}
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
                <label htmlFor="grossLoanAmount">Gross Loan Amount:</label>
                <InputNumber id="grossLoanAmount" className="w-full mb-3 p-inputtext-sm" value={_entity?.grossLoanAmount} onChange={(e) => setValByKey("grossLoanAmount", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["grossLoanAmount"]) && (
              <p className="m-0" key="error-grossLoanAmount">
                {error["grossLoanAmount"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="maxLtvPercentage">Max Ltv Percentage:</label>
                <InputNumber id="maxLtvPercentage" className="w-full mb-3 p-inputtext-sm" value={_entity?.maxLtvPercentage} onChange={(e) => setValByKey("maxLtvPercentage", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["maxLtvPercentage"]) && (
              <p className="m-0" key="error-maxLtvPercentage">
                {error["maxLtvPercentage"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="loanTermMonths">Loan Term Months:</label>
                <InputNumber id="loanTermMonths" className="w-full mb-3 p-inputtext-sm" value={_entity?.loanTermMonths} onChange={(e) => setValByKey("loanTermMonths", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["loanTermMonths"]) && (
              <p className="m-0" key="error-loanTermMonths">
                {error["loanTermMonths"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="arrangementFeePercentage">Arrangement Fee Percentage:</label>
                <InputNumber id="arrangementFeePercentage" className="w-full mb-3 p-inputtext-sm" value={_entity?.arrangementFeePercentage} onChange={(e) => setValByKey("arrangementFeePercentage", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["arrangementFeePercentage"]) && (
              <p className="m-0" key="error-arrangementFeePercentage">
                {error["arrangementFeePercentage"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="concessionaryInterestRateMonthly">Concessionary Interest Rate Monthly:</label>
                <InputNumber id="concessionaryInterestRateMonthly" className="w-full mb-3 p-inputtext-sm" value={_entity?.concessionaryInterestRateMonthly} onChange={(e) => setValByKey("concessionaryInterestRateMonthly", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["concessionaryInterestRateMonthly"]) && (
              <p className="m-0" key="error-concessionaryInterestRateMonthly">
                {error["concessionaryInterestRateMonthly"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="standardInterestRateMonthly">Standard Interest Rate Monthly:</label>
                <InputNumber id="standardInterestRateMonthly" className="w-full mb-3 p-inputtext-sm" value={_entity?.standardInterestRateMonthly} onChange={(e) => setValByKey("standardInterestRateMonthly", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["standardInterestRateMonthly"]) && (
              <p className="m-0" key="error-standardInterestRateMonthly">
                {error["standardInterestRateMonthly"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="monthlyInterestPaymentsCharges">Monthly Interest Payments Charges:</label>
                <InputNumber id="monthlyInterestPaymentsCharges" className="w-full mb-3 p-inputtext-sm" value={_entity?.monthlyInterestPaymentsCharges} onChange={(e) => setValByKey("monthlyInterestPaymentsCharges", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["monthlyInterestPaymentsCharges"]) && (
              <p className="m-0" key="error-monthlyInterestPaymentsCharges">
                {error["monthlyInterestPaymentsCharges"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="advanceInterestAmount">Advance Interest Amount:</label>
                <InputNumber id="advanceInterestAmount" className="w-full mb-3 p-inputtext-sm" value={_entity?.advanceInterestAmount} onChange={(e) => setValByKey("advanceInterestAmount", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["advanceInterestAmount"]) && (
              <p className="m-0" key="error-advanceInterestAmount">
                {error["advanceInterestAmount"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="exitStrategyCondition">Exit Strategy Condition:</label>
                <InputText id="exitStrategyCondition" className="w-full mb-3 p-inputtext-sm" value={_entity?.exitStrategyCondition} onChange={(e) => setValByKey("exitStrategyCondition", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["exitStrategyCondition"]) && (
              <p className="m-0" key="error-exitStrategyCondition">
                {error["exitStrategyCondition"]}
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
<div className="col-12 field">
                <span className="align-items-center">
                    <label htmlFor="generatedPdfDocument">Generated Pdf Document:</label>
                    <UploadFilesToS3 type={'edit'} setValByKey={setValByKey} onSave={onSave} id={urlParams.singleOfferLetterId} serviceName="offerLetter" />
                </span>
                <small className="p-error">
                {!_.isEmpty(error["generatedPdfDocument"]) && (
                  <p className="m-0" key="error-generatedPdfDocument">
                    {error["generatedPdfDocument"]}
                  </p>
                )}
              </small>
                </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="generatedByProfile">Generated By Profile:</label>
                <Dropdown id="generatedByProfile" value={_entity?.generatedByProfile?._id} optionLabel="name" optionValue="value" options={generatedByProfileOptions} onChange={(e) => setValByKey("generatedByProfile", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["generatedByProfile"]) && (
              <p className="m-0" key="error-generatedByProfile">
                {error["generatedByProfile"]}
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

export default connect(mapState, mapDispatch)(OfferLetterEditDialogComponent);
