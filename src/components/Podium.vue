<template>
  <div id="podium">
    <table class="podiumroot">
      <tr>
        <td>
          <table>
            <tr class="podiumplace">
              <div v-for="score of third" :key="score._id">
                <discord-avatar :discordid="score.user.discordid" :avatar="score.user.avatar"/>
                &nbsp;{{score.user.username}}
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
              <div v-for="score of first" :key="score._id">
                <discord-avatar :discordid="score.user.discordid" :avatar="score.user.avatar" />
                &nbsp;{{score.user.username}}
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
              <div v-for="score of second" :key="score._id">
                <discord-avatar :discordid="score.user.discordid" :avatar="score.user.avatar"/>
                &nbsp;{{score.user.username}}
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
import DiscordAvatar from "@/components/DiscordAvatar";

export default {
  props: {
    scores: Array
  },
  components: {
    DiscordAvatar
  },
  computed: {
    first() {
      if (this.scores) {
        return this.scores.filter(score => {
          return score.position === 1;
        });
      } else {
        return [];
      }
    },
    second() {
      if (this.scores) {
        return this.scores.filter(score => {
          return score.position === 2;
        });
      } else {
        return [];
      }
    },
    third() {
      if (this.scores) {
        return this.scores.filter(score => {
          return score.position === 3;
        });
      } else {
        return [];
      }
    }
  },
};
</script>