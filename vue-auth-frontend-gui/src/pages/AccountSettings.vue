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

      newUsername: "",
      newFirstName: "",
      newLastName: "",
      newEmail: "",
      newBirthdate: "",
      newPhone: "",
      newCountry: "",
      newLanguage: "",
      newTranslationLanguage: "",

      message: "",
    };
  },
  computed: {
    ...mapGetters(["getUser", "getToken"]),
  },
  mounted() {
    this.userAccountData();
  },
  methods: {
    ...mapActions(["accountData", "accountUpdate"]),

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
        this.message = res.data.message;
      } catch (error) {
        //console.error("Registration error:", error); // * debug
        this.message = "Server error, please try later.";
      }
    },

    async userAccountData() {
      try {
        const res = await this.accountData({
          username: this.getUser,
          token: this.getToken,
        });
        if (res.message != undefined) this.message = res.data.message;

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
        :required="false"
        :placeholder="username"
        v-model:valueData="newUsername"
      />
      <componentInputText
        :textName="'First Name'"
        :idName="'firstName'"
        :required="false"
        :placeholder="firstName"
        v-model:valueData="newFirstName"
      />
      <componentInputText
        :textName="'Last Name'"
        :idName="'lastName'"
        :required="false"
        :placeholder="lastName"
        v-model:valueData="newLastName"
      />
      <componentInputEmail
        :textName="'Email'"
        :idName="'email'"
        :required="false"
        :placeholder="email"
        v-model:valueData="newEmail"
      />
      <componentInputDate
        :textName="'Birthdate'"
        :idName="'birthdate'"
        :required="false"
        :placeholder="birthdate"
        v-model:valueData="newBirthdate"
      />
      <componentInputTel
        :textName="'Phone'"
        :idName="'phone'"
        :required="false"
        :placeholder="phone"
        v-model:valueData="newPhone"
      />
      <componentInputText
        :textName="'Country'"
        :idName="'country'"
        :required="false"
        :placeholder="country"
        v-model:valueData="newCountry"
      />
      <componentInputText
        :textName="'Language'"
        :idName="'language'"
        :required="false"
        :placeholder="language"
        v-model:valueData="newLanguage"
      />
      <componentInputText
        :textName="'Translation Language'"
        :idName="'translationLanguage'"
        :required="false"
        :placeholder="translationLanguage"
        v-model:valueData="newTranslationLanguage"
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
