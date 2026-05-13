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

const DirectorDecisionEditDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [creditpaperId, setCreditpaperId] = useState([])
const [directorProfileId, setDirectorProfileId] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount creditPaper
                    client
                        .service("creditPaper")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleCreditPaperId } })
                        .then((res) => {
                            setCreditpaperId(res.data.map((e) => { return { name: e['borrowerName'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "CreditPaper", type: "error", message: error.message || "Failed get creditPaper" });
                        });
                }, []);
 useEffect(() => {
                    //on mount profiles
                    client
                        .service("profiles")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleProfilesId } })
                        .then((res) => {
                            setDirectorProfileId(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Profiles", type: "error", message: error.message || "Failed get profiles" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            creditpaperId: _entity?.creditpaperId?._id,
directorProfileId: _entity?.directorProfileId?._id,
recommendationText: _entity?.recommendationText,
decision: _entity?.decision,
comments: _entity?.comments,
signedAt: _entity?.signedAt,
decidedAt: _entity?.decidedAt,
        };

        setLoading(true);
        try {
            
        await client.service("directorDecision").patch(_entity._id, _data);
        const eagerResult = await client
            .service("directorDecision")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "creditpaperId",
                    service : "creditPaper",
                    select:["borrowerName"]},{
                    path : "directorProfileId",
                    service : "profiles",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info directorDecision updated successfully" });
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

    const creditpaperIdOptions = creditpaperId.map((elem) => ({ name: elem.name, value: elem.value }));
const directorProfileIdOptions = directorProfileId.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Director Decision" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="directorDecision-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="creditpaperId">Creditpaper Id:</label>
                <Dropdown id="creditpaperId" value={_entity?.creditpaperId?._id} optionLabel="name" optionValue="value" options={creditpaperIdOptions} onChange={(e) => setValByKey("creditpaperId", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["creditpaperId"]) && (
              <p className="m-0" key="error-creditpaperId">
                {error["creditpaperId"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="directorProfileId">Director Profile Id:</label>
                <Dropdown id="directorProfileId" value={_entity?.directorProfileId?._id} optionLabel="name" optionValue="value" options={directorProfileIdOptions} onChange={(e) => setValByKey("directorProfileId", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["directorProfileId"]) && (
              <p className="m-0" key="error-directorProfileId">
                {error["directorProfileId"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="recommendationText">Recommendation Text:</label>
                <InputText id="recommendationText" className="w-full mb-3 p-inputtext-sm" value={_entity?.recommendationText} onChange={(e) => setValByKey("recommendationText", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["recommendationText"]) && (
              <p className="m-0" key="error-recommendationText">
                {error["recommendationText"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="decision">Decision:</label>
                <InputText id="decision" className="w-full mb-3 p-inputtext-sm" value={_entity?.decision} onChange={(e) => setValByKey("decision", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["decision"]) && (
              <p className="m-0" key="error-decision">
                {error["decision"]}
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
                <label htmlFor="signedAt">Signed At:</label>
                <Calendar id="signedAt"  value={_entity?.signedAt ? new Date(_entity?.signedAt) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("signedAt", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["signedAt"]) && (
              <p className="m-0" key="error-signedAt">
                {error["signedAt"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="decidedAt">Decided At:</label>
                <Calendar id="decidedAt"  value={_entity?.decidedAt ? new Date(_entity?.decidedAt) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("decidedAt", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["decidedAt"]) && (
              <p className="m-0" key="error-decidedAt">
                {error["decidedAt"]}
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

export default connect(mapState, mapDispatch)(DirectorDecisionEditDialogComponent);
