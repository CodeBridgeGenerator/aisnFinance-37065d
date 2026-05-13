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

const DibursementCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [dealId, setDealId] = useState([])
const [directorUserId, setDirectorUserId] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [dealId,directorUserId], setError);
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
            dealId: _entity?.dealId?._id,grossLoanAmount: _entity?.grossLoanAmount,totalDeductions: _entity?.totalDeductions,netAmountTransferred: _entity?.netAmountTransferred,directorAapprovedAt: _entity?.directorAapprovedAt,directorUserId: _entity?.directorUserId?._id,fundsTransferredAt: _entity?.fundsTransferredAt,solicitorReceivedAt: _entity?.solicitorReceivedAt,clientSolicitorReceivedAt: _entity?.clientSolicitorReceivedAt,clientProgressNotifiedAt: _entity?.clientProgressNotifiedAt,status: _entity?.status,notes: _entity?.notes,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("dibursement").create(_data);
        const eagerResult = await client
            .service("dibursement")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "dealId",
                    service : "deals",
                    select:["status"]},{
                    path : "directorUserId",
                    service : "profiles",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Dibursement updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Dibursement" });
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

useEffect(() => {
                    // on mount profiles
                    client
                        .service("profiles")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleProfilesId } })
                        .then((res) => {
                            setDirectorUserId(res.data.map((e) => { return { name: e['name'], value: e._id }}));
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

    const dealIdOptions = dealId.map((elem) => ({ name: elem.name, value: elem.value }));
const directorUserIdOptions = directorUserId.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Dibursement" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="dibursement-create-dialog-component">
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
                <label htmlFor="grossLoanAmount">Gross Loan Amount:</label>
                <InputNumber id="grossLoanAmount" className="w-full mb-3 p-inputtext-sm" value={_entity?.grossLoanAmount} onChange={(e) => setValByKey("grossLoanAmount", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["grossLoanAmount"]) ? (
              <p className="m-0" key="error-grossLoanAmount">
                {error["grossLoanAmount"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="totalDeductions">Total Deductions:</label>
                <InputNumber id="totalDeductions" className="w-full mb-3 p-inputtext-sm" value={_entity?.totalDeductions} onChange={(e) => setValByKey("totalDeductions", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["totalDeductions"]) ? (
              <p className="m-0" key="error-totalDeductions">
                {error["totalDeductions"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="netAmountTransferred">Net Amount Transferred:</label>
                <InputNumber id="netAmountTransferred" className="w-full mb-3 p-inputtext-sm" value={_entity?.netAmountTransferred} onChange={(e) => setValByKey("netAmountTransferred", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["netAmountTransferred"]) ? (
              <p className="m-0" key="error-netAmountTransferred">
                {error["netAmountTransferred"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="directorAapprovedAt">Director Aapproved At:</label>
                <Calendar id="directorAapprovedAt"  value={_entity?.directorAapprovedAt ? new Date(_entity?.directorAapprovedAt) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("directorAapprovedAt", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["directorAapprovedAt"]) ? (
              <p className="m-0" key="error-directorAapprovedAt">
                {error["directorAapprovedAt"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="directorUserId">Director User Id:</label>
                <Dropdown id="directorUserId" value={_entity?.directorUserId?._id} optionLabel="name" optionValue="value" options={directorUserIdOptions} onChange={(e) => setValByKey("directorUserId", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["directorUserId"]) ? (
              <p className="m-0" key="error-directorUserId">
                {error["directorUserId"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="fundsTransferredAt">Funds Transferred At:</label>
                <Calendar id="fundsTransferredAt"  value={_entity?.fundsTransferredAt ? new Date(_entity?.fundsTransferredAt) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("fundsTransferredAt", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["fundsTransferredAt"]) ? (
              <p className="m-0" key="error-fundsTransferredAt">
                {error["fundsTransferredAt"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="solicitorReceivedAt">Solicitor Received At:</label>
                <Calendar id="solicitorReceivedAt"  value={_entity?.solicitorReceivedAt ? new Date(_entity?.solicitorReceivedAt) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("solicitorReceivedAt", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["solicitorReceivedAt"]) ? (
              <p className="m-0" key="error-solicitorReceivedAt">
                {error["solicitorReceivedAt"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="clientSolicitorReceivedAt">Client Solicitor Received At:</label>
                <Calendar id="clientSolicitorReceivedAt"  value={_entity?.clientSolicitorReceivedAt ? new Date(_entity?.clientSolicitorReceivedAt) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("clientSolicitorReceivedAt", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["clientSolicitorReceivedAt"]) ? (
              <p className="m-0" key="error-clientSolicitorReceivedAt">
                {error["clientSolicitorReceivedAt"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="clientProgressNotifiedAt">Client Progress Notified At:</label>
                <Calendar id="clientProgressNotifiedAt"  value={_entity?.clientProgressNotifiedAt ? new Date(_entity?.clientProgressNotifiedAt) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("clientProgressNotifiedAt", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["clientProgressNotifiedAt"]) ? (
              <p className="m-0" key="error-clientProgressNotifiedAt">
                {error["clientProgressNotifiedAt"]}
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

export default connect(mapState, mapDispatch)(DibursementCreateDialogComponent);
