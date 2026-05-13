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

const MortageDetailsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [applicationId, setApplicationId] = useState([])

    useEffect(() => {
        let init  = {investmentPropertyOccupierDetails: false};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [applicationId], setError);
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
            applicationId: _entity?.applicationId?._id,requestedLoanAmount: _entity?.requestedLoanAmount,requestedRepaymentTerm: _entity?.requestedRepaymentTerm,purposeOfMortage: _entity?.purposeOfMortage,mortgageHolders: _entity?.mortgageHolders,capitalRaisingFundUse: _entity?.capitalRaisingFundUse,investmentPropertyOccupier: _entity?.investmentPropertyOccupier,investmentPropertyOccupierDetails: _entity?.investmentPropertyOccupierDetails || false,solicitorName: _entity?.solicitorName,solicitorAddress: _entity?.solicitorAddress,solicitorPhoneNo: _entity?.solicitorPhoneNo,solicitorEmail: _entity?.solicitorEmail,intermediaryName: _entity?.intermediaryName,intermediaryAddress: _entity?.intermediaryAddress,intermediaryPhoneNo: _entity?.intermediaryPhoneNo,intermediaryEmail: _entity?.intermediaryEmail,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("mortageDetails").create(_data);
        const eagerResult = await client
            .service("mortageDetails")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "applicationId",
                    service : "commercialApplications",
                    select:["status"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Mortage Details updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Mortage Details" });
        }
        setLoading(false);
    };

    

    

    useEffect(() => {
                    // on mount commercialApplications
                    client
                        .service("commercialApplications")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleCommercialApplicationsId } })
                        .then((res) => {
                            setApplicationId(res.data.map((e) => { return { name: e['status'], value: e._id }}));
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

    const applicationIdOptions = applicationId.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Mortage Details" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="mortageDetails-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="applicationId">Application Id:</label>
                <Dropdown id="applicationId" value={_entity?.applicationId?._id} optionLabel="name" optionValue="value" options={applicationIdOptions} onChange={(e) => setValByKey("applicationId", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["applicationId"]) ? (
              <p className="m-0" key="error-applicationId">
                {error["applicationId"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="requestedLoanAmount">Requested Loan Amount:</label>
                <InputNumber id="requestedLoanAmount" className="w-full mb-3 p-inputtext-sm" value={_entity?.requestedLoanAmount} onChange={(e) => setValByKey("requestedLoanAmount", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["requestedLoanAmount"]) ? (
              <p className="m-0" key="error-requestedLoanAmount">
                {error["requestedLoanAmount"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="requestedRepaymentTerm">Requested Repayment Term:</label>
                <InputText id="requestedRepaymentTerm" className="w-full mb-3 p-inputtext-sm" value={_entity?.requestedRepaymentTerm} onChange={(e) => setValByKey("requestedRepaymentTerm", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["requestedRepaymentTerm"]) ? (
              <p className="m-0" key="error-requestedRepaymentTerm">
                {error["requestedRepaymentTerm"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="purposeOfMortage">Purpose Of Mortage:</label>
                <InputText id="purposeOfMortage" className="w-full mb-3 p-inputtext-sm" value={_entity?.purposeOfMortage} onChange={(e) => setValByKey("purposeOfMortage", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["purposeOfMortage"]) ? (
              <p className="m-0" key="error-purposeOfMortage">
                {error["purposeOfMortage"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="mortgageHolders">Mortgage Holders:</label>
                <InputText id="mortgageHolders" className="w-full mb-3 p-inputtext-sm" value={_entity?.mortgageHolders} onChange={(e) => setValByKey("mortgageHolders", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["mortgageHolders"]) ? (
              <p className="m-0" key="error-mortgageHolders">
                {error["mortgageHolders"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="capitalRaisingFundUse">Capital Raising Fund Use:</label>
                <InputText id="capitalRaisingFundUse" className="w-full mb-3 p-inputtext-sm" value={_entity?.capitalRaisingFundUse} onChange={(e) => setValByKey("capitalRaisingFundUse", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["capitalRaisingFundUse"]) ? (
              <p className="m-0" key="error-capitalRaisingFundUse">
                {error["capitalRaisingFundUse"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="investmentPropertyOccupier">Investment Property Occupier:</label>
                <InputText id="investmentPropertyOccupier" className="w-full mb-3 p-inputtext-sm" value={_entity?.investmentPropertyOccupier} onChange={(e) => setValByKey("investmentPropertyOccupier", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["investmentPropertyOccupier"]) ? (
              <p className="m-0" key="error-investmentPropertyOccupier">
                {error["investmentPropertyOccupier"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="investmentPropertyOccupierDetails">Investment Property Occupier Details:</label>
                <Checkbox id="investmentPropertyOccupierDetails" className="ml-3" checked={_entity?.investmentPropertyOccupierDetails} onChange={(e) => setValByKey("investmentPropertyOccupierDetails", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["investmentPropertyOccupierDetails"]) ? (
              <p className="m-0" key="error-investmentPropertyOccupierDetails">
                {error["investmentPropertyOccupierDetails"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="solicitorName">Solicitor Name:</label>
                <InputText id="solicitorName" className="w-full mb-3 p-inputtext-sm" value={_entity?.solicitorName} onChange={(e) => setValByKey("solicitorName", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["solicitorName"]) ? (
              <p className="m-0" key="error-solicitorName">
                {error["solicitorName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="solicitorAddress">Solicitor Address:</label>
                <InputText id="solicitorAddress" className="w-full mb-3 p-inputtext-sm" value={_entity?.solicitorAddress} onChange={(e) => setValByKey("solicitorAddress", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["solicitorAddress"]) ? (
              <p className="m-0" key="error-solicitorAddress">
                {error["solicitorAddress"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="solicitorPhoneNo">Solicitor Phone No:</label>
                <InputText id="solicitorPhoneNo" className="w-full mb-3 p-inputtext-sm" value={_entity?.solicitorPhoneNo} onChange={(e) => setValByKey("solicitorPhoneNo", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["solicitorPhoneNo"]) ? (
              <p className="m-0" key="error-solicitorPhoneNo">
                {error["solicitorPhoneNo"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="solicitorEmail">Solicitor Email:</label>
                <InputText id="solicitorEmail" className="w-full mb-3 p-inputtext-sm" value={_entity?.solicitorEmail} onChange={(e) => setValByKey("solicitorEmail", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["solicitorEmail"]) ? (
              <p className="m-0" key="error-solicitorEmail">
                {error["solicitorEmail"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="intermediaryName">Intermediary Name:</label>
                <InputText id="intermediaryName" className="w-full mb-3 p-inputtext-sm" value={_entity?.intermediaryName} onChange={(e) => setValByKey("intermediaryName", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["intermediaryName"]) ? (
              <p className="m-0" key="error-intermediaryName">
                {error["intermediaryName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="intermediaryAddress">Intermediary Address:</label>
                <InputText id="intermediaryAddress" className="w-full mb-3 p-inputtext-sm" value={_entity?.intermediaryAddress} onChange={(e) => setValByKey("intermediaryAddress", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["intermediaryAddress"]) ? (
              <p className="m-0" key="error-intermediaryAddress">
                {error["intermediaryAddress"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="intermediaryPhoneNo">Intermediary Phone No:</label>
                <InputText id="intermediaryPhoneNo" className="w-full mb-3 p-inputtext-sm" value={_entity?.intermediaryPhoneNo} onChange={(e) => setValByKey("intermediaryPhoneNo", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["intermediaryPhoneNo"]) ? (
              <p className="m-0" key="error-intermediaryPhoneNo">
                {error["intermediaryPhoneNo"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="intermediaryEmail">Intermediary Email:</label>
                <InputText id="intermediaryEmail" className="w-full mb-3 p-inputtext-sm" value={_entity?.intermediaryEmail} onChange={(e) => setValByKey("intermediaryEmail", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["intermediaryEmail"]) ? (
              <p className="m-0" key="error-intermediaryEmail">
                {error["intermediaryEmail"]}
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

export default connect(mapState, mapDispatch)(MortageDetailsCreateDialogComponent);
