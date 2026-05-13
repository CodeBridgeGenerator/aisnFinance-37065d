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

const DealsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [clientId, setClientId] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [clientId], setError);
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
            clientId: _entity?.clientId?._id,status: _entity?.status,phase: _entity?.phase,approvedAt: _entity?.approvedAt,rejectedAt: _entity?.rejectedAt,rejectionReason: _entity?.rejectionReason,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("deals").create(_data);
        const eagerResult = await client
            .service("deals")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "clientId",
                    service : "clients",
                    select:["clientType"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Deals updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Deals" });
        }
        setLoading(false);
    };

    

    

    useEffect(() => {
                    // on mount clients
                    client
                        .service("clients")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleClientsId } })
                        .then((res) => {
                            setClientId(res.data.map((e) => { return { name: e['clientType'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Clients", type: "error", message: error.message || "Failed get clients" });
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

    const clientIdOptions = clientId.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Deals" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="deals-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="clientId">Client Id:</label>
                <Dropdown id="clientId" value={_entity?.clientId?._id} optionLabel="name" optionValue="value" options={clientIdOptions} onChange={(e) => setValByKey("clientId", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["clientId"]) ? (
              <p className="m-0" key="error-clientId">
                {error["clientId"]}
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
                <label htmlFor="phase">Phase:</label>
                <InputText id="phase" className="w-full mb-3 p-inputtext-sm" value={_entity?.phase} onChange={(e) => setValByKey("phase", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["phase"]) ? (
              <p className="m-0" key="error-phase">
                {error["phase"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="approvedAt">Approved At:</label>
                <Calendar id="approvedAt" value={_entity?.approvedAt ? new Date(_entity?.approvedAt) : null} onChange={ (e) => setValByKey("approvedAt", e.value)} showTime hourFormat="24"  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["approvedAt"]) ? (
              <p className="m-0" key="error-approvedAt">
                {error["approvedAt"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="rejectedAt">Rejected At:</label>
                <Calendar id="rejectedAt" value={_entity?.rejectedAt ? new Date(_entity?.rejectedAt) : null} onChange={ (e) => setValByKey("rejectedAt", e.value)} showTime hourFormat="24"  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["rejectedAt"]) ? (
              <p className="m-0" key="error-rejectedAt">
                {error["rejectedAt"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="rejectionReason">Rejection Reason:</label>
                <InputText id="rejectionReason" className="w-full mb-3 p-inputtext-sm" value={_entity?.rejectionReason} onChange={(e) => setValByKey("rejectionReason", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["rejectionReason"]) ? (
              <p className="m-0" key="error-rejectionReason">
                {error["rejectionReason"]}
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

export default connect(mapState, mapDispatch)(DealsCreateDialogComponent);
