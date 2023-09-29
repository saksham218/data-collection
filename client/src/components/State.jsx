import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
// import { Unstable_NumberInput as NumberInput } from '@mui/base';
import { InputNumber } from 'primereact/inputnumber';
import React from 'react'

const State = ({ s, index, states, setStatesVisited, statesVisited }) => {

    const availableStates = states.filter(st => !statesVisited.map(s => s.stateName).includes(st))


    return (
        <div>
            <Box>
                <FormControl style={{ width: "225px" }}>
                    <InputLabel>State</InputLabel>
                    <Select label="State" value={s.stateName} onChange={(e) => { let data = [...statesVisited]; data[index].stateName = e.target.value; setStatesVisited(data); console.log(statesVisited) }}>
                        {states.map(st => {

                            return <MenuItem style={{ display: availableStates.includes(st) ? "block" : "none" }} value={st}>{st}</MenuItem>

                        })}
                    </Select>


                </FormControl>
                <InputNumber min={0} value={s.durationLived}
                    showButtons
                    placeholder='Duration Lived'
                    onChange={(e) => { let data = [...statesVisited]; data[index].durationLived = e.value; setStatesVisited(data); console.log(statesVisited) }} />
            </Box>
        </div>
    )
}

export default State