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

const AssetsLiabilitiesDataTable = ({ items, fields, onEditRow, onRowDelete, onRowClick, searchDialog, setSearchDialog,   showUpload, setShowUpload,
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
const pCustomerNameTemplate1 = (rowData, { rowIndex }) => <p >{rowData.customerName}</p>
const p_dateDateTemplate2 = (rowData, { rowIndex }) => <p >{moment(rowData.date).fromNow()}</p>
const p_numberIncomeSelfMonthlyTemplate3 = (rowData, { rowIndex }) => <p >{rowData.incomeSelfMonthly}</p>
const p_numberIncomePartnerMonthlyTemplate4 = (rowData, { rowIndex }) => <p >{rowData.incomePartnerMonthly}</p>
const p_numberIncomeOtherMonthlyTemplate5 = (rowData, { rowIndex }) => <p >{rowData.incomeOtherMonthly}</p>
const p_numberTotalMonthlyIncomeTemplate6 = (rowData, { rowIndex }) => <p >{rowData.totalMonthlyIncome}</p>
const p_numberExpenditureMortgageRentTemplate7 = (rowData, { rowIndex }) => <p >{rowData.expenditureMortgageRent}</p>
const p_numberExpenditureLifeAssuranceTemplate8 = (rowData, { rowIndex }) => <p >{rowData.expenditureLifeAssurance}</p>
const p_numberExpenditureCouncilTaxTemplate9 = (rowData, { rowIndex }) => <p >{rowData.expenditureCouncilTax}</p>
const p_numberExpenditureUtilitiesTemplate10 = (rowData, { rowIndex }) => <p >{rowData.expenditureUtilities}</p>
const p_numberExpenditureInsuranceTemplate11 = (rowData, { rowIndex }) => <p >{rowData.expenditureInsurance}</p>
const p_numberExpenditureTravelTemplate12 = (rowData, { rowIndex }) => <p >{rowData.expenditureTravel}</p>
const p_numberExpenditurePetrolTemplate13 = (rowData, { rowIndex }) => <p >{rowData.expenditurePetrol}</p>
const p_numberExpenditureCarInsuranceTemplate14 = (rowData, { rowIndex }) => <p >{rowData.expenditureCarInsurance}</p>
const p_numberExpenditureFoodClothingTemplate15 = (rowData, { rowIndex }) => <p >{rowData.expenditureFoodClothing}</p>
const p_numberExpenditureExistingBorrowingsTemplate16 = (rowData, { rowIndex }) => <p >{rowData.expenditureExistingBorrowings}</p>
const p_numberExpenditureOtherLoansTemplate17 = (rowData, { rowIndex }) => <p >{rowData.expenditureOtherLoans}</p>
const p_numberExpenditureEntertainmentTemplate18 = (rowData, { rowIndex }) => <p >{rowData.expenditureEntertainment}</p>
const p_numberExpenditureOtherTemplate19 = (rowData, { rowIndex }) => <p >{rowData.expenditureOther}</p>
const p_numberTotalMonthlyExpenditureTemplate20 = (rowData, { rowIndex }) => <p >{rowData.totalMonthlyExpenditure}</p>
const p_numberMonthlyDisposableIncomeTemplate21 = (rowData, { rowIndex }) => <p >{rowData.monthlyDisposableIncome}</p>
const p_numberAssetCashTemplate22 = (rowData, { rowIndex }) => <p >{rowData.assetCash}</p>
const p_numberAssetSharesTemplate23 = (rowData, { rowIndex }) => <p >{rowData.assetShares}</p>
const p_numberAssetLifePolicyTemplate24 = (rowData, { rowIndex }) => <p >{rowData.assetLifePolicy}</p>
const p_numberAssetDwellingHouseTemplate25 = (rowData, { rowIndex }) => <p >{rowData.assetDwellingHouse}</p>
const p_numberAssetOtherProperty1Template26 = (rowData, { rowIndex }) => <p >{rowData.assetOtherProperty1}</p>
const p_numberAssetOtherProperty2Template27 = (rowData, { rowIndex }) => <p >{rowData.assetOtherProperty2}</p>
const p_numberAssetOtherInvestmentsTemplate28 = (rowData, { rowIndex }) => <p >{rowData.assetOtherInvestments}</p>
const p_numberTotalAssetsTemplate29 = (rowData, { rowIndex }) => <p >{rowData.totalAssets}</p>
const p_numberLiabilityOverdraftTemplate30 = (rowData, { rowIndex }) => <p >{rowData.liabilityOverdraft}</p>
const p_numberLiabilityMortgageTemplate31 = (rowData, { rowIndex }) => <p >{rowData.liabilityMortgage}</p>
const p_numberLiabilityCarLoanTemplate32 = (rowData, { rowIndex }) => <p >{rowData.liabilityCarLoan}</p>
const p_numberLiabilityPersonalLoan1Template33 = (rowData, { rowIndex }) => <p >{rowData.liabilityPersonalLoan1}</p>
const p_numberLiabilityPersonalLoan2Template34 = (rowData, { rowIndex }) => <p >{rowData.liabilityPersonalLoan2}</p>
const p_numberLiabilityPersonalLoan3Template35 = (rowData, { rowIndex }) => <p >{rowData.liabilityPersonalLoan3}</p>
const p_numberLiabilityCreditCard1Template36 = (rowData, { rowIndex }) => <p >{rowData.liabilityCreditCard1}</p>
const p_numberLiabilityCreditCard2Template37 = (rowData, { rowIndex }) => <p >{rowData.liabilityCreditCard2}</p>
const p_numberLiabilityCreditCard3Template38 = (rowData, { rowIndex }) => <p >{rowData.liabilityCreditCard3}</p>
const p_numberLiabilityPersonalTaxTemplate39 = (rowData, { rowIndex }) => <p >{rowData.liabilityPersonalTax}</p>
const p_numberLiabilityPersonalGuaranteesTemplate40 = (rowData, { rowIndex }) => <p >{rowData.liabilityPersonalGuarantees}</p>
const p_numberLiabilityOtherTemplate41 = (rowData, { rowIndex }) => <p >{rowData.liabilityOther}</p>
const p_numberTotalLiabilitiesTemplate42 = (rowData, { rowIndex }) => <p >{rowData.totalLiabilities}</p>
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
<Column field="customerName" header="Customer Name" body={pCustomerNameTemplate1} filter={selectedFilterFields.includes("customerName")} hidden={selectedHideFields?.includes("customerName")}    style={{ minWidth: "8rem" }} />
<Column field="date" header="Date" body={p_dateDateTemplate2} filter={selectedFilterFields.includes("date")} hidden={selectedHideFields?.includes("date")}  sortable  style={{ minWidth: "8rem" }} />
<Column field="incomeSelfMonthly" header="Income Self Monthly" body={p_numberIncomeSelfMonthlyTemplate3} filter={selectedFilterFields.includes("incomeSelfMonthly")} hidden={selectedHideFields?.includes("incomeSelfMonthly")}    style={{ minWidth: "8rem" }} />
<Column field="incomePartnerMonthly" header="Income Partner Monthly" body={p_numberIncomePartnerMonthlyTemplate4} filter={selectedFilterFields.includes("incomePartnerMonthly")} hidden={selectedHideFields?.includes("incomePartnerMonthly")}    style={{ minWidth: "8rem" }} />
<Column field="incomeOtherMonthly" header="Income Other Monthly" body={p_numberIncomeOtherMonthlyTemplate5} filter={selectedFilterFields.includes("incomeOtherMonthly")} hidden={selectedHideFields?.includes("incomeOtherMonthly")}    style={{ minWidth: "8rem" }} />
<Column field="totalMonthlyIncome" header="Total Monthly Income" body={p_numberTotalMonthlyIncomeTemplate6} filter={selectedFilterFields.includes("totalMonthlyIncome")} hidden={selectedHideFields?.includes("totalMonthlyIncome")}    style={{ minWidth: "8rem" }} />
<Column field="expenditureMortgageRent" header="Expenditure Mortgage Rent" body={p_numberExpenditureMortgageRentTemplate7} filter={selectedFilterFields.includes("expenditureMortgageRent")} hidden={selectedHideFields?.includes("expenditureMortgageRent")}    style={{ minWidth: "8rem" }} />
<Column field="expenditureLifeAssurance" header="Expenditure Life Assurance" body={p_numberExpenditureLifeAssuranceTemplate8} filter={selectedFilterFields.includes("expenditureLifeAssurance")} hidden={selectedHideFields?.includes("expenditureLifeAssurance")}    style={{ minWidth: "8rem" }} />
<Column field="expenditureCouncilTax" header="Expenditure Council Tax" body={p_numberExpenditureCouncilTaxTemplate9} filter={selectedFilterFields.includes("expenditureCouncilTax")} hidden={selectedHideFields?.includes("expenditureCouncilTax")}    style={{ minWidth: "8rem" }} />
<Column field="expenditureUtilities" header="Expenditure Utilities" body={p_numberExpenditureUtilitiesTemplate10} filter={selectedFilterFields.includes("expenditureUtilities")} hidden={selectedHideFields?.includes("expenditureUtilities")}    style={{ minWidth: "8rem" }} />
<Column field="expenditureInsurance" header="Expenditure Insurance" body={p_numberExpenditureInsuranceTemplate11} filter={selectedFilterFields.includes("expenditureInsurance")} hidden={selectedHideFields?.includes("expenditureInsurance")}    style={{ minWidth: "8rem" }} />
<Column field="expenditureTravel" header="Expenditure Travel" body={p_numberExpenditureTravelTemplate12} filter={selectedFilterFields.includes("expenditureTravel")} hidden={selectedHideFields?.includes("expenditureTravel")}    style={{ minWidth: "8rem" }} />
<Column field="expenditurePetrol" header="Expenditure Petrol" body={p_numberExpenditurePetrolTemplate13} filter={selectedFilterFields.includes("expenditurePetrol")} hidden={selectedHideFields?.includes("expenditurePetrol")}    style={{ minWidth: "8rem" }} />
<Column field="expenditureCarInsurance" header="Expenditure Car Insurance" body={p_numberExpenditureCarInsuranceTemplate14} filter={selectedFilterFields.includes("expenditureCarInsurance")} hidden={selectedHideFields?.includes("expenditureCarInsurance")}    style={{ minWidth: "8rem" }} />
<Column field="expenditureFoodClothing" header="Expenditure Food Clothing" body={p_numberExpenditureFoodClothingTemplate15} filter={selectedFilterFields.includes("expenditureFoodClothing")} hidden={selectedHideFields?.includes("expenditureFoodClothing")}    style={{ minWidth: "8rem" }} />
<Column field="expenditureExistingBorrowings" header="Expenditure Existing Borrowings" body={p_numberExpenditureExistingBorrowingsTemplate16} filter={selectedFilterFields.includes("expenditureExistingBorrowings")} hidden={selectedHideFields?.includes("expenditureExistingBorrowings")}    style={{ minWidth: "8rem" }} />
<Column field="expenditureOtherLoans" header="Expenditure Other Loans" body={p_numberExpenditureOtherLoansTemplate17} filter={selectedFilterFields.includes("expenditureOtherLoans")} hidden={selectedHideFields?.includes("expenditureOtherLoans")}    style={{ minWidth: "8rem" }} />
<Column field="expenditureEntertainment" header="Expenditure Entertainment" body={p_numberExpenditureEntertainmentTemplate18} filter={selectedFilterFields.includes("expenditureEntertainment")} hidden={selectedHideFields?.includes("expenditureEntertainment")}    style={{ minWidth: "8rem" }} />
<Column field="expenditureOther" header="Expenditure Other" body={p_numberExpenditureOtherTemplate19} filter={selectedFilterFields.includes("expenditureOther")} hidden={selectedHideFields?.includes("expenditureOther")}    style={{ minWidth: "8rem" }} />
<Column field="totalMonthlyExpenditure" header="Total Monthly Expenditure" body={p_numberTotalMonthlyExpenditureTemplate20} filter={selectedFilterFields.includes("totalMonthlyExpenditure")} hidden={selectedHideFields?.includes("totalMonthlyExpenditure")}    style={{ minWidth: "8rem" }} />
<Column field="monthlyDisposableIncome" header="Monthly Disposable Income" body={p_numberMonthlyDisposableIncomeTemplate21} filter={selectedFilterFields.includes("monthlyDisposableIncome")} hidden={selectedHideFields?.includes("monthlyDisposableIncome")}    style={{ minWidth: "8rem" }} />
<Column field="assetCash" header="Asset Cash" body={p_numberAssetCashTemplate22} filter={selectedFilterFields.includes("assetCash")} hidden={selectedHideFields?.includes("assetCash")}    style={{ minWidth: "8rem" }} />
<Column field="assetShares" header="Asset Shares" body={p_numberAssetSharesTemplate23} filter={selectedFilterFields.includes("assetShares")} hidden={selectedHideFields?.includes("assetShares")}    style={{ minWidth: "8rem" }} />
<Column field="assetLifePolicy" header="Asset Life Policy" body={p_numberAssetLifePolicyTemplate24} filter={selectedFilterFields.includes("assetLifePolicy")} hidden={selectedHideFields?.includes("assetLifePolicy")}    style={{ minWidth: "8rem" }} />
<Column field="assetDwellingHouse" header="Asset Dwelling House" body={p_numberAssetDwellingHouseTemplate25} filter={selectedFilterFields.includes("assetDwellingHouse")} hidden={selectedHideFields?.includes("assetDwellingHouse")}    style={{ minWidth: "8rem" }} />
<Column field="assetOtherProperty1" header="Asset Other Property 1" body={p_numberAssetOtherProperty1Template26} filter={selectedFilterFields.includes("assetOtherProperty1")} hidden={selectedHideFields?.includes("assetOtherProperty1")}    style={{ minWidth: "8rem" }} />
<Column field="assetOtherProperty2" header="Asset Other Property 2" body={p_numberAssetOtherProperty2Template27} filter={selectedFilterFields.includes("assetOtherProperty2")} hidden={selectedHideFields?.includes("assetOtherProperty2")}    style={{ minWidth: "8rem" }} />
<Column field="assetOtherInvestments" header="Asset Other Investments" body={p_numberAssetOtherInvestmentsTemplate28} filter={selectedFilterFields.includes("assetOtherInvestments")} hidden={selectedHideFields?.includes("assetOtherInvestments")}    style={{ minWidth: "8rem" }} />
<Column field="totalAssets" header="Total Assets" body={p_numberTotalAssetsTemplate29} filter={selectedFilterFields.includes("totalAssets")} hidden={selectedHideFields?.includes("totalAssets")}    style={{ minWidth: "8rem" }} />
<Column field="liabilityOverdraft" header="Liability Overdraft" body={p_numberLiabilityOverdraftTemplate30} filter={selectedFilterFields.includes("liabilityOverdraft")} hidden={selectedHideFields?.includes("liabilityOverdraft")}    style={{ minWidth: "8rem" }} />
<Column field="liabilityMortgage" header="Liability Mortgage" body={p_numberLiabilityMortgageTemplate31} filter={selectedFilterFields.includes("liabilityMortgage")} hidden={selectedHideFields?.includes("liabilityMortgage")}    style={{ minWidth: "8rem" }} />
<Column field="liabilityCarLoan" header="Liability Car Loan" body={p_numberLiabilityCarLoanTemplate32} filter={selectedFilterFields.includes("liabilityCarLoan")} hidden={selectedHideFields?.includes("liabilityCarLoan")}    style={{ minWidth: "8rem" }} />
<Column field="liabilityPersonalLoan1" header="Liability Personal Loan 1" body={p_numberLiabilityPersonalLoan1Template33} filter={selectedFilterFields.includes("liabilityPersonalLoan1")} hidden={selectedHideFields?.includes("liabilityPersonalLoan1")}    style={{ minWidth: "8rem" }} />
<Column field="liabilityPersonalLoan2" header="Liability Personal Loan 2" body={p_numberLiabilityPersonalLoan2Template34} filter={selectedFilterFields.includes("liabilityPersonalLoan2")} hidden={selectedHideFields?.includes("liabilityPersonalLoan2")}    style={{ minWidth: "8rem" }} />
<Column field="liabilityPersonalLoan3" header="Liability Personal Loan 3" body={p_numberLiabilityPersonalLoan3Template35} filter={selectedFilterFields.includes("liabilityPersonalLoan3")} hidden={selectedHideFields?.includes("liabilityPersonalLoan3")}    style={{ minWidth: "8rem" }} />
<Column field="liabilityCreditCard1" header="Liability Credit Card 1" body={p_numberLiabilityCreditCard1Template36} filter={selectedFilterFields.includes("liabilityCreditCard1")} hidden={selectedHideFields?.includes("liabilityCreditCard1")}    style={{ minWidth: "8rem" }} />
<Column field="liabilityCreditCard2" header="Liability Credit Card 2" body={p_numberLiabilityCreditCard2Template37} filter={selectedFilterFields.includes("liabilityCreditCard2")} hidden={selectedHideFields?.includes("liabilityCreditCard2")}    style={{ minWidth: "8rem" }} />
<Column field="liabilityCreditCard3" header="Liability Credit Card 3" body={p_numberLiabilityCreditCard3Template38} filter={selectedFilterFields.includes("liabilityCreditCard3")} hidden={selectedHideFields?.includes("liabilityCreditCard3")}    style={{ minWidth: "8rem" }} />
<Column field="liabilityPersonalTax" header="Liability Personal Tax" body={p_numberLiabilityPersonalTaxTemplate39} filter={selectedFilterFields.includes("liabilityPersonalTax")} hidden={selectedHideFields?.includes("liabilityPersonalTax")}    style={{ minWidth: "8rem" }} />
<Column field="liabilityPersonalGuarantees" header="Liability Personal Guarantees" body={p_numberLiabilityPersonalGuaranteesTemplate40} filter={selectedFilterFields.includes("liabilityPersonalGuarantees")} hidden={selectedHideFields?.includes("liabilityPersonalGuarantees")}    style={{ minWidth: "8rem" }} />
<Column field="liabilityOther" header="Liability Other" body={p_numberLiabilityOtherTemplate41} filter={selectedFilterFields.includes("liabilityOther")} hidden={selectedHideFields?.includes("liabilityOther")}    style={{ minWidth: "8rem" }} />
<Column field="totalLiabilities" header="Total Liabilities" body={p_numberTotalLiabilitiesTemplate42} filter={selectedFilterFields.includes("totalLiabilities")} hidden={selectedHideFields?.includes("totalLiabilities")}    style={{ minWidth: "8rem" }} />
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


        <Dialog header="Upload AssetsLiabilities Data" visible={showUpload} onHide={() => setShowUpload(false)}>
        <UploadService 
          user={user} 
          serviceName="assetsLiabilities"            
          onUploadComplete={() => {
            setShowUpload(false); // Close the dialog after upload
          }}/>
      </Dialog>

      <Dialog header="Search AssetsLiabilities" visible={searchDialog} onHide={() => setSearchDialog(false)}>
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

export default AssetsLiabilitiesDataTable;