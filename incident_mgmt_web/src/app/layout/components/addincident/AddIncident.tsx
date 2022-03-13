import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { usersListSelector } from 'features/users/userSelector';
import * as _ from 'lodash';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { incidentTypesListSelector } from 'features/incidenttype/incidentTypeSelector';
import {
  handleNotOkResponse,
  getNetworkErrorOrOriginalError,
} from 'common/utils/requestUtils';
import { fetchIncidentsStart } from '../../../../features/incident/incidentSlice';
import { User } from 'app/types/user';
import { incidentStatusListSelector } from 'features/incidentstatus/incidentStatusSelector'

const useStyles = makeStyles((theme: Theme) => ({
  formControl: {
    width: 250,
    marginLeft: '20px',
  },
  dateformControl: {
    width: '100%',
    marginLeft: '20px',
  },
  dividerClass: {
    marginLeft: '24px',
    marginRight: '24px',
    paddingTop: '16px',
  },
  buttonBoxClass: {
    display: 'inline-flex',
    paddingTop: '20px',
    paddingBottom: '20px',
    paddingRight: '20px',
    float: 'right',
  },
  labelClass: {
    fontStyle: 'book',
    fontSize: '13px',
    letterSpacing: '0.32px',
  },
  inputComponent: {
    height: '34px',
    backgroundColor: 'white',
    '& .MuiOutlinedInput-root': {
      height: '34px',
    },
  },
  statementSearchBodyPanel: {
    paddingLeft: '24px',
    paddingRight: '24px',
    paddingTop: '12px',
    paddingBottom: '12px',
  },
}));

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AddIncident() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [assignedTo, setAssignedTo] = React.useState<string>('');
  const [incidentType, setIncidentType] = React.useState<string>('');
  const [title, setTitle] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');

  const usersList = useSelector(usersListSelector);
  const incidentTypeList = useSelector(incidentTypesListSelector);
  const incidentStatusList = useSelector(incidentStatusListSelector);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const createIncident = async () => {
    const filterNameList:User[] = usersList?.filter((user) => user.name.includes(assignedTo)) || [];
    const userId = _.get(filterNameList, ['0', '_id'], '');

    const date = new Date();
    const dateformat = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    const incidentNamefilterList = incidentTypeList?.filter(
      (incidentTypeLocal) => incidentTypeLocal.name.includes(incidentType)
    );
    const incidentId = _.get(incidentNamefilterList, ['0', '_id'], '');
    const incidentStatusfilterList = incidentStatusList?.filter(incidentStatus => incidentStatus.status.includes('Assigned'));
    const statusId = _.get(incidentStatusfilterList, ['0', '_id'], '');
    const incidentRecord: any = {
      title: title,
      description: description,
      createdBy: userId,
      assignedTo: userId,
      lastModifiedBy: userId,
      incidentType: incidentId,
      status: statusId,
      createdDate: dateformat,
      modifiedDate: dateformat,
    };

    try {
      const res = await fetch(`/incidents`, {
        method: 'POST',
        body: JSON.stringify(incidentRecord)
      });
      handleNotOkResponse(res);
      const json = (await res.json());
      setOpen(false);
      dispatch(fetchIncidentsStart());
      return json.data.docs;
    } catch (error) {
      console.log("error", error);
      throw getNetworkErrorOrOriginalError(error);
    }
  };

  const closeDialog = () => setOpen(false);

  const handleTitle = (event: any) => {
    setTitle(event.target.value);
  }

  const handleDescription = (event: any) => {
    setDescription(event.target.value);
  }

  const handleIncidentTypeChange = (event: SelectChangeEvent) => {
    const filterList = incidentTypeList?.filter(
      (incidentType) => incidentType._id === event.target.value
    );
    const name = _.get(filterList, ['0', 'name'], '');
    setIncidentType(name);
  };

  const handleAssignedToChange = (event: SelectChangeEvent) => {
    const filterList = usersList?.filter((user) => user._id === event.target.value);
    const name = _.get(filterList, ['0', 'name'], '');
    setAssignedTo(name);
  };

  return (
    <div>
      <Box className={classes.buttonBoxClass}>
      <Button
        variant="contained"
        sx={{ textTransform: 'none', fontSize: '0.8rem', fontWeight: '500' }}
        onClick={handleOpen}
      >
        Create Incident
      </Button>
      </Box>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create a Incident
          </Typography>
          <Box>
            <FormControl className={classes.formControl}>
              <label className={classes.labelClass}>Title</label>
              <TextField
                id="outlined-basic"
                variant="outlined"
                className={classes.inputComponent}
                onChange={handleTitle}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <label className={classes.labelClass}>Description</label>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={3}
                placeholder="Minimum 3 rows"
                style={{ width: 200 }}
                onChange={handleDescription}
              />
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
                {incidentTypeList?.map((incidentType) => (
                  <MenuItem value={incidentType._id}>{incidentType.name}</MenuItem>
                ))}
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
                {usersList?.map((user) => {
                  return user.role === 'user' && <MenuItem value={user._id}>{user.name}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Box>
          <Box className={classes.buttonBoxClass}>
            <Button
              variant="outlined"
              sx={{
                marginRight: '15px',
                textTransform: 'none',
                fontSize: '0.8rem',
                fontWeight: '400',
              }}
              onClick={closeDialog}
            >
              Close
            </Button>
            <Button
              variant="contained"
              sx={{ textTransform: 'none', fontSize: '0.8rem', fontWeight: '500' }}
              onClick={createIncident}
            >
              Create Incident
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
