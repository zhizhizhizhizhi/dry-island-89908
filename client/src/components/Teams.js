import React, { useEffect, useState } from "react";
import BaseTable from './Table';
import {getTeams} from '../data/data.js';

export default function Teams(props) {
  const [teams, setTeams] = useState([]);
  const headers = ['name', 'month', 'day', 'group', 'score'];

  const getTeamsAsArray = async function() {
    let teams = await getTeams()
    teams = teams.filter((team) => {return props.filterOption(team);})
    setTeams(teams);
  }
  useEffect(() => {
    if (teams.length == 0) {
        getTeamsAsArray();
    }
  });

  return (
    <BaseTable headers={headers} rows={teams}/>
  );
}
