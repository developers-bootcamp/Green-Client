import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton, TableHead } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { PALLETE } from '../../config/config';
import arrow from '../../images/arrow.png';
import { TableCells, Head, TableRows, Row, Image ,AddButtons,Img} from './GlobalTable.style';
export default function GlobalTable(props: any) {
  console.log(props.rows,"llllllllll");
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);
  const rows = props.rows;
  const head = props.head;
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <>

      <TableContainer component={Paper}>
        <div>
          <Image><Img src={arrow} />{props.type}</Image>

          <Table sx={{ minWidth: 100 }} aria-label="custom pagination table">

            <TableHead >

              <TableRow>
                {props.head.map((e: string) => <Head>{e}</Head>)}

              </TableRow>
            </TableHead>

            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rows
              ).map((row: any) => (

                <TableRows key={row.id}  >
                  {Object.keys(row).map((key) => (
                    key !== "id" ?
                      <TableCells style={{padding:"0px!important"}}key={key} component="th" scope="row">
                        {row[key]}
                      </TableCells> : ""
                  ))}
                  <TableCells style={{padding:"0px!important"}}><IconButton aria-label="add an alarm">
                    <EditIcon />
                  </IconButton>
                  </TableCells>
                  <TableCells onClick={()=>{props.onDelete(row.id);
                  console.log(row.id);
                  }}style={{padding:"0px!important"}}><IconButton aria-label="add an alarm">
                    <DeleteIcon />
                  </IconButton>
                  </TableCells>
                </TableRows>

              ))}
              {emptyRows > 0 && (
                <TableRow >
                  <TableCell style={{padding:"0px!important"}} colSpan={6} />
                </TableRow>


              )}
              <AddButtons><IconButton aria-label="add an alarm" ><AddIcon />
              </IconButton>
                {`add ${props.type}`}</AddButtons>
            </TableBody>
            <TableFooter>

              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[3, 5, 10, { label: 'All', value: -1 }]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>

          </Table>
        </div>
      </TableContainer></>
  );
}