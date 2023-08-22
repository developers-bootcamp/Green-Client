

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { TableCells, Head, TableRows, Row, Image ,AddButtons,Img} from '../../../../components/table/GlobalTable.style';

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
import '../../../landingPage/tabComponnent/dashboard/a.css';

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
  setType:(newType:(oldType:any)=>any,)=>void
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel,setType } = props;
  let t:any="";
  setType(oldType=>t=oldType)
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
        <AddButtons color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Add {t}
        </AddButtons>
      </GridToolbarContainer>
      {/* <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer> */}
    </>
  );
}

export default function FullFeaturedCrudGrid(props: any) {
  console.log(props.rows, "FullFeaturedCrudGrid");

  const [rows, setRows] = React.useState(props.rows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const [type,setType]=React.useState(props.type);
  const [idEdit, setIdEdit] = React.useState<GridRowId>()
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 5,
    page: 0,
  });
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
  const width=1030/props.head.length
  
  props.head.map((r: any) => {
    r.editable = true;
    r.headerClassName = 'super-app-theme--header';
    r.headerAlign="center"
    r.width=width;
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
    <Box
      sx={{
        height: 500,
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
          Padding:"0pxIimportant"
        }
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
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        
        pageSizeOptions={[5, 10, 25]}
        slots={{
          toolbar: EditToolbar

        }}

        slotProps={{
          toolbar: { setRows, setRowModesModel,setType },
        }}
      />
    </Box>
    </>
  );
}


