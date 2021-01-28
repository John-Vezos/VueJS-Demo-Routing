<template>
<button @click="saveChanges"> Save </button>
  <ul>
    <user-item v-for="user in users" :key="user.id" :name="user.fullName" :role="user.role"></user-item>
  </ul>
</template>

<script>
import UserItem from '../components/users/UserItem.vue';

export default {
  components: {
    UserItem,
  },
  inject: ['users'],
  data() {
    return {
      changesSaved: false,
    };
  },
  methods: {
    saveChanges() {
      this.changesSaved = true;
    },
  },
  beforeRouteLeave(to, from, next) {
    if ( this.changesSaved ) next();
    else {
      const userWantsToLeave = confirm("Your data is unsaved! Are you sure you want to leave?");
      next(userWantsToLeave);
    }
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>