import { Box, FormControl, Input, InputLabel, MenuItem, Select, Typography } from '@mui/material'
// import { Unstable_NumberInput as NumberInput } from '@mui/base';
import { InputNumber } from 'primereact/inputnumber';
import React from 'react'

import './State.css'

const State = ({ s, index, states, setStatesVisited, statesVisited }) => {

    const availableStates = states.filter(st => !statesVisited.map(s => s.stateName).includes(st))


    return (
        <div>
            <Box style={{ 'paddingTop': "20px", 'marginBottom': '20px', 'backgroundColor': '#dedede', 'height': '300px', 'borderRadius': '10px' }}
                sx={{ ml: { xs: '25px', md: '400px', lg: '450px' }, width: { xs: '350px', md: '400px', lg: '400px' } }}>
                <FormControl style={{ width: "225px" }}>

                    <Typography style={{ 'fontSize': '20px', 'fontWeight': '1000' }}>State</Typography>
                    <Select style={{
                        'backgroundColor': '#dedede',
                        'borderBottom': '2px solid black'
                        // 'border': 'none'
                    }}

                        MenuProps={{
                            autoFocus: false,
                            disableAutoFocusItem: true,
                            disableEnforceFocus: true,
                            disableAutoFocus: true
                        }}
                        value={s.stateName} onChange={(e) => { let data = [...statesVisited]; data[index].stateName = e.target.value; setStatesVisited(data); console.log(statesVisited) }}>
                        {states.map(st => {

                            return <MenuItem style={{ display: availableStates.includes(st) ? "block" : "none" }} value={st}>{st}</MenuItem>

                        })}
                    </Select>

                </FormControl>
                <FormControl style={{ 'paddingTop': '20px' }}>
                    <Typography style={{ 'fontSize': '20px', 'fontWeight': '1000' }}>District</Typography>
                    <Input type='text' value={s.district}

                        classes={{ focused: 'custom-focused-input' }}

                        onChange={(e) => { let data = [...statesVisited]; data[index].district = e.target.value; setStatesVisited(data); console.log(statesVisited) }} />
                </FormControl>


                <Typography style={{ 'paddingTop': '20px', 'color': 'black', 'fontSize': '20px', 'fontWeight': '1000' }}>How long you lived in the state <Typography style={{ 'fontWeight': '300' }}></Typography></Typography>
                {/* <InputLabel >How long you lived in the state (in years)</InputLabel> */}
                <Input type='number' min={0} value={s.durationLived}
                    // showButtons
                    // placeholder='Duration Lived'
                    classes={{ focused: 'custom-focused-input' }}
                    placeholder='in years'
                    onChange={(e) => { let data = [...statesVisited]; data[index].durationLived = e.target.value; setStatesVisited(data); console.log(statesVisited) }} />


            </Box>
        </div>
    )
}

export default State