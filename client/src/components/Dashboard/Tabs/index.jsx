import React, {useState} from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { createTheme, ThemeProvider } from '@mui/material';
import "./styles.css";
import TableComponent from '../Table';
import StatisticalComponent from '../Statistics';

function TabsComponent({selectedMonth, searchProducts, setIsStatistical}) {
  const [value, setValue] = useState('table');
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if(newValue === "graph"){
      setIsStatistical(true);
    }
    else{
      setIsStatistical(false);
    }
  };

  const styles = {
    color: "white",
    backgroundColor: "#1b1b1b",
    marginTop: "20px",
  }

  const theme = createTheme({
    palette: {
        primary: {
            main: '#8a3ffc',
        }
    },
    });

  return (
    <ThemeProvider theme={theme}>
      <TabContext value={value}>
        <div>
          <TabList onChange={handleChange} variant="fullWidth">
            <Tab label="Table View" value="table" sx={styles} />
            <Tab label="Statistics View" value="graph" sx={styles} />
          </TabList>
        </div>
        <TabPanel className='table-view' value="table">
            <TableComponent selectedMonth={selectedMonth} searchProducts={searchProducts} />
        </TabPanel>
        <TabPanel className='graph-view' value="graph">
            <StatisticalComponent selectedMonth={selectedMonth} />
        </TabPanel>
      </TabContext>
    </ThemeProvider>
  );
}

export default TabsComponent;