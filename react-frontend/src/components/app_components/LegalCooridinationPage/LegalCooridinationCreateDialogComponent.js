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

const LegalCooridinationCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [dealId, setDealId] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [dealId], setError);
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
            dealId: _entity?.dealId?._id,aisnSolicitorFirm: _entity?.aisnSolicitorFirm,aisnSolicitorContact: _entity?.aisnSolicitorContact,aisnSolicitorPhone: _entity?.aisnSolicitorPhone,aisnSolicitorEmail: _entity?.aisnSolicitorEmail,clientSolicitorFirm: _entity?.clientSolicitorFirm,clientSolicitorContact: _entity?.clientSolicitorContact,clientSolicitorPhone: _entity?.clientSolicitorPhone,clientSolicitorEmail: _entity?.clientSolicitorEmail,docsSentToSolicitorAt: _entity?.docsSentToSolicitorAt,docsSentChecklist: _entity?.docsSentChecklist,securityDocsPreparedAt: _entity?.securityDocsPreparedAt,expectedCompletionDate: _entity?.expectedCompletionDate,actualCompletionDate: _entity?.actualCompletionDate,completionTimelineNotes: _entity?.completionTimelineNotes,status: _entity?.status,clientNotifiedAt: _entity?.clientNotifiedAt,notificationTemplateUsed: _entity?.notificationTemplateUsed,notes: _entity?.notes,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("legalCooridination").create(_data);
        const eagerResult = await client
            .service("legalCooridination")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "dealId",
                    service : "deals",
                    select:["status"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Legal Cooridination updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Legal Cooridination" });
        }
        setLoading(false);
    };

    

    

    useEffect(() => {
                    // on mount deals
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
        <Dialog header="Create Legal Cooridination" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="legalCooridination-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="dealId">Deal Id:</label>
                <Dropdown id="dealId" value={_entity?.dealId?._id} optionLabel="name" optionValue="value" options={dealIdOptions} onChange={(e) => setValByKey("dealId", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["dealId"]) ? (
              <p className="m-0" key="error-dealId">
                {error["dealId"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="aisnSolicitorFirm">Aisn Solicitor Firm:</label>
                <InputText id="aisnSolicitorFirm" className="w-full mb-3 p-inputtext-sm" value={_entity?.aisnSolicitorFirm} onChange={(e) => setValByKey("aisnSolicitorFirm", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["aisnSolicitorFirm"]) ? (
              <p className="m-0" key="error-aisnSolicitorFirm">
                {error["aisnSolicitorFirm"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="aisnSolicitorContact">Aisn Solicitor Contact:</label>
                <InputText id="aisnSolicitorContact" className="w-full mb-3 p-inputtext-sm" value={_entity?.aisnSolicitorContact} onChange={(e) => setValByKey("aisnSolicitorContact", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["aisnSolicitorContact"]) ? (
              <p className="m-0" key="error-aisnSolicitorContact">
                {error["aisnSolicitorContact"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="aisnSolicitorPhone">Aisn Solicitor Phone:</label>
                <InputText id="aisnSolicitorPhone" className="w-full mb-3 p-inputtext-sm" value={_entity?.aisnSolicitorPhone} onChange={(e) => setValByKey("aisnSolicitorPhone", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["aisnSolicitorPhone"]) ? (
              <p className="m-0" key="error-aisnSolicitorPhone">
                {error["aisnSolicitorPhone"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="aisnSolicitorEmail">Aisn Solicitor Email:</label>
                <InputText id="aisnSolicitorEmail" className="w-full mb-3 p-inputtext-sm" value={_entity?.aisnSolicitorEmail} onChange={(e) => setValByKey("aisnSolicitorEmail", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["aisnSolicitorEmail"]) ? (
              <p className="m-0" key="error-aisnSolicitorEmail">
                {error["aisnSolicitorEmail"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="clientSolicitorFirm">Client Solicitor Firm:</label>
                <InputText id="clientSolicitorFirm" className="w-full mb-3 p-inputtext-sm" value={_entity?.clientSolicitorFirm} onChange={(e) => setValByKey("clientSolicitorFirm", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["clientSolicitorFirm"]) ? (
              <p className="m-0" key="error-clientSolicitorFirm">
                {error["clientSolicitorFirm"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="clientSolicitorContact">Client Solicitor Contact:</label>
                <InputText id="clientSolicitorContact" className="w-full mb-3 p-inputtext-sm" value={_entity?.clientSolicitorContact} onChange={(e) => setValByKey("clientSolicitorContact", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["clientSolicitorContact"]) ? (
              <p className="m-0" key="error-clientSolicitorContact">
                {error["clientSolicitorContact"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="clientSolicitorPhone">Client Solicitor Phone:</label>
                <InputText id="clientSolicitorPhone" className="w-full mb-3 p-inputtext-sm" value={_entity?.clientSolicitorPhone} onChange={(e) => setValByKey("clientSolicitorPhone", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["clientSolicitorPhone"]) ? (
              <p className="m-0" key="error-clientSolicitorPhone">
                {error["clientSolicitorPhone"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="clientSolicitorEmail">Client Solicitor Email:</label>
                <InputText id="clientSolicitorEmail" className="w-full mb-3 p-inputtext-sm" value={_entity?.clientSolicitorEmail} onChange={(e) => setValByKey("clientSolicitorEmail", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["clientSolicitorEmail"]) ? (
              <p className="m-0" key="error-clientSolicitorEmail">
                {error["clientSolicitorEmail"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="docsSentToSolicitorAt">Docs Sent To Solicitor At:</label>
                <InputText id="docsSentToSolicitorAt" className="w-full mb-3 p-inputtext-sm" value={_entity?.docsSentToSolicitorAt} onChange={(e) => setValByKey("docsSentToSolicitorAt", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["docsSentToSolicitorAt"]) ? (
              <p className="m-0" key="error-docsSentToSolicitorAt">
                {error["docsSentToSolicitorAt"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="docsSentChecklist">Docs Sent Checklist:</label>
                <InputText id="docsSentChecklist" className="w-full mb-3 p-inputtext-sm" value={_entity?.docsSentChecklist} onChange={(e) => setValByKey("docsSentChecklist", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["docsSentChecklist"]) ? (
              <p className="m-0" key="error-docsSentChecklist">
                {error["docsSentChecklist"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="securityDocsPreparedAt">Security Docs Prepared At:</label>
                <InputText id="securityDocsPreparedAt" className="w-full mb-3 p-inputtext-sm" value={_entity?.securityDocsPreparedAt} onChange={(e) => setValByKey("securityDocsPreparedAt", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["securityDocsPreparedAt"]) ? (
              <p className="m-0" key="error-securityDocsPreparedAt">
                {error["securityDocsPreparedAt"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="expectedCompletionDate">Expected Completion Date:</label>
                <Calendar id="expectedCompletionDate"  value={_entity?.expectedCompletionDate ? new Date(_entity?.expectedCompletionDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("expectedCompletionDate", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["expectedCompletionDate"]) ? (
              <p className="m-0" key="error-expectedCompletionDate">
                {error["expectedCompletionDate"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="actualCompletionDate">Actual Completion Date:</label>
                <Calendar id="actualCompletionDate"  value={_entity?.actualCompletionDate ? new Date(_entity?.actualCompletionDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("actualCompletionDate", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["actualCompletionDate"]) ? (
              <p className="m-0" key="error-actualCompletionDate">
                {error["actualCompletionDate"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="completionTimelineNotes">Completion Timeline Notes:</label>
                <InputText id="completionTimelineNotes" className="w-full mb-3 p-inputtext-sm" value={_entity?.completionTimelineNotes} onChange={(e) => setValByKey("completionTimelineNotes", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["completionTimelineNotes"]) ? (
              <p className="m-0" key="error-completionTimelineNotes">
                {error["completionTimelineNotes"]}
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
                <label htmlFor="clientNotifiedAt">Client Notified At:</label>
                <Calendar id="clientNotifiedAt"  value={_entity?.clientNotifiedAt ? new Date(_entity?.clientNotifiedAt) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("clientNotifiedAt", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["clientNotifiedAt"]) ? (
              <p className="m-0" key="error-clientNotifiedAt">
                {error["clientNotifiedAt"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="notificationTemplateUsed">Notification Template Used:</label>
                <InputText id="notificationTemplateUsed" className="w-full mb-3 p-inputtext-sm" value={_entity?.notificationTemplateUsed} onChange={(e) => setValByKey("notificationTemplateUsed", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["notificationTemplateUsed"]) ? (
              <p className="m-0" key="error-notificationTemplateUsed">
                {error["notificationTemplateUsed"]}
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

export default connect(mapState, mapDispatch)(LegalCooridinationCreateDialogComponent);
