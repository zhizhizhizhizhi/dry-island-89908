import React from "react";
import BaseTable from './Table';

export default function Teams(props) {
  const headers = ['id', 'team1', 'score1', 'team2', 'score2'];

  return (
    <BaseTable headers={headers} rows={props.filterOption ? props.matches.filter((match) => {return props.filterOption(match);}) : props.matches}/>
  );
}
