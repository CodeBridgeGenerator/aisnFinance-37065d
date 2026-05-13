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

const SecurityPropertiesDataTable = ({ items, fields, onEditRow, onRowDelete, onRowClick, searchDialog, setSearchDialog,   showUpload, setShowUpload,
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
const pPropertyTypeTemplate1 = (rowData, { rowIndex }) => <p >{rowData.propertyType}</p>
const pAddressTemplate2 = (rowData, { rowIndex }) => <p >{rowData.address}</p>
const pPostcodeTemplate3 = (rowData, { rowIndex }) => <p >{rowData.postcode}</p>
const pDescriptionTemplate4 = (rowData, { rowIndex }) => <p >{rowData.description}</p>
const pTenureTemplate5 = (rowData, { rowIndex }) => <p >{rowData.tenure}</p>
const p_booleanVacantPossessionOnCompletionTemplate6 = (rowData, { rowIndex }) => <p >{String(rowData.vacantPossessionOnCompletion)}</p>
const p_numberLeaseholdUnexpiredTermYearsTemplate7 = (rowData, { rowIndex }) => <p >{rowData.leaseholdUnexpiredTermYears}</p>
const p_numberLeaseholdUnexpiredTermMonthsTemplate8 = (rowData, { rowIndex }) => <p >{rowData.leaseholdUnexpiredTermMonths}</p>
const p_numberLeaseholdGroundRentPerAnnumTemplate9 = (rowData, { rowIndex }) => <p >{rowData.leaseholdGroundRentPerAnnum}</p>
const p_numberLettingRentalIncomePerAnnumTemplate10 = (rowData, { rowIndex }) => <p >{rowData.lettingRentalIncomePerAnnum}</p>
const p_dateLettingRentReviewDateTemplate11 = (rowData, { rowIndex }) => <p >{moment(rowData.lettingRentReviewDate).fromNow()}</p>
const pValuationContactNameTemplate12 = (rowData, { rowIndex }) => <p >{rowData.valuationContactName}</p>
const pValuationContactPhoneNoTemplate13 = (rowData, { rowIndex }) => <p >{rowData.valuationContactPhoneNo}</p>
const pValuationContactEmailTemplate14 = (rowData, { rowIndex }) => <p >{rowData.valuationContactEmail}</p>
const p_numberPurchasePriceTemplate15 = (rowData, { rowIndex }) => <p >{rowData.purchasePrice}</p>
const p_numberPurchaseCurrentValueTemplate16 = (rowData, { rowIndex }) => <p >{rowData.purchaseCurrentValue}</p>
const p_numberPurchaseDepositTemplate17 = (rowData, { rowIndex }) => <p >{rowData.purchaseDeposit}</p>
const pPurchaseDepositSourcesTemplate18 = (rowData, { rowIndex }) => <p >{rowData.purchaseDepositSources}</p>
const pPurchaseOtherDepositSourceTemplate19 = (rowData, { rowIndex }) => <p >{rowData.purchaseOtherDepositSource}</p>
const pPurchaseRepaymentDetailsTemplate20 = (rowData, { rowIndex }) => <p >{rowData.purchaseRepaymentDetails}</p>
const p_dateOwnedPropertyAcquiredDateTemplate21 = (rowData, { rowIndex }) => <p >{moment(rowData.ownedPropertyAcquiredDate).fromNow()}</p>
const p_numberOwnedPropertyPurchasePriceTemplate22 = (rowData, { rowIndex }) => <p >{rowData.ownedPropertyPurchasePrice}</p>
const p_numberOwnedPropertyMostRecentValuationTemplate23 = (rowData, { rowIndex }) => <p >{rowData.ownedPropertyMostRecentValuation}</p>
const pOwnedPropertyValuationDateTemplate24 = (rowData, { rowIndex }) => <p >{rowData.ownedPropertyValuationDate}</p>
const p_numberOwnedPropertyOutstandingMortgageTemplate25 = (rowData, { rowIndex }) => <p >{rowData.ownedPropertyOutstandingMortgage}</p>
const pOwnedPropertyCurrentLenderNameTemplate26 = (rowData, { rowIndex }) => <p >{rowData.ownedPropertyCurrentLenderName}</p>
const pOwnedPropertycurrentLenderAddressTemplate27 = (rowData, { rowIndex }) => <p >{rowData.ownedPropertycurrentLenderAddress}</p>
const pOwnedPropertymortgageAccountNumberTemplate28 = (rowData, { rowIndex }) => <p >{rowData.ownedPropertymortgageAccountNumber}</p>
const p_booleanOwnedPropertyhasOtherChargesTemplate29 = (rowData, { rowIndex }) => <p >{String(rowData.ownedPropertyhasOtherCharges)}</p>
const pOwnedPropertyotherChargesDetailsTemplate30 = (rowData, { rowIndex }) => <p >{rowData.ownedPropertyotherChargesDetails}</p>
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
<Column field="propertyType" header="Property Type" body={pPropertyTypeTemplate1} filter={selectedFilterFields.includes("propertyType")} hidden={selectedHideFields?.includes("propertyType")}    style={{ minWidth: "8rem" }} />
<Column field="address" header="Address" body={pAddressTemplate2} filter={selectedFilterFields.includes("address")} hidden={selectedHideFields?.includes("address")}    style={{ minWidth: "8rem" }} />
<Column field="postcode" header="Postcode" body={pPostcodeTemplate3} filter={selectedFilterFields.includes("postcode")} hidden={selectedHideFields?.includes("postcode")}    style={{ minWidth: "8rem" }} />
<Column field="description" header="Description" body={pDescriptionTemplate4} filter={selectedFilterFields.includes("description")} hidden={selectedHideFields?.includes("description")}    style={{ minWidth: "8rem" }} />
<Column field="tenure" header="Tenure" body={pTenureTemplate5} filter={selectedFilterFields.includes("tenure")} hidden={selectedHideFields?.includes("tenure")}    style={{ minWidth: "8rem" }} />
<Column field="vacantPossessionOnCompletion" header="Vacant Possession On Completion" body={p_booleanVacantPossessionOnCompletionTemplate6} filter={selectedFilterFields.includes("vacantPossessionOnCompletion")} hidden={selectedHideFields?.includes("vacantPossessionOnCompletion")}    style={{ minWidth: "8rem" }} />
<Column field="leaseholdUnexpiredTermYears" header="Leasehold Unexpired Term Years" body={p_numberLeaseholdUnexpiredTermYearsTemplate7} filter={selectedFilterFields.includes("leaseholdUnexpiredTermYears")} hidden={selectedHideFields?.includes("leaseholdUnexpiredTermYears")}    style={{ minWidth: "8rem" }} />
<Column field="leaseholdUnexpiredTermMonths" header="Leasehold Unexpired Term Months" body={p_numberLeaseholdUnexpiredTermMonthsTemplate8} filter={selectedFilterFields.includes("leaseholdUnexpiredTermMonths")} hidden={selectedHideFields?.includes("leaseholdUnexpiredTermMonths")}    style={{ minWidth: "8rem" }} />
<Column field="leaseholdGroundRentPerAnnum" header="Leasehold Ground Rent Per Annum" body={p_numberLeaseholdGroundRentPerAnnumTemplate9} filter={selectedFilterFields.includes("leaseholdGroundRentPerAnnum")} hidden={selectedHideFields?.includes("leaseholdGroundRentPerAnnum")}    style={{ minWidth: "8rem" }} />
<Column field="lettingRentalIncomePerAnnum" header="Letting Rental Income Per Annum" body={p_numberLettingRentalIncomePerAnnumTemplate10} filter={selectedFilterFields.includes("lettingRentalIncomePerAnnum")} hidden={selectedHideFields?.includes("lettingRentalIncomePerAnnum")}    style={{ minWidth: "8rem" }} />
<Column field="lettingRentReviewDate" header="Letting Rent Review Date" body={p_dateLettingRentReviewDateTemplate11} filter={selectedFilterFields.includes("lettingRentReviewDate")} hidden={selectedHideFields?.includes("lettingRentReviewDate")}  sortable  style={{ minWidth: "8rem" }} />
<Column field="valuationContactName" header="Valuation Contact Name" body={pValuationContactNameTemplate12} filter={selectedFilterFields.includes("valuationContactName")} hidden={selectedHideFields?.includes("valuationContactName")}    style={{ minWidth: "8rem" }} />
<Column field="valuationContactPhoneNo" header="Valuation Contact Phone No" body={pValuationContactPhoneNoTemplate13} filter={selectedFilterFields.includes("valuationContactPhoneNo")} hidden={selectedHideFields?.includes("valuationContactPhoneNo")}    style={{ minWidth: "8rem" }} />
<Column field="valuationContactEmail" header="Valuation Contact Email" body={pValuationContactEmailTemplate14} filter={selectedFilterFields.includes("valuationContactEmail")} hidden={selectedHideFields?.includes("valuationContactEmail")}    style={{ minWidth: "8rem" }} />
<Column field="purchasePrice" header="Purchase Price" body={p_numberPurchasePriceTemplate15} filter={selectedFilterFields.includes("purchasePrice")} hidden={selectedHideFields?.includes("purchasePrice")}    style={{ minWidth: "8rem" }} />
<Column field="purchaseCurrentValue" header="Purchase Current Value" body={p_numberPurchaseCurrentValueTemplate16} filter={selectedFilterFields.includes("purchaseCurrentValue")} hidden={selectedHideFields?.includes("purchaseCurrentValue")}    style={{ minWidth: "8rem" }} />
<Column field="purchaseDeposit" header="Purchase Deposit" body={p_numberPurchaseDepositTemplate17} filter={selectedFilterFields.includes("purchaseDeposit")} hidden={selectedHideFields?.includes("purchaseDeposit")}    style={{ minWidth: "8rem" }} />
<Column field="purchaseDepositSources" header="Purchase Deposit Sources" body={pPurchaseDepositSourcesTemplate18} filter={selectedFilterFields.includes("purchaseDepositSources")} hidden={selectedHideFields?.includes("purchaseDepositSources")}    style={{ minWidth: "8rem" }} />
<Column field="purchaseOtherDepositSource" header="Purchase Other Deposit Source" body={pPurchaseOtherDepositSourceTemplate19} filter={selectedFilterFields.includes("purchaseOtherDepositSource")} hidden={selectedHideFields?.includes("purchaseOtherDepositSource")}    style={{ minWidth: "8rem" }} />
<Column field="purchaseRepaymentDetails" header="Purchase Repayment Details" body={pPurchaseRepaymentDetailsTemplate20} filter={selectedFilterFields.includes("purchaseRepaymentDetails")} hidden={selectedHideFields?.includes("purchaseRepaymentDetails")}    style={{ minWidth: "8rem" }} />
<Column field="ownedPropertyAcquiredDate" header="Owned Property Acquired Date" body={p_dateOwnedPropertyAcquiredDateTemplate21} filter={selectedFilterFields.includes("ownedPropertyAcquiredDate")} hidden={selectedHideFields?.includes("ownedPropertyAcquiredDate")}  sortable  style={{ minWidth: "8rem" }} />
<Column field="ownedPropertyPurchasePrice" header="Owned Property Purchase Price" body={p_numberOwnedPropertyPurchasePriceTemplate22} filter={selectedFilterFields.includes("ownedPropertyPurchasePrice")} hidden={selectedHideFields?.includes("ownedPropertyPurchasePrice")}    style={{ minWidth: "8rem" }} />
<Column field="ownedPropertyMostRecentValuation" header="Owned Property Most Recent Valuation" body={p_numberOwnedPropertyMostRecentValuationTemplate23} filter={selectedFilterFields.includes("ownedPropertyMostRecentValuation")} hidden={selectedHideFields?.includes("ownedPropertyMostRecentValuation")}    style={{ minWidth: "8rem" }} />
<Column field="ownedPropertyValuationDate" header="Owned Property Valuation Date" body={pOwnedPropertyValuationDateTemplate24} filter={selectedFilterFields.includes("ownedPropertyValuationDate")} hidden={selectedHideFields?.includes("ownedPropertyValuationDate")}    style={{ minWidth: "8rem" }} />
<Column field="ownedPropertyOutstandingMortgage" header="Owned Property Outstanding Mortgage" body={p_numberOwnedPropertyOutstandingMortgageTemplate25} filter={selectedFilterFields.includes("ownedPropertyOutstandingMortgage")} hidden={selectedHideFields?.includes("ownedPropertyOutstandingMortgage")}    style={{ minWidth: "8rem" }} />
<Column field="ownedPropertyCurrentLenderName" header="Owned Property Current Lender Name" body={pOwnedPropertyCurrentLenderNameTemplate26} filter={selectedFilterFields.includes("ownedPropertyCurrentLenderName")} hidden={selectedHideFields?.includes("ownedPropertyCurrentLenderName")}    style={{ minWidth: "8rem" }} />
<Column field="ownedPropertycurrentLenderAddress" header="Owned Propertycurrent Lender Address" body={pOwnedPropertycurrentLenderAddressTemplate27} filter={selectedFilterFields.includes("ownedPropertycurrentLenderAddress")} hidden={selectedHideFields?.includes("ownedPropertycurrentLenderAddress")}    style={{ minWidth: "8rem" }} />
<Column field="ownedPropertymortgageAccountNumber" header="Owned Propertymortgage Account Number" body={pOwnedPropertymortgageAccountNumberTemplate28} filter={selectedFilterFields.includes("ownedPropertymortgageAccountNumber")} hidden={selectedHideFields?.includes("ownedPropertymortgageAccountNumber")}    style={{ minWidth: "8rem" }} />
<Column field="ownedPropertyhasOtherCharges" header="Owned Propertyhas Other Charges" body={p_booleanOwnedPropertyhasOtherChargesTemplate29} filter={selectedFilterFields.includes("ownedPropertyhasOtherCharges")} hidden={selectedHideFields?.includes("ownedPropertyhasOtherCharges")}    style={{ minWidth: "8rem" }} />
<Column field="ownedPropertyotherChargesDetails" header="Owned Propertyother Charges Details" body={pOwnedPropertyotherChargesDetailsTemplate30} filter={selectedFilterFields.includes("ownedPropertyotherChargesDetails")} hidden={selectedHideFields?.includes("ownedPropertyotherChargesDetails")}    style={{ minWidth: "8rem" }} />
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


        <Dialog header="Upload SecurityProperties Data" visible={showUpload} onHide={() => setShowUpload(false)}>
        <UploadService 
          user={user} 
          serviceName="securityProperties"            
          onUploadComplete={() => {
            setShowUpload(false); // Close the dialog after upload
          }}/>
      </Dialog>

      <Dialog header="Search SecurityProperties" visible={searchDialog} onHide={() => setSearchDialog(false)}>
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

export default SecurityPropertiesDataTable;