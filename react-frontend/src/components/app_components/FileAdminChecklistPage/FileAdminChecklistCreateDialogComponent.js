import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { Checkbox } from "primereact/checkbox";


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
      if (Object.hasOwnProperty.call(errorObj.errors, key)) {
        const element = errorObj.errors[key];
        if (element?.message) {
          errMsg[key] = element.message;
        }
      }
    }
    return errMsg.length ? errMsg : errorObj.message ? { error : errorObj.message} : {};
};

const FileAdminChecklistCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [deal, setDeal] = useState([])
const [checkedBy, setCheckedBy] = useState([])
const [applicationForm, setApplicationForm] = useState([])
const [completedByProfile, setCompletedByProfile] = useState([])

    useEffect(() => {
        let init  = {identificationProof: false,factfindKyc: false,loanMemorandumPreparedOnFile: false,boardSignOff: false,offerLetterPreparedSent: false,facilityLetterPreparedChecked: false,valuationsInstructed: false,solicitorInstructed: false,loanDrawnDown: false,postDrawdownDirectDebitAccounts: false,propertyInsuranceLandRegistryOnFile: false};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [deal,checkedBy,applicationForm,completedByProfile], setError);
        }
        set_entity({...init});
        setError({});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
        
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            deal: _entity?.deal?._id,adviserName: _entity?.adviserName,clientNames: _entity?.clientNames,checkedBy: _entity?.checkedBy?._id,checkedDate: _entity?.checkedDate,providerName: _entity?.providerName,lenderName: _entity?.lenderName,productName: _entity?.productName,applicationForm: _entity?.applicationForm?._id,applicationFormDate: _entity?.applicationFormDate,identificationProof: _entity?.identificationProof || false,identificationProofDate: _entity?.identificationProofDate,factfindKyc: _entity?.factfindKyc || false,factfindKycDate: _entity?.factfindKycDate,loanMemorandumPreparedOnFile: _entity?.loanMemorandumPreparedOnFile || false,boardSignOff: _entity?.boardSignOff || false,offerLetterPreparedSent: _entity?.offerLetterPreparedSent || false,offerLetterPrepared: _entity?.offerLetterPrepared,facilityLetterPreparedChecked: _entity?.facilityLetterPreparedChecked || false,valuationsInstructed: _entity?.valuationsInstructed || false,valuationsInstructedDate: _entity?.valuationsInstructedDate,solicitorInstructed: _entity?.solicitorInstructed || false,loanDrawnDown: _entity?.loanDrawnDown || false,postDrawdownDirectDebitAccounts: _entity?.postDrawdownDirectDebitAccounts || false,propertyInsuranceLandRegistryOnFile: _entity?.propertyInsuranceLandRegistryOnFile || false,notes: _entity?.notes,status: _entity?.status,completedByProfile: _entity?.completedByProfile?._id,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("fileAdminChecklist").create(_data);
        const eagerResult = await client
            .service("fileAdminChecklist")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "deal",
                    service : "deals",
                    select:["status"]},{
                    path : "checkedBy",
                    service : "profiles",
                    select:["name"]},{
                    path : "applicationForm",
                    service : "commercialApplications",
                    select:["status"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info File Admin Checklist updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in File Admin Checklist" });
        }
        setLoading(false);
    };

    

    

    useEffect(() => {
                    // on mount deals
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

useEffect(() => {
                    // on mount profiles
                    client
                        .service("profiles")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleProfilesId } })
                        .then((res) => {
                            setCheckedBy(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Profiles", type: "error", message: error.message || "Failed get profiles" });
                        });
                }, []);

