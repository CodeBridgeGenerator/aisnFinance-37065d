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
import { Checkbox } from 'primereact/checkbox';


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

const AnnualClientReviewsEditDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [deal, setDeal] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount deals
                    client
                        .service("deals")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleDealsId } })
                        .then((res) => {
                            setDeal(res.data.map((e) => { return { name: e['status'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Deals", type: "error", message: error.message || "Failed get deals" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            deal: _entity?.deal?._id,
clientProfile: _entity?.clientProfile,
reviewYear: _entity?.reviewYear,
reviewDueDate: _entity?.reviewDueDate,
reminderDate: _entity?.reminderDate,
epcCertOnFile: _entity?.epcCertOnFile,
epcCertDocument: _entity?.epcCertDocument,
annualBuildingInsuranceOnFile: _entity?.annualBuildingInsuranceOnFile,
buildingInsuranceExpiryDate: _entity?.buildingInsuranceExpiryDate,
buildingInsuranceDocument: _entity?.buildingInsuranceDocument,
isBuildingInsuranceExpired: _entity?.isBuildingInsuranceExpired,
gasCertOnFile: _entity?.gasCertOnFile,
gasCertDocument: _entity?.gasCertDocument,
electricPatCertOnFile: _entity?.electricPatCertOnFile,
electricPatCertDocument: _entity?.electricPatCertDocument,
companyAccountsOnFile: _entity?.companyAccountsOnFile,
landRegistryCheckOnFile: _entity?.landRegistryCheckOnFile,
landRegistryCheckDocument: _entity?.landRegistryCheckDocument,
creditReportOnFile: _entity?.creditReportOnFile,
creditReportDocument: _entity?.creditReportDocument,
comments: _entity?.comments,
status: _entity?.status,
reviewedByProfile: _entity?.reviewedByProfile,
reviewedAt: _entity?.reviewedAt,
        };

        setLoading(true);
        try {
            
        await client.service("annualClientReviews").patch(_entity._id, _data);
        const eagerResult = await client
            .service("annualClientReviews")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "deal",
                    service : "deals",
                    select:["status"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info annualClientReviews updated successfully" });
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

    const dealOptions = deal.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Annual Client Reviews" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="annualClientReviews-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="deal">Deal:</label>
                <Dropdown id="deal" value={_entity?.deal?._id} optionLabel="name" optionValue="value" options={dealOptions} onChange={(e) => setValByKey("deal", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["deal"]) && (
              <p className="m-0" key="error-deal">
                {error["deal"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="clientProfile">Client Profile:</label>
                <InputText id="clientProfile" className="w-full mb-3 p-inputtext-sm" value={_entity?.clientProfile} onChange={(e) => setValByKey("clientProfile", e.target.value)}  />
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
                <label htmlFor="reviewYear">Review Year:</label>
                <InputNumber id="reviewYear" className="w-full mb-3 p-inputtext-sm" value={_entity?.reviewYear} onChange={(e) => setValByKey("reviewYear", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["reviewYear"]) && (
              <p className="m-0" key="error-reviewYear">
                {error["reviewYear"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="reviewDueDate">Review Due Date:</label>
                <Calendar id="reviewDueDate"  value={_entity?.reviewDueDate ? new Date(_entity?.reviewDueDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("reviewDueDate", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["reviewDueDate"]) && (
              <p className="m-0" key="error-reviewDueDate">
                {error["reviewDueDate"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="reminderDate">Reminder Date:</label>
                <Calendar id="reminderDate"  value={_entity?.reminderDate ? new Date(_entity?.reminderDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("reminderDate", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["reminderDate"]) && (
              <p className="m-0" key="error-reminderDate">
                {error["reminderDate"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="epcCertOnFile">Epc Cert On File:</label>
                <Checkbox id="epcCertOnFile" className="ml-3" checked={_entity?.epcCertOnFile} onChange={(e) => setValByKey("epcCertOnFile", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["epcCertOnFile"]) && (
              <p className="m-0" key="error-epcCertOnFile">
                {error["epcCertOnFile"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="epcCertDocument">Epc Cert Document:</label>
                <InputText id="epcCertDocument" className="w-full mb-3 p-inputtext-sm" value={_entity?.epcCertDocument} onChange={(e) => setValByKey("epcCertDocument", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["epcCertDocument"]) && (
              <p className="m-0" key="error-epcCertDocument">
                {error["epcCertDocument"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="annualBuildingInsuranceOnFile">Annual Building Insurance On File:</label>
                <Checkbox id="annualBuildingInsuranceOnFile" className="ml-3" checked={_entity?.annualBuildingInsuranceOnFile} onChange={(e) => setValByKey("annualBuildingInsuranceOnFile", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["annualBuildingInsuranceOnFile"]) && (
              <p className="m-0" key="error-annualBuildingInsuranceOnFile">
                {error["annualBuildingInsuranceOnFile"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="buildingInsuranceExpiryDate">Building Insurance Expiry Date:</label>
                <Calendar id="buildingInsuranceExpiryDate"  value={_entity?.buildingInsuranceExpiryDate ? new Date(_entity?.buildingInsuranceExpiryDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("buildingInsuranceExpiryDate", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["buildingInsuranceExpiryDate"]) && (
              <p className="m-0" key="error-buildingInsuranceExpiryDate">
                {error["buildingInsuranceExpiryDate"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="buildingInsuranceDocument">Building Insurance Document:</label>
                <InputText id="buildingInsuranceDocument" className="w-full mb-3 p-inputtext-sm" value={_entity?.buildingInsuranceDocument} onChange={(e) => setValByKey("buildingInsuranceDocument", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["buildingInsuranceDocument"]) && (
              <p className="m-0" key="error-buildingInsuranceDocument">
                {error["buildingInsuranceDocument"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="isBuildingInsuranceExpired">Is Building Insurance Expired:</label>
                <Checkbox id="isBuildingInsuranceExpired" className="ml-3" checked={_entity?.isBuildingInsuranceExpired} onChange={(e) => setValByKey("isBuildingInsuranceExpired", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["isBuildingInsuranceExpired"]) && (
              <p className="m-0" key="error-isBuildingInsuranceExpired">
                {error["isBuildingInsuranceExpired"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="gasCertOnFile">Gas Cert On File:</label>
                <Checkbox id="gasCertOnFile" className="ml-3" checked={_entity?.gasCertOnFile} onChange={(e) => setValByKey("gasCertOnFile", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["gasCertOnFile"]) && (
              <p className="m-0" key="error-gasCertOnFile">
                {error["gasCertOnFile"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="gasCertDocument">Gas Cert Document:</label>
                <InputText id="gasCertDocument" className="w-full mb-3 p-inputtext-sm" value={_entity?.gasCertDocument} onChange={(e) => setValByKey("gasCertDocument", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["gasCertDocument"]) && (
              <p className="m-0" key="error-gasCertDocument">
                {error["gasCertDocument"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="electricPatCertOnFile">Electric Pat Cert On File:</label>
                <Checkbox id="electricPatCertOnFile" className="ml-3" checked={_entity?.electricPatCertOnFile} onChange={(e) => setValByKey("electricPatCertOnFile", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["electricPatCertOnFile"]) && (
              <p className="m-0" key="error-electricPatCertOnFile">
                {error["electricPatCertOnFile"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="electricPatCertDocument">Electric Pat Cert Document:</label>
                <InputText id="electricPatCertDocument" className="w-full mb-3 p-inputtext-sm" value={_entity?.electricPatCertDocument} onChange={(e) => setValByKey("electricPatCertDocument", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["electricPatCertDocument"]) && (
              <p className="m-0" key="error-electricPatCertDocument">
                {error["electricPatCertDocument"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="companyAccountsOnFile">Company Accounts On File:</label>
                <Checkbox id="companyAccountsOnFile" className="ml-3" checked={_entity?.companyAccountsOnFile} onChange={(e) => setValByKey("companyAccountsOnFile", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["companyAccountsOnFile"]) && (
              <p className="m-0" key="error-companyAccountsOnFile">
                {error["companyAccountsOnFile"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="landRegistryCheckOnFile">Land Registry Check On File:</label>
                <Checkbox id="landRegistryCheckOnFile" className="ml-3" checked={_entity?.landRegistryCheckOnFile} onChange={(e) => setValByKey("landRegistryCheckOnFile", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["landRegistryCheckOnFile"]) && (
              <p className="m-0" key="error-landRegistryCheckOnFile">
                {error["landRegistryCheckOnFile"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="landRegistryCheckDocument">Land Registry Check Document:</label>
                <InputText id="landRegistryCheckDocument" className="w-full mb-3 p-inputtext-sm" value={_entity?.landRegistryCheckDocument} onChange={(e) => setValByKey("landRegistryCheckDocument", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["landRegistryCheckDocument"]) && (
              <p className="m-0" key="error-landRegistryCheckDocument">
                {error["landRegistryCheckDocument"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="creditReportOnFile">Credit Report On File:</label>
                <Checkbox id="creditReportOnFile" className="ml-3" checked={_entity?.creditReportOnFile} onChange={(e) => setValByKey("creditReportOnFile", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["creditReportOnFile"]) && (
              <p className="m-0" key="error-creditReportOnFile">
                {error["creditReportOnFile"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="creditReportDocument">Credit Report Document:</label>
                <InputText id="creditReportDocument" className="w-full mb-3 p-inputtext-sm" value={_entity?.creditReportDocument} onChange={(e) => setValByKey("creditReportDocument", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["creditReportDocument"]) && (
              <p className="m-0" key="error-creditReportDocument">
                {error["creditReportDocument"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="comments">Comments:</label>
                <InputText id="comments" className="w-full mb-3 p-inputtext-sm" value={_entity?.comments} onChange={(e) => setValByKey("comments", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["comments"]) && (
              <p className="m-0" key="error-comments">
                {error["comments"]}
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
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="reviewedByProfile">Reviewed By Profile:</label>
                <InputText id="reviewedByProfile" className="w-full mb-3 p-inputtext-sm" value={_entity?.reviewedByProfile} onChange={(e) => setValByKey("reviewedByProfile", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["reviewedByProfile"]) && (
              <p className="m-0" key="error-reviewedByProfile">
                {error["reviewedByProfile"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="reviewedAt">Reviewed At:</label>
                <InputNumber id="reviewedAt" className="w-full mb-3 p-inputtext-sm" value={_entity?.reviewedAt} onChange={(e) => setValByKey("reviewedAt", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["reviewedAt"]) && (
              <p className="m-0" key="error-reviewedAt">
                {error["reviewedAt"]}
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

export default connect(mapState, mapDispatch)(AnnualClientReviewsEditDialogComponent);
