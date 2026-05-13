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

const ClientsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [leadId, setLeadId] = useState([])
const [profileId, setProfileId] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [leadId,profileId], setError);
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
            leadId: _entity?.leadId?._id,profileId: _entity?.profileId?._id,clientType: _entity?.clientType,status: _entity?.status,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("clients").create(_data);
        const eagerResult = await client
            .service("clients")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "leadId",
                    service : "leads",
                    select:["name"]},{
                    path : "profileId",
                    service : "profiles",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Clients updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Clients" });
        }
        setLoading(false);
    };

    

    

    useEffect(() => {
                    // on mount leads
                    client
                        .service("leads")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleLeadsId } })
                        .then((res) => {
                            setLeadId(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Leads", type: "error", message: error.message || "Failed get leads" });
                        });
                }, []);

useEffect(() => {
                    // on mount profiles
                    client
                        .service("profiles")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleProfilesId } })
                        .then((res) => {
                            setProfileId(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Profiles", type: "error", message: error.message || "Failed get profiles" });
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

    const leadIdOptions = leadId.map((elem) => ({ name: elem.name, value: elem.value }));
const profileIdOptions = profileId.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Clients" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="clients-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="leadId">Lead Id:</label>
                <Dropdown id="leadId" value={_entity?.leadId?._id} optionLabel="name" optionValue="value" options={leadIdOptions} onChange={(e) => setValByKey("leadId", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["leadId"]) ? (
              <p className="m-0" key="error-leadId">
                {error["leadId"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="profileId">Profile Id:</label>
                <Dropdown id="profileId" value={_entity?.profileId?._id} optionLabel="name" optionValue="value" options={profileIdOptions} onChange={(e) => setValByKey("profileId", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["profileId"]) ? (
              <p className="m-0" key="error-profileId">
                {error["profileId"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="clientType">Client Type:</label>
                <InputText id="clientType" className="w-full mb-3 p-inputtext-sm" value={_entity?.clientType} onChange={(e) => setValByKey("clientType", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["clientType"]) ? (
              <p className="m-0" key="error-clientType">
                {error["clientType"]}
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

export default connect(mapState, mapDispatch)(ClientsCreateDialogComponent);