useEffect(() => {
                    // on mount commercialApplications
                    client
                        .service("commercialApplications")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleCommercialApplicationsId } })
                        .then((res) => {
                            setApplicationForm(res.data.map((e) => { return { name: e['status'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "CommercialApplications", type: "error", message: error.message || "Failed get commercialApplications" });
                        });
                }, []);

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
const checkedByOptions = checkedBy.map((elem) => ({ name: elem.name, value: elem.value }));
const applicationFormOptions = applicationForm.map((elem) => ({ name: elem.name, value: elem.value }));
const completedByProfileOptions = completedByProfile.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create File Admin Checklist" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="fileAdminChecklist-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="deal">Deal:</label>
                <Dropdown id="deal" value={_entity?.deal?._id} optionLabel="name" optionValue="value" options={dealOptions} onChange={(e) => setValByKey("deal", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["deal"]) ? (
              <p className="m-0" key="error-deal">
                {error["deal"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="adviserName">Adviser Name:</label>
                <InputText id="adviserName" className="w-full mb-3 p-inputtext-sm" value={_entity?.adviserName} onChange={(e) => setValByKey("adviserName", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["adviserName"]) ? (
              <p className="m-0" key="error-adviserName">
                {error["adviserName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="clientNames">Client Names:</label>
                <InputText id="clientNames" className="w-full mb-3 p-inputtext-sm" value={_entity?.clientNames} onChange={(e) => setValByKey("clientNames", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["clientNames"]) ? (
              <p className="m-0" key="error-clientNames">
                {error["clientNames"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="checkedBy">Checked By:</label>
                <Dropdown id="checkedBy" value={_entity?.checkedBy?._id} optionLabel="name" optionValue="value" options={checkedByOptions} onChange={(e) => setValByKey("checkedBy", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["checkedBy"]) ? (
              <p className="m-0" key="error-checkedBy">
                {error["checkedBy"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="checkedDate">Checked Date:</label>
                <Calendar id="checkedDate"  value={_entity?.checkedDate ? new Date(_entity?.checkedDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("checkedDate", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["checkedDate"]) ? (
              <p className="m-0" key="error-checkedDate">
                {error["checkedDate"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="providerName">Provider Name:</label>
                <InputText id="providerName" className="w-full mb-3 p-inputtext-sm" value={_entity?.providerName} onChange={(e) => setValByKey("providerName", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["providerName"]) ? (
              <p className="m-0" key="error-providerName">
                {error["providerName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="lenderName">Lender Name:</label>
                <InputText id="lenderName" className="w-full mb-3 p-inputtext-sm" value={_entity?.lenderName} onChange={(e) => setValByKey("lenderName", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["lenderName"]) ? (
              <p className="m-0" key="error-lenderName">
                {error["lenderName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="productName">Product Name:</label>
                <InputText id="productName" className="w-full mb-3 p-inputtext-sm" value={_entity?.productName} onChange={(e) => setValByKey("productName", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["productName"]) ? (
              <p className="m-0" key="error-productName">
                {error["productName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="applicationForm">Application Form:</label>
                <Dropdown id="applicationForm" value={_entity?.applicationForm?._id} optionLabel="name" optionValue="value" options={applicationFormOptions} onChange={(e) => setValByKey("applicationForm", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["applicationForm"]) ? (
              <p className="m-0" key="error-applicationForm">
                {error["applicationForm"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="applicationFormDate">Application Form Date:</label>
                <InputNumber id="applicationFormDate" className="w-full mb-3 p-inputtext-sm" value={_entity?.applicationFormDate} onChange={(e) => setValByKey("applicationFormDate", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["applicationFormDate"]) ? (
              <p className="m-0" key="error-applicationFormDate">
                {error["applicationFormDate"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="identificationProof">Identification Proof:</label>
                <Checkbox id="identificationProof" className="ml-3" checked={_entity?.identificationProof} onChange={(e) => setValByKey("identificationProof", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["identificationProof"]) ? (
              <p className="m-0" key="error-identificationProof">
                {error["identificationProof"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="identificationProofDate">Identification Proof Date:</label>
                <InputNumber id="identificationProofDate" className="w-full mb-3 p-inputtext-sm" value={_entity?.identificationProofDate} onChange={(e) => setValByKey("identificationProofDate", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["identificationProofDate"]) ? (
              <p className="m-0" key="error-identificationProofDate">
                {error["identificationProofDate"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="factfindKyc">Factfind Kyc:</label>
                <Checkbox id="factfindKyc" className="ml-3" checked={_entity?.factfindKyc} onChange={(e) => setValByKey("factfindKyc", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["factfindKyc"]) ? (
              <p className="m-0" key="error-factfindKyc">
                {error["factfindKyc"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="factfindKycDate">Factfind Kyc Date:</label>
                <InputNumber id="factfindKycDate" className="w-full mb-3 p-inputtext-sm" value={_entity?.factfindKycDate} onChange={(e) => setValByKey("factfindKycDate", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["factfindKycDate"]) ? (
              <p className="m-0" key="error-factfindKycDate">
                {error["factfindKycDate"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="loanMemorandumPreparedOnFile">Loan Memorandum Prepared On File:</label>
                <Checkbox id="loanMemorandumPreparedOnFile" className="ml-3" checked={_entity?.loanMemorandumPreparedOnFile} onChange={(e) => setValByKey("loanMemorandumPreparedOnFile", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["loanMemorandumPreparedOnFile"]) ? (
              <p className="m-0" key="error-loanMemorandumPreparedOnFile">
                {error["loanMemorandumPreparedOnFile"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="boardSignOff">Board Sign Off:</label>
                <Checkbox id="boardSignOff" className="ml-3" checked={_entity?.boardSignOff} onChange={(e) => setValByKey("boardSignOff", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["boardSignOff"]) ? (
              <p className="m-0" key="error-boardSignOff">
                {error["boardSignOff"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="offerLetterPreparedSent">Offer Letter Prepared Sent:</label>
                <Checkbox id="offerLetterPreparedSent" className="ml-3" checked={_entity?.offerLetterPreparedSent} onChange={(e) => setValByKey("offerLetterPreparedSent", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["offerLetterPreparedSent"]) ? (
              <p className="m-0" key="error-offerLetterPreparedSent">
                {error["offerLetterPreparedSent"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="offerLetterPrepared">Offer Letter Prepared:</label>
                <InputNumber id="offerLetterPrepared" className="w-full mb-3 p-inputtext-sm" value={_entity?.offerLetterPrepared} onChange={(e) => setValByKey("offerLetterPrepared", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["offerLetterPrepared"]) ? (
              <p className="m-0" key="error-offerLetterPrepared">
                {error["offerLetterPrepared"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="facilityLetterPreparedChecked">Facility Letter Prepared Checked:</label>
                <Checkbox id="facilityLetterPreparedChecked" className="ml-3" checked={_entity?.facilityLetterPreparedChecked} onChange={(e) => setValByKey("facilityLetterPreparedChecked", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["facilityLetterPreparedChecked"]) ? (
              <p className="m-0" key="error-facilityLetterPreparedChecked">
                {error["facilityLetterPreparedChecked"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="valuationsInstructed">Valuations Instructed:</label>
                <Checkbox id="valuationsInstructed" className="ml-3" checked={_entity?.valuationsInstructed} onChange={(e) => setValByKey("valuationsInstructed", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["valuationsInstructed"]) ? (
              <p className="m-0" key="error-valuationsInstructed">
                {error["valuationsInstructed"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="valuationsInstructedDate">Valuations Instructed Date:</label>
                <InputNumber id="valuationsInstructedDate" className="w-full mb-3 p-inputtext-sm" value={_entity?.valuationsInstructedDate} onChange={(e) => setValByKey("valuationsInstructedDate", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["valuationsInstructedDate"]) ? (
              <p className="m-0" key="error-valuationsInstructedDate">
                {error["valuationsInstructedDate"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="solicitorInstructed">Solicitor Instructed:</label>
                <Checkbox id="solicitorInstructed" className="ml-3" checked={_entity?.solicitorInstructed} onChange={(e) => setValByKey("solicitorInstructed", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["solicitorInstructed"]) ? (
              <p className="m-0" key="error-solicitorInstructed">
                {error["solicitorInstructed"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="loanDrawnDown">Loan Drawn Down:</label>
                <Checkbox id="loanDrawnDown" className="ml-3" checked={_entity?.loanDrawnDown} onChange={(e) => setValByKey("loanDrawnDown", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["loanDrawnDown"]) ? (
              <p className="m-0" key="error-loanDrawnDown">
                {error["loanDrawnDown"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="postDrawdownDirectDebitAccounts">Post Drawdown Direct Debit Accounts:</label>
                <Checkbox id="postDrawdownDirectDebitAccounts" className="ml-3" checked={_entity?.postDrawdownDirectDebitAccounts} onChange={(e) => setValByKey("postDrawdownDirectDebitAccounts", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["postDrawdownDirectDebitAccounts"]) ? (
              <p className="m-0" key="error-postDrawdownDirectDebitAccounts">
                {error["postDrawdownDirectDebitAccounts"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="propertyInsuranceLandRegistryOnFile">Property Insurance Land Registry On File:</label>
                <Checkbox id="propertyInsuranceLandRegistryOnFile" className="ml-3" checked={_entity?.propertyInsuranceLandRegistryOnFile} onChange={(e) => setValByKey("propertyInsuranceLandRegistryOnFile", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["propertyInsuranceLandRegistryOnFile"]) ? (
              <p className="m-0" key="error-propertyInsuranceLandRegistryOnFile">
                {error["propertyInsuranceLandRegistryOnFile"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="notes">Notes:</label>
                <InputText id="notes" className="w-full mb-3 p-inputtext-sm" value={_entity?.notes} onChange={(e) => setValByKey("notes", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["notes"]) ? (
              <p className="m-0" key="error-notes">
                {error["notes"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="status">Status:</label>
                <InputText id="status" className="w-full mb-3 p-inputtext-sm" value={_entity?.status} onChange={(e) => setValByKey("status", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["status"]) ? (
              <p className="m-0" key="error-status">
                {error["status"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="completedByProfile">Completed By Profile:</label>
                <Dropdown id="completedByProfile" value={_entity?.completedByProfile?._id} optionLabel="name" optionValue="value" options={completedByProfileOptions} onChange={(e) => setValByKey("completedByProfile", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["completedByProfile"]) ? (
              <p className="m-0" key="error-completedByProfile">
                {error["completedByProfile"]}
              </p>
            ) : null}
          </small>
            </div>
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

export default connect(mapState, mapDispatch)(FileAdminChecklistCreateDialogComponent);
