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
import useStylesForTable from './GlobalTable.style';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { PALLETE } from '../config/config';

export default function GlobalTable(props:any) {
  console.log(props.rows);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);
  const rows=props.rows;
  const head=props.head;
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  const classes = useStylesForTable(PALLETE.RED)
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
    <TableContainer component={Paper}>
        <Table  sx={{ minWidth: 100 }} aria-label="custom pagination table">
          <TableHead style={{height:10}}>
            <TableRow>
            {props.head.map((e:string)=><TableCell  className={classes.try}>{e}</TableCell>)}
              {/* <TableCell  className={classes.try}>product</TableCell>
              <TableCell  className={classes.try}>description</TableCell>
              <TableCell className={classes.try}>Edit</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row:any) => (
              <>
              <TableRow className={classes.sideColor}key={row.id}  >
                
                <TableCell className={classes.try2}component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell className={classes.try2}style={{ width: 1000 }}>
                  {row.description}
                </TableCell>
                <TableCell className={classes.try2}><IconButton aria-label="add an alarm">
              <EditIcon />
            </IconButton></TableCell>
              </TableRow><hr className={classes.try3}/></>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow><TableCell style={{ width: 1000 }}><IconButton aria-label="add an alarm">
              <AddIcon />
            </IconButton>
            add product
            </TableCell>
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
    </TableContainer>
  );
}