import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIncidentStatusStart } from 'features/incidentstatus/incidentStatusSlice';
import { fetchIncidentTypeStart } from 'features/incidenttype/incidentTypeSlice';
import { fetchUserStart } from 'features/users/usersSlice';
import { incidentStatusListSelector } from 'features/incidentstatus/incidentStatusSelector'
import { incidentTypesListSelector } from 'features/incidenttype/incidentTypeSelector'
import { usersListSelector } from 'features/users/userSelector'
import * as _ from 'lodash';
import { incidentsSearchCriteriaSelector } from 'features/incidentsearch/incidentsearchSelector';
import { initiateIncidentSearch } from 'features/incidentsearch/incidentsearchSlice';
import { fetchIncidentsStart } from '../../../../features/incident/incidentSlice';

const useStyles = makeStyles((theme: Theme) => ({
  formControl: {
    width: 250,
    marginLeft: "20px"
  },
  dateformControl: {
    width: '100%',
    marginLeft: "20px"
  },
  dividerClass: {
    marginLeft: '24px',
    marginRight: '24px',
    paddingTop: "16px"
  },
  buttonBoxClass: {
    display: 'inline-flex',
    paddingTop: '20px',
    paddingBottom: '20px',
    paddingRight: '20px',
    float: 'right'
  },
  labelClass: {
    fontStyle: 'book',
    fontSize: '13px',
    letterSpacing: '0.32px'
  },
  inputComponent: {
    height: '34px',
    backgroundColor: 'white',
    '& .MuiOutlinedInput-root': {
      height: '34px'
    }
  },
  statementSearchBodyPanel: {
    paddingLeft: '24px',
    paddingRight: '24px',
    paddingTop: '12px',
    paddingBottom: '12px'
  }
}));

