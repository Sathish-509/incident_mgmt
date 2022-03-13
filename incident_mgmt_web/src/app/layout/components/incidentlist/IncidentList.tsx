import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import * as _ from 'lodash';
import { visuallyHidden } from '@mui/utils';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIncidentsStart } from '../../../../features/incident/incidentSlice';
import { incidentsListSelector } from 'features/incident/incidentSelector';
import { Incidents } from './../../../types/incident';
import { incidentsSearchCriteriaSelector } from 'features/incidentsearch/incidentsearchSelector';
import { initiateIncidentSearch } from 'features/incidentsearch/incidentsearchSlice';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import {
  handleNotOkResponse,
  getNetworkErrorOrOriginalError,
} from 'common/utils/requestUtils';
import { usersListSelector } from 'features/users/userSelector'
import { incidentStatusListSelector } from 'features/incidentstatus/incidentStatusSelector'
import { incidentTypesListSelector } from 'features/incidenttype/incidentTypeSelector'

const useStyles = makeStyles((theme: Theme) => ({
  pdfIcon: {
    width: "15px",
    height: "15px",
    color: 'blue'
  },
  imageIcon: {
    height: '100%',
  },
  iconRoot: {
    textAlign: 'center',
  },
  buttonBoxClass: {
    display: 'inline-flex',
    paddingTop: '10px',
    paddingLeft: '20px'
  },
}));

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id?: keyof Incidents;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'title',
    numeric: false,
    disablePadding: false,
    label: 'Title',
  },
  {
    id: 'description',
    numeric: false,
    disablePadding: false,
    label: 'Description',
  },
  {
    id: 'createdDate',
    numeric: false,
    disablePadding: false,
    label: 'Created Date',
  },
  {
    id: 'createdBy',
    numeric: false,
    disablePadding: false,
    label: 'Created By',
  },
  {
    id: 'assignedTo',
    numeric: false,
    disablePadding: false,
    label: 'Assigned To',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Incident Status',
  },
  {
    id: 'incidentType',
    numeric: false,
    disablePadding: false,
    label: 'Incidenty Type',
  },
  {
    numeric: false,
    disablePadding: false,
    label: 'Operations',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Incidents) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof Incidents | null) => (event: React.MouseEvent<unknown>) => {
      property && onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id ? headCell.id : null)}
              sx={{fontSize: '0.75rem', fontWeight: 400, color: '#666666'}}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function EnhancedTable() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const incidents = useSelector(incidentsListSelector) || [];
  const incidentSearchCriteria = useSelector(incidentsSearchCriteriaSelector)
  const incidentStatusList = useSelector(incidentStatusListSelector);
  const usersList = useSelector(usersListSelector);
  const incidentTypeList = useSelector(incidentTypesListSelector);

  useEffect(() => {
    dispatch(fetchIncidentsStart());
  }, [dispatch]);

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Incidents>('createdBy');
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Incidents,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'asc' : 'desc');
    setOrderBy(property);
    // sort: [{year: 'asc'}],
    const incidentsSearchSelectorUpdated = Object.assign({}, incidentSearchCriteria, 
      {sort: [{ [property]: isAsc ? 'asc' : 'desc' }]})
    dispatch(initiateIncidentSearch(incidentsSearchSelectorUpdated));
    dispatch(fetchIncidentsStart());
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, no: number) => {
    const selectedIndex = selected.indexOf(no);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, no);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
  };

  const updateStatus = async (event: any, row:any, statusNameTo: string) => {
    const statusName: string = statusNameTo === 'New' || statusNameTo=== 'Assigned' ? 'Acknowledged' : 'Completed';
    const filterList = incidentStatusList?.filter(incidentStatus => incidentStatus.status === statusName);
    const status = _.get(filterList, ['0', '_id'], '');
    const incidentsSearchSelectorUpdated = Object.assign({}, row, {status: status});
    try {
      const res = await fetch(`/incidents`, {
        method: 'POST',
        body: JSON.stringify(incidentsSearchSelectorUpdated)
      });
      
      handleNotOkResponse(res);
      const json = (await res.json());
      dispatch(fetchIncidentsStart());
      return json.data.docs;
    } catch (error) {
      console.log("error", error);
      throw getNetworkErrorOrOriginalError(error);
    }
  }

  const deleteIncident = async (event: any, row:any) => {
    try {
      const res = await fetch(`/incidents/${row._id}/${row._rev}`, {
        method: 'DELETE',
      });
      handleNotOkResponse(res);
      const json = (await res.json());
      dispatch(fetchIncidentsStart());
      return json.data.docs;
    } catch (error) {
      console.log("error", error);
      throw getNetworkErrorOrOriginalError(error);
    }
  }

  const isSelected = (no: number) => selected.indexOf(no) !== -1;
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'small'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={25}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(incidents, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const createdByFilterList = usersList?.filter(user => user._id === row.createdBy);
                  const createdName = _.get(createdByFilterList, ['0', 'name'], '');
                  const assignedToFilterList = usersList?.filter(user => user._id === row.assignedTo);
                  const assignedToName = _.get(assignedToFilterList, ['0', 'name'], '');
                  const statusFilterList = incidentStatusList?.filter(incidentStatus => incidentStatus._id === row.status);
                  const statusName = _.get(statusFilterList, ['0', 'status'], '');
                  const incidentTypeFilterList = incidentTypeList?.filter(incidentType => incidentType._id === row.incidentType);
                  const incidentName = _.get(incidentTypeFilterList, ['0', 'name'], '');
                  return (
                    <TableRow
                      hover
                      // role="checkbox"
                      tabIndex={-1}
                      key={row.createdBy}
                    >

                      <TableCell align="left" sx={{fontSize: '0.75rem', fontWeight: 400, color: '#666666'}}>{row.title}</TableCell>
                      <TableCell align="left" sx={{fontSize: '0.75rem', fontWeight: 400, color: '#666666'}}>{row.description}</TableCell>
                      <TableCell align="left" sx={{fontSize: '0.75rem', fontWeight: 400, color: '#666666'}}>{row.createdDate}</TableCell>
                      <TableCell align="left" sx={{fontSize: '0.75rem', fontWeight: 400, color: '#666666'}}>{createdName}</TableCell>
                      <TableCell align="left" sx={{fontSize: '0.75rem', fontWeight: 400, color: '#666666'}}>{assignedToName}</TableCell>
                      <TableCell align="left" sx={{fontSize: '0.75rem', fontWeight: 400, color: '#666666'}}>{statusName}</TableCell>
                      <TableCell align="left" sx={{fontSize: '0.75rem', fontWeight: 400, color: '#666666'}}>{incidentName}</TableCell>
                      <TableCell align="left" sx={{fontSize: '0.75rem', fontWeight: 400, color: '#666666'}}>
                         <Box sx={{display: 'flex', flexDirection:'row'}}>
                        {statusName !== 'Completed' && <Button  onClick={(evt: any) => updateStatus(evt, row, statusName)}>{
                         statusName === 'New' || statusName === 'Assigned' ? 'Acknowledge' : 'Complete'
                         }</Button>}
                           <EditIcon/>
                          <DeleteRoundedIcon onClick={(evt: any) => deleteIncident(evt, row)}/>
                      </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={incidents.length}
          rowsPerPage={rowsPerPage}
          page={ page || 0}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}