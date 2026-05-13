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

const CreditPaperDataTable = ({ items, fields, onEditRow, onRowDelete, onRowClick, searchDialog, setSearchDialog,   showUpload, setShowUpload,
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
const pPreparedByNameTemplate1_0 = (rowData, { rowIndex }) => <p >{rowData.preparedBy?.name}</p>
const pBorrowerNameTemplate2 = (rowData, { rowIndex }) => <p >{rowData.borrowerName}</p>
const currencyLoanAmountTemplate3 = (rowData, { rowIndex }) => <InputNumber value={rowData.loanAmount}  mode="currency" currency="MYR" locale="en-US" disabled={true} useGrouping={false} />
const pLoanPurposeTemplate4 = (rowData, { rowIndex }) => <p >{rowData.loanPurpose}</p>
const pPropertyAddressTemplate5 = (rowData, { rowIndex }) => <p >{rowData.propertyAddress}</p>
const currencyPurchasePriceTemplate6 = (rowData, { rowIndex }) => <InputNumber value={rowData.purchasePrice}  mode="currency" currency="MYR" locale="en-US" disabled={true} useGrouping={false} />
const p_numberLtvPercentageTemplate7 = (rowData, { rowIndex }) => <p >{rowData.ltvPercentage}</p>
const p_numberRepaymentTermRequestedTemplate8 = (rowData, { rowIndex }) => <p >{rowData.repaymentTermRequested}</p>
const p_numberStandardInterestRateTemplate9 = (rowData, { rowIndex }) => <p >{rowData.standardInterestRate}</p>
const pExecutiveSummaryRecommendationTemplate10 = (rowData, { rowIndex }) => <p >{rowData.executiveSummaryRecommendation}</p>
const p_dateBorrowerDobTemplate11 = (rowData, { rowIndex }) => <p >{moment(rowData.borrowerDob).fromNow()}</p>
const p_numberEmploymentIncomeAfterTaxTemplate12 = (rowData, { rowIndex }) => <p >{rowData.employmentIncomeAfterTax}</p>
const p_numberTotalDeclaredIncomeTemplate13 = (rowData, { rowIndex }) => <p >{rowData.totalDeclaredIncome}</p>
const p_numberExistingMortgageOutstandingTemplate14 = (rowData, { rowIndex }) => <p >{rowData.existingMortgageOutstanding}</p>
const p_numberMonthlyMortgagePaymentTemplate15 = (rowData, { rowIndex }) => <p >{rowData.monthlyMortgagePayment}</p>
const p_numberPrimaryResidenceValueTemplate16 = (rowData, { rowIndex }) => <p >{rowData.primaryResidenceValue}</p>
const pCreditProfileSummaryTemplate17 = (rowData, { rowIndex }) => <p >{rowData.creditProfileSummary}</p>
const pPropertyTypeTemplate18 = (rowData, { rowIndex }) => <p >{rowData.propertyType}</p>
const p_numberEstimatedPropertyValueTemplate19 = (rowData, { rowIndex }) => <p >{rowData.estimatedPropertyValue}</p>
const pExitStrategySummaryTemplate20 = (rowData, { rowIndex }) => <p >{rowData.exitStrategySummary}</p>
const pPreparedByNameTemplate21_0 = (rowData, { rowIndex }) => <p >{rowData.preparedBy?.name}</p>
const p_datePreparedDateTemplate22 = (rowData, { rowIndex }) => <p >{moment(rowData.preparedDate).fromNow()}</p>
const pStatusTemplate23 = (rowData, { rowIndex }) => <p >{rowData.status}</p>
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
<Column field="preparedBy.name" header="Name" body={pPreparedByNameTemplate1_0} style={{ minWidth: "8rem" }} />
<Column field="borrowerName" header="Borrower Name" body={pBorrowerNameTemplate2} filter={selectedFilterFields.includes("borrowerName")} hidden={selectedHideFields?.includes("borrowerName")}    style={{ minWidth: "8rem" }} />
<Column field="loanAmount" header="Loan Amount" body={currencyLoanAmountTemplate3} filter={selectedFilterFields.includes("loanAmount")} hidden={selectedHideFields?.includes("loanAmount")}    style={{ minWidth: "8rem" }} />
<Column field="loanPurpose" header="Loan Purpose" body={pLoanPurposeTemplate4} filter={selectedFilterFields.includes("loanPurpose")} hidden={selectedHideFields?.includes("loanPurpose")}    style={{ minWidth: "8rem" }} />
<Column field="propertyAddress" header="Property Address" body={pPropertyAddressTemplate5} filter={selectedFilterFields.includes("propertyAddress")} hidden={selectedHideFields?.includes("propertyAddress")}    style={{ minWidth: "8rem" }} />
<Column field="purchasePrice" header="Purchase Price" body={currencyPurchasePriceTemplate6} filter={selectedFilterFields.includes("purchasePrice")} hidden={selectedHideFields?.includes("purchasePrice")}    style={{ minWidth: "8rem" }} />
<Column field="ltvPercentage" header="Ltv Percentage" body={p_numberLtvPercentageTemplate7} filter={selectedFilterFields.includes("ltvPercentage")} hidden={selectedHideFields?.includes("ltvPercentage")}    style={{ minWidth: "8rem" }} />
<Column field="repaymentTermRequested" header="Repayment Term Requested" body={p_numberRepaymentTermRequestedTemplate8} filter={selectedFilterFields.includes("repaymentTermRequested")} hidden={selectedHideFields?.includes("repaymentTermRequested")}    style={{ minWidth: "8rem" }} />
<Column field="standardInterestRate" header="Standard Interest Rate" body={p_numberStandardInterestRateTemplate9} filter={selectedFilterFields.includes("standardInterestRate")} hidden={selectedHideFields?.includes("standardInterestRate")}    style={{ minWidth: "8rem" }} />
<Column field="executiveSummaryRecommendation" header="Executive Summary Recommendation" body={pExecutiveSummaryRecommendationTemplate10} filter={selectedFilterFields.includes("executiveSummaryRecommendation")} hidden={selectedHideFields?.includes("executiveSummaryRecommendation")}    style={{ minWidth: "8rem" }} />
<Column field="borrowerDob" header="Borrower Dob" body={p_dateBorrowerDobTemplate11} filter={selectedFilterFields.includes("borrowerDob")} hidden={selectedHideFields?.includes("borrowerDob")}  sortable  style={{ minWidth: "8rem" }} />
<Column field="employmentIncomeAfterTax" header="Employment Income After Tax" body={p_numberEmploymentIncomeAfterTaxTemplate12} filter={selectedFilterFields.includes("employmentIncomeAfterTax")} hidden={selectedHideFields?.includes("employmentIncomeAfterTax")}    style={{ minWidth: "8rem" }} />
<Column field="totalDeclaredIncome" header="Total Declared Income" body={p_numberTotalDeclaredIncomeTemplate13} filter={selectedFilterFields.includes("totalDeclaredIncome")} hidden={selectedHideFields?.includes("totalDeclaredIncome")}    style={{ minWidth: "8rem" }} />
<Column field="existingMortgageOutstanding" header="Existing Mortgage Outstanding" body={p_numberExistingMortgageOutstandingTemplate14} filter={selectedFilterFields.includes("existingMortgageOutstanding")} hidden={selectedHideFields?.includes("existingMortgageOutstanding")}    style={{ minWidth: "8rem" }} />
<Column field="monthlyMortgagePayment" header="Monthly Mortgage Payment" body={p_numberMonthlyMortgagePaymentTemplate15} filter={selectedFilterFields.includes("monthlyMortgagePayment")} hidden={selectedHideFields?.includes("monthlyMortgagePayment")}    style={{ minWidth: "8rem" }} />
<Column field="primaryResidenceValue" header="Primary Residence Value" body={p_numberPrimaryResidenceValueTemplate16} filter={selectedFilterFields.includes("primaryResidenceValue")} hidden={selectedHideFields?.includes("primaryResidenceValue")}    style={{ minWidth: "8rem" }} />
<Column field="creditProfileSummary" header="Credit Profile Summary" body={pCreditProfileSummaryTemplate17} filter={selectedFilterFields.includes("creditProfileSummary")} hidden={selectedHideFields?.includes("creditProfileSummary")}    style={{ minWidth: "8rem" }} />
<Column field="propertyType" header="Property Type" body={pPropertyTypeTemplate18} filter={selectedFilterFields.includes("propertyType")} hidden={selectedHideFields?.includes("propertyType")}    style={{ minWidth: "8rem" }} />
<Column field="estimatedPropertyValue" header="Estimated Property Value" body={p_numberEstimatedPropertyValueTemplate19} filter={selectedFilterFields.includes("estimatedPropertyValue")} hidden={selectedHideFields?.includes("estimatedPropertyValue")}    style={{ minWidth: "8rem" }} />
<Column field="exitStrategySummary" header="Exit Strategy Summary" body={pExitStrategySummaryTemplate20} filter={selectedFilterFields.includes("exitStrategySummary")} hidden={selectedHideFields?.includes("exitStrategySummary")}    style={{ minWidth: "8rem" }} />
<Column field="preparedBy.name" header="Name" body={pPreparedByNameTemplate21_0} style={{ minWidth: "8rem" }} />
<Column field="preparedDate" header="Prepared Date" body={p_datePreparedDateTemplate22} filter={selectedFilterFields.includes("preparedDate")} hidden={selectedHideFields?.includes("preparedDate")}  sortable  style={{ minWidth: "8rem" }} />
<Column field="status" header="Status" body={pStatusTemplate23} filter={selectedFilterFields.includes("status")} hidden={selectedHideFields?.includes("status")}    style={{ minWidth: "8rem" }} />
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


        <Dialog header="Upload CreditPaper Data" visible={showUpload} onHide={() => setShowUpload(false)}>
        <UploadService 
          user={user} 
          serviceName="creditPaper"            
          onUploadComplete={() => {
            setShowUpload(false); // Close the dialog after upload
          }}/>
      </Dialog>

      <Dialog header="Search CreditPaper" visible={searchDialog} onHide={() => setSearchDialog(false)}>
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

export default CreditPaperDataTable;