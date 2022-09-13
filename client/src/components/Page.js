import React, { useEffect, useState } from "react";
import Teams from './Teams';
import Matches from './Matches';
import {getTeams, getMatches, postTeams, postMatches, deleteAll, processResult} from '../data/data.js';
import Box, { BoxProps } from '@mui/material/Box';
import { Container } from "@mui/system";
import Button from '@mui/material/Button';
import ButtonStack from "./ButtonStack";
import InputField from "./InputField";
import { Grid } from "@mui/material";
import BaseTable from "./Table";

function Page() {
    const [teams, setTeams] = useState([]);
    const [matches, setMatches] = useState([]);
    const [shouldUpdate, setShouldUpdate] = useState(true);
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');

    const getTeamsAsArray = async function() {
        const teams = await getTeams();
        setTeams(teams);
    }
    const getMatchesAsArray = async function() {
        const matches = await getMatches();
        setMatches(matches);
    }
    const submitTeams = async function(data) {
        const response = await postTeams(data);
        setResponse(processResult(response));
        setShouldUpdate(true);
    }
    const submitMatches = async function(data) {
        const response = await postMatches(data);
        setResponse(processResult(response));
        setShouldUpdate(true);
    }
    const handleDelete = async function() {
        const response = await deleteAll();
        setResponse(processResult(response));
        setShouldUpdate(true);
    }
    const handleInputChange = (newInput) => {
        setInput(newInput);
    }
    const clearInput = () => {
        handleInputChange('');
        setResponse('');
    }
    const showTopTeams = () => {
        const team1 = teams.filter((team) => {return team.group == 1;});
        const fromTeam1 = [];
        let response = '';
        for (let i = 0; i < 4 && i < team1.length; i++) {
            response += team1[i].name + '(Group 1) ';
        }
        const team2 = teams.filter((team) => {return team.group == 2;});
        const fromTeam2 = [];
        response += '\n'
        for (let i = 0; i < 4 && i < team2.length; i++) {
            response += team2[i].name + '(Group 2) ';
        }
        setResponse({status: 200, message: response});
    }
    // console.log("after submit: ", input);
    const buttons = [
        <Button color="success" key={0} onClick={() => submitTeams(input)}>Submit teams</Button>,
        <Button color="success" key={1} onClick={() => submitMatches(input)}>Submit matches</Button>,
        <Button key={2} onClick={clearInput}>Clear input</Button>,
        <Button key={3} onClick={showTopTeams}>Show qualifying teams</Button>,
        <Button color="error" key={4} onClick={handleDelete}>Delete all</Button>,
    ];
    
    useEffect(() => {
        if (shouldUpdate) {
            getTeamsAsArray();
            getMatchesAsArray();
        }
        setShouldUpdate(false);
    });
    console.log("response in page: ", response);
    return (
        <div class="p-5">
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'spaced-evenly',
                rowGap: 2,
                m: '5%'
                }}>
                <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'spaced-between',
                width: 0.8,
                }}>
                    <InputField sx={{ width: '75%' }} value={input} onChange={handleInputChange}/>
                    <Box class="d-flex flex-col" sx={{ width: '25%' }}>
                        <ButtonStack buttons={buttons}/>
                        <Grid item sx={{m: '5%', width: '13rem', textOverflow: 'clip'}}> 
                        {
                            response ? 
                            <p style={(response.status == 200) ? {color: '#4CAF50'} : {color: '#E97451'}}>
                                {response.status == 200 ? response.message : 'Error: ' + response.message}
                            </p>
                            : <p/>
                        }
                        </Grid>
                    </Box>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'spaced-between',
                    }}>
                    <Container>Group 1 Teams</Container>
                    <Container>Group 2 Teams</Container>             
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    columnGap: 3,
                    justifyContent: 'spaced-evenly',
                    }}>
                    <Teams filterOption={(team) => {return team.group == 1;}} teams={teams}/>
                    <Teams filterOption={(team) => {return team.group == 2;}} teams={teams}/>
                </Box>
                <span class="p-5"/>
                <Container>Matches</Container>
                <Matches matches={matches}/>
            </Box>
        </div>
    );
}

export default Page;
