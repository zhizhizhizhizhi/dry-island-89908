const teamFormat = /^(?<name>\w+) (?<day>\d{1,2})\/(?<month>\d{1,2}) (?<group>\d{1})$/;
const matchFormat = /^(?<team1>\w+) (?<team2>\w+) (?<score1>\d+) (?<score2>\d+)$/;

const parseTeams = (text) => {
    const lines = text.split(`\n`);
    console.log("lines: ", lines);
    const res = [];
    for (const index in lines) {
        if (!lines[index] || lines[index].length == 0) {
            continue;
        }
        const matches = lines[index].match(teamFormat);
        console.log("line: ", lines[index]);
        console.log(matches);
        if (!matches || matches.length == 0) {
            throw Error(`Could not parse line ${index}`, 
            {cause: {line: lines[index], 
                index: index, 
                message: `Could not parse '${lines[index]}' in line ${index}`}});        }
        if (parseInt(matches.groups.day) <= 0 || parseInt(matches.groups.day) > 31 
            || parseInt(matches.groups.month) <= 0 || parseInt(matches.groups.month) > 12) {
                throw Error(`Could not parse line ${index}`, 
                {cause: {line: lines[index], 
                    index: index, 
                    message: `Could not parse '${lines[index]}' in line ${index}:\nInvalid DD/MM`}});
        }
        if (parseInt(matches.groups.group) <= 0 || parseInt(matches.groups.group) > 2) {
            throw Error(`Could not parse line ${index}`, 
                {cause: {line: lines[index], 
                    index: index, 
                    message: `Could not parse '${lines[index]}' in line ${index}:\nOnly group numbers 1 and 2 are allowed`}});
        }
        res.push({
            "name": matches.groups.name, 
            "day": parseInt(matches.groups.day), 
            "month": parseInt(matches.groups.month), 
            "group": parseInt(matches.groups.group)
        });
    }
    return res;
}

const parseMatches = (text) => {
    const lines = text.split(`\n`);
    console.log("lines: ", lines);
    const res = [];
    for (const index in lines) {
        if (!lines[index] || lines[index].length == 0) {
            res.push({});
            continue;
        }
        const matches = lines[index].match(matchFormat);
        if (!matches || matches.length == 0) {
            throw Error(`Could not parse line ${index}`, 
            {cause: {line: lines[index], 
                index: index, 
                message: `Could not parse '${lines[index]}' in line ${index}`}});
        }
        if (matches.groups.team1 == matches.groups.team2) {
            throw Error(`The two teams in the match should be different`, 
            {cause: {line: lines[index], 
                index: index,
                message: `Could not parse '${lines[index]}' in line ${index}:\nThe two teams in the match should be different`}});
        }
        res.push({
            "team1": matches.groups.team1, 
            "team2": matches.groups.team2, 
            "score1": parseInt(matches.groups.score1), 
            "score2": parseInt(matches.groups.score2)
        });
    }
    return res;
}

module.exports = {
    parseTeams,
    parseMatches
}