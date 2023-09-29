import React from 'react'
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { Radio, RadioGroup, FormControlLabel, FormLabel } from '@mui/material';
import Recorder from './recorders/Recorder';




const Language = ({ l, index, languages, setLanguagesSpoken, languagesSpoken, statesVisited, states, languageBlobs, setLanguageBlobs }) => {

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
                    <Select label="Proficiency" value={l.proficiency} onChange={(e) => {
                        let data = [...languagesSpoken];
                        data[index].proficiency = e.target.value; setLanguagesSpoken(data);
                        console.log(languagesSpoken);
                        if (e.target.value === "Beginner") {
                            data[index].mode = "";
                            let d = [...languageBlobs];
                            d[index] = null;
                            setLanguageBlobs(d);
                            console.log(languageBlobs);
                        }
                    }}>
                        {proficiencies.map(p => {

                            return <MenuItem value={p}>{p}</MenuItem>

                        })}
                    </Select>
                </FormControl>
                <FormControl style={{ width: "225px" }}>
                    <InputLabel>Learned In State</InputLabel>
                    <Select label="Proficiency" value={l.learnedInState} onChange={(e) => {
                        let data = [...languagesSpoken];
                        data[index].learnedInState = e.target.value; setLanguagesSpoken(data); console.log(languagesSpoken)
                    }}>
                        {states.map(st => {

                            return <MenuItem style={{ display: availableStates.includes(st) ? "block" : "none" }} value={st}>{st}</MenuItem>

                        })}
                    </Select>
                </FormControl>



                {(l.proficiency === "Intermediate" || l.proficiency === "Advanced") ? <Box>
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Comfortable Recording:</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                            onChange={(e) => {
                                let data = [...languagesSpoken];
                                data[index].mode = e.target.value;
                                setLanguagesSpoken(data);
                                console.log(languagesSpoken);
                                let d = [...languageBlobs];
                                d[index] = null;
                                setLanguageBlobs(d);
                                console.log(languageBlobs);
                            }}>
                            <FormControlLabel value="Video" control={<Radio />} label="Video" />
                            <FormControlLabel value="Audio" control={<Radio />} label="Audio" />
                            <FormControlLabel value="Neither" control={<Radio />} label="Neither" />

                        </RadioGroup>
                    </FormControl>
                    <Recorder mode={l.mode} index={index} languageBlobs={languageBlobs} setLanguageBlobs={setLanguageBlobs} /></Box> : null}

            </Box>
        </div>

    )
}

export default Language