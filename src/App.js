import {Route} from 'react-router-dom'
import Nav from './components/Header/Nav';
import Dashboard from './components/Professional/ProfessionalDashboard';
import PatientsDashboard from './components/Patient/PatientsDashboard';
import Sign from './components/Sign/Sign';
import Log from './components/Log/Log';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';
import ResetPassword from './components/ResetPassword/ResetPassword';
import PatientsRouter from './components/Log/privateroutes/Patientsrouter';
import ProfesionalRouter from './components/Log/privateroutes/Profesionalrouter ';
import GoogleSign from './components/Sign/googlesign';
import Succes from './components/payments/succes';




function App() {
  return (
    <> 
      <Route path="/sign-in" component={Sign}/>
      <Route path="/sign-ing" component={GoogleSign}/>
      <Route path="/login" component={Log}/>
      <Route path="/reset-password" component={ResetPassword}/>
      <Route path="/" component={Nav}/>
      <ProfesionalRouter exact path="/profesional-dashboard" component={Dashboard}/> 
      <PatientsRouter exact path="/patient-dashboard" component={PatientsDashboard}/>
      <Route path="/succes" component={Succes}/> 
      <Route path="/failure" component={Succes}/> 
      <Route path="/pending" component={Succes}/> 
      <Route exact path="/" component={Main}/>
      <Route path="/" component={Footer}/>
    </>
  );
}

export default App;
