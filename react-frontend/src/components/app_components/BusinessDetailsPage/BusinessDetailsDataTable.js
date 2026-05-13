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

const BusinessDetailsDataTable = ({ items, fields, onEditRow, onRowDelete, onRowClick, searchDialog, setSearchDialog,   showUpload, setShowUpload,
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

const pApplicationIdStatusTemplate0_0 = (rowData, { rowIndex }) => <p >{rowData.applicationId?.status}</p>
const pTradingNameTemplate1 = (rowData, { rowIndex }) => <p >{rowData.tradingName}</p>
const pRegisteredNameTemplate2 = (rowData, { rowIndex }) => <p >{rowData.registeredName}</p>
const p_dateBusinessStartDateTemplate3 = (rowData, { rowIndex }) => <p >{moment(rowData.businessStartDate).fromNow()}</p>
const pNatureOfBusinessTemplate4 = (rowData, { rowIndex }) => <p >{rowData.natureOfBusiness}</p>
const pBusinessAddressTemplate5 = (rowData, { rowIndex }) => <p >{rowData.businessAddress}</p>
const pCorrespondenceAddressTemplate6 = (rowData, { rowIndex }) => <p >{rowData.correspondenceAddress}</p>
const p_booleanSharedMailboxTemplate7 = (rowData, { rowIndex }) => <p >{String(rowData.sharedMailbox)}</p>
const pPhoneTemplate8 = (rowData, { rowIndex }) => <p >{rowData.phone}</p>
const pFaxTemplate9 = (rowData, { rowIndex }) => <p >{rowData.fax}</p>
const pEmailTemplate10 = (rowData, { rowIndex }) => <p >{rowData.email}</p>
const pWebsiteTemplate11 = (rowData, { rowIndex }) => <p >{rowData.website}</p>
const pRegisteredAddressTemplate12 = (rowData, { rowIndex }) => <p >{rowData.registeredAddress}</p>
const pCompanyRegNoTemplate13 = (rowData, { rowIndex }) => <p >{rowData.companyRegNo}</p>
const pCountryOfRegistrationTemplate14 = (rowData, { rowIndex }) => <p >{rowData.countryOfRegistration}</p>
const pIncorporatedDateTemplate15 = (rowData, { rowIndex }) => <p >{rowData.incorporatedDate}</p>
const pBusinessTypeTemplate16 = (rowData, { rowIndex }) => <p >{rowData.businessType}</p>
const p_numberNumPartnersTemplate17 = (rowData, { rowIndex }) => <p >{rowData.numPartners}</p>
const p_numberNumDirectorsTemplate18 = (rowData, { rowIndex }) => <p >{rowData.numDirectors}</p>
const p_numberNumBeneficiariesTemplate19 = (rowData, { rowIndex }) => <p >{rowData.numBeneficiaries}</p>
const p_numberShareholdersTemplate20 = (rowData, { rowIndex }) => <p >{rowData.shareholders}</p>
const p_numberAnticipatedTurnoverTemplate21 = (rowData, { rowIndex }) => <p >{rowData.anticipatedTurnover}</p>
const p_numberNumEmployeesTemplate22 = (rowData, { rowIndex }) => <p >{rowData.numEmployees}</p>
const p_booleanMadeCvaTemplate23 = (rowData, { rowIndex }) => <p >{String(rowData.madeCva)}</p>
const p_booleanPropertyRepossessedTemplate24 = (rowData, { rowIndex }) => <p >{String(rowData.propertyRepossessed)}</p>
const p_booleanCourtOrderTemplate25 = (rowData, { rowIndex }) => <p >{String(rowData.courtOrder)}</p>
const p_booleanMissedRepaymentsTemplate26 = (rowData, { rowIndex }) => <p >{String(rowData.missedRepayments)}</p>
const p_booleanBrokenCreditAgreementTemplate27 = (rowData, { rowIndex }) => <p >{String(rowData.brokenCreditAgreement)}</p>
const pAdverseCreditDetailsTemplate28 = (rowData, { rowIndex }) => <p >{rowData.adverseCreditDetails}</p>
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
<Column field="applicationId.status" header="Status" body={pApplicationIdStatusTemplate0_0} style={{ minWidth: "8rem" }} />
<Column field="tradingName" header="Trading Name" body={pTradingNameTemplate1} filter={selectedFilterFields.includes("tradingName")} hidden={selectedHideFields?.includes("tradingName")}    style={{ minWidth: "8rem" }} />
<Column field="registeredName" header="Registered Name" body={pRegisteredNameTemplate2} filter={selectedFilterFields.includes("registeredName")} hidden={selectedHideFields?.includes("registeredName")}    style={{ minWidth: "8rem" }} />
<Column field="businessStartDate" header="Business Start Date" body={p_dateBusinessStartDateTemplate3} filter={selectedFilterFields.includes("businessStartDate")} hidden={selectedHideFields?.includes("businessStartDate")}  sortable  style={{ minWidth: "8rem" }} />
<Column field="natureOfBusiness" header="Nature Of Business" body={pNatureOfBusinessTemplate4} filter={selectedFilterFields.includes("natureOfBusiness")} hidden={selectedHideFields?.includes("natureOfBusiness")}    style={{ minWidth: "8rem" }} />
<Column field="businessAddress" header="Business Address" body={pBusinessAddressTemplate5} filter={selectedFilterFields.includes("businessAddress")} hidden={selectedHideFields?.includes("businessAddress")}    style={{ minWidth: "8rem" }} />
<Column field="correspondenceAddress" header="Correspondence Address" body={pCorrespondenceAddressTemplate6} filter={selectedFilterFields.includes("correspondenceAddress")} hidden={selectedHideFields?.includes("correspondenceAddress")}    style={{ minWidth: "8rem" }} />
<Column field="sharedMailbox" header="Shared Mailbox" body={p_booleanSharedMailboxTemplate7} filter={selectedFilterFields.includes("sharedMailbox")} hidden={selectedHideFields?.includes("sharedMailbox")}    style={{ minWidth: "8rem" }} />
<Column field="phone" header="Phone" body={pPhoneTemplate8} filter={selectedFilterFields.includes("phone")} hidden={selectedHideFields?.includes("phone")}    style={{ minWidth: "8rem" }} />
<Column field="fax" header="Fax" body={pFaxTemplate9} filter={selectedFilterFields.includes("fax")} hidden={selectedHideFields?.includes("fax")}    style={{ minWidth: "8rem" }} />
<Column field="email" header="Email" body={pEmailTemplate10} filter={selectedFilterFields.includes("email")} hidden={selectedHideFields?.includes("email")}    style={{ minWidth: "8rem" }} />
<Column field="website" header="Website" body={pWebsiteTemplate11} filter={selectedFilterFields.includes("website")} hidden={selectedHideFields?.includes("website")}    style={{ minWidth: "8rem" }} />
<Column field="registeredAddress" header="Registered Address" body={pRegisteredAddressTemplate12} filter={selectedFilterFields.includes("registeredAddress")} hidden={selectedHideFields?.includes("registeredAddress")}    style={{ minWidth: "8rem" }} />
<Column field="companyRegNo" header="Company Reg No" body={pCompanyRegNoTemplate13} filter={selectedFilterFields.includes("companyRegNo")} hidden={selectedHideFields?.includes("companyRegNo")}    style={{ minWidth: "8rem" }} />
<Column field="countryOfRegistration" header="Country Of Registration" body={pCountryOfRegistrationTemplate14} filter={selectedFilterFields.includes("countryOfRegistration")} hidden={selectedHideFields?.includes("countryOfRegistration")}    style={{ minWidth: "8rem" }} />
<Column field="incorporatedDate" header="Incorporated Date" body={pIncorporatedDateTemplate15} filter={selectedFilterFields.includes("incorporatedDate")} hidden={selectedHideFields?.includes("incorporatedDate")}    style={{ minWidth: "8rem" }} />
<Column field="businessType" header="Business Type" body={pBusinessTypeTemplate16} filter={selectedFilterFields.includes("businessType")} hidden={selectedHideFields?.includes("businessType")}    style={{ minWidth: "8rem" }} />
<Column field="numPartners" header="Num Partners" body={p_numberNumPartnersTemplate17} filter={selectedFilterFields.includes("numPartners")} hidden={selectedHideFields?.includes("numPartners")}    style={{ minWidth: "8rem" }} />
<Column field="numDirectors" header="Num Directors" body={p_numberNumDirectorsTemplate18} filter={selectedFilterFields.includes("numDirectors")} hidden={selectedHideFields?.includes("numDirectors")}    style={{ minWidth: "8rem" }} />
<Column field="numBeneficiaries" header="Num Beneficiaries" body={p_numberNumBeneficiariesTemplate19} filter={selectedFilterFields.includes("numBeneficiaries")} hidden={selectedHideFields?.includes("numBeneficiaries")}    style={{ minWidth: "8rem" }} />
<Column field="shareholders" header="Shareholders" body={p_numberShareholdersTemplate20} filter={selectedFilterFields.includes("shareholders")} hidden={selectedHideFields?.includes("shareholders")}    style={{ minWidth: "8rem" }} />
<Column field="anticipatedTurnover" header="Anticipated Turnover" body={p_numberAnticipatedTurnoverTemplate21} filter={selectedFilterFields.includes("anticipatedTurnover")} hidden={selectedHideFields?.includes("anticipatedTurnover")}    style={{ minWidth: "8rem" }} />
<Column field="numEmployees" header="Num Employees" body={p_numberNumEmployeesTemplate22} filter={selectedFilterFields.includes("numEmployees")} hidden={selectedHideFields?.includes("numEmployees")}    style={{ minWidth: "8rem" }} />
<Column field="madeCva" header="Made Cva" body={p_booleanMadeCvaTemplate23} filter={selectedFilterFields.includes("madeCva")} hidden={selectedHideFields?.includes("madeCva")}    style={{ minWidth: "8rem" }} />
<Column field="propertyRepossessed" header="Property Repossessed" body={p_booleanPropertyRepossessedTemplate24} filter={selectedFilterFields.includes("propertyRepossessed")} hidden={selectedHideFields?.includes("propertyRepossessed")}    style={{ minWidth: "8rem" }} />
<Column field="courtOrder" header="Court Order" body={p_booleanCourtOrderTemplate25} filter={selectedFilterFields.includes("courtOrder")} hidden={selectedHideFields?.includes("courtOrder")}    style={{ minWidth: "8rem" }} />
<Column field="missedRepayments" header="Missed Repayments" body={p_booleanMissedRepaymentsTemplate26} filter={selectedFilterFields.includes("missedRepayments")} hidden={selectedHideFields?.includes("missedRepayments")}    style={{ minWidth: "8rem" }} />
<Column field="brokenCreditAgreement" header="Broken Credit Agreement" body={p_booleanBrokenCreditAgreementTemplate27} filter={selectedFilterFields.includes("brokenCreditAgreement")} hidden={selectedHideFields?.includes("brokenCreditAgreement")}    style={{ minWidth: "8rem" }} />
<Column field="adverseCreditDetails" header="Adverse Credit Details" body={pAdverseCreditDetailsTemplate28} filter={selectedFilterFields.includes("adverseCreditDetails")} hidden={selectedHideFields?.includes("adverseCreditDetails")}    style={{ minWidth: "8rem" }} />
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


        <Dialog header="Upload BusinessDetails Data" visible={showUpload} onHide={() => setShowUpload(false)}>
        <UploadService 
          user={user} 
          serviceName="businessDetails"            
          onUploadComplete={() => {
            setShowUpload(false); // Close the dialog after upload
          }}/>
      </Dialog>

      <Dialog header="Search BusinessDetails" visible={searchDialog} onHide={() => setSearchDialog(false)}>
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

export default BusinessDetailsDataTable;