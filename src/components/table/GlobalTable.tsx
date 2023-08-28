
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import arrow from '../../../../images/arrow.png'
// import { TableCells, Head, TableRows, Row, Image, AddButtons, Img } from '../../../../components/table/GlobalTable.style';
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridToolbarExport,
} from '@mui/x-data-grid';
import {
  randomId,
} from '@mui/x-data-grid-generator';
// import '../../../landingPage/tabComponnent/dashboard/a.css';

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
  setType: (newType: (oldType: any) => any,) => void
}
function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel, setType } = props;
  let t: any = "";
  setType(oldType => t = oldType)
  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <>
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Add {t}
        </Button>
      </GridToolbarContainer>
      {/* <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer> */}
    </>
  );
}

export default function GlobalTable(props: any) {
  console.log(props.rows, "GlobalTable");

  const [rows, setRows] = React.useState(props.rows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const [type, setType] = React.useState(props.type);
  const [idEdit, setIdEdit] = React.useState<GridRowId>()
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 5,
    page: 0,
  });
  console.log(paginationModel.pageSize, paginationModel.page);
  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setIdEdit(id)
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setIdEdit(id)
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    props.onDelete(id).then(setRows(rows.filter((row: any) => row.id !== id)));

    // setRows(rows.filter((row:any) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row: any) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row: any) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    if (newRow.isNew)
      props.onAdd(newRow)
    else
      props.onEdit(idEdit, newRow)


    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row: any) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }
  const width = 1030 / props.head.length

  props.head.map((r: any) => {
    r.editable = true;
    r.headerClassName = 'super-app-theme--header';
    r.headerAlign = "center"
    r.width = width;
  })

  const columns: GridColDef[] = [
    ...props.head,

    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      headerClassName: 'super-app-theme--header',
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <>
       {/* <Image><Img src={arrow} />{props.type}</Image> */}
      <Box
        sx={{
          height: ((paginationModel.pageSize * 30) + 100) + 'px',
          width: '100%',
          '& .actions': {
            color: 'text.secondary',
          },
          '& .textPrimary': {
            color: 'text.primary',
          },
          '& .super-app-theme--header': {
            fontWeight: 'bold !important', paddingTop: '0px!important',
            paddingBottom: '0px!important',
            paddingRight: '7px!important',
            paddingLeft: '7px!important',
            height: "40px!important",
            color: "gray!important",
            display: "table-cell!important",
          },
          '& .MuiDataGrid-cell MuiDataGrid-cell--textLeft MuiDataGrid-cell--editable MuiDataGrid-withBorderColor': {
            border: '5px',
            backgroundColor: 'rgb(220,220,220)!important',
            paddingTop: '0px!important',
            paddingBottom: '0px!important',
            paddingRight: '7px!important',
            paddingLeft: '7px!important', borderBottom: '5px solid #FFFF!important',
            borderRight: '5px solid #FFFF!important',
            Padding: "0pxIimportant"
          },
          '& .css-5wly58-MuiDataGrid-root .MuiDataGrid-row': {
            border: '5px',
            borderLeftStyle: 'solid',
            borderLeftColor: props.color,
            paddingBottom: '5px',
            padding: '0px !important',
            height: '10px !important',
            backgroundColor: "white!important",
            borderBottom: '5px solid #FFFF !important'
          },
          '& .css-1e6y48t-MuiButtonBase-root-MuiButton-root': {
            border: "5px",
            backgroundColor: "rgb(220,220,220)!important",
            paddingTop: '0px!important',
            paddingBottom: '0px!important',
            paddingRight: '7px!important',
            paddingLeft: '0px!important', borderBottom: '5px solid #FFFF!important',
            borderRight: '5px solid #FFFF!important',
            borderLeftStyle: "solid",
            borderLeftColor: props.color,
            padding: "0px!important",
            height: "30px!important",
            width: "1137px!important",
            opacity: "0.4",
            color: "black!important",
            marginBottom: "0px!important",
            textAlign:'left!important',
            justifyContent: 'left!important',
            top:  ((paginationModel.pageSize * 30) -15) + 'px',
            left:'-5px!important'
          },
          '& .css-wop1k0-MuiDataGrid-footerContainer': {
             borderTop: '0px solid!important'
        },
        '&.css-16c50h-MuiInputBase-root-MuiTablePagination-select':{
          width:"0px!important",
          height:"0px!important"
        },
        '&.css-5wly58-MuiDataGrid-root .MuiDataGrid-columnHeader--alignCenter .MuiDataGrid-columnHeaderTitleContainer': {
          justifyContent: 'left!important',
          textAlign:'left!important'
      },
     '& .css-5wly58-MuiDataGrid-root .MuiDataGrid-columnHeader--alignCenter .MuiDataGrid-columnHeaderTitleContainer' : {
        justifyContent: "left"
    },
   '&  .css-78c6dr-MuiToolbar-root-MuiTablePagination-toolbar':{
    position:'absolute',
      top: '180px',
      left:'700px'
   }  ,

   
        }}
      >
        <DataGrid

          rowHeight={30}
          rows={rows}
          columns={columns}
          editMode="row"
          // paginationModel={paginationModel}
          // onPaginationModelChange={setPaginationModel}
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          initialState={{
            pagination: { paginationModel: { pageSize: 3 } },
          }}

          pageSizeOptions={[3, 5, 7]}
          slots={{
            toolbar: EditToolbar

          }}

          slotProps={{
            toolbar: { setRows, setRowModesModel, setType },
          }}
        />
      </Box>
    </>
  );
}