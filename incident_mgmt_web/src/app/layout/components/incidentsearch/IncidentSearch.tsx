import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import FilterIcon from '../../../../assets/images/filterIcon.svg';
import FilterClose from '../../../../assets/images/FilterClose.svg';
import IncidentSearchPanel from '../incidentsearchpanel/IncidentSearchPanel';

const useStyles = makeStyles((theme: Theme) => ({
  headerSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  searchMainPanel: {
    width: '95%',
    // marginTop: '-64px',
  },
  searchHeaderPanel: {
    display: 'flex',
    background: '#F0F1F2 !important',
    height: '64px',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: '16px',
    paddingLeft: '24px',
    paddingRight: '24px',
    marginBottom: '4px'
  },
  searchHeaderPanelText: {
    color: '#191919',
  },
  searchHeaderPanelFilter: {
    color: '#000000',
    letterSpacing: '0.32px',
    display: 'flex',
  },
  searchHeaderPanelRightFilter: {
    display: 'flex',
    flexDirection: 'row',
  },
  searchContentPanel: {
    background: '#F0F1F2 !important',
    height: '170px',
    paddingTop: '4px'
  },
  filterImage: {
    width: '18px',
    height: '18px',
  },
  closeImage: {
    width: '14px',
    height: '14px',
  },
  headerImage: {
    width: 'fill-available',
  }
}));

export default function IncidentSearch() {
  const classes = useStyles();
  const [filter, setFilter] = React.useState(true);

  const handleFilterChange = () => {
    const filterChanged = !filter;
    setFilter(filterChanged);
  };
  return (
    <div className={classes.headerSection}>
      <Box className={classes.searchMainPanel}>
        <Box className={classes.searchHeaderPanel}>
          <Typography sx={{fontSize: '32px', lineHeight: '30px', verticalAlign: 'middle', fontStyle:'normal'}} className={classes.searchHeaderPanelText}>Incident Search</Typography>
          <Box className={classes.searchHeaderPanelRightFilter} onClick={()=> handleFilterChange()}>
            <Typography sx={{fontSize: '13px', verticalAlign: 'middle', fontStyle:'bold', paddingRight: '8px'}} className={classes.searchHeaderPanelFilter}>Filter</Typography>
            {filter  && <img src={FilterClose} className={classes.closeImage} alt={'filter icon'}/>}
            {filter === false && <img src={FilterIcon} className={classes.filterImage} alt={'filter icon'}/>}
          </Box>
        </Box>
        {filter && <Box className={classes.searchContentPanel}>
          <IncidentSearchPanel></IncidentSearchPanel>
        </Box>
       }
      </Box>
    </div>
  );
}