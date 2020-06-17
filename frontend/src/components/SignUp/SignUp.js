import React from 'react'
import { Tabs, Tab, Box , Typography} from '@material-ui/core'
import SignUpIhave from '../SignUpIhave'
import SignUpWho from '../SignUpWho'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
			className="tab-panel"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (children)}
    </div>
  );
}

function SignUp(props) {
	const [value, setValue] = React.useState(0)
	const signUpCompoNames = ["Store Owner", "User"]
	return (
		<div id="signup-multi">
			<Tabs value={value} onChange={(e, v)=> setValue(v)} aria-label="simple tabs" centered>
				<Tab label={signUpCompoNames[0]} id="simple-tab-0" aria-controls="simple-tabpanel-0"/>
				<Tab label={signUpCompoNames[1]} id="simple-tab-1" aria-controls="simple-tabpanel-1"/>
			</Tabs>
			<TabPanel value={value} index={0}>
				<SignUpIhave label={signUpCompoNames[0]}/>
			</TabPanel>
			<TabPanel value={value} index={1} >
				<SignUpWho label={signUpCompoNames[1]}/>
			</TabPanel>
		</div>							
	)
}

export default SignUp