export default function IncidentSearchPanel() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const incidentStatusList = useSelector(incidentStatusListSelector);
  const incidentTypeList = useSelector(incidentTypesListSelector);
  const usersList = useSelector(usersListSelector);
  const incidentSearchCriteria = useSelector(incidentsSearchCriteriaSelector)
  useEffect(() => {
    dispatch(fetchIncidentStatusStart());
    dispatch(fetchIncidentTypeStart());
    dispatch(fetchUserStart());
  }, [dispatch]);

  const [createdBy, setCreatedBy] = React.useState<string>('');
  const [assignedTo, setAssignedTo] = React.useState<string>('');
  const [modifiedBy, setModifiedBy] = React.useState<string>('');
  const [incidentType, setIncidentType] = React.useState<string>('');
  const [incidentStatus, setIncidentStatus] = React.useState<string>('');

  const clearFilter = () => {
    setAssignedTo('');
    setModifiedBy('');
    setCreatedBy('');
    setIncidentStatus('');
    setIncidentType('');
    dispatch(initiateIncidentSearch({}));
    dispatch(fetchIncidentsStart());
  };

  const applyFilter = () => {
    const incidentsSearchSelectorUpdated = Object.assign({}, incidentSearchCriteria);
    delete incidentsSearchSelectorUpdated?.sort;
    dispatch(initiateIncidentSearch(incidentsSearchSelectorUpdated));
    dispatch(fetchIncidentsStart());
  };

  const handleCreatedByChange = (event: SelectChangeEvent) => {
    const filterList = usersList?.filter(user => user._id === event.target.value);
    const name = _.get(filterList, ['0', 'name'], '');
    setCreatedBy(name);
    const incidentsSearchSelectorUpdated = Object.assign({}, incidentSearchCriteria, {createdBy: event.target.value})
    dispatch(initiateIncidentSearch(incidentsSearchSelectorUpdated));
  };

  const handleAssignedToChange = (event: SelectChangeEvent) => {
    const filterList = usersList?.filter(user => user._id === event.target.value);
    const name = _.get(filterList, ['0', 'name'], '');
    setAssignedTo(name);
    const incidentsSearchSelectorUpdated = Object.assign({}, incidentSearchCriteria, {assignedTo: event.target.value})
    dispatch(initiateIncidentSearch(incidentsSearchSelectorUpdated));
  };

  const handleModifiedByChange = (event: SelectChangeEvent) => {
    const filterList = usersList?.filter(user => user._id === event.target.value);
    const name = _.get(filterList, ['0', 'name'], '');
    setModifiedBy(name);
    const incidentsSearchSelectorUpdated = Object.assign({}, incidentSearchCriteria, {lastModifiedBy: event.target.value})
    dispatch(initiateIncidentSearch(incidentsSearchSelectorUpdated));
  };

  const handleIncidentTypeChange = (event: SelectChangeEvent) => {
    const filterList = incidentTypeList?.filter(incidentType => incidentType._id === event.target.value);
    const name = _.get(filterList, ['0', 'name'], '');
    setIncidentType(name);
    const incidentTypeUpdated = Object.assign({}, incidentSearchCriteria, {incidentType: event.target.value})
    dispatch(initiateIncidentSearch(incidentTypeUpdated));
  };

  const handleIncidentStatusChange = (event: SelectChangeEvent) => {
    const filterList = incidentStatusList?.filter(incidentStatus => incidentStatus._id === event.target.value);
    const status = _.get(filterList, ['0', 'status'], '');
    setIncidentStatus(status);
    const incidentStatusUpdated = Object.assign({}, incidentSearchCriteria, {status: event.target.value})
    dispatch(initiateIncidentSearch(incidentStatusUpdated));
  };

  return (
    <div style={{ width: '100%' }}>
    <Box className={classes.statementSearchBodyPanel}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 1,
      }}
    >
      <FormControl className={classes.formControl}>
        <label className={classes.labelClass}>Created By</label>
        <Select
          id="createdBy-select"
          value={createdBy}
          renderValue={(selected) => selected}
          className={classes.inputComponent}
          onChange={handleCreatedByChange}
        >
          {usersList?.map((user) => 
          {return user.role === 'admin' && <MenuItem value={user._id}>{user.name}</MenuItem>}
          )}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <label className={classes.labelClass}>AssignedTo</label>
        <Select
          id="assignedto-select"
          value={assignedTo}
          renderValue={(selected) => selected}
          className={classes.inputComponent}
          onChange={handleAssignedToChange}
        >
          {usersList?.map((user) => 
          {return user.role === 'user' && <MenuItem value={user._id}>{user.name}</MenuItem>}
          )}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <label className={classes.labelClass}>ModifiedBy</label>
        <Select
          id="modified-by-select"
          value={modifiedBy}
          renderValue={(selected) => selected}
          className={classes.inputComponent}
          onChange={handleModifiedByChange}
        >
          {usersList?.map((user) => 
          <MenuItem value={user._id}>{user.name}</MenuItem>
          )}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <label className={classes.labelClass}>Incident Type</label>
        <Select
          id="incidenttype-select"
          value={incidentType}
          renderValue={(selected) => selected}
          className={classes.inputComponent}
          onChange={handleIncidentTypeChange}
        >
          {incidentTypeList?.map((incidentType) => 
          <MenuItem value={incidentType._id}>{incidentType.name}</MenuItem>
          )}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <label className={classes.labelClass}>Incident Status</label>
        <Select
          id="incidentstatus-select"
          value={incidentStatus}
          renderValue={(selected) => selected}
          className={classes.inputComponent}
          onChange={handleIncidentStatusChange}
        >
          {incidentStatusList?.map((incidentStatus) => 
          <MenuItem value={incidentStatus._id}>{incidentStatus.status}</MenuItem>
          )}
        </Select>
      </FormControl>
      </Box>

    <Divider sx={{ marginLeft: '24px', marginRight: '24px', borderBottomWidth: 'medium'}}/>
    <Box className={classes.buttonBoxClass}>
      <Button variant="outlined" sx={{ marginRight: '15px', textTransform: 'none', fontSize: '0.8rem', fontWeight: '400' }} onClick={clearFilter}>Reset Filter</Button>
      <Button variant="contained" sx={{ textTransform: 'none', fontSize: '0.8rem', fontWeight: '500'  }}  onClick={applyFilter}>Apply Filter</Button>
    </Box>
    </div>
  );
}
