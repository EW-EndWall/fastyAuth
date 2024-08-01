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
      <div
        class="flex sm:flex-row flex-col justify-between gap-2 sm:border-0 border-y-2 p-2"
      >
        <span> User Name: </span>
        <span>{{ username }}</span>
      </div>
      <div
        class="flex sm:flex-row flex-col justify-between gap-2 sm:border-0 border-y-2 p-2"
      >
        <span> First Name:: </span>
        <span>{{ firstName }}</span>
      </div>
      <div
        class="flex sm:flex-row flex-col justify-between gap-2 sm:border-0 border-y-2 p-2"
      >
        <span> Last Name: </span>
        <span>{{ lastName }}</span>
      </div>
      <div
        class="flex sm:flex-row flex-col justify-between gap-2 sm:border-0 border-y-2 p-2"
      >
        <span> Email: </span>
        <span>{{ email }}</span>
      </div>
      <div
        class="flex sm:flex-row flex-col justify-between gap-2 sm:border-0 border-y-2 p-2"
      >
        <span> Birthdate: </span>
        <span>{{ birthdate }}</span>
      </div>
      <div
        class="flex sm:flex-row flex-col justify-between gap-2 sm:border-0 border-y-2 p-2"
      >
        <span> Phone: </span>
        <span>{{ phone }}</span>
      </div>
      <div
        class="flex sm:flex-row flex-col justify-between gap-2 sm:border-0 border-y-2 p-2"
      >
        <span> Country: </span> <span>{{ country }}</span>
      </div>
      <div
        class="flex sm:flex-row flex-col justify-between gap-2 sm:border-0 border-y-2 p-2"
      >
        <span> Language: </span>
        <span>{{ language }}</span>
      </div>
      <div
        class="flex sm:flex-row flex-col justify-between gap-2 sm:border-0 border-y-2 p-2"
      >
        <span> Translation Language: </span>
        <span>{{ translationLanguage }}</span>
      </div>

      <div
        class="flex sm:flex-row flex-col gap-3 justify-around mt-4 items-center"
      >
        <componentElementButtonRouterLink
          :url="'/account/settings'"
          :textName="'Account settings'"
          :class="'w-full block'"
        />
        <componentElementButtonRouterLink
          :url="'/account/password-settings'"
          :textName="'Password settings'"
          :class="'w-full block'"
        />
      </div>
    </div>
  </div>
</template>
