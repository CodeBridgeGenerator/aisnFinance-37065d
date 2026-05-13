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
import { InputNumber } from "primereact/inputnumber";


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

const LeadsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [user, setUser] = useState([])
const [assignedSalesperson, setAssignedSalesperson] = useState([])
const [assignedAdmin, setAssignedAdmin] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [user,assignedSalesperson,assignedAdmin], setError);
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
            user: _entity?.user?._id,name: _entity?.name,contactNo: _entity?.contactNo,assignedSalesperson: _entity?.assignedSalesperson?._id,assignedAdmin: _entity?.assignedAdmin?._id,status: _entity?.status,rejectionReason: _entity?.rejectionReason,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("leads").create(_data);
        const eagerResult = await client
            .service("leads")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "user",
                    service : "users",
                    select:["name"]},{
                    path : "assignedSalesperson",
                    service : "profiles",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Leads updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Leads" });
        }
        setLoading(false);
    };

    

    

    useEffect(() => {
                    // on mount users
                    client
                        .service("users")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleUsersId } })
                        .then((res) => {
                            setUser(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Users", type: "error", message: error.message || "Failed get users" });
                        });
                }, []);

useEffect(() => {
                    // on mount profiles
                    client
                        .service("profiles")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleProfilesId } })
                        .then((res) => {
                            setAssignedSalesperson(res.data.map((e) => { return { name: e['name'], value: e._id }}));
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

    const userOptions = user.map((elem) => ({ name: elem.name, value: elem.value }));
const assignedSalespersonOptions = assignedSalesperson.map((elem) => ({ name: elem.name, value: elem.value }));
const assignedAdminOptions = assignedAdmin.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Leads" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="leads-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="user">User:</label>
                <Dropdown id="user" value={_entity?.user?._id} optionLabel="name" optionValue="value" options={userOptions} onChange={(e) => setValByKey("user", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["user"]) ? (
              <p className="m-0" key="error-user">
                {error["user"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="name">Name:</label>
                <InputText id="name" className="w-full mb-3 p-inputtext-sm" value={_entity?.name} onChange={(e) => setValByKey("name", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["name"]) ? (
              <p className="m-0" key="error-name">
                {error["name"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="contactNo">Contact No:</label>
                <InputNumber id="contactNo" className="w-full mb-3 p-inputtext-sm" value={_entity?.contactNo} onChange={(e) => setValByKey("contactNo", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["contactNo"]) ? (
              <p className="m-0" key="error-contactNo">
                {error["contactNo"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="assignedSalesperson">Assigned Salesperson:</label>
                <Dropdown id="assignedSalesperson" value={_entity?.assignedSalesperson?._id} optionLabel="name" optionValue="value" options={assignedSalespersonOptions} onChange={(e) => setValByKey("assignedSalesperson", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["assignedSalesperson"]) ? (
              <p className="m-0" key="error-assignedSalesperson">
                {error["assignedSalesperson"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="assignedAdmin">Assigned Admin:</label>
                <Dropdown id="assignedAdmin" value={_entity?.assignedAdmin?._id} optionLabel="name" optionValue="value" options={assignedAdminOptions} onChange={(e) => setValByKey("assignedAdmin", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["assignedAdmin"]) ? (
              <p className="m-0" key="error-assignedAdmin">
                {error["assignedAdmin"]}
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

export default connect(mapState, mapDispatch)(LeadsCreateDialogComponent);
