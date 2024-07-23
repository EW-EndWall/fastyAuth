<script setup>
import componentElementTitle from "../components/element/ElementTitle.vue";
import componentElementButtonRouterLink from "../components/element/ElementButtonRouterLink.vue";
</script>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Account",
  data() {
    return {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      birthdate: "",
      phone: "",
      country: "",
      language: "",
      translationLanguage: "",

      message: "",
    };
  },
  computed: {
    ...mapGetters(["getUser,getToken"]),
  },
  created() {
    this.usergetAccountData();
  },
  methods: {
    ...mapActions(["getAccountData"]),
    async usergetAccountData() {
      try {
        const res = await this.getAccountData({
          username: getUser,
          token: getToken,
        });
        this.message = res.message;
      } catch (error) {
        //console.error("Login error:", error); // * debug
        this.message = "Server error, please try later.";
      }
    },
  },
};
</script>

<template>
  <div
    class="container w-10/12 mx-auto my-3 p-5 text-gray-700 dark:text-gray-400 bg-gray-300 dark:bg-gray-800 rounded-md"
  >
    <componentElementTitle :textName="'Account'" />
    <div class="my-3 p-2 rounded-md text-center">
      {{ message }}
    </div>
    <div class="flex flex-col w-3/4 mx-auto gap-3" v-if="!message">
      <span> User Name: {{ username }} </span>
      <span> First Name:: {{ firstName }} </span>
      <span> Last Name: {{ lastName }} </span>
      <span> Email: {{ email }} </span>
      <span> Birthdate: {{ birthdate }} </span>
      <span> Phone: {{ phone }} </span>
      <span> Country: {{ country }} </span>
      <span> Language: {{ language }} </span>
      <span> Translation Language: {{ translationLanguage }} </span>

      <div class="flex flex-row gap-3 justify-around mt-4 items-center">
        <span>
          <componentElementButtonRouterLink
            :url="'/account/settings'"
            :textName="'Account settings'"
          />
        </span>
      </div>
    </div>
  </div>
</template>
