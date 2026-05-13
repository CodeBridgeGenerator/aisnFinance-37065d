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

const FileAdminChecklistDataTable = ({ items, fields, onEditRow, onRowDelete, onRowClick, searchDialog, setSearchDialog,   showUpload, setShowUpload,
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
const pAdviserNameTemplate1 = (rowData, { rowIndex }) => <p >{rowData.adviserName}</p>
const pClientNamesTemplate2 = (rowData, { rowIndex }) => <p >{rowData.clientNames}</p>
const pCheckedByNameTemplate3_0 = (rowData, { rowIndex }) => <p >{rowData.checkedBy?.name}</p>
const p_dateCheckedDateTemplate4 = (rowData, { rowIndex }) => <p >{moment(rowData.checkedDate).fromNow()}</p>
const pProviderNameTemplate5 = (rowData, { rowIndex }) => <p >{rowData.providerName}</p>
const pLenderNameTemplate6 = (rowData, { rowIndex }) => <p >{rowData.lenderName}</p>
const pProductNameTemplate7 = (rowData, { rowIndex }) => <p >{rowData.productName}</p>
const pApplicationFormStatusTemplate8_0 = (rowData, { rowIndex }) => <p >{rowData.applicationForm?.status}</p>
const p_numberApplicationFormDateTemplate9 = (rowData, { rowIndex }) => <p >{rowData.applicationFormDate}</p>
const p_booleanIdentificationProofTemplate10 = (rowData, { rowIndex }) => <p >{String(rowData.identificationProof)}</p>
const p_numberIdentificationProofDateTemplate11 = (rowData, { rowIndex }) => <p >{rowData.identificationProofDate}</p>
const p_booleanFactfindKycTemplate12 = (rowData, { rowIndex }) => <p >{String(rowData.factfindKyc)}</p>
const p_numberFactfindKycDateTemplate13 = (rowData, { rowIndex }) => <p >{rowData.factfindKycDate}</p>
const p_booleanLoanMemorandumPreparedOnFileTemplate14 = (rowData, { rowIndex }) => <p >{String(rowData.loanMemorandumPreparedOnFile)}</p>
const p_booleanBoardSignOffTemplate15 = (rowData, { rowIndex }) => <p >{String(rowData.boardSignOff)}</p>
const p_booleanOfferLetterPreparedSentTemplate16 = (rowData, { rowIndex }) => <p >{String(rowData.offerLetterPreparedSent)}</p>
const p_numberOfferLetterPreparedTemplate17 = (rowData, { rowIndex }) => <p >{rowData.offerLetterPrepared}</p>
const p_booleanFacilityLetterPreparedCheckedTemplate18 = (rowData, { rowIndex }) => <p >{String(rowData.facilityLetterPreparedChecked)}</p>
const p_booleanValuationsInstructedTemplate19 = (rowData, { rowIndex }) => <p >{String(rowData.valuationsInstructed)}</p>
const p_numberValuationsInstructedDateTemplate20 = (rowData, { rowIndex }) => <p >{rowData.valuationsInstructedDate}</p>
const p_booleanSolicitorInstructedTemplate21 = (rowData, { rowIndex }) => <p >{String(rowData.solicitorInstructed)}</p>
const p_booleanLoanDrawnDownTemplate22 = (rowData, { rowIndex }) => <p >{String(rowData.loanDrawnDown)}</p>
const p_booleanPostDrawdownDirectDebitAccountsTemplate23 = (rowData, { rowIndex }) => <p >{String(rowData.postDrawdownDirectDebitAccounts)}</p>
const p_booleanPropertyInsuranceLandRegistryOnFileTemplate24 = (rowData, { rowIndex }) => <p >{String(rowData.propertyInsuranceLandRegistryOnFile)}</p>
const pNotesTemplate25 = (rowData, { rowIndex }) => <p >{rowData.notes}</p>
const pStatusTemplate26 = (rowData, { rowIndex }) => <p >{rowData.status}</p>
const pCompletedByProfileNameTemplate27_0 = (rowData, { rowIndex }) => <p >{rowData.completedByProfile?.name}</p>
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
<Column field="adviserName" header="Adviser Name" body={pAdviserNameTemplate1} filter={selectedFilterFields.includes("adviserName")} hidden={selectedHideFields?.includes("adviserName")}    style={{ minWidth: "8rem" }} />
<Column field="clientNames" header="Client Names" body={pClientNamesTemplate2} filter={selectedFilterFields.includes("clientNames")} hidden={selectedHideFields?.includes("clientNames")}    style={{ minWidth: "8rem" }} />
<Column field="checkedBy.name" header="Name" body={pCheckedByNameTemplate3_0} style={{ minWidth: "8rem" }} />
<Column field="checkedDate" header="Checked Date" body={p_dateCheckedDateTemplate4} filter={selectedFilterFields.includes("checkedDate")} hidden={selectedHideFields?.includes("checkedDate")}  sortable  style={{ minWidth: "8rem" }} />
<Column field="providerName" header="Provider Name" body={pProviderNameTemplate5} filter={selectedFilterFields.includes("providerName")} hidden={selectedHideFields?.includes("providerName")}    style={{ minWidth: "8rem" }} />
<Column field="lenderName" header="Lender Name" body={pLenderNameTemplate6} filter={selectedFilterFields.includes("lenderName")} hidden={selectedHideFields?.includes("lenderName")}    style={{ minWidth: "8rem" }} />
<Column field="productName" header="Product Name" body={pProductNameTemplate7} filter={selectedFilterFields.includes("productName")} hidden={selectedHideFields?.includes("productName")}    style={{ minWidth: "8rem" }} />
<Column field="applicationForm.status" header="Status" body={pApplicationFormStatusTemplate8_0} style={{ minWidth: "8rem" }} />
<Column field="applicationFormDate" header="Application Form Date" body={p_numberApplicationFormDateTemplate9} filter={selectedFilterFields.includes("applicationFormDate")} hidden={selectedHideFields?.includes("applicationFormDate")}    style={{ minWidth: "8rem" }} />
<Column field="identificationProof" header="Identification Proof" body={p_booleanIdentificationProofTemplate10} filter={selectedFilterFields.includes("identificationProof")} hidden={selectedHideFields?.includes("identificationProof")}    style={{ minWidth: "8rem" }} />
<Column field="identificationProofDate" header="Identification Proof Date" body={p_numberIdentificationProofDateTemplate11} filter={selectedFilterFields.includes("identificationProofDate")} hidden={selectedHideFields?.includes("identificationProofDate")}    style={{ minWidth: "8rem" }} />
<Column field="factfindKyc" header="Factfind Kyc" body={p_booleanFactfindKycTemplate12} filter={selectedFilterFields.includes("factfindKyc")} hidden={selectedHideFields?.includes("factfindKyc")}    style={{ minWidth: "8rem" }} />
<Column field="factfindKycDate" header="Factfind Kyc Date" body={p_numberFactfindKycDateTemplate13} filter={selectedFilterFields.includes("factfindKycDate")} hidden={selectedHideFields?.includes("factfindKycDate")}    style={{ minWidth: "8rem" }} />
<Column field="loanMemorandumPreparedOnFile" header="Loan Memorandum Prepared On File" body={p_booleanLoanMemorandumPreparedOnFileTemplate14} filter={selectedFilterFields.includes("loanMemorandumPreparedOnFile")} hidden={selectedHideFields?.includes("loanMemorandumPreparedOnFile")}    style={{ minWidth: "8rem" }} />
<Column field="boardSignOff" header="Board Sign Off" body={p_booleanBoardSignOffTemplate15} filter={selectedFilterFields.includes("boardSignOff")} hidden={selectedHideFields?.includes("boardSignOff")}    style={{ minWidth: "8rem" }} />
<Column field="offerLetterPreparedSent" header="Offer Letter Prepared Sent" body={p_booleanOfferLetterPreparedSentTemplate16} filter={selectedFilterFields.includes("offerLetterPreparedSent")} hidden={selectedHideFields?.includes("offerLetterPreparedSent")}    style={{ minWidth: "8rem" }} />
<Column field="offerLetterPrepared" header="Offer Letter Prepared" body={p_numberOfferLetterPreparedTemplate17} filter={selectedFilterFields.includes("offerLetterPrepared")} hidden={selectedHideFields?.includes("offerLetterPrepared")}    style={{ minWidth: "8rem" }} />
<Column field="facilityLetterPreparedChecked" header="Facility Letter Prepared Checked" body={p_booleanFacilityLetterPreparedCheckedTemplate18} filter={selectedFilterFields.includes("facilityLetterPreparedChecked")} hidden={selectedHideFields?.includes("facilityLetterPreparedChecked")}    style={{ minWidth: "8rem" }} />
<Column field="valuationsInstructed" header="Valuations Instructed" body={p_booleanValuationsInstructedTemplate19} filter={selectedFilterFields.includes("valuationsInstructed")} hidden={selectedHideFields?.includes("valuationsInstructed")}    style={{ minWidth: "8rem" }} />
<Column field="valuationsInstructedDate" header="Valuations Instructed Date" body={p_numberValuationsInstructedDateTemplate20} filter={selectedFilterFields.includes("valuationsInstructedDate")} hidden={selectedHideFields?.includes("valuationsInstructedDate")}    style={{ minWidth: "8rem" }} />
<Column field="solicitorInstructed" header="Solicitor Instructed" body={p_booleanSolicitorInstructedTemplate21} filter={selectedFilterFields.includes("solicitorInstructed")} hidden={selectedHideFields?.includes("solicitorInstructed")}    style={{ minWidth: "8rem" }} />
<Column field="loanDrawnDown" header="Loan Drawn Down" body={p_booleanLoanDrawnDownTemplate22} filter={selectedFilterFields.includes("loanDrawnDown")} hidden={selectedHideFields?.includes("loanDrawnDown")}    style={{ minWidth: "8rem" }} />
<Column field="postDrawdownDirectDebitAccounts" header="Post Drawdown Direct Debit Accounts" body={p_booleanPostDrawdownDirectDebitAccountsTemplate23} filter={selectedFilterFields.includes("postDrawdownDirectDebitAccounts")} hidden={selectedHideFields?.includes("postDrawdownDirectDebitAccounts")}    style={{ minWidth: "8rem" }} />
<Column field="propertyInsuranceLandRegistryOnFile" header="Property Insurance Land Registry On File" body={p_booleanPropertyInsuranceLandRegistryOnFileTemplate24} filter={selectedFilterFields.includes("propertyInsuranceLandRegistryOnFile")} hidden={selectedHideFields?.includes("propertyInsuranceLandRegistryOnFile")}    style={{ minWidth: "8rem" }} />
<Column field="notes" header="Notes" body={pNotesTemplate25} filter={selectedFilterFields.includes("notes")} hidden={selectedHideFields?.includes("notes")}    style={{ minWidth: "8rem" }} />
<Column field="status" header="Status" body={pStatusTemplate26} filter={selectedFilterFields.includes("status")} hidden={selectedHideFields?.includes("status")}    style={{ minWidth: "8rem" }} />
<Column field="completedByProfile.name" header="Name" body={pCompletedByProfileNameTemplate27_0} style={{ minWidth: "8rem" }} />
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


        <Dialog header="Upload FileAdminChecklist Data" visible={showUpload} onHide={() => setShowUpload(false)}>
        <UploadService 
          user={user} 
          serviceName="fileAdminChecklist"            
          onUploadComplete={() => {
            setShowUpload(false); // Close the dialog after upload
          }}/>
      </Dialog>

      <Dialog header="Search FileAdminChecklist" visible={searchDialog} onHide={() => setSearchDialog(false)}>
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

export default FileAdminChecklistDataTable;