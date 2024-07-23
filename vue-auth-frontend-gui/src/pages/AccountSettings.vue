<script setup>
import componentElementTitle from "../components/element/ElementTitle.vue";
import componentButton from "../components/element/ElementButton.vue";
import componentElementButtonRouterLink from "../components/element/ElementButtonRouterLink.vue";
import componentInputText from "../components/input/InputText.vue";
import componentInputEmail from "../components/input/InputEmail.vue";
import componentInputDate from "../components/input/InputDate.vue";
import componentInputTel from "../components/input/InputTel.vue";
</script>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AccountSettings",
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
  created() {
    this.usergetAccountData();
  },
  methods: {
    ...mapActions(["getAccountData", "accountUpdate"]),
    ...mapGetters(["getUser,getToken"]),

    async userProfileUpdate() {
      try {
        await this.accountUpdate({
          username: this.username,
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          birthdate: this.birthdate,
          phone: this.phone,
          country: this.country,
          language: this.language,
          translationLanguage: this.translationLanguage,
        });
        if (res.status == 200) this.$router.push("/profile");
        this.message = res.message;
      } catch (error) {
        console.error("Registration error:", error); // * debug
        this.message = "Server error, please try later.";
      }
    },

    async usergetAccountData() {
      try {
        const res = await this.getAccountData({
          username: getUser,
          token: getToken,
        });
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
    <componentElementTitle :textName="'Profile Update'" />
    <div class="my-3 p-2 rounded-md text-center">
      {{ message }}
    </div>
    <form
      @submit.prevent="userProfileUpdate"
      class="flex flex-col w-3/4 mx-auto gap-3"
      v-if="!message"
    >
      <componentInputText
        :textName="'User Name'"
        :idName="'username'"
        :placeholder="username"
      />
      <componentInputText
        :textName="'First Name'"
        :idName="'firstName'"
        :placeholder="firstName"
      />
      <componentInputText
        :textName="'Last Name'"
        :idName="'lastName'"
        :placeholder="lastName"
      />
      <componentInputEmail
        :textName="'Email'"
        :idName="'email'"
        :placeholder="email"
      />
      <componentInputDate
        :textName="'Birthdate'"
        :idName="'birthdate'"
        :placeholder="birthdate"
      />
      <componentInputTel
        :textName="'Phone'"
        :idName="'phone'"
        :placeholder="phone"
      />
      <componentInputText
        :textName="'Country'"
        :idName="'country'"
        :placeholder="country"
      />
      <componentInputText
        :textName="'Language'"
        :idName="'language'"
        :placeholder="language"
      />
      <componentInputText
        :textName="'Translation Language'"
        :idName="'translationLanguage'"
        :placeholder="translationLanguage"
      />
      <div class="flex flex-row gap-3 justify-around mt-4 items-center">
        <span>
          <componentElementButtonRouterLink :url="'../'" :textName="'Back'" />
        </span>
        <span>
          <componentButton :textName="'Save'" />
        </span>
      </div>
    </form>
  </div>
</template>
