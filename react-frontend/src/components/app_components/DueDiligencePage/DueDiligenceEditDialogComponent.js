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
import { Calendar } from 'primereact/calendar';


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

const DueDiligenceEditDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [dealId, setDealId] = useState([])
const [reviewedBy, setReviewedBy] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount deals
                    client
                        .service("deals")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleDealsId } })
                        .then((res) => {
                            setDealId(res.data.map((e) => { return { name: e['phase'], value: e._id }}));
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
                            setReviewedBy(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Profiles", type: "error", message: error.message || "Failed get profiles" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            dealId: _entity?.dealId?._id,
reviewedBy: _entity?.reviewedBy?._id,
creditSafeResult: _entity?.creditSafeResult,
creditSafeDate: _entity?.creditSafeDate,
propertyDeskReviewNotes: _entity?.propertyDeskReviewNotes,
residentialBtlDesktopVal: _entity?.residentialBtlDesktopVal,
commercialValuationNotes: _entity?.commercialValuationNotes,
overallFindings: _entity?.overallFindings,
recommendation: _entity?.recommendation,
status: _entity?.status,
reviewedAt: _entity?.reviewedAt,
        };

        setLoading(true);
        try {
            
        await client.service("dueDiligence").patch(_entity._id, _data);
        const eagerResult = await client
            .service("dueDiligence")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "dealId",
                    service : "deals",
                    select:["phase"]},{
                    path : "reviewedBy",
                    service : "profiles",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info dueDiligence updated successfully" });
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
const reviewedByOptions = reviewedBy.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Due Diligence" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="dueDiligence-edit-dialog-component">
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
                <label htmlFor="reviewedBy">Reviewed By:</label>
                <Dropdown id="reviewedBy" value={_entity?.reviewedBy?._id} optionLabel="name" optionValue="value" options={reviewedByOptions} onChange={(e) => setValByKey("reviewedBy", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["reviewedBy"]) && (
              <p className="m-0" key="error-reviewedBy">
                {error["reviewedBy"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="creditSafeResult">Credit Safe Result:</label>
                <InputText id="creditSafeResult" className="w-full mb-3 p-inputtext-sm" value={_entity?.creditSafeResult} onChange={(e) => setValByKey("creditSafeResult", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["creditSafeResult"]) && (
              <p className="m-0" key="error-creditSafeResult">
                {error["creditSafeResult"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="creditSafeDate">Credit Safe Date:</label>
                <Calendar id="creditSafeDate"  value={_entity?.creditSafeDate ? new Date(_entity?.creditSafeDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("creditSafeDate", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["creditSafeDate"]) && (
              <p className="m-0" key="error-creditSafeDate">
                {error["creditSafeDate"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="propertyDeskReviewNotes">Property Desk Review Notes:</label>
                <InputText id="propertyDeskReviewNotes" className="w-full mb-3 p-inputtext-sm" value={_entity?.propertyDeskReviewNotes} onChange={(e) => setValByKey("propertyDeskReviewNotes", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["propertyDeskReviewNotes"]) && (
              <p className="m-0" key="error-propertyDeskReviewNotes">
                {error["propertyDeskReviewNotes"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="residentialBtlDesktopVal">Residential Btl Desktop Val:</label>
                <InputText id="residentialBtlDesktopVal" className="w-full mb-3 p-inputtext-sm" value={_entity?.residentialBtlDesktopVal} onChange={(e) => setValByKey("residentialBtlDesktopVal", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["residentialBtlDesktopVal"]) && (
              <p className="m-0" key="error-residentialBtlDesktopVal">
                {error["residentialBtlDesktopVal"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="commercialValuationNotes">Commercial Valuation Notes:</label>
                <InputText id="commercialValuationNotes" className="w-full mb-3 p-inputtext-sm" value={_entity?.commercialValuationNotes} onChange={(e) => setValByKey("commercialValuationNotes", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["commercialValuationNotes"]) && (
              <p className="m-0" key="error-commercialValuationNotes">
                {error["commercialValuationNotes"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="overallFindings">Overall Findings:</label>
                <InputText id="overallFindings" className="w-full mb-3 p-inputtext-sm" value={_entity?.overallFindings} onChange={(e) => setValByKey("overallFindings", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["overallFindings"]) && (
              <p className="m-0" key="error-overallFindings">
                {error["overallFindings"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="recommendation">Recommendation:</label>
                <InputText id="recommendation" className="w-full mb-3 p-inputtext-sm" value={_entity?.recommendation} onChange={(e) => setValByKey("recommendation", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["recommendation"]) && (
              <p className="m-0" key="error-recommendation">
                {error["recommendation"]}
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
                <label htmlFor="reviewedAt">Reviewed At:</label>
                <Calendar id="reviewedAt" value={_entity?.reviewedAt ? new Date(_entity?.reviewedAt) : null} onChange={ (e) => setValByKey("reviewedAt", e.value)} showTime hourFormat="24"  />
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

export default connect(mapState, mapDispatch)(DueDiligenceEditDialogComponent);
