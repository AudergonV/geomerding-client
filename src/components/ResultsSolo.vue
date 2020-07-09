<template>
    <div id="resultssolo">
        <h3>Podium</h3>
        <h5>{{game.name}}</h5>
        <center><podium :scores="game.scores"/></center>
        <leaderboard :scores="game.scores" />
        <hr>
        <h3>Classement par challenge</h3>
        <result-round v-for="(round,index) in game.rounds" :users="game.users" :key="index" :round="round" :multi="game.multi" :teams="game.teams" :index="index"/>
    </div>
</template>

<script>
import Podium from "@/components/Podium";
import Leaderboard from "@/components/Leaderboard";
import ResultRound from "@/components/ResultRound";

export default {
    props: {
        game: Object
    },
    components: {
        Podium,
        Leaderboard,
        ResultRound
    },
}
</script>