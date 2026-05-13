import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState, useRef, useEffect} from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';
import { useParams } from "react-router-dom";
import moment from "moment";
import UploadService from "../../../services/UploadService";
import { InputText } from 'primereact/inputtext';
import { Dialog } from "primereact/dialog";
import { MultiSelect } from "primereact/multiselect";
import DownloadCSV from "../../../utils/DownloadCSV";
import InboxCreateDialogComponent from "../../cb_components/InboxPage/InboxCreateDialogComponent";
import InviteIcon from "../../../assets/media/Invite.png";
import ExportIcon from "../../../assets/media/Export & Share.png";
import CopyIcon from "../../../assets/media/Clipboard.png";
import DuplicateIcon from "../../../assets/media/Duplicate.png";
import DeleteIcon from "../../../assets/media/Trash.png";
import { Checkbox } from "primereact/checkbox";

const PersonalDetailsDataTable = ({ items, fields, onEditRow, onRowDelete, onRowClick, searchDialog, setSearchDialog,   showUpload, setShowUpload,
    showFilter, setShowFilter,
    showColumns, setShowColumns, onClickSaveFilteredfields ,
    selectedFilterFields, setSelectedFilterFields,
    selectedHideFields, setSelectedHideFields, onClickSaveHiddenfields, loading, user,   selectedDelete,
  setSelectedDelete, onCreateResult}) => {
    const dt = useRef(null);
    const urlParams = useParams();
    const [globalFilter, setGlobalFilter] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [data, setData] = useState([]);
  const header = (
    <div
      className="table-header"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h5 className="m-0"></h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Keyword Search"
        />
      </span>
    </div>
  );

const pCommercialApplicationsIdStatusTemplate0_0 = (rowData, { rowIndex }) => <p >{rowData.commercialApplicationsId?.status}</p>
const pTitleTemplate1 = (rowData, { rowIndex }) => <p >{rowData.title}</p>
const pFirstNameTemplate2 = (rowData, { rowIndex }) => <p >{rowData.firstName}</p>
const pMiddleNameTemplate3 = (rowData, { rowIndex }) => <p >{rowData.middleName}</p>
const pLastNameTemplate4 = (rowData, { rowIndex }) => <p >{rowData.lastName}</p>
const pPreviousSurnameTemplate5 = (rowData, { rowIndex }) => <p >{rowData.previousSurname}</p>
const p_dateDateOfBirthTemplate6 = (rowData, { rowIndex }) => <p >{moment(rowData.dateOfBirth).fromNow()}</p>
const pNationalityTemplate7 = (rowData, { rowIndex }) => <p >{rowData.nationality}</p>
const pCountryOfResidenceTemplate8 = (rowData, { rowIndex }) => <p >{rowData.countryOfResidence}</p>
const pResidentialAddressTemplate9 = (rowData, { rowIndex }) => <p >{rowData.residentialAddress}</p>
const pPostcodeTemplate10 = (rowData, { rowIndex }) => <p >{rowData.postcode}</p>
const pPreviousAddressTemplate11 = (rowData, { rowIndex }) => <p >{rowData.previousAddress}</p>
const pContactPreferenceTemplate12 = (rowData, { rowIndex }) => <p >{rowData.contactPreference}</p>
const pPhoneHomeTemplate13 = (rowData, { rowIndex }) => <p >{rowData.phoneHome}</p>
const pPhoneMobileTemplate14 = (rowData, { rowIndex }) => <p >{rowData.phoneMobile}</p>
const pEmailTemplate15 = (rowData, { rowIndex }) => <p >{rowData.email}</p>
const pCapacityRoleTemplate16 = (rowData, { rowIndex }) => <p >{rowData.capacityRole}</p>
const p_numberSharesHeldPctTemplate17 = (rowData, { rowIndex }) => <p >{rowData.sharesHeldPct}</p>
const p_booleanEverBankruptTemplate18 = (rowData, { rowIndex }) => <p >{String(rowData.everBankrupt)}</p>
const p_booleanMissedRepaymentsTemplate19 = (rowData, { rowIndex }) => <p >{String(rowData.missedRepayments)}</p>
const p_booleanIvaCvaTemplate20 = (rowData, { rowIndex }) => <p >{String(rowData.ivaCva)}</p>
const p_booleanPropertyRepossessedTemplate21 = (rowData, { rowIndex }) => <p >{String(rowData.propertyRepossessed)}</p>
const p_booleanCourtOrderTemplate22 = (rowData, { rowIndex }) => <p >{String(rowData.courtOrder)}</p>
const p_booleanBrokenCreditAgreementTemplate23 = (rowData, { rowIndex }) => <p >{String(rowData.brokenCreditAgreement)}</p>
const p_booleanAssociatedBusinessFailureTemplate24 = (rowData, { rowIndex }) => <p >{String(rowData.associatedBusinessFailure)}</p>
const pAdverseCreditDetailsTemplate25 = (rowData, { rowIndex }) => <p >{rowData.adverseCreditDetails}</p>
const pEmployerNameTemplate26 = (rowData, { rowIndex }) => <p >{rowData.employerName}</p>
const pJobTitleTemplate27 = (rowData, { rowIndex }) => <p >{rowData.jobTitle}</p>
const p_numberAnnualSalaryTemplate28 = (rowData, { rowIndex }) => <p >{rowData.annualSalary}</p>
const p_booleanEmploymentContinuesTemplate29 = (rowData, { rowIndex }) => <p >{String(rowData.employmentContinues)}</p>
const pSignatureTemplate30 = (rowData, { rowIndex }) => <p >{rowData.signature}</p>
const p_dateSignedDateTemplate31 = (rowData, { rowIndex }) => <p >{moment(rowData.signedDate).fromNow()}</p>
    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowData._id)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    
      const checkboxTemplate = (rowData) => (
    <Checkbox
      checked={selectedItems.some((item) => item._id === rowData._id)}
      onChange={(e) => {
        let _selectedItems = [...selectedItems];

        if (e.checked) {
          _selectedItems.push(rowData);
        } else {
          _selectedItems = _selectedItems.filter(
            (item) => item._id !== rowData._id,
          );
        }
        setSelectedItems(_selectedItems);
      }}
    />
  );
  const deselectAllRows = () => {
    // Logic to deselect all selected rows
    setSelectedItems([]); // Assuming setSelectedItems is used to manage selected items state
  };

  const handleDelete = async () => {
    if (!selectedItems || selectedItems.length === 0) return;

    try {
      const promises = selectedItems.map((item) =>
        client.service("companies").remove(item._id),
      );
      await Promise.all(promises);
      const updatedData = data.filter(
        (item) => !selectedItems.find((selected) => selected._id === item._id),
      );
      setData(updatedData);
      setSelectedDelete(selectedItems.map((item) => item._id));

      deselectAllRows();
    } catch (error) {
      console.error("Failed to delete selected records", error);
    }
  };
    
  const handleMessage = () => {
    setShowDialog(true); // Open the dialog
  };

  const handleHideDialog = () => {
    setShowDialog(false); // Close the dialog
  };

    return (
        <>
        <DataTable 
           value={items}
        ref={dt}
        removableSort
        onRowClick={onRowClick}
        scrollable
        rowHover
        stripedRows
        paginator
        rows={10}
        rowsPerPageOptions={[10, 50, 250, 500]}
        size={"small"}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        rowClassName="cursor-pointer"
        alwaysShowPaginator={!urlParams.singleUsersId}
        selection={selectedItems}
        onSelectionChange={(e) => setSelectedItems(e.value)}
        onCreateResult={onCreateResult}
        globalFilter={globalFilter}
        header={header}
        >
                <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
          body={checkboxTemplate}
        />
<Column field="commercialApplicationsId.status" header="Status" body={pCommercialApplicationsIdStatusTemplate0_0} style={{ minWidth: "8rem" }} />
<Column field="title" header="Title" body={pTitleTemplate1} filter={selectedFilterFields.includes("title")} hidden={selectedHideFields?.includes("title")}    style={{ minWidth: "8rem" }} />
<Column field="firstName" header="First Name" body={pFirstNameTemplate2} filter={selectedFilterFields.includes("firstName")} hidden={selectedHideFields?.includes("firstName")}    style={{ minWidth: "8rem" }} />
<Column field="middleName" header="Middle Name" body={pMiddleNameTemplate3} filter={selectedFilterFields.includes("middleName")} hidden={selectedHideFields?.includes("middleName")}    style={{ minWidth: "8rem" }} />
<Column field="lastName" header="Last Name" body={pLastNameTemplate4} filter={selectedFilterFields.includes("lastName")} hidden={selectedHideFields?.includes("lastName")}    style={{ minWidth: "8rem" }} />
<Column field="previousSurname" header="Previous Surname" body={pPreviousSurnameTemplate5} filter={selectedFilterFields.includes("previousSurname")} hidden={selectedHideFields?.includes("previousSurname")}    style={{ minWidth: "8rem" }} />
<Column field="dateOfBirth" header="Date Of Birth" body={p_dateDateOfBirthTemplate6} filter={selectedFilterFields.includes("dateOfBirth")} hidden={selectedHideFields?.includes("dateOfBirth")}  sortable  style={{ minWidth: "8rem" }} />
<Column field="nationality" header="Nationality" body={pNationalityTemplate7} filter={selectedFilterFields.includes("nationality")} hidden={selectedHideFields?.includes("nationality")}    style={{ minWidth: "8rem" }} />
<Column field="countryOfResidence" header="Country Of Residence" body={pCountryOfResidenceTemplate8} filter={selectedFilterFields.includes("countryOfResidence")} hidden={selectedHideFields?.includes("countryOfResidence")}    style={{ minWidth: "8rem" }} />
<Column field="residentialAddress" header="Residential Address" body={pResidentialAddressTemplate9} filter={selectedFilterFields.includes("residentialAddress")} hidden={selectedHideFields?.includes("residentialAddress")}    style={{ minWidth: "8rem" }} />
<Column field="postcode" header="Postcode" body={pPostcodeTemplate10} filter={selectedFilterFields.includes("postcode")} hidden={selectedHideFields?.includes("postcode")}    style={{ minWidth: "8rem" }} />
<Column field="previousAddress" header="Previous Address" body={pPreviousAddressTemplate11} filter={selectedFilterFields.includes("previousAddress")} hidden={selectedHideFields?.includes("previousAddress")}    style={{ minWidth: "8rem" }} />
<Column field="contactPreference" header="Contact Preference" body={pContactPreferenceTemplate12} filter={selectedFilterFields.includes("contactPreference")} hidden={selectedHideFields?.includes("contactPreference")}    style={{ minWidth: "8rem" }} />
<Column field="phoneHome" header="Phone Home" body={pPhoneHomeTemplate13} filter={selectedFilterFields.includes("phoneHome")} hidden={selectedHideFields?.includes("phoneHome")}    style={{ minWidth: "8rem" }} />
<Column field="phoneMobile" header="Phone Mobile" body={pPhoneMobileTemplate14} filter={selectedFilterFields.includes("phoneMobile")} hidden={selectedHideFields?.includes("phoneMobile")}    style={{ minWidth: "8rem" }} />
<Column field="email" header="Email" body={pEmailTemplate15} filter={selectedFilterFields.includes("email")} hidden={selectedHideFields?.includes("email")}    style={{ minWidth: "8rem" }} />
<Column field="capacityRole" header="Capacity Role" body={pCapacityRoleTemplate16} filter={selectedFilterFields.includes("capacityRole")} hidden={selectedHideFields?.includes("capacityRole")}    style={{ minWidth: "8rem" }} />
<Column field="sharesHeldPct" header="Shares Held Pct" body={p_numberSharesHeldPctTemplate17} filter={selectedFilterFields.includes("sharesHeldPct")} hidden={selectedHideFields?.includes("sharesHeldPct")}    style={{ minWidth: "8rem" }} />
<Column field="everBankrupt" header="Ever Bankrupt" body={p_booleanEverBankruptTemplate18} filter={selectedFilterFields.includes("everBankrupt")} hidden={selectedHideFields?.includes("everBankrupt")}    style={{ minWidth: "8rem" }} />
<Column field="missedRepayments" header="Missed Repayments" body={p_booleanMissedRepaymentsTemplate19} filter={selectedFilterFields.includes("missedRepayments")} hidden={selectedHideFields?.includes("missedRepayments")}    style={{ minWidth: "8rem" }} />
<Column field="ivaCva" header="Iva Cva" body={p_booleanIvaCvaTemplate20} filter={selectedFilterFields.includes("ivaCva")} hidden={selectedHideFields?.includes("ivaCva")}    style={{ minWidth: "8rem" }} />
<Column field="propertyRepossessed" header="Property Repossessed" body={p_booleanPropertyRepossessedTemplate21} filter={selectedFilterFields.includes("propertyRepossessed")} hidden={selectedHideFields?.includes("propertyRepossessed")}    style={{ minWidth: "8rem" }} />
<Column field="courtOrder" header="Court Order" body={p_booleanCourtOrderTemplate22} filter={selectedFilterFields.includes("courtOrder")} hidden={selectedHideFields?.includes("courtOrder")}    style={{ minWidth: "8rem" }} />
<Column field="brokenCreditAgreement" header="Broken Credit Agreement" body={p_booleanBrokenCreditAgreementTemplate23} filter={selectedFilterFields.includes("brokenCreditAgreement")} hidden={selectedHideFields?.includes("brokenCreditAgreement")}    style={{ minWidth: "8rem" }} />
<Column field="associatedBusinessFailure" header="Associated Business Failure" body={p_booleanAssociatedBusinessFailureTemplate24} filter={selectedFilterFields.includes("associatedBusinessFailure")} hidden={selectedHideFields?.includes("associatedBusinessFailure")}    style={{ minWidth: "8rem" }} />
<Column field="adverseCreditDetails" header="Adverse Credit Details" body={pAdverseCreditDetailsTemplate25} filter={selectedFilterFields.includes("adverseCreditDetails")} hidden={selectedHideFields?.includes("adverseCreditDetails")}    style={{ minWidth: "8rem" }} />
<Column field="employerName" header="Employer Name" body={pEmployerNameTemplate26} filter={selectedFilterFields.includes("employerName")} hidden={selectedHideFields?.includes("employerName")}    style={{ minWidth: "8rem" }} />
<Column field="jobTitle" header="Job Title" body={pJobTitleTemplate27} filter={selectedFilterFields.includes("jobTitle")} hidden={selectedHideFields?.includes("jobTitle")}    style={{ minWidth: "8rem" }} />
<Column field="annualSalary" header="Annual Salary" body={p_numberAnnualSalaryTemplate28} filter={selectedFilterFields.includes("annualSalary")} hidden={selectedHideFields?.includes("annualSalary")}    style={{ minWidth: "8rem" }} />
<Column field="employmentContinues" header="Employment Continues" body={p_booleanEmploymentContinuesTemplate29} filter={selectedFilterFields.includes("employmentContinues")} hidden={selectedHideFields?.includes("employmentContinues")}    style={{ minWidth: "8rem" }} />
<Column field="signature" header="Signature" body={pSignatureTemplate30} filter={selectedFilterFields.includes("signature")} hidden={selectedHideFields?.includes("signature")}    style={{ minWidth: "8rem" }} />
<Column field="signedDate" header="Signed Date" body={p_dateSignedDateTemplate31} filter={selectedFilterFields.includes("signedDate")} hidden={selectedHideFields?.includes("signedDate")}  sortable  style={{ minWidth: "8rem" }} />
            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
            
        </DataTable>


      {selectedItems.length > 0 ? (
        <div
          className="card center"
          style={{
            width: "51rem",
            margin: "20px auto 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px",
            fontSize: "14px",
            fontFamily: "Arial, sans-serif",
            color: "#2A4454",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #2A4454",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            {selectedItems.length} selected
            <span
              className="pi pi-times"
              style={{
                cursor: "pointer",
                marginLeft: "10px",
                color: "#2A4454",
              }}
              onClick={() => {
                deselectAllRows();
              }}
            />
          </div>

          {/* New buttons section */}
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* Copy button */}
            <Button
              label="Copy"
              labelposition="right"
              icon={
                <img
                  src={CopyIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              // tooltip="Copy"
              // onClick={handleCopy}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* Duplicate button */}
            <Button
              label="Duplicate"
              labelposition="right"
              icon={
                <img
                  src={DuplicateIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              // tooltip="Duplicate"
              // onClick={handleDuplicate}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* Export button */}
            <Button
              label="Export"
              labelposition="right"
              icon={
                <img
                  src={ExportIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              // tooltip="Export"
              // onClick={handleExport}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* Message button */}
            <Button
              label="Message"
              labelposition="right"
              icon={
                <img
                  src={InviteIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              onClick={handleMessage}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* InboxCreateDialogComponent */}
            <InboxCreateDialogComponent
              show={showDialog}
              onHide={handleHideDialog}
              serviceInbox="companies"
              onCreateResult={onCreateResult}
              // selectedItemsId={selectedItems.map(item => item._id)}
              selectedItemsId={selectedItems}
            />

            {/* <div style={{ display: 'flex', alignItems: 'center' }}> */}
            <Button
              label="Delete"
              labelposition="right"
              icon={
                <img
                  src={DeleteIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              onClick={handleDelete}
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                gap: "4px",
              }}
            />
          </div>
        </div>
      ) : null}


        <Dialog header="Upload PersonalDetails Data" visible={showUpload} onHide={() => setShowUpload(false)}>
        <UploadService 
          user={user} 
          serviceName="personalDetails"            
          onUploadComplete={() => {
            setShowUpload(false); // Close the dialog after upload
          }}/>
      </Dialog>

      <Dialog header="Search PersonalDetails" visible={searchDialog} onHide={() => setSearchDialog(false)}>
      Search
    </Dialog>
      <Dialog
        header="Hide Columns"
        visible={showColumns}
        onHide={() => setShowColumns(false)}
      >
        <div className="card flex justify-content-center">
          <MultiSelect
            value={selectedHideFields}
            onChange={(e) => setSelectedHideFields(e.value)}
            options={fields}
            optionLabel="name"
            optionValue="value"
            filter
            placeholder="Select Fields"
            maxSelectedLabels={6}
            className="w-full md:w-20rem"
          />
        </div>
        <Button
          text
          label="save as pref"
          onClick={() => {
            console.log(selectedHideFields);
            onClickSaveHiddenfields(selectedHideFields);
            setSelectedHideFields(selectedHideFields);
            setShowColumns(false)
          }}
        ></Button>
      </Dialog>
        </>
    );
};

export default PersonalDetailsDataTable;