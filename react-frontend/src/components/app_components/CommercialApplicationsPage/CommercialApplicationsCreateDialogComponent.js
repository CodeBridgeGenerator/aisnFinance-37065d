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
import { Checkbox } from "primereact/checkbox";
import UploadFilesToS3 from "../../../services/UploadFilesToS3";


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

const CommercialApplicationsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [dealId, setDealId] = useState([])

    useEffect(() => {
        let init  = {contactByTelephone: false,contactByPost: false,contactByElectronicMedia: false,contactForMarketResearch: false};
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
            dealId: _entity?.dealId?._id,status: _entity?.status,contactByTelephone: _entity?.contactByTelephone || false,contactByPost: _entity?.contactByPost || false,contactByElectronicMedia: _entity?.contactByElectronicMedia || false,contactForMarketResearch: _entity?.contactForMarketResearch || false,applicationDocuments: _entity?.applicationDocuments,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("commercialApplications").create(_data);
        const eagerResult = await client
            .service("commercialApplications")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "dealId",
                    service : "deals",
                    select:["status"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Commercial Applications updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Commercial Applications" });
        }
        setLoading(false);
    };

    const onFileapplicationDocumentsLoaded = (file, status) => {
    if (status)
      props.alert({
        title: "file uploader",
        type: "success",
        message: "file uploaded" + file.name
      });
    else
      props.alert({
        title: "file uploader",
        type: "error",
        message: "file uploader failed" + file.name
      });
  };

    const setapplicationDocumentsId = (id) => { setValByKey("applicationDocuments", id);  };

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
        <Dialog header="Create Commercial Applications" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="commercialApplications-create-dialog-component">
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
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="contactByTelephone">Contact By Telephone:</label>
                <Checkbox id="contactByTelephone" className="ml-3" checked={_entity?.contactByTelephone} onChange={(e) => setValByKey("contactByTelephone", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["contactByTelephone"]) ? (
              <p className="m-0" key="error-contactByTelephone">
                {error["contactByTelephone"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="contactByPost">Contact By Post:</label>
                <Checkbox id="contactByPost" className="ml-3" checked={_entity?.contactByPost} onChange={(e) => setValByKey("contactByPost", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["contactByPost"]) ? (
              <p className="m-0" key="error-contactByPost">
                {error["contactByPost"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="contactByElectronicMedia">Contact By Electronic Media:</label>
                <Checkbox id="contactByElectronicMedia" className="ml-3" checked={_entity?.contactByElectronicMedia} onChange={(e) => setValByKey("contactByElectronicMedia", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["contactByElectronicMedia"]) ? (
              <p className="m-0" key="error-contactByElectronicMedia">
                {error["contactByElectronicMedia"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="contactForMarketResearch">Contact For Market Research:</label>
                <Checkbox id="contactForMarketResearch" className="ml-3" checked={_entity?.contactForMarketResearch} onChange={(e) => setValByKey("contactForMarketResearch", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["contactForMarketResearch"]) ? (
              <p className="m-0" key="error-contactForMarketResearch">
                {error["contactForMarketResearch"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 field">
                    <span className="align-items-center">
                        <label htmlFor="applicationDocuments">Application Documents:</label>
                        <UploadFilesToS3 type={'create'} user={props.user} id={urlParams.id} serviceName="commercialApplications" onUploadComplete={setapplicationDocumentsId} onFileLoaded={onFileapplicationDocumentsLoaded}/>
                    </span>
                    <small className="p-error">
                    {!_.isEmpty(error["applicationDocuments"]) ? (
                      <p className="m-0" key="error-applicationDocuments">
                        {error["applicationDocuments"]}
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

export default connect(mapState, mapDispatch)(CommercialApplicationsCreateDialogComponent);
