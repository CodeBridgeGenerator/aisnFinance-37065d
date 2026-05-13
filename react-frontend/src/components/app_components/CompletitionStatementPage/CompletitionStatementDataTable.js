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

const CompletitionStatementDataTable = ({ items, fields, onEditRow, onRowDelete, onRowClick, searchDialog, setSearchDialog,   showUpload, setShowUpload,
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
const pBorrowerTemplate1 = (rowData, { rowIndex }) => <p >{rowData.borrower}</p>
const pPropertyTemplate2 = (rowData, { rowIndex }) => <p >{rowData.property}</p>
const pLoanAdvanceTemplate3 = (rowData, { rowIndex }) => <p >{rowData.loanAdvance}</p>
const p_numberFirstMonthInterestRateTemplate4 = (rowData, { rowIndex }) => <p >{rowData.firstMonthInterestRate}</p>
const pFirstMonthInterestAmountTemplate5 = (rowData, { rowIndex }) => <p >{rowData.firstMonthInterestAmount}</p>
const pArrangementFeeTemplate6 = (rowData, { rowIndex }) => <p >{rowData.arrangementFee}</p>
const pLendersBankTransferFeeTemplate7 = (rowData, { rowIndex }) => <p >{rowData.lendersBankTransferFee}</p>
const pOtherDeductionsTemplate8 = (rowData, { rowIndex }) => <p >{rowData.otherDeductions}</p>
const pNetLoanAdvanceTemplate9 = (rowData, { rowIndex }) => <p >{rowData.netLoanAdvance}</p>
const pAmountToBeTransferredToSolicitorTemplate10 = (rowData, { rowIndex }) => <p >{rowData.amountToBeTransferredToSolicitor}</p>
const pLenderTemplate11 = (rowData, { rowIndex }) => <p >{rowData.lender}</p>
const p_dateStatementDateTemplate12 = (rowData, { rowIndex }) => <p >{moment(rowData.statementDate).fromNow()}</p>
const pAuthorisedSignatoryTemplate13 = (rowData, { rowIndex }) => <p >{rowData.authorisedSignatory}</p>
const pStatusTemplate14 = (rowData, { rowIndex }) => <p >{rowData.status}</p>
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
<Column field="borrower" header="Borrower" body={pBorrowerTemplate1} filter={selectedFilterFields.includes("borrower")} hidden={selectedHideFields?.includes("borrower")}    style={{ minWidth: "8rem" }} />
<Column field="property" header="Property" body={pPropertyTemplate2} filter={selectedFilterFields.includes("property")} hidden={selectedHideFields?.includes("property")}    style={{ minWidth: "8rem" }} />
<Column field="loanAdvance" header="Loan Advance" body={pLoanAdvanceTemplate3} filter={selectedFilterFields.includes("loanAdvance")} hidden={selectedHideFields?.includes("loanAdvance")}    style={{ minWidth: "8rem" }} />
<Column field="firstMonthInterestRate" header="First Month Interest Rate" body={p_numberFirstMonthInterestRateTemplate4} filter={selectedFilterFields.includes("firstMonthInterestRate")} hidden={selectedHideFields?.includes("firstMonthInterestRate")}    style={{ minWidth: "8rem" }} />
<Column field="firstMonthInterestAmount" header="First Month Interest Amount" body={pFirstMonthInterestAmountTemplate5} filter={selectedFilterFields.includes("firstMonthInterestAmount")} hidden={selectedHideFields?.includes("firstMonthInterestAmount")}    style={{ minWidth: "8rem" }} />
<Column field="arrangementFee" header="Arrangement Fee" body={pArrangementFeeTemplate6} filter={selectedFilterFields.includes("arrangementFee")} hidden={selectedHideFields?.includes("arrangementFee")}    style={{ minWidth: "8rem" }} />
<Column field="lendersBankTransferFee" header="Lenders Bank Transfer Fee" body={pLendersBankTransferFeeTemplate7} filter={selectedFilterFields.includes("lendersBankTransferFee")} hidden={selectedHideFields?.includes("lendersBankTransferFee")}    style={{ minWidth: "8rem" }} />
<Column field="otherDeductions" header="Other Deductions" body={pOtherDeductionsTemplate8} filter={selectedFilterFields.includes("otherDeductions")} hidden={selectedHideFields?.includes("otherDeductions")}    style={{ minWidth: "8rem" }} />
<Column field="netLoanAdvance" header="Net Loan Advance" body={pNetLoanAdvanceTemplate9} filter={selectedFilterFields.includes("netLoanAdvance")} hidden={selectedHideFields?.includes("netLoanAdvance")}    style={{ minWidth: "8rem" }} />
<Column field="amountToBeTransferredToSolicitor" header="Amount To Be Transferred To Solicitor" body={pAmountToBeTransferredToSolicitorTemplate10} filter={selectedFilterFields.includes("amountToBeTransferredToSolicitor")} hidden={selectedHideFields?.includes("amountToBeTransferredToSolicitor")}    style={{ minWidth: "8rem" }} />
<Column field="lender" header="Lender" body={pLenderTemplate11} filter={selectedFilterFields.includes("lender")} hidden={selectedHideFields?.includes("lender")}    style={{ minWidth: "8rem" }} />
<Column field="statementDate" header="Statement Date" body={p_dateStatementDateTemplate12} filter={selectedFilterFields.includes("statementDate")} hidden={selectedHideFields?.includes("statementDate")}  sortable  style={{ minWidth: "8rem" }} />
<Column field="authorisedSignatory" header="Authorised Signatory" body={pAuthorisedSignatoryTemplate13} filter={selectedFilterFields.includes("authorisedSignatory")} hidden={selectedHideFields?.includes("authorisedSignatory")}    style={{ minWidth: "8rem" }} />
<Column field="status" header="Status" body={pStatusTemplate14} filter={selectedFilterFields.includes("status")} hidden={selectedHideFields?.includes("status")}    style={{ minWidth: "8rem" }} />
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


        <Dialog header="Upload CompletitionStatement Data" visible={showUpload} onHide={() => setShowUpload(false)}>
        <UploadService 
          user={user} 
          serviceName="completitionStatement"            
          onUploadComplete={() => {
            setShowUpload(false); // Close the dialog after upload
          }}/>
      </Dialog>

      <Dialog header="Search CompletitionStatement" visible={searchDialog} onHide={() => setSearchDialog(false)}>
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

export default CompletitionStatementDataTable;