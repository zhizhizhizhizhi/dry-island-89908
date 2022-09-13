import React, { useEffect, useState } from "react";
import Teams from './Teams';
import Matches from './Matches';
import {getTeams, getMatches, postTeams, postMatches, deleteAll, processResult} from '../data/data.js';
import Box, { BoxProps } from '@mui/material/Box';
import { Container, maxWidth } from "@mui/system";
import Button from '@mui/material/Button';
import ButtonStack from "./ButtonStack";
import InputField from "./InputField";
import { Card, Grid } from "@mui/material";

function Page() {
    const [teams, setTeams] = useState([]);
    const [qualifiers, setQualifiers] = useState([]);
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
    console.log("after submit: ", input);
    const buttons = [
        <Button color="success" key={0} onClick={() => submitTeams(input)}>Submit teams</Button>,
        <Button color="success" key={1} onClick={() => submitMatches(input)}>Submit matches</Button>,
        <Button key={2} onClick={clearInput}>Clear input</Button>,
        <Button key={3}>Show qualifying teams</Button>,
        <Button color="error" key={4} onClick={handleDelete}>Delete all</Button>,
    ];
    
    useEffect(() => {
        if (shouldUpdate) {
            getTeamsAsArray();
            getMatchesAsArray();
        }
        setShouldUpdate(false);
    });
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
                        <Grid item sx={{m: '5%', width: '13rem', textOverflow: 'clip'}}>{response ? response.message : ''}</Grid>
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
