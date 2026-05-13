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
import { Checkbox } from "primereact/checkbox";
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

const BusinessDetailsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [applicationId, setApplicationId] = useState([])

    useEffect(() => {
        let init  = {sharedMailbox: false,madeCva: false,propertyRepossessed: false,courtOrder: false,missedRepayments: false,brokenCreditAgreement: false};
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
            applicationId: _entity?.applicationId?._id,tradingName: _entity?.tradingName,registeredName: _entity?.registeredName,businessStartDate: _entity?.businessStartDate,natureOfBusiness: _entity?.natureOfBusiness,businessAddress: _entity?.businessAddress,correspondenceAddress: _entity?.correspondenceAddress,sharedMailbox: _entity?.sharedMailbox || false,phone: _entity?.phone,fax: _entity?.fax,email: _entity?.email,website: _entity?.website,registeredAddress: _entity?.registeredAddress,companyRegNo: _entity?.companyRegNo,countryOfRegistration: _entity?.countryOfRegistration,incorporatedDate: _entity?.incorporatedDate,businessType: _entity?.businessType,numPartners: _entity?.numPartners,numDirectors: _entity?.numDirectors,numBeneficiaries: _entity?.numBeneficiaries,shareholders: _entity?.shareholders,anticipatedTurnover: _entity?.anticipatedTurnover,numEmployees: _entity?.numEmployees,madeCva: _entity?.madeCva || false,propertyRepossessed: _entity?.propertyRepossessed || false,courtOrder: _entity?.courtOrder || false,missedRepayments: _entity?.missedRepayments || false,brokenCreditAgreement: _entity?.brokenCreditAgreement || false,adverseCreditDetails: _entity?.adverseCreditDetails,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("businessDetails").create(_data);
        const eagerResult = await client
            .service("businessDetails")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "applicationId",
                    service : "commercialApplications",
                    select:["status"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Business Details updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Business Details" });
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
        <Dialog header="Create Business Details" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="businessDetails-create-dialog-component">
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
                <label htmlFor="tradingName">Trading Name:</label>
                <InputText id="tradingName" className="w-full mb-3 p-inputtext-sm" value={_entity?.tradingName} onChange={(e) => setValByKey("tradingName", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["tradingName"]) ? (
              <p className="m-0" key="error-tradingName">
                {error["tradingName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="registeredName">Registered Name:</label>
                <InputText id="registeredName" className="w-full mb-3 p-inputtext-sm" value={_entity?.registeredName} onChange={(e) => setValByKey("registeredName", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["registeredName"]) ? (
              <p className="m-0" key="error-registeredName">
                {error["registeredName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="businessStartDate">Business Start Date:</label>
                <Calendar id="businessStartDate"  value={_entity?.businessStartDate ? new Date(_entity?.businessStartDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("businessStartDate", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["businessStartDate"]) ? (
              <p className="m-0" key="error-businessStartDate">
                {error["businessStartDate"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="natureOfBusiness">Nature Of Business:</label>
                <InputText id="natureOfBusiness" className="w-full mb-3 p-inputtext-sm" value={_entity?.natureOfBusiness} onChange={(e) => setValByKey("natureOfBusiness", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["natureOfBusiness"]) ? (
              <p className="m-0" key="error-natureOfBusiness">
                {error["natureOfBusiness"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="businessAddress">Business Address:</label>
                <InputText id="businessAddress" className="w-full mb-3 p-inputtext-sm" value={_entity?.businessAddress} onChange={(e) => setValByKey("businessAddress", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["businessAddress"]) ? (
              <p className="m-0" key="error-businessAddress">
                {error["businessAddress"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="correspondenceAddress">Correspondence Address:</label>
                <InputText id="correspondenceAddress" className="w-full mb-3 p-inputtext-sm" value={_entity?.correspondenceAddress} onChange={(e) => setValByKey("correspondenceAddress", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["correspondenceAddress"]) ? (
              <p className="m-0" key="error-correspondenceAddress">
                {error["correspondenceAddress"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="sharedMailbox">Shared Mailbox:</label>
                <Checkbox id="sharedMailbox" className="ml-3" checked={_entity?.sharedMailbox} onChange={(e) => setValByKey("sharedMailbox", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["sharedMailbox"]) ? (
              <p className="m-0" key="error-sharedMailbox">
                {error["sharedMailbox"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="phone">Phone:</label>
                <InputText id="phone" className="w-full mb-3 p-inputtext-sm" value={_entity?.phone} onChange={(e) => setValByKey("phone", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["phone"]) ? (
              <p className="m-0" key="error-phone">
                {error["phone"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="fax">Fax:</label>
                <InputText id="fax" className="w-full mb-3 p-inputtext-sm" value={_entity?.fax} onChange={(e) => setValByKey("fax", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["fax"]) ? (
              <p className="m-0" key="error-fax">
                {error["fax"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="email">Email:</label>
                <InputText id="email" className="w-full mb-3 p-inputtext-sm" value={_entity?.email} onChange={(e) => setValByKey("email", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["email"]) ? (
              <p className="m-0" key="error-email">
                {error["email"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="website">Website:</label>
                <InputText id="website" className="w-full mb-3 p-inputtext-sm" value={_entity?.website} onChange={(e) => setValByKey("website", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["website"]) ? (
              <p className="m-0" key="error-website">
                {error["website"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="registeredAddress">Registered Address:</label>
                <InputText id="registeredAddress" className="w-full mb-3 p-inputtext-sm" value={_entity?.registeredAddress} onChange={(e) => setValByKey("registeredAddress", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["registeredAddress"]) ? (
              <p className="m-0" key="error-registeredAddress">
                {error["registeredAddress"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="companyRegNo">Company Reg No:</label>
                <InputText id="companyRegNo" className="w-full mb-3 p-inputtext-sm" value={_entity?.companyRegNo} onChange={(e) => setValByKey("companyRegNo", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["companyRegNo"]) ? (
              <p className="m-0" key="error-companyRegNo">
                {error["companyRegNo"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="countryOfRegistration">Country Of Registration:</label>
                <InputText id="countryOfRegistration" className="w-full mb-3 p-inputtext-sm" value={_entity?.countryOfRegistration} onChange={(e) => setValByKey("countryOfRegistration", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["countryOfRegistration"]) ? (
              <p className="m-0" key="error-countryOfRegistration">
                {error["countryOfRegistration"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="incorporatedDate">Incorporated Date:</label>
                <InputText id="incorporatedDate" className="w-full mb-3 p-inputtext-sm" value={_entity?.incorporatedDate} onChange={(e) => setValByKey("incorporatedDate", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["incorporatedDate"]) ? (
              <p className="m-0" key="error-incorporatedDate">
                {error["incorporatedDate"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="businessType">Business Type:</label>
                <InputText id="businessType" className="w-full mb-3 p-inputtext-sm" value={_entity?.businessType} onChange={(e) => setValByKey("businessType", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["businessType"]) ? (
              <p className="m-0" key="error-businessType">
                {error["businessType"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="numPartners">Num Partners:</label>
                <InputNumber id="numPartners" className="w-full mb-3 p-inputtext-sm" value={_entity?.numPartners} onChange={(e) => setValByKey("numPartners", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["numPartners"]) ? (
              <p className="m-0" key="error-numPartners">
                {error["numPartners"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="numDirectors">Num Directors:</label>
                <InputNumber id="numDirectors" className="w-full mb-3 p-inputtext-sm" value={_entity?.numDirectors} onChange={(e) => setValByKey("numDirectors", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["numDirectors"]) ? (
              <p className="m-0" key="error-numDirectors">
                {error["numDirectors"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="numBeneficiaries">Num Beneficiaries:</label>
                <InputNumber id="numBeneficiaries" className="w-full mb-3 p-inputtext-sm" value={_entity?.numBeneficiaries} onChange={(e) => setValByKey("numBeneficiaries", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["numBeneficiaries"]) ? (
              <p className="m-0" key="error-numBeneficiaries">
                {error["numBeneficiaries"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="shareholders">Shareholders:</label>
                <InputNumber id="shareholders" className="w-full mb-3 p-inputtext-sm" value={_entity?.shareholders} onChange={(e) => setValByKey("shareholders", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["shareholders"]) ? (
              <p className="m-0" key="error-shareholders">
                {error["shareholders"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="anticipatedTurnover">Anticipated Turnover:</label>
                <InputNumber id="anticipatedTurnover" className="w-full mb-3 p-inputtext-sm" value={_entity?.anticipatedTurnover} onChange={(e) => setValByKey("anticipatedTurnover", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["anticipatedTurnover"]) ? (
              <p className="m-0" key="error-anticipatedTurnover">
                {error["anticipatedTurnover"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="numEmployees">Num Employees:</label>
                <InputNumber id="numEmployees" className="w-full mb-3 p-inputtext-sm" value={_entity?.numEmployees} onChange={(e) => setValByKey("numEmployees", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["numEmployees"]) ? (
              <p className="m-0" key="error-numEmployees">
                {error["numEmployees"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="madeCva">Made Cva:</label>
                <Checkbox id="madeCva" className="ml-3" checked={_entity?.madeCva} onChange={(e) => setValByKey("madeCva", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["madeCva"]) ? (
              <p className="m-0" key="error-madeCva">
                {error["madeCva"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="propertyRepossessed">Property Repossessed:</label>
                <Checkbox id="propertyRepossessed" className="ml-3" checked={_entity?.propertyRepossessed} onChange={(e) => setValByKey("propertyRepossessed", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["propertyRepossessed"]) ? (
              <p className="m-0" key="error-propertyRepossessed">
                {error["propertyRepossessed"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="courtOrder">Court Order:</label>
                <Checkbox id="courtOrder" className="ml-3" checked={_entity?.courtOrder} onChange={(e) => setValByKey("courtOrder", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["courtOrder"]) ? (
              <p className="m-0" key="error-courtOrder">
                {error["courtOrder"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="missedRepayments">Missed Repayments:</label>
                <Checkbox id="missedRepayments" className="ml-3" checked={_entity?.missedRepayments} onChange={(e) => setValByKey("missedRepayments", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["missedRepayments"]) ? (
              <p className="m-0" key="error-missedRepayments">
                {error["missedRepayments"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="brokenCreditAgreement">Broken Credit Agreement:</label>
                <Checkbox id="brokenCreditAgreement" className="ml-3" checked={_entity?.brokenCreditAgreement} onChange={(e) => setValByKey("brokenCreditAgreement", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["brokenCreditAgreement"]) ? (
              <p className="m-0" key="error-brokenCreditAgreement">
                {error["brokenCreditAgreement"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="adverseCreditDetails">Adverse Credit Details:</label>
                <InputText id="adverseCreditDetails" className="w-full mb-3 p-inputtext-sm" value={_entity?.adverseCreditDetails} onChange={(e) => setValByKey("adverseCreditDetails", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["adverseCreditDetails"]) ? (
              <p className="m-0" key="error-adverseCreditDetails">
                {error["adverseCreditDetails"]}
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

export default connect(mapState, mapDispatch)(BusinessDetailsCreateDialogComponent);
