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

const CompletitionStatementCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [dealId, setDealId] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [dealId], setError);
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
            dealId: _entity?.dealId?._id,borrower: _entity?.borrower,property: _entity?.property,loanAdvance: _entity?.loanAdvance,firstMonthInterestRate: _entity?.firstMonthInterestRate,firstMonthInterestAmount: _entity?.firstMonthInterestAmount,arrangementFee: _entity?.arrangementFee,lendersBankTransferFee: _entity?.lendersBankTransferFee,otherDeductions: _entity?.otherDeductions,netLoanAdvance: _entity?.netLoanAdvance,amountToBeTransferredToSolicitor: _entity?.amountToBeTransferredToSolicitor,lender: _entity?.lender,statementDate: _entity?.statementDate,authorisedSignatory: _entity?.authorisedSignatory,status: _entity?.status,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("completitionStatement").create(_data);
        const eagerResult = await client
            .service("completitionStatement")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "dealId",
                    service : "deals",
                    select:["status"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Completition Statement updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Completition Statement" });
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
        <Dialog header="Create Completition Statement" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="completitionStatement-create-dialog-component">
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
                <label htmlFor="borrower">Borrower:</label>
                <InputText id="borrower" className="w-full mb-3 p-inputtext-sm" value={_entity?.borrower} onChange={(e) => setValByKey("borrower", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["borrower"]) ? (
              <p className="m-0" key="error-borrower">
                {error["borrower"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="property">Property:</label>
                <InputText id="property" className="w-full mb-3 p-inputtext-sm" value={_entity?.property} onChange={(e) => setValByKey("property", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["property"]) ? (
              <p className="m-0" key="error-property">
                {error["property"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="loanAdvance">Loan Advance:</label>
                <InputText id="loanAdvance" className="w-full mb-3 p-inputtext-sm" value={_entity?.loanAdvance} onChange={(e) => setValByKey("loanAdvance", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["loanAdvance"]) ? (
              <p className="m-0" key="error-loanAdvance">
                {error["loanAdvance"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="firstMonthInterestRate">First Month Interest Rate:</label>
                <InputNumber id="firstMonthInterestRate" className="w-full mb-3 p-inputtext-sm" value={_entity?.firstMonthInterestRate} onChange={(e) => setValByKey("firstMonthInterestRate", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["firstMonthInterestRate"]) ? (
              <p className="m-0" key="error-firstMonthInterestRate">
                {error["firstMonthInterestRate"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="firstMonthInterestAmount">First Month Interest Amount:</label>
                <InputText id="firstMonthInterestAmount" className="w-full mb-3 p-inputtext-sm" value={_entity?.firstMonthInterestAmount} onChange={(e) => setValByKey("firstMonthInterestAmount", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["firstMonthInterestAmount"]) ? (
              <p className="m-0" key="error-firstMonthInterestAmount">
                {error["firstMonthInterestAmount"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="arrangementFee">Arrangement Fee:</label>
                <InputText id="arrangementFee" className="w-full mb-3 p-inputtext-sm" value={_entity?.arrangementFee} onChange={(e) => setValByKey("arrangementFee", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["arrangementFee"]) ? (
              <p className="m-0" key="error-arrangementFee">
                {error["arrangementFee"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="lendersBankTransferFee">Lenders Bank Transfer Fee:</label>
                <InputText id="lendersBankTransferFee" className="w-full mb-3 p-inputtext-sm" value={_entity?.lendersBankTransferFee} onChange={(e) => setValByKey("lendersBankTransferFee", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["lendersBankTransferFee"]) ? (
              <p className="m-0" key="error-lendersBankTransferFee">
                {error["lendersBankTransferFee"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="otherDeductions">Other Deductions:</label>
                <InputText id="otherDeductions" className="w-full mb-3 p-inputtext-sm" value={_entity?.otherDeductions} onChange={(e) => setValByKey("otherDeductions", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["otherDeductions"]) ? (
              <p className="m-0" key="error-otherDeductions">
                {error["otherDeductions"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="netLoanAdvance">Net Loan Advance:</label>
                <InputText id="netLoanAdvance" className="w-full mb-3 p-inputtext-sm" value={_entity?.netLoanAdvance} onChange={(e) => setValByKey("netLoanAdvance", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["netLoanAdvance"]) ? (
              <p className="m-0" key="error-netLoanAdvance">
                {error["netLoanAdvance"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="amountToBeTransferredToSolicitor">Amount To Be Transferred To Solicitor:</label>
                <InputText id="amountToBeTransferredToSolicitor" className="w-full mb-3 p-inputtext-sm" value={_entity?.amountToBeTransferredToSolicitor} onChange={(e) => setValByKey("amountToBeTransferredToSolicitor", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["amountToBeTransferredToSolicitor"]) ? (
              <p className="m-0" key="error-amountToBeTransferredToSolicitor">
                {error["amountToBeTransferredToSolicitor"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="lender">Lender:</label>
                <InputText id="lender" className="w-full mb-3 p-inputtext-sm" value={_entity?.lender} onChange={(e) => setValByKey("lender", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["lender"]) ? (
              <p className="m-0" key="error-lender">
                {error["lender"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="statementDate">Statement Date:</label>
                <Calendar id="statementDate"  value={_entity?.statementDate ? new Date(_entity?.statementDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("statementDate", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["statementDate"]) ? (
              <p className="m-0" key="error-statementDate">
                {error["statementDate"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="authorisedSignatory">Authorised Signatory:</label>
                <InputText id="authorisedSignatory" className="w-full mb-3 p-inputtext-sm" value={_entity?.authorisedSignatory} onChange={(e) => setValByKey("authorisedSignatory", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["authorisedSignatory"]) ? (
              <p className="m-0" key="error-authorisedSignatory">
                {error["authorisedSignatory"]}
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

export default connect(mapState, mapDispatch)(CompletitionStatementCreateDialogComponent);
