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

const LegalCooridinationDataTable = ({ items, fields, onEditRow, onRowDelete, onRowClick, searchDialog, setSearchDialog,   showUpload, setShowUpload,
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
const pAisnSolicitorFirmTemplate1 = (rowData, { rowIndex }) => <p >{rowData.aisnSolicitorFirm}</p>
const pAisnSolicitorContactTemplate2 = (rowData, { rowIndex }) => <p >{rowData.aisnSolicitorContact}</p>
const pAisnSolicitorPhoneTemplate3 = (rowData, { rowIndex }) => <p >{rowData.aisnSolicitorPhone}</p>
const pAisnSolicitorEmailTemplate4 = (rowData, { rowIndex }) => <p >{rowData.aisnSolicitorEmail}</p>
const pClientSolicitorFirmTemplate5 = (rowData, { rowIndex }) => <p >{rowData.clientSolicitorFirm}</p>
const pClientSolicitorContactTemplate6 = (rowData, { rowIndex }) => <p >{rowData.clientSolicitorContact}</p>
const pClientSolicitorPhoneTemplate7 = (rowData, { rowIndex }) => <p >{rowData.clientSolicitorPhone}</p>
const pClientSolicitorEmailTemplate8 = (rowData, { rowIndex }) => <p >{rowData.clientSolicitorEmail}</p>
const pDocsSentToSolicitorAtTemplate9 = (rowData, { rowIndex }) => <p >{rowData.docsSentToSolicitorAt}</p>
const pDocsSentChecklistTemplate10 = (rowData, { rowIndex }) => <p >{rowData.docsSentChecklist}</p>
const pSecurityDocsPreparedAtTemplate11 = (rowData, { rowIndex }) => <p >{rowData.securityDocsPreparedAt}</p>
const p_dateExpectedCompletionDateTemplate12 = (rowData, { rowIndex }) => <p >{moment(rowData.expectedCompletionDate).fromNow()}</p>
const p_dateActualCompletionDateTemplate13 = (rowData, { rowIndex }) => <p >{moment(rowData.actualCompletionDate).fromNow()}</p>
const pCompletionTimelineNotesTemplate14 = (rowData, { rowIndex }) => <p >{rowData.completionTimelineNotes}</p>
const pStatusTemplate15 = (rowData, { rowIndex }) => <p >{rowData.status}</p>
const p_dateClientNotifiedAtTemplate16 = (rowData, { rowIndex }) => <p >{moment(rowData.clientNotifiedAt).fromNow()}</p>
const pNotificationTemplateUsedTemplate17 = (rowData, { rowIndex }) => <p >{rowData.notificationTemplateUsed}</p>
const pNotesTemplate18 = (rowData, { rowIndex }) => <p >{rowData.notes}</p>
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
<Column field="aisnSolicitorFirm" header="Aisn Solicitor Firm" body={pAisnSolicitorFirmTemplate1} filter={selectedFilterFields.includes("aisnSolicitorFirm")} hidden={selectedHideFields?.includes("aisnSolicitorFirm")}    style={{ minWidth: "8rem" }} />
<Column field="aisnSolicitorContact" header="Aisn Solicitor Contact" body={pAisnSolicitorContactTemplate2} filter={selectedFilterFields.includes("aisnSolicitorContact")} hidden={selectedHideFields?.includes("aisnSolicitorContact")}    style={{ minWidth: "8rem" }} />
<Column field="aisnSolicitorPhone" header="Aisn Solicitor Phone" body={pAisnSolicitorPhoneTemplate3} filter={selectedFilterFields.includes("aisnSolicitorPhone")} hidden={selectedHideFields?.includes("aisnSolicitorPhone")}    style={{ minWidth: "8rem" }} />
<Column field="aisnSolicitorEmail" header="Aisn Solicitor Email" body={pAisnSolicitorEmailTemplate4} filter={selectedFilterFields.includes("aisnSolicitorEmail")} hidden={selectedHideFields?.includes("aisnSolicitorEmail")}    style={{ minWidth: "8rem" }} />
<Column field="clientSolicitorFirm" header="Client Solicitor Firm" body={pClientSolicitorFirmTemplate5} filter={selectedFilterFields.includes("clientSolicitorFirm")} hidden={selectedHideFields?.includes("clientSolicitorFirm")}    style={{ minWidth: "8rem" }} />
<Column field="clientSolicitorContact" header="Client Solicitor Contact" body={pClientSolicitorContactTemplate6} filter={selectedFilterFields.includes("clientSolicitorContact")} hidden={selectedHideFields?.includes("clientSolicitorContact")}    style={{ minWidth: "8rem" }} />
<Column field="clientSolicitorPhone" header="Client Solicitor Phone" body={pClientSolicitorPhoneTemplate7} filter={selectedFilterFields.includes("clientSolicitorPhone")} hidden={selectedHideFields?.includes("clientSolicitorPhone")}    style={{ minWidth: "8rem" }} />
<Column field="clientSolicitorEmail" header="Client Solicitor Email" body={pClientSolicitorEmailTemplate8} filter={selectedFilterFields.includes("clientSolicitorEmail")} hidden={selectedHideFields?.includes("clientSolicitorEmail")}    style={{ minWidth: "8rem" }} />
<Column field="docsSentToSolicitorAt" header="Docs Sent To Solicitor At" body={pDocsSentToSolicitorAtTemplate9} filter={selectedFilterFields.includes("docsSentToSolicitorAt")} hidden={selectedHideFields?.includes("docsSentToSolicitorAt")}    style={{ minWidth: "8rem" }} />
<Column field="docsSentChecklist" header="Docs Sent Checklist" body={pDocsSentChecklistTemplate10} filter={selectedFilterFields.includes("docsSentChecklist")} hidden={selectedHideFields?.includes("docsSentChecklist")}    style={{ minWidth: "8rem" }} />
<Column field="securityDocsPreparedAt" header="Security Docs Prepared At" body={pSecurityDocsPreparedAtTemplate11} filter={selectedFilterFields.includes("securityDocsPreparedAt")} hidden={selectedHideFields?.includes("securityDocsPreparedAt")}    style={{ minWidth: "8rem" }} />
<Column field="expectedCompletionDate" header="Expected Completion Date" body={p_dateExpectedCompletionDateTemplate12} filter={selectedFilterFields.includes("expectedCompletionDate")} hidden={selectedHideFields?.includes("expectedCompletionDate")}  sortable  style={{ minWidth: "8rem" }} />
<Column field="actualCompletionDate" header="Actual Completion Date" body={p_dateActualCompletionDateTemplate13} filter={selectedFilterFields.includes("actualCompletionDate")} hidden={selectedHideFields?.includes("actualCompletionDate")}  sortable  style={{ minWidth: "8rem" }} />
<Column field="completionTimelineNotes" header="Completion Timeline Notes" body={pCompletionTimelineNotesTemplate14} filter={selectedFilterFields.includes("completionTimelineNotes")} hidden={selectedHideFields?.includes("completionTimelineNotes")}    style={{ minWidth: "8rem" }} />
<Column field="status" header="Status" body={pStatusTemplate15} filter={selectedFilterFields.includes("status")} hidden={selectedHideFields?.includes("status")}    style={{ minWidth: "8rem" }} />
<Column field="clientNotifiedAt" header="Client Notified At" body={p_dateClientNotifiedAtTemplate16} filter={selectedFilterFields.includes("clientNotifiedAt")} hidden={selectedHideFields?.includes("clientNotifiedAt")}  sortable  style={{ minWidth: "8rem" }} />
<Column field="notificationTemplateUsed" header="Notification Template Used" body={pNotificationTemplateUsedTemplate17} filter={selectedFilterFields.includes("notificationTemplateUsed")} hidden={selectedHideFields?.includes("notificationTemplateUsed")}    style={{ minWidth: "8rem" }} />
<Column field="notes" header="Notes" body={pNotesTemplate18} filter={selectedFilterFields.includes("notes")} hidden={selectedHideFields?.includes("notes")}    style={{ minWidth: "8rem" }} />
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


        <Dialog header="Upload LegalCooridination Data" visible={showUpload} onHide={() => setShowUpload(false)}>
        <UploadService 
          user={user} 
          serviceName="legalCooridination"            
          onUploadComplete={() => {
            setShowUpload(false); // Close the dialog after upload
          }}/>
      </Dialog>

      <Dialog header="Search LegalCooridination" visible={searchDialog} onHide={() => setSearchDialog(false)}>
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

export default LegalCooridinationDataTable;