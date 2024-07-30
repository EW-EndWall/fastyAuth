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
    ...mapGetters(["getId", "getUserName", "getToken"]),
  },
  mounted() {
    this.userAccountData();
  },
  methods: {
    ...mapActions(["accountData"]),

    async userAccountData() {
      try {
        const res = await this.accountData({
          params: {
            id: this.getId,
          },
          data: {
            username: this.getUserName,
            token: this.getToken,
          },
        });

        if (res.status != 200) return (this.message = res.data.message);

        this.username = res.data.username;
        this.firstName = res.data.firstName;
        this.lastName = res.data.lastName;
        this.email = res.data.email;
        this.birthdate = res.data.birthdate;
        this.phone = res.data.phone;
        this.country = res.data.country;
        this.language = res.data.language;
        this.translationLanguage = res.data.translationLanguage;
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
