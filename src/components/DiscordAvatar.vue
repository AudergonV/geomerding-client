<template>
  <img v-if="avatar !== null && avatar !== undefined" class="avatar" :src="`https://cdn.discordapp.com/avatars/${discordid}/${avatar}`" />
  <img v-else class="avatar" :src="`img/avatar_default.png`"/>
</template>
<script>
export default {
  props: {
    avatar: String,
    discordid: String
  }
};
</script>