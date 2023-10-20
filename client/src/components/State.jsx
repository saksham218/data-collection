import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
// import { Unstable_NumberInput as NumberInput } from '@mui/base';
import { InputNumber } from 'primereact/inputnumber';
import React from 'react'

const State = ({ s, index, states, setStatesVisited, statesVisited }) => {

    const availableStates = states.filter(st => !statesVisited.map(s => s.stateName).includes(st))


    return (
        <div>
            <Box style={{ 'paddingTop': "20px", 'marginBottom': '20px', 'marginLeft': '450px', 'backgroundColor': '#9eecff', 'width': '400px', 'height': '250px', 'borderRadius': '10px' }}>
                <FormControl style={{ width: "225px" }}>

                    <Typography style={{ 'fontSize': '20px', 'fontWeight': '1000' }}>State</Typography>
                    <Select style={{ 'backgroundColor': 'white', 'borderColor': 'black' }} value={s.stateName} onChange={(e) => { let data = [...statesVisited]; data[index].stateName = e.target.value; setStatesVisited(data); console.log(statesVisited) }}>
                        {states.map(st => {

                            return <MenuItem style={{ display: availableStates.includes(st) ? "block" : "none" }} value={st}>{st}</MenuItem>

                        })}
                    </Select>

                </FormControl>

                <Typography style={{ 'paddingTop': '20px', 'color': 'black', 'fontSize': '20px', 'fontWeight': '1000' }}>How long you lived in the state <Typography style={{ 'fontWeight': '300' }}>(in years)</Typography></Typography>
                {/* <InputLabel >How long you lived in the state (in years)</InputLabel> */}
                <InputNumber min={0} value={s.durationLived}
                    showButtons
                    // placeholder='Duration Lived'
                    onChange={(e) => { let data = [...statesVisited]; data[index].durationLived = e.value; setStatesVisited(data); console.log(statesVisited) }} />


            </Box>
        </div>
    )
}

export default State