import React from 'react'
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'

const Language = ({ l, index, languages, setLanguagesSpoken, languagesSpoken, statesVisited, states }) => {

    const availableLanguages = languages.filter(la => !languagesSpoken.map(l => l.languageName).includes(la))
    const availableStates = states.filter(st => statesVisited.map(s => s.stateName).includes(st))
    const proficiencies = ["Beginner", "Intermediate", "Advanced"]

    return (

        <div>
            <Box>
                <FormControl style={{ width: "225px" }}>
                    <InputLabel>Language</InputLabel>
                    <Select label="Language" value={l.languageName} onChange={(e) => { let data = [...languagesSpoken]; data[index].languageName = e.target.value; setLanguagesSpoken(data); console.log(languagesSpoken) }}>
                        {languages.map(la => {

                            return <MenuItem style={{ display: availableLanguages.includes(la) ? "block" : "none" }} value={la}>{la}</MenuItem>

                        })}
                    </Select>
                </FormControl>
                <FormControl style={{ width: "225px" }}>
                    <InputLabel>Proficiency</InputLabel>
                    <Select label="Proficiency" value={l.proficiency} onChange={(e) => { let data = [...languagesSpoken]; data[index].proficiency = e.target.value; setLanguagesSpoken(data); console.log(languagesSpoken) }}>
                        {proficiencies.map(p => {

                            return <MenuItem value={p}>{p}</MenuItem>

                        })}
                    </Select>
                </FormControl>
                <FormControl style={{ width: "225px" }}>
                    <InputLabel>Learned In State</InputLabel>
                    <Select label="Proficiency" value={l.proficiency} onChange={(e) => { let data = [...languagesSpoken]; data[index].learnedInState = e.target.value; setLanguagesSpoken(data); console.log(languagesSpoken) }}>
                        {states.map(st => {

                            return <MenuItem style={{ display: availableStates.includes(st) ? "block" : "none" }} value={st}>{st}</MenuItem>

                        })}
                    </Select>
                </FormControl>

            </Box>
        </div>

    )
}

export default Language