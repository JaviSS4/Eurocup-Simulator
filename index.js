import teams from "./teams.js";

// Importamos el array de objetos de equipos y añadimos una función para randomizar arrays

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
};

// Jugar octavos y conseguir las posiciones Q
let winnerArray = ""
const positionPlay = function (team1, team2, j) {
    const goals = [0, 1, 2, 3, 4, 5];
    while (team1.goals_match === team2.goals_match) {
        shuffleArray(goals);
        team1.goals_match = goals[0];
        shuffleArray(goals);
        team2.goals_match = goals[0];
    }
    if (team1.goals_match > team2.goals_match) {
        team1.status = "winner"
        team2.status = "loser"
        team1.position = "Q" + j
        winnerArray = team1.name
    }
    else {
        team2.status = "winner"
        team1.status = "loser"
        team2.position = "Q" + j
        winnerArray = team2.name
    }
    console.log(`${team1.name} ${team1.goals_match} - ${team2.goals_match} ${team2.name} => ${winnerArray}`)

}

// Jugar cualquier otro partido
const play = function (team1, team2) {
    const goals = [0, 1, 2, 3, 4, 5];
    while (team1.goals_match === team2.goals_match) {
        shuffleArray(goals);
        team1.goals_match = goals[0];
        shuffleArray(goals);
        team2.goals_match = goals[0];
    }
    if (team1.goals_match > team2.goals_match) {
        team1.status = "winner"
        team2.status = "loser"
        winnerArray = team1.name
    }
    else {
        team2.status = "winner"
        team1.status = "loser"
        winnerArray = team2.name
    }
    console.log(`${team1.name} ${team1.goals_match} - ${team2.goals_match} ${team2.name} => ${winnerArray}`)

}

// El programa comenzará indicando con un mensaje que “comienza el torneo”.
// El programa deberá mostrar los 16 equipos participantes en la fase de eliminatorias(play
// off).
// Randomizamos los equipos que jugarán el playoff y los mostramos por pantalla
console.log(`¡Comieza la Eurocopa!`);
console.log(`Los equipos que participarán son:`);
shuffleArray(teams);
teams.forEach((teamName) => {
    console.log("-", teamName.name)
})


console.log()
console.log("===============================================")
console.log(`==== COMIENZO DE LA FASE DE ELIMINATORIAS =====`);
console.log("===============================================")
/* A continuación se deberán mostrar los resultados de los partidos en las diferentes rondas
    (octavos de final, cuartos de final y semifinales), indicando qué equipos se clasifican para
la siguiente ronda(esto se mostrará desde octavos de final hasta semifinales).
 */
console.log()
console.log("===== OCTAVOS DE FINAL =====")
console.log()


// Llamamos al primer tipo de ronda, en la que juegan y posicionan la Q del torneo
for (let i = 0, j = 1; i < teams.length; i = i + 2, j++) {
    positionPlay(teams[i], teams[i + 1], j);
}

// Ahora metemos a los ganadores en un nuevo array de objetos para la siguiente ronda
const eightTeams = teams.filter(team => team.status === "winner")


console.log()
console.log("===== CUARTOS DE FINAL =====")
console.log()

// A partir de aquí todos los partidos son normales, aunque tienen en cuenta el orden
// Q8 vs Q1 etc.
for (let i = 0, j = eightTeams.length - 1; i < eightTeams.length / 2; i++, j--) {
    play(eightTeams[i], eightTeams[j]);
}

const fourTeams = eightTeams.filter(team => team.status === "winner")

console.log()
console.log("===== SEMIFINALES =====")
console.log()

for (let i = 0; i < fourTeams.length; i = i + 2) {
    play(fourTeams[i], fourTeams[i + 1]);
}

const twoTeams = fourTeams.filter(team => team.status === "loser")
const finalTeams = fourTeams.filter(team => team.status === "winner")

// Opcional: Una vez finalizadas las semifinales, se mostrará el resultado del partido de
// tercer y cuarto puesto(que se juega entre equipos no clasificados para la final).

console.log()
console.log("===== TERCER Y CUARTO PUESTO =====")
console.log()

play(twoTeams[0], twoTeams[1]);

// Tras esto, se mostrará el resultado del partido de la final, anunciando posteriormente el
// equipo ganador como campeón del mundo.

console.log()
console.log("===== FINAL =====")
console.log()

play(finalTeams[0], finalTeams[1]);

const winnerTeam = finalTeams.filter(team => team.status === "winner")

console.log()
console.log("==========================================")
console.log(`¡Y el ganador de este año es ${winnerTeam[0].name}!`)
console.log("===========================================")
