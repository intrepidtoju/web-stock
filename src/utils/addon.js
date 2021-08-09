import {
  CircularProgress,
  Dialog as DialogBox,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grow,
  IconButton,
  LinearProgress,
  Snackbar,
} from '@material-ui/core';
import {
  AddBox,
  ArrowUpward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  Close,
  DeleteOutline,
  Edit,
  Error,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
} from '@material-ui/icons';
import MaterialTable from 'material-table';
import React, { forwardRef } from 'react';

export function Loading() {
  return (
    <div
      style={{
        display: 'flex',
        minHeight: '80vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress />
    </div>
  );
}

export function Middle({ node }) {
  return (
    <div
      style={{
        display: 'flex',
        minHeight: '80vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {node}
    </div>
  );
}

export function VAlign({ node }) {
  return <div style={{ display: 'flex', alignItems: 'center' }}>{node}</div>;
}

export function Toast({ message = 'Hello', showToast, status = true }) {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={status}
      autoHideDuration={10000}
      onClose={() => showToast(false)}
      message={<span id="message-id">{message}</span>}
      action={[
        <IconButton key="close" aria-label="Close" color="inherit" onClick={() => showToast(false)}>
          <Close />
        </IconButton>,
      ]}
    />
  );
}

export function Dialog({
  toggle,
  open,
  title = null,
  caption = null,
  content = null,
  action = null,
  allowBackgroundClose = true,
}) {
  return (
    <DialogBox
      open={open}
      onClose={allowBackgroundClose ? () => toggle(false) : void 0}
      onEscapeKeyDown={allowBackgroundClose ? () => toggle(false) : void 0}
      transitionDuration={700}
      TransitionComponent={Grow}
      onClose={() => toggle(false)}
    >
      {title && <DialogTitle> {title} </DialogTitle>}
      <DialogContent>
        {caption && <DialogContentText>{caption}</DialogContentText>}
        {content}
      </DialogContent>

      {action && <DialogActions>{action}</DialogActions>}
    </DialogBox>
  );
}

export function JustDialog({ toggle, open, content = null, size = 'sm', showProgress = false }) {
  return (
    <DialogBox
      open={open}
      fullWidth={true}
      maxWidth={size}
      onEscapeKeyDown={() => toggle(false)}
      transitionDuration={700}
      TransitionComponent={Grow}
      onClose={() => toggle(false)}
    >
      {showProgress && <LinearProgress />}
      <DialogContent style={{ padding: 0, margin: 0 }}>{content}</DialogContent>
      {showProgress && <LinearProgress />}
    </DialogBox>
  );
}

export function FormDialog({
  toggle,
  open,
  title,
  caption = void 0,
  content,
  action,
  handleSubmit,
  width = 'sm',
  fullWidth = false,
  allowBackgroundClose = true,
  showProgress = false,
}) {
  return (
    <DialogBox
      fullWidth={fullWidth}
      maxWidth={width}
      open={open}
      className="purpleHeader"
      onEscapeKeyDown={allowBackgroundClose ? () => toggle(false) : void 0}
      transitionDuration={700}
      TransitionComponent={Grow}
      className="dialogTopBar"
      onClose={allowBackgroundClose ? () => toggle(false) : void 0}
    >
      {showProgress && <LinearProgress />}
      <DialogTitle>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>{title}</div>
          <IconButton aria-label="Close" onClick={() => toggle(false)}>
            <Close />
          </IconButton>
        </div>
      </DialogTitle>
      <form onSubmit={handleSubmit} autoComplete="off">
        <DialogContent>
          {caption && <DialogContentText>{caption}</DialogContentText>}
          {content}
        </DialogContent>
        <DialogActions>{action}</DialogActions>
      </form>
      {showProgress && <LinearProgress />}
    </DialogBox>
  );
}

export function Table({
  title = 'Table data',
  data,
  columns,
  actions = [],
  options = {},
  style = {},
}) {
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };

  const defaultAction = {
    actionsColumnIndex: -1,
    // exportButton: true,
    pageSize: 10,
    paging: true,
    filtering: false,
    actionsCellStyle: {
      display: 'flex',
      justifyContent: 'center',
      // padding: '24px',
      width: '100%',
      marginBottom: '-1px',
      marginTop: '10px',
    },
    // filtering: true,
  };

  return (
    <MaterialTable
      icons={tableIcons}
      // style={style}
      style={{
        // boxShadow: '7px 3px 13px -4px rgba(0,0,0,0.64)',
        fontFamily: 'Red Hat Display !important',
        // zIndex: -999,
      }}
      localization={{
        header: {
          actions: 'Actions',
        },
        body: {
          emptyDataSourceMessage: 'No data Found',
          filterRow: {
            filterTooltip: 'Filter',
          },
        },
      }}
      title={title}
      data={data}
      columns={columns}
      actions={actions}
      options={{ ...defaultAction, ...options }}
    />
  );
}

export function DisplayError({ message }) {
  return (
    <Middle
      node={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Error color="error" />
          <h3>{message}</h3>
        </div>
      }
    />
  );
}
