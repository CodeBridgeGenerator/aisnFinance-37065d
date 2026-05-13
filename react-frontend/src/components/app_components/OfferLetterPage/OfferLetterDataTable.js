import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState, useRef, useEffect} from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
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

const OfferLetterDataTable = ({ items, fields, onEditRow, onRowDelete, onRowClick, searchDialog, setSearchDialog,   showUpload, setShowUpload,
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

const pDealIdStatusTemplate0_0 = (rowData, { rowIndex }) => <p >{rowData.dealId?.status}</p>
const pClientProfileNameTemplate1_0 = (rowData, { rowIndex }) => <p >{rowData.clientProfile?.name}</p>
const pApplicantNameTemplate2 = (rowData, { rowIndex }) => <p >{rowData.applicantName}</p>
const pReferenceNoTemplate3 = (rowData, { rowIndex }) => <p >{rowData.referenceNo}</p>
const p_dateApprovalDateTemplate4 = (rowData, { rowIndex }) => <p >{moment(rowData.approvalDate).fromNow()}</p>
const p_numberValidityDaysTemplate5 = (rowData, { rowIndex }) => <p >{rowData.validityDays}</p>
const pSecurityDescriptionTemplate6 = (rowData, { rowIndex }) => <p >{rowData.securityDescription}</p>
const p_numberEstimatedValueTemplate7 = (rowData, { rowIndex }) => <p >{rowData.estimatedValue}</p>
const currencyPurchasePriceTemplate8 = (rowData, { rowIndex }) => <InputNumber value={rowData.purchasePrice}  mode="currency" currency="MYR" locale="en-US" disabled={true} useGrouping={false} />
const p_numberGrossLoanAmountTemplate9 = (rowData, { rowIndex }) => <p >{rowData.grossLoanAmount}</p>
const p_numberMaxLtvPercentageTemplate10 = (rowData, { rowIndex }) => <p >{rowData.maxLtvPercentage}</p>
const p_numberLoanTermMonthsTemplate11 = (rowData, { rowIndex }) => <p >{rowData.loanTermMonths}</p>
const p_numberArrangementFeePercentageTemplate12 = (rowData, { rowIndex }) => <p >{rowData.arrangementFeePercentage}</p>
const p_numberConcessionaryInterestRateMonthlyTemplate13 = (rowData, { rowIndex }) => <p >{rowData.concessionaryInterestRateMonthly}</p>
const p_numberStandardInterestRateMonthlyTemplate14 = (rowData, { rowIndex }) => <p >{rowData.standardInterestRateMonthly}</p>
const p_numberMonthlyInterestPaymentsChargesTemplate15 = (rowData, { rowIndex }) => <p >{rowData.monthlyInterestPaymentsCharges}</p>
const p_numberAdvanceInterestAmountTemplate16 = (rowData, { rowIndex }) => <p >{rowData.advanceInterestAmount}</p>
const pExitStrategyConditionTemplate17 = (rowData, { rowIndex }) => <p >{rowData.exitStrategyCondition}</p>
const pStatusTemplate18 = (rowData, { rowIndex }) => <p >{rowData.status}</p>
const file_uploadGeneratedPdfDocumentTemplate19 = (rowData, { rowIndex }) => <div  > </div>
const pGeneratedByProfileNameTemplate20_0 = (rowData, { rowIndex }) => <p >{rowData.generatedByProfile?.name}</p>
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
<Column field="dealId.status" header="Status" body={pDealIdStatusTemplate0_0} style={{ minWidth: "8rem" }} />
<Column field="clientProfile.name" header="Name" body={pClientProfileNameTemplate1_0} style={{ minWidth: "8rem" }} />
<Column field="applicantName" header="Applicant Name" body={pApplicantNameTemplate2} filter={selectedFilterFields.includes("applicantName")} hidden={selectedHideFields?.includes("applicantName")}    style={{ minWidth: "8rem" }} />
<Column field="referenceNo" header="Reference No" body={pReferenceNoTemplate3} filter={selectedFilterFields.includes("referenceNo")} hidden={selectedHideFields?.includes("referenceNo")}    style={{ minWidth: "8rem" }} />
<Column field="approvalDate" header="Approval Date" body={p_dateApprovalDateTemplate4} filter={selectedFilterFields.includes("approvalDate")} hidden={selectedHideFields?.includes("approvalDate")}  sortable  style={{ minWidth: "8rem" }} />
<Column field="validityDays" header="Validity Days" body={p_numberValidityDaysTemplate5} filter={selectedFilterFields.includes("validityDays")} hidden={selectedHideFields?.includes("validityDays")}    style={{ minWidth: "8rem" }} />
<Column field="securityDescription" header="Security Description" body={pSecurityDescriptionTemplate6} filter={selectedFilterFields.includes("securityDescription")} hidden={selectedHideFields?.includes("securityDescription")}    style={{ minWidth: "8rem" }} />
<Column field="estimatedValue" header="Estimated Value" body={p_numberEstimatedValueTemplate7} filter={selectedFilterFields.includes("estimatedValue")} hidden={selectedHideFields?.includes("estimatedValue")}    style={{ minWidth: "8rem" }} />
<Column field="purchasePrice" header="Purchase Price" body={currencyPurchasePriceTemplate8} filter={selectedFilterFields.includes("purchasePrice")} hidden={selectedHideFields?.includes("purchasePrice")}    style={{ minWidth: "8rem" }} />
<Column field="grossLoanAmount" header="Gross Loan Amount" body={p_numberGrossLoanAmountTemplate9} filter={selectedFilterFields.includes("grossLoanAmount")} hidden={selectedHideFields?.includes("grossLoanAmount")}    style={{ minWidth: "8rem" }} />
<Column field="maxLtvPercentage" header="Max Ltv Percentage" body={p_numberMaxLtvPercentageTemplate10} filter={selectedFilterFields.includes("maxLtvPercentage")} hidden={selectedHideFields?.includes("maxLtvPercentage")}    style={{ minWidth: "8rem" }} />
<Column field="loanTermMonths" header="Loan Term Months" body={p_numberLoanTermMonthsTemplate11} filter={selectedFilterFields.includes("loanTermMonths")} hidden={selectedHideFields?.includes("loanTermMonths")}    style={{ minWidth: "8rem" }} />
<Column field="arrangementFeePercentage" header="Arrangement Fee Percentage" body={p_numberArrangementFeePercentageTemplate12} filter={selectedFilterFields.includes("arrangementFeePercentage")} hidden={selectedHideFields?.includes("arrangementFeePercentage")}    style={{ minWidth: "8rem" }} />
<Column field="concessionaryInterestRateMonthly" header="Concessionary Interest Rate Monthly" body={p_numberConcessionaryInterestRateMonthlyTemplate13} filter={selectedFilterFields.includes("concessionaryInterestRateMonthly")} hidden={selectedHideFields?.includes("concessionaryInterestRateMonthly")}    style={{ minWidth: "8rem" }} />
<Column field="standardInterestRateMonthly" header="Standard Interest Rate Monthly" body={p_numberStandardInterestRateMonthlyTemplate14} filter={selectedFilterFields.includes("standardInterestRateMonthly")} hidden={selectedHideFields?.includes("standardInterestRateMonthly")}    style={{ minWidth: "8rem" }} />
<Column field="monthlyInterestPaymentsCharges" header="Monthly Interest Payments Charges" body={p_numberMonthlyInterestPaymentsChargesTemplate15} filter={selectedFilterFields.includes("monthlyInterestPaymentsCharges")} hidden={selectedHideFields?.includes("monthlyInterestPaymentsCharges")}    style={{ minWidth: "8rem" }} />
<Column field="advanceInterestAmount" header="Advance Interest Amount" body={p_numberAdvanceInterestAmountTemplate16} filter={selectedFilterFields.includes("advanceInterestAmount")} hidden={selectedHideFields?.includes("advanceInterestAmount")}    style={{ minWidth: "8rem" }} />
<Column field="exitStrategyCondition" header="Exit Strategy Condition" body={pExitStrategyConditionTemplate17} filter={selectedFilterFields.includes("exitStrategyCondition")} hidden={selectedHideFields?.includes("exitStrategyCondition")}    style={{ minWidth: "8rem" }} />
<Column field="status" header="Status" body={pStatusTemplate18} filter={selectedFilterFields.includes("status")} hidden={selectedHideFields?.includes("status")}    style={{ minWidth: "8rem" }} />
<Column field="generatedPdfDocument" header="Generated Pdf Document" body={file_uploadGeneratedPdfDocumentTemplate19} filter={selectedFilterFields.includes("generatedPdfDocument")} hidden={selectedHideFields?.includes("generatedPdfDocument")}    style={{ minWidth: "8rem" }} />
<Column field="generatedByProfile.name" header="Name" body={pGeneratedByProfileNameTemplate20_0} style={{ minWidth: "8rem" }} />
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


        <Dialog header="Upload OfferLetter Data" visible={showUpload} onHide={() => setShowUpload(false)}>
        <UploadService 
          user={user} 
          serviceName="offerLetter"            
          onUploadComplete={() => {
            setShowUpload(false); // Close the dialog after upload
          }}/>
      </Dialog>

      <Dialog header="Search OfferLetter" visible={searchDialog} onHide={() => setSearchDialog(false)}>
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

export default OfferLetterDataTable;