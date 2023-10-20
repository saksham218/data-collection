import React from 'react'
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { Radio, RadioGroup, FormControlLabel, FormLabel } from '@mui/material';
import Recorder from './recorders/Recorder';




const Language = ({ l, index, proficiencies, languages, setLanguagesSpoken, languagesSpoken, statesVisited, states, controlledLanguageBlobs, setControlledLanguageBlobs, ownLanguageBlobs, setOwnLanguageBlobs }) => {

    const availableLanguages = languages.filter(la => !languagesSpoken.map(l => l.languageName).includes(la))
    const availableStates = states.filter(st => statesVisited.map(s => s.stateName).includes(st))


    return (

        <div>
            <Box style={{
                'paddingTop': "20px", 'marginBottom': '20px', 'backgroundColor': '#9eecff',
                'height': (index <= 2 && (l.proficiency === proficiencies[2] || l.proficiency === proficiencies[3]) ? '750px' : ((index > 2 || l.proficiency === proficiencies[0]) ? '300px' : '450px')),
                'borderRadius': '10px'
            }}
                sx={{ ml: { xs: '25px', md: '100px', lg: '225px' }, width: { xs: '400px', md: '600px', lg: '800px' } }}>
                <Box>
                    <FormControl style={{ 'width': "225px", 'marginRight': '10px' }}>
                        <Typography style={{ 'fontSize': '20px', 'fontWeight': '1000' }}>Language</Typography>
                        {/* <InputLabel>Language</InputLabel> */}
                        <Select style={{ 'backgroundColor': 'white' }} value={l.languageName} onChange={(e) => { let data = [...languagesSpoken]; data[index].languageName = e.target.value; setLanguagesSpoken(data); console.log(languagesSpoken) }}>
                            {languages.map(la => {

                                return <MenuItem style={{ display: availableLanguages.includes(la) ? "block" : "none" }} value={la}>{la}</MenuItem>

                            })}
                        </Select>
                    </FormControl>
                </Box>
                <Box>
                    <FormControl style={{ 'width': "225px", 'marginRight': '10px' }}>
                        <Typography style={{ 'fontSize': '20px', 'fontWeight': '1000' }}>Learned In State</Typography>
                        {/* <InputLabel>Learned In State</InputLabel> */}
                        <Select style={{ 'backgroundColor': 'white' }} value={l.learnedInState} onChange={(e) => {
                            let data = [...languagesSpoken];
                            data[index].learnedInState = e.target.value; setLanguagesSpoken(data); console.log(languagesSpoken)
                        }}>
                            {states.map(st => {

                                return <MenuItem style={{ display: availableStates.includes(st) ? "block" : "none" }} value={st}>{st}</MenuItem>

                            })}
                        </Select>
                    </FormControl>
                </Box>
                <Box>
                    <FormControl style={{ 'width': "225px" }}>
                        <Typography style={{ 'fontSize': '20px', 'fontWeight': '1000' }}>Proficiency</Typography>
                        {/* <InputLabel>Learned In State</InputLabel> */}
                        {/* <InputLabel>Proficiency</InputLabel> */}
                        <Select style={{ 'backgroundColor': 'white' }} value={l.proficiency} onChange={(e) => {
                            let data = [...languagesSpoken];
                            data[index].proficiency = e.target.value; setLanguagesSpoken(data);
                            console.log(languagesSpoken);
                            if (e.target.value === proficiencies[0]) {
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
                            if (e.target.value === proficiencies[1]) {

                                let d1 = [...controlledLanguageBlobs];
                                d1[index] = null;
                                setControlledLanguageBlobs(d1);
                                console.log(controlledLanguageBlobs);


                            }
                        }}>

                            {proficiencies.map(p => {

                                return <MenuItem value={p}>{p}</MenuItem>

                            })}
                        </Select>
                    </FormControl>
                </Box>


                {/* 

                {(l.proficiency === proficiencies[2] || l.proficiency === proficiencies[3]) ? <Box>
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Comfortable Recording Audio:</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue=""
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
                {/* <FormControlLabel value="Audio" control={<Radio />} label="Yes" />
                            <FormControlLabel value="Neither" control={<Radio />} label="No" />

                        </RadioGroup>
                    </FormControl> */}



                <Recorder language={l.languageName} learnedInState={l.learnedInState} index={index} proficiencies={proficiencies} proficiency={l.proficiency} controlledLanguageBlobs={controlledLanguageBlobs} setControlledLanguageBlobs={setControlledLanguageBlobs} ownLanguageBlobs={ownLanguageBlobs} setOwnLanguageBlobs={setOwnLanguageBlobs} />

            </Box>


        </div>

    )
}

export default Language