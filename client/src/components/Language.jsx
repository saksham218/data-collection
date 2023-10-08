import React from 'react'
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { Radio, RadioGroup, FormControlLabel, FormLabel } from '@mui/material';
import Recorder from './recorders/Recorder';




const Language = ({ l, index, languages, setLanguagesSpoken, languagesSpoken, statesVisited, states, controlledLanguageBlobs, setControlledLanguageBlobs, ownLanguageBlobs, setOwnLanguageBlobs }) => {

    const availableLanguages = languages.filter(la => !languagesSpoken.map(l => l.languageName).includes(la))
    const availableStates = states.filter(st => statesVisited.map(s => s.stateName).includes(st))
    const proficiencies = ["Cannot speak but understand only", "Can speak only", "Can speak and read only", "Can speak, read and write"]

    return (

        <div>
            <Box style={{ padding: "20px" }}>
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
                        if (e.target.value === proficiencies[0] || e.target.value === proficiencies[1]) {
                            data[index].mode = "";
                            let d1 = [...controlledLanguageBlobs];
                            d1[index] = null;
                            setControlledLanguageBlobs(d1);
                            console.log(controlledLanguageBlobs);

                            let d2 = [...ownLanguageBlobs];
                            d2[index] = null;
                            setOwnLanguageBlobs(d2);
                            console.log(ownLanguageBlobs);
                        }
                    }}>
                        {proficiencies.map(p => {

                            return <MenuItem value={p}>{p}</MenuItem>

                        })}
                    </Select>
                </FormControl>
                <FormControl style={{ width: "225px" }}>
                    <InputLabel>Learned In State</InputLabel>
                    <Select label="Learned In State" value={l.learnedInState} onChange={(e) => {
                        let data = [...languagesSpoken];
                        data[index].learnedInState = e.target.value; setLanguagesSpoken(data); console.log(languagesSpoken)
                    }}>
                        {states.map(st => {

                            return <MenuItem style={{ display: availableStates.includes(st) ? "block" : "none" }} value={st}>{st}</MenuItem>

                        })}
                    </Select>
                </FormControl>



                {(l.proficiency === proficiencies[2] || l.proficiency === proficiencies[3]) ? <Box>
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Comfortable Recording Audio:</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                            onChange={(e) => {
                                let data = [...languagesSpoken];
                                data[index].mode = e.target.value;
                                setLanguagesSpoken(data);
                                console.log(languagesSpoken);
                                let d1 = [...controlledLanguageBlobs];
                                d1[index] = null;
                                setControlledLanguageBlobs(d1);
                                console.log(controlledLanguageBlobs);

                                let d2 = [...ownLanguageBlobs];
                                d2[index] = null;
                                setOwnLanguageBlobs(d2);
                                console.log(ownLanguageBlobs);
                            }}>
                            {/* <FormControlLabel value="Video" control={<Radio />} label="Video" /> */}
                            <FormControlLabel value="Audio" control={<Radio />} label="Yes" />
                            <FormControlLabel value="Neither" control={<Radio />} label="No" />

                        </RadioGroup>
                    </FormControl>
                    <Recorder mode={l.mode} index={index} controlledLanguageBlobs={controlledLanguageBlobs} setControlledLanguageBlobs={setControlledLanguageBlobs} ownLanguageBlobs={ownLanguageBlobs} setOwnLanguageBlobs={setOwnLanguageBlobs} /></Box> : null}

            </Box>
        </div>

    )
}

export default Language