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

const PersonalDetailsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [commercialApplicationsId, setCommercialApplicationsId] = useState([])

    useEffect(() => {
        let init  = {everBankrupt: false,missedRepayments: false,ivaCva: false,propertyRepossessed: false,courtOrder: false,brokenCreditAgreement: false,associatedBusinessFailure: false,employmentContinues: false};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [commercialApplicationsId], setError);
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
            commercialApplicationsId: _entity?.commercialApplicationsId?._id,title: _entity?.title,firstName: _entity?.firstName,middleName: _entity?.middleName,lastName: _entity?.lastName,previousSurname: _entity?.previousSurname,dateOfBirth: _entity?.dateOfBirth,nationality: _entity?.nationality,countryOfResidence: _entity?.countryOfResidence,residentialAddress: _entity?.residentialAddress,postcode: _entity?.postcode,previousAddress: _entity?.previousAddress,contactPreference: _entity?.contactPreference,phoneHome: _entity?.phoneHome,phoneMobile: _entity?.phoneMobile,email: _entity?.email,capacityRole: _entity?.capacityRole,sharesHeldPct: _entity?.sharesHeldPct,everBankrupt: _entity?.everBankrupt || false,missedRepayments: _entity?.missedRepayments || false,ivaCva: _entity?.ivaCva || false,propertyRepossessed: _entity?.propertyRepossessed || false,courtOrder: _entity?.courtOrder || false,brokenCreditAgreement: _entity?.brokenCreditAgreement || false,associatedBusinessFailure: _entity?.associatedBusinessFailure || false,adverseCreditDetails: _entity?.adverseCreditDetails,employerName: _entity?.employerName,jobTitle: _entity?.jobTitle,annualSalary: _entity?.annualSalary,employmentContinues: _entity?.employmentContinues || false,signature: _entity?.signature,signedDate: _entity?.signedDate,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("personalDetails").create(_data);
        const eagerResult = await client
            .service("personalDetails")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "commercialApplicationsId",
                    service : "commercialApplications",
                    select:["status"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Personal Details updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Personal Details" });
        }
        setLoading(false);
    };

    

    

    useEffect(() => {
                    // on mount commercialApplications
                    client
                        .service("commercialApplications")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleCommercialApplicationsId } })
                        .then((res) => {
                            setCommercialApplicationsId(res.data.map((e) => { return { name: e['status'], value: e._id }}));
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

    const commercialApplicationsIdOptions = commercialApplicationsId.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Personal Details" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="personalDetails-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="commercialApplicationsId">Commercial Applications Id:</label>
                <Dropdown id="commercialApplicationsId" value={_entity?.commercialApplicationsId?._id} optionLabel="name" optionValue="value" options={commercialApplicationsIdOptions} onChange={(e) => setValByKey("commercialApplicationsId", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["commercialApplicationsId"]) ? (
              <p className="m-0" key="error-commercialApplicationsId">
                {error["commercialApplicationsId"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="title">Title:</label>
                <InputText id="title" className="w-full mb-3 p-inputtext-sm" value={_entity?.title} onChange={(e) => setValByKey("title", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["title"]) ? (
              <p className="m-0" key="error-title">
                {error["title"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="firstName">First Name:</label>
                <InputText id="firstName" className="w-full mb-3 p-inputtext-sm" value={_entity?.firstName} onChange={(e) => setValByKey("firstName", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["firstName"]) ? (
              <p className="m-0" key="error-firstName">
                {error["firstName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="middleName">Middle Name:</label>
                <InputText id="middleName" className="w-full mb-3 p-inputtext-sm" value={_entity?.middleName} onChange={(e) => setValByKey("middleName", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["middleName"]) ? (
              <p className="m-0" key="error-middleName">
                {error["middleName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="lastName">Last Name:</label>
                <InputText id="lastName" className="w-full mb-3 p-inputtext-sm" value={_entity?.lastName} onChange={(e) => setValByKey("lastName", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["lastName"]) ? (
              <p className="m-0" key="error-lastName">
                {error["lastName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="previousSurname">Previous Surname:</label>
                <InputText id="previousSurname" className="w-full mb-3 p-inputtext-sm" value={_entity?.previousSurname} onChange={(e) => setValByKey("previousSurname", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["previousSurname"]) ? (
              <p className="m-0" key="error-previousSurname">
                {error["previousSurname"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="dateOfBirth">Date Of Birth:</label>
                <Calendar id="dateOfBirth"  value={_entity?.dateOfBirth ? new Date(_entity?.dateOfBirth) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("dateOfBirth", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["dateOfBirth"]) ? (
              <p className="m-0" key="error-dateOfBirth">
                {error["dateOfBirth"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="nationality">Nationality:</label>
                <InputText id="nationality" className="w-full mb-3 p-inputtext-sm" value={_entity?.nationality} onChange={(e) => setValByKey("nationality", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["nationality"]) ? (
              <p className="m-0" key="error-nationality">
                {error["nationality"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="countryOfResidence">Country Of Residence:</label>
                <InputText id="countryOfResidence" className="w-full mb-3 p-inputtext-sm" value={_entity?.countryOfResidence} onChange={(e) => setValByKey("countryOfResidence", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["countryOfResidence"]) ? (
              <p className="m-0" key="error-countryOfResidence">
                {error["countryOfResidence"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="residentialAddress">Residential Address:</label>
                <InputText id="residentialAddress" className="w-full mb-3 p-inputtext-sm" value={_entity?.residentialAddress} onChange={(e) => setValByKey("residentialAddress", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["residentialAddress"]) ? (
              <p className="m-0" key="error-residentialAddress">
                {error["residentialAddress"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="postcode">Postcode:</label>
                <InputText id="postcode" className="w-full mb-3 p-inputtext-sm" value={_entity?.postcode} onChange={(e) => setValByKey("postcode", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["postcode"]) ? (
              <p className="m-0" key="error-postcode">
                {error["postcode"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="previousAddress">Previous Address:</label>
                <InputText id="previousAddress" className="w-full mb-3 p-inputtext-sm" value={_entity?.previousAddress} onChange={(e) => setValByKey("previousAddress", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["previousAddress"]) ? (
              <p className="m-0" key="error-previousAddress">
                {error["previousAddress"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="contactPreference">Contact Preference:</label>
                <InputText id="contactPreference" className="w-full mb-3 p-inputtext-sm" value={_entity?.contactPreference} onChange={(e) => setValByKey("contactPreference", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["contactPreference"]) ? (
              <p className="m-0" key="error-contactPreference">
                {error["contactPreference"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="phoneHome">Phone Home:</label>
                <InputText id="phoneHome" className="w-full mb-3 p-inputtext-sm" value={_entity?.phoneHome} onChange={(e) => setValByKey("phoneHome", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["phoneHome"]) ? (
              <p className="m-0" key="error-phoneHome">
                {error["phoneHome"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="phoneMobile">Phone Mobile:</label>
                <InputText id="phoneMobile" className="w-full mb-3 p-inputtext-sm" value={_entity?.phoneMobile} onChange={(e) => setValByKey("phoneMobile", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["phoneMobile"]) ? (
              <p className="m-0" key="error-phoneMobile">
                {error["phoneMobile"]}
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
                <label htmlFor="capacityRole">Capacity Role:</label>
                <InputText id="capacityRole" className="w-full mb-3 p-inputtext-sm" value={_entity?.capacityRole} onChange={(e) => setValByKey("capacityRole", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["capacityRole"]) ? (
              <p className="m-0" key="error-capacityRole">
                {error["capacityRole"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="sharesHeldPct">Shares Held Pct:</label>
                <InputNumber id="sharesHeldPct" className="w-full mb-3 p-inputtext-sm" value={_entity?.sharesHeldPct} onChange={(e) => setValByKey("sharesHeldPct", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["sharesHeldPct"]) ? (
              <p className="m-0" key="error-sharesHeldPct">
                {error["sharesHeldPct"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="everBankrupt">Ever Bankrupt:</label>
                <Checkbox id="everBankrupt" className="ml-3" checked={_entity?.everBankrupt} onChange={(e) => setValByKey("everBankrupt", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["everBankrupt"]) ? (
              <p className="m-0" key="error-everBankrupt">
                {error["everBankrupt"]}
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
                <label htmlFor="ivaCva">Iva Cva:</label>
                <Checkbox id="ivaCva" className="ml-3" checked={_entity?.ivaCva} onChange={(e) => setValByKey("ivaCva", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["ivaCva"]) ? (
              <p className="m-0" key="error-ivaCva">
                {error["ivaCva"]}
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
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="associatedBusinessFailure">Associated Business Failure:</label>
                <Checkbox id="associatedBusinessFailure" className="ml-3" checked={_entity?.associatedBusinessFailure} onChange={(e) => setValByKey("associatedBusinessFailure", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["associatedBusinessFailure"]) ? (
              <p className="m-0" key="error-associatedBusinessFailure">
                {error["associatedBusinessFailure"]}
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
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="employerName">Employer Name:</label>
                <InputText id="employerName" className="w-full mb-3 p-inputtext-sm" value={_entity?.employerName} onChange={(e) => setValByKey("employerName", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["employerName"]) ? (
              <p className="m-0" key="error-employerName">
                {error["employerName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="jobTitle">Job Title:</label>
                <InputText id="jobTitle" className="w-full mb-3 p-inputtext-sm" value={_entity?.jobTitle} onChange={(e) => setValByKey("jobTitle", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["jobTitle"]) ? (
              <p className="m-0" key="error-jobTitle">
                {error["jobTitle"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="annualSalary">Annual Salary:</label>
                <InputNumber id="annualSalary" className="w-full mb-3 p-inputtext-sm" value={_entity?.annualSalary} onChange={(e) => setValByKey("annualSalary", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["annualSalary"]) ? (
              <p className="m-0" key="error-annualSalary">
                {error["annualSalary"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="employmentContinues">Employment Continues:</label>
                <Checkbox id="employmentContinues" className="ml-3" checked={_entity?.employmentContinues} onChange={(e) => setValByKey("employmentContinues", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["employmentContinues"]) ? (
              <p className="m-0" key="error-employmentContinues">
                {error["employmentContinues"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="signature">Signature:</label>
                <InputText id="signature" className="w-full mb-3 p-inputtext-sm" value={_entity?.signature} onChange={(e) => setValByKey("signature", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["signature"]) ? (
              <p className="m-0" key="error-signature">
                {error["signature"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="signedDate">Signed Date:</label>
                <Calendar id="signedDate"  value={_entity?.signedDate ? new Date(_entity?.signedDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("signedDate", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["signedDate"]) ? (
              <p className="m-0" key="error-signedDate">
                {error["signedDate"]}
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

export default connect(mapState, mapDispatch)(PersonalDetailsCreateDialogComponent);
