import { CssBaseline } from '@mui/material';
import Header from '../components/header/Header';
import IncidentSearch from '../components/incidentsearch/IncidentSearch';
import IncidentList from '../components/incidentlist/IncidentList';

export default function Dashboard() {
  return (
    <div>
      <CssBaseline />
      <Header></Header>
      <IncidentSearch></IncidentSearch>
      <IncidentList></IncidentList>
    </div>
  );
}
