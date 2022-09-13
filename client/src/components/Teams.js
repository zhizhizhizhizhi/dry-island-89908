import React from "react";
import BaseTable from './Table';

export default function Teams(props) {
  const headers = ['rank', 'name', 'month', 'day', 'group', 'points', 'goals', 'alt_points'];

  const getTeams = (filterOption, teams) => {
    let result = teams;
    if (filterOption) {
        result = result.filter((team) => {return props.filterOption(team);});
    }
    result = result.map((team, index) => {team.rank = index + 1; return team;});
    return result;
  }

  return (
    <BaseTable headers={headers} rows={getTeams(props.filterOption, props.teams)}/>
  );
}
