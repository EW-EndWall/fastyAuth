<script setup>
import componentElementTitle from "../components/element/ElementTitle.vue";
import componentButton from "../components/element/ElementButton.vue";
import componentElementButtonRouterLink from "../components/element/ElementButtonRouterLink.vue";
import componentInputText from "../components/input/InputText.vue";
import componentInputPassword from "../components/input/InputPassword.vue";
import componentInputEmail from "../components/input/InputEmail.vue";
import componentInputDate from "../components/input/InputDate.vue";
import componentInputTel from "../components/input/InputTel.vue";
</script>

<script>
import { mapActions } from "vuex";

export default {
  name: "Register",
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
      password: "",

      message: "",
    };
  },
  methods: {
    ...mapActions(["register"]),
    async userRegister() {
      try {
        const res = await this.register({
          username: this.username,
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          birthdate: this.birthdate,
          phone: this.phone,
          country: this.country,
          language: this.language,
          translationLanguage: this.translationLanguage,
          password: this.password,
        });
        if (res.status == 200) this.$router.push("/");
        this.message = res.message;
      } catch (error) {
        // console.error("Registration error:", error); // * debug
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
    <componentElementTitle :textName="'Register'" />
    <div class="my-3 p-2 rounded-md text-center">
      {{ message }}
    </div>
    <form
      @submit.prevent="userRegister"
      class="flex flex-col w-3/4 mx-auto gap-3"
    >
      <componentInputText
        :textName="'User Name'"
        :idName="'username'"
        :placeholder="'nick'"
      />
      <componentInputPassword :textName="'Password'" />
      <componentInputText
        :textName="'First Name'"
        :idName="'firstName'"
        :placeholder="'name'"
      />
      <componentInputText
        :textName="'Last Name'"
        :idName="'lastName'"
        :placeholder="'last name'"
      />
      <componentInputEmail
        :textName="'Email'"
        :idName="'email'"
        :placeholder="'name@example.com'"
      />
      <componentInputDate
        :textName="'Birthdate'"
        :idName="'birthdate'"
        :placeholder="'01.01.1111'"
      />
      <componentInputTel
        :textName="'Phone'"
        :idName="'phone'"
        :placeholder="'1 (234) 567-890'"
      />
      <componentInputText
        :textName="'Country'"
        :idName="'country'"
        :placeholder="'ABD'"
      />
      <componentInputText
        :textName="'Language'"
        :idName="'language'"
        :placeholder="'EN'"
      />
      <componentInputText
        :textName="'Translation Language'"
        :idName="'translationLanguage'"
        :placeholder="'EN'"
      />
      <div class="flex flex-row gap-3 justify-around mt-4 items-center">
        <span>
          <componentButton :textName="'Register'" />
        </span>
        <span>
          <componentElementButtonRouterLink
            :url="'/auth/login'"
            :textName="'Login'"
          />
        </span>
      </div>
    </form>
  </div>
</template>
