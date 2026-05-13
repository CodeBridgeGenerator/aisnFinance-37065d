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

const AnnualClientReviewsDataTable = ({ items, fields, onEditRow, onRowDelete, onRowClick, searchDialog, setSearchDialog,   showUpload, setShowUpload,
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

const pDealStatusTemplate0_0 = (rowData, { rowIndex }) => <p >{rowData.deal?.status}</p>
const pClientProfileTemplate1 = (rowData, { rowIndex }) => <p >{rowData.clientProfile}</p>
const p_numberReviewYearTemplate2 = (rowData, { rowIndex }) => <p >{rowData.reviewYear}</p>
const p_dateReviewDueDateTemplate3 = (rowData, { rowIndex }) => <p >{moment(rowData.reviewDueDate).fromNow()}</p>
const p_dateReminderDateTemplate4 = (rowData, { rowIndex }) => <p >{moment(rowData.reminderDate).fromNow()}</p>
const p_booleanEpcCertOnFileTemplate5 = (rowData, { rowIndex }) => <p >{String(rowData.epcCertOnFile)}</p>
const pEpcCertDocumentTemplate6 = (rowData, { rowIndex }) => <p >{rowData.epcCertDocument}</p>
const p_booleanAnnualBuildingInsuranceOnFileTemplate7 = (rowData, { rowIndex }) => <p >{String(rowData.annualBuildingInsuranceOnFile)}</p>
const p_dateBuildingInsuranceExpiryDateTemplate8 = (rowData, { rowIndex }) => <p >{moment(rowData.buildingInsuranceExpiryDate).fromNow()}</p>
const pBuildingInsuranceDocumentTemplate9 = (rowData, { rowIndex }) => <p >{rowData.buildingInsuranceDocument}</p>
const p_booleanIsBuildingInsuranceExpiredTemplate10 = (rowData, { rowIndex }) => <p >{String(rowData.isBuildingInsuranceExpired)}</p>
const p_booleanGasCertOnFileTemplate11 = (rowData, { rowIndex }) => <p >{String(rowData.gasCertOnFile)}</p>
const pGasCertDocumentTemplate12 = (rowData, { rowIndex }) => <p >{rowData.gasCertDocument}</p>
const p_booleanElectricPatCertOnFileTemplate13 = (rowData, { rowIndex }) => <p >{String(rowData.electricPatCertOnFile)}</p>
const pElectricPatCertDocumentTemplate14 = (rowData, { rowIndex }) => <p >{rowData.electricPatCertDocument}</p>
const p_booleanCompanyAccountsOnFileTemplate15 = (rowData, { rowIndex }) => <p >{String(rowData.companyAccountsOnFile)}</p>
const p_booleanLandRegistryCheckOnFileTemplate16 = (rowData, { rowIndex }) => <p >{String(rowData.landRegistryCheckOnFile)}</p>
const pLandRegistryCheckDocumentTemplate17 = (rowData, { rowIndex }) => <p >{rowData.landRegistryCheckDocument}</p>
const p_booleanCreditReportOnFileTemplate18 = (rowData, { rowIndex }) => <p >{String(rowData.creditReportOnFile)}</p>
const pCreditReportDocumentTemplate19 = (rowData, { rowIndex }) => <p >{rowData.creditReportDocument}</p>
const pCommentsTemplate20 = (rowData, { rowIndex }) => <p >{rowData.comments}</p>
const pStatusTemplate21 = (rowData, { rowIndex }) => <p >{rowData.status}</p>
const pReviewedByProfileTemplate22 = (rowData, { rowIndex }) => <p >{rowData.reviewedByProfile}</p>
const p_numberReviewedAtTemplate23 = (rowData, { rowIndex }) => <p >{rowData.reviewedAt}</p>
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
<Column field="deal.status" header="Status" body={pDealStatusTemplate0_0} style={{ minWidth: "8rem" }} />
<Column field="clientProfile" header="Client Profile" body={pClientProfileTemplate1} filter={selectedFilterFields.includes("clientProfile")} hidden={selectedHideFields?.includes("clientProfile")}    style={{ minWidth: "8rem" }} />
<Column field="reviewYear" header="Review Year" body={p_numberReviewYearTemplate2} filter={selectedFilterFields.includes("reviewYear")} hidden={selectedHideFields?.includes("reviewYear")}    style={{ minWidth: "8rem" }} />
<Column field="reviewDueDate" header="Review Due Date" body={p_dateReviewDueDateTemplate3} filter={selectedFilterFields.includes("reviewDueDate")} hidden={selectedHideFields?.includes("reviewDueDate")}  sortable  style={{ minWidth: "8rem" }} />
<Column field="reminderDate" header="Reminder Date" body={p_dateReminderDateTemplate4} filter={selectedFilterFields.includes("reminderDate")} hidden={selectedHideFields?.includes("reminderDate")}  sortable  style={{ minWidth: "8rem" }} />
<Column field="epcCertOnFile" header="Epc Cert On File" body={p_booleanEpcCertOnFileTemplate5} filter={selectedFilterFields.includes("epcCertOnFile")} hidden={selectedHideFields?.includes("epcCertOnFile")}    style={{ minWidth: "8rem" }} />
<Column field="epcCertDocument" header="Epc Cert Document" body={pEpcCertDocumentTemplate6} filter={selectedFilterFields.includes("epcCertDocument")} hidden={selectedHideFields?.includes("epcCertDocument")}    style={{ minWidth: "8rem" }} />
<Column field="annualBuildingInsuranceOnFile" header="Annual Building Insurance On File" body={p_booleanAnnualBuildingInsuranceOnFileTemplate7} filter={selectedFilterFields.includes("annualBuildingInsuranceOnFile")} hidden={selectedHideFields?.includes("annualBuildingInsuranceOnFile")}    style={{ minWidth: "8rem" }} />
<Column field="buildingInsuranceExpiryDate" header="Building Insurance Expiry Date" body={p_dateBuildingInsuranceExpiryDateTemplate8} filter={selectedFilterFields.includes("buildingInsuranceExpiryDate")} hidden={selectedHideFields?.includes("buildingInsuranceExpiryDate")}  sortable  style={{ minWidth: "8rem" }} />
<Column field="buildingInsuranceDocument" header="Building Insurance Document" body={pBuildingInsuranceDocumentTemplate9} filter={selectedFilterFields.includes("buildingInsuranceDocument")} hidden={selectedHideFields?.includes("buildingInsuranceDocument")}    style={{ minWidth: "8rem" }} />
<Column field="isBuildingInsuranceExpired" header="Is Building Insurance Expired" body={p_booleanIsBuildingInsuranceExpiredTemplate10} filter={selectedFilterFields.includes("isBuildingInsuranceExpired")} hidden={selectedHideFields?.includes("isBuildingInsuranceExpired")}    style={{ minWidth: "8rem" }} />
<Column field="gasCertOnFile" header="Gas Cert On File" body={p_booleanGasCertOnFileTemplate11} filter={selectedFilterFields.includes("gasCertOnFile")} hidden={selectedHideFields?.includes("gasCertOnFile")}    style={{ minWidth: "8rem" }} />
<Column field="gasCertDocument" header="Gas Cert Document" body={pGasCertDocumentTemplate12} filter={selectedFilterFields.includes("gasCertDocument")} hidden={selectedHideFields?.includes("gasCertDocument")}    style={{ minWidth: "8rem" }} />
<Column field="electricPatCertOnFile" header="Electric Pat Cert On File" body={p_booleanElectricPatCertOnFileTemplate13} filter={selectedFilterFields.includes("electricPatCertOnFile")} hidden={selectedHideFields?.includes("electricPatCertOnFile")}    style={{ minWidth: "8rem" }} />
<Column field="electricPatCertDocument" header="Electric Pat Cert Document" body={pElectricPatCertDocumentTemplate14} filter={selectedFilterFields.includes("electricPatCertDocument")} hidden={selectedHideFields?.includes("electricPatCertDocument")}    style={{ minWidth: "8rem" }} />
<Column field="companyAccountsOnFile" header="Company Accounts On File" body={p_booleanCompanyAccountsOnFileTemplate15} filter={selectedFilterFields.includes("companyAccountsOnFile")} hidden={selectedHideFields?.includes("companyAccountsOnFile")}    style={{ minWidth: "8rem" }} />
<Column field="landRegistryCheckOnFile" header="Land Registry Check On File" body={p_booleanLandRegistryCheckOnFileTemplate16} filter={selectedFilterFields.includes("landRegistryCheckOnFile")} hidden={selectedHideFields?.includes("landRegistryCheckOnFile")}    style={{ minWidth: "8rem" }} />
<Column field="landRegistryCheckDocument" header="Land Registry Check Document" body={pLandRegistryCheckDocumentTemplate17} filter={selectedFilterFields.includes("landRegistryCheckDocument")} hidden={selectedHideFields?.includes("landRegistryCheckDocument")}    style={{ minWidth: "8rem" }} />
<Column field="creditReportOnFile" header="Credit Report On File" body={p_booleanCreditReportOnFileTemplate18} filter={selectedFilterFields.includes("creditReportOnFile")} hidden={selectedHideFields?.includes("creditReportOnFile")}    style={{ minWidth: "8rem" }} />
<Column field="creditReportDocument" header="Credit Report Document" body={pCreditReportDocumentTemplate19} filter={selectedFilterFields.includes("creditReportDocument")} hidden={selectedHideFields?.includes("creditReportDocument")}    style={{ minWidth: "8rem" }} />
<Column field="comments" header="Comments" body={pCommentsTemplate20} filter={selectedFilterFields.includes("comments")} hidden={selectedHideFields?.includes("comments")}    style={{ minWidth: "8rem" }} />
<Column field="status" header="Status" body={pStatusTemplate21} filter={selectedFilterFields.includes("status")} hidden={selectedHideFields?.includes("status")}    style={{ minWidth: "8rem" }} />
<Column field="reviewedByProfile" header="Reviewed By Profile" body={pReviewedByProfileTemplate22} filter={selectedFilterFields.includes("reviewedByProfile")} hidden={selectedHideFields?.includes("reviewedByProfile")}    style={{ minWidth: "8rem" }} />
<Column field="reviewedAt" header="Reviewed At" body={p_numberReviewedAtTemplate23} filter={selectedFilterFields.includes("reviewedAt")} hidden={selectedHideFields?.includes("reviewedAt")}    style={{ minWidth: "8rem" }} />
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


        <Dialog header="Upload AnnualClientReviews Data" visible={showUpload} onHide={() => setShowUpload(false)}>
        <UploadService 
          user={user} 
          serviceName="annualClientReviews"            
          onUploadComplete={() => {
            setShowUpload(false); // Close the dialog after upload
          }}/>
      </Dialog>

      <Dialog header="Search AnnualClientReviews" visible={searchDialog} onHide={() => setSearchDialog(false)}>
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

export default AnnualClientReviewsDataTable;