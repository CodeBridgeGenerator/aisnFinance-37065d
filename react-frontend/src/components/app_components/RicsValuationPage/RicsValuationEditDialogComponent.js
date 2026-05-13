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

const RicsValuationEditDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [dealId, setDealId] = useState([])

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

    const onSave = async () => {
        let _data = {
            dealId: _entity?.dealId?._id,
instructionDate: _entity?.instructionDate,
surveyorName: _entity?.surveyorName,
surveyorCompany: _entity?.surveyorCompany,
surveyorEmail: _entity?.surveyorEmail,
surveyorPhone: _entity?.surveyorPhone,
inspectionDate: _entity?.inspectionDate,
valuationCost: _entity?.valuationCost,
vatAmount: _entity?.vatAmount,
propertyAddress: _entity?.propertyAddress,
estimatedValue: _entity?.estimatedValue,
propertyDescription: _entity?.propertyDescription,
propertyType: _entity?.propertyType,
applicantName: _entity?.applicantName,
accessArrangedThrough: _entity?.accessArrangedThrough,
invoiceEmail: _entity?.invoiceEmail,
status: _entity?.status,
        };

        setLoading(true);
        try {
            
        await client.service("ricsValuation").patch(_entity._id, _data);
        const eagerResult = await client
            .service("ricsValuation")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "dealId",
                    service : "deals",
                    select:["status"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info ricsValuation updated successfully" });
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

    return (
        <Dialog header="Edit Rics Valuation" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="ricsValuation-edit-dialog-component">
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
                <label htmlFor="instructionDate">Instruction Date:</label>
                <Calendar id="instructionDate"  value={_entity?.instructionDate ? new Date(_entity?.instructionDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("instructionDate", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["instructionDate"]) && (
              <p className="m-0" key="error-instructionDate">
                {error["instructionDate"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="surveyorName">Surveyor Name:</label>
                <InputText id="surveyorName" className="w-full mb-3 p-inputtext-sm" value={_entity?.surveyorName} onChange={(e) => setValByKey("surveyorName", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["surveyorName"]) && (
              <p className="m-0" key="error-surveyorName">
                {error["surveyorName"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="surveyorCompany">Surveyor Company:</label>
                <InputText id="surveyorCompany" className="w-full mb-3 p-inputtext-sm" value={_entity?.surveyorCompany} onChange={(e) => setValByKey("surveyorCompany", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["surveyorCompany"]) && (
              <p className="m-0" key="error-surveyorCompany">
                {error["surveyorCompany"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="surveyorEmail">Surveyor Email:</label>
                <InputText id="surveyorEmail" className="w-full mb-3 p-inputtext-sm" value={_entity?.surveyorEmail} onChange={(e) => setValByKey("surveyorEmail", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["surveyorEmail"]) && (
              <p className="m-0" key="error-surveyorEmail">
                {error["surveyorEmail"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="surveyorPhone">Surveyor Phone:</label>
                <InputNumber id="surveyorPhone" className="w-full mb-3 p-inputtext-sm" value={_entity?.surveyorPhone} onChange={(e) => setValByKey("surveyorPhone", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["surveyorPhone"]) && (
              <p className="m-0" key="error-surveyorPhone">
                {error["surveyorPhone"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="inspectionDate">Inspection Date:</label>
                <Calendar id="inspectionDate"  value={_entity?.inspectionDate ? new Date(_entity?.inspectionDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("inspectionDate", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["inspectionDate"]) && (
              <p className="m-0" key="error-inspectionDate">
                {error["inspectionDate"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="valuationCost">Valuation Cost:</label>
                <InputNumber id="valuationCost" className="w-full mb-3 p-inputtext-sm" value={_entity?.valuationCost} onChange={(e) => setValByKey("valuationCost", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["valuationCost"]) && (
              <p className="m-0" key="error-valuationCost">
                {error["valuationCost"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="vatAmount">Vat Amount:</label>
                <InputNumber id="vatAmount" className="w-full mb-3 p-inputtext-sm" value={_entity?.vatAmount} onChange={(e) => setValByKey("vatAmount", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["vatAmount"]) && (
              <p className="m-0" key="error-vatAmount">
                {error["vatAmount"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="propertyAddress">Property Address:</label>
                <InputText id="propertyAddress" className="w-full mb-3 p-inputtext-sm" value={_entity?.propertyAddress} onChange={(e) => setValByKey("propertyAddress", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["propertyAddress"]) && (
              <p className="m-0" key="error-propertyAddress">
                {error["propertyAddress"]}
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
                <label htmlFor="propertyDescription">Property Description:</label>
                <InputText id="propertyDescription" className="w-full mb-3 p-inputtext-sm" value={_entity?.propertyDescription} onChange={(e) => setValByKey("propertyDescription", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["propertyDescription"]) && (
              <p className="m-0" key="error-propertyDescription">
                {error["propertyDescription"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="propertyType">Property Type:</label>
                <InputText id="propertyType" className="w-full mb-3 p-inputtext-sm" value={_entity?.propertyType} onChange={(e) => setValByKey("propertyType", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["propertyType"]) && (
              <p className="m-0" key="error-propertyType">
                {error["propertyType"]}
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
                <label htmlFor="accessArrangedThrough">Access Arranged Through:</label>
                <InputText id="accessArrangedThrough" className="w-full mb-3 p-inputtext-sm" value={_entity?.accessArrangedThrough} onChange={(e) => setValByKey("accessArrangedThrough", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["accessArrangedThrough"]) && (
              <p className="m-0" key="error-accessArrangedThrough">
                {error["accessArrangedThrough"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="invoiceEmail">Invoice Email:</label>
                <InputText id="invoiceEmail" className="w-full mb-3 p-inputtext-sm" value={_entity?.invoiceEmail} onChange={(e) => setValByKey("invoiceEmail", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["invoiceEmail"]) && (
              <p className="m-0" key="error-invoiceEmail">
                {error["invoiceEmail"]}
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

export default connect(mapState, mapDispatch)(RicsValuationEditDialogComponent);
