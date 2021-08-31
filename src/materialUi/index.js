import { createTheme} from '@material-ui/core/styles';
import { blue, red} from '@material-ui/core/colors';

const theme = createTheme({
  props:{
    MuiButton:{
      variant:"contained",
      color:"secondary",
    },
    "MuiDataGrid-root":{
      color: "secondary"
    },
  },
  palette: {
    type: "light",
    primary: {
      main: blue[500],
      contrastText: "#ffffff"
    },
    secondary: {
      main: blue[500],
      contrastText: "#ffff"
    },
    default: {
      main:"#ffffff" ,
      contrastText: blue[500]
    },
    text: {
      primary: "#00000",
      secondary: blue[500],
    },
    background:{
      paper: blue[500],
      default: red[100],
    }
  },
  typography:{
    fontFamily: "Roboto",
    h4:{marginBottom:"10px", color:"white", textAlign:"center"},
  },
  
});

export default theme;