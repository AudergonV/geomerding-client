<template>
  <div id="podium">
    <table class="podiumroot">
      <tr>
        <td>
          <table>
            <tr class="podiumplace">
              <div v-for="team of third" :key="team._id" :class="team.color">
                &nbsp;{{team.name}}
              </div>
            </tr>
            <tr class="podiumpart">
              <td>
                <img src="img/podium_3.png" />
              </td>
            </tr>
          </table>
        </td>
        <td>
          <table>
            <tr class="podiumplace">
              <div v-for="team of first" :key="team._id" :class="team.color">
                &nbsp;{{team.name}}
              </div>
            </tr>
            <tr class="podiumpart">
              <td>
                <img src="img/podium_1.png" />
              </td>
            </tr>
          </table>
        </td>
        <td>
          <table>
            <tr class="podiumplace">
              <div v-for="team of second" :key="team._id" :class="team.color">
                &nbsp;{{team.name}}
              </div>
            </tr>
            <tr class="podiumpart">
              <td>
                <img src="img/podium_2.png" />
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>

export default {
  props: {
    teams: Array
  },
  computed: {
    first() {
      if (this.teams) {
        return this.teams.filter(team => {
          return team.score.position === 1;
        });
      } else {
        return [];
      }
    },
    second() {
      if (this.teams) {
        return this.teams.filter(team => {
          return team.score.position === 2;
        });
      } else {
        return [];
      }
    },
    third() {
      if (this.teams) {
        return this.teams.filter(team => {
          return team.score.position === 3;
        });
      } else {
        return [];
      }
    }
  },
};
</script>