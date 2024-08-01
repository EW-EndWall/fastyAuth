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
          data: {
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
          },
        });

        this.message = res?.data?.message;

        setTimeout(() => {
          if (res.status == 200) this.$router.push("/");
        }, 1500);
      } catch (error) {
        // console.error(`Component "${this.$options.name}" error:`, error); // * debug
        this.message = "Server error, please try laterr.";
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
        :required="true"
        :placeholder="'nick'"
        v-model:valueData="username"
      />
      <componentInputPassword
        :textName="'Password'"
        :required="true"
        v-model:valueData="password"
      />
      <componentInputText
        :textName="'First Name'"
        :idName="'firstName'"
        :required="true"
        :placeholder="'name'"
        v-model:valueData="firstName"
      />
      <componentInputText
        :textName="'Last Name'"
        :idName="'lastName'"
        :required="true"
        :placeholder="'last name'"
        v-model:valueData="lastName"
      />
      <componentInputEmail
        :textName="'Email'"
        :idName="'email'"
        :required="true"
        :placeholder="'name@example.com'"
        v-model:valueData="email"
      />
      <componentInputDate
        :textName="'Birthdate'"
        :idName="'birthdate'"
        :required="true"
        :placeholder="'01.01.1111'"
        v-model:valueData="birthdate"
      />
      <componentInputTel
        :textName="'Phone'"
        :idName="'phone'"
        :required="true"
        :placeholder="'1 (234) 567-890'"
        v-model:valueData="phone"
      />
      <componentInputText
        :textName="'Country'"
        :idName="'country'"
        :required="true"
        :placeholder="'ABD'"
        v-model:valueData="country"
      />
      <componentInputText
        :textName="'Language'"
        :idName="'language'"
        :required="true"
        :placeholder="'EN'"
        v-model:valueData="language"
      />
      <componentInputText
        :textName="'Translation Language'"
        :idName="'translationLanguage'"
        :required="true"
        :placeholder="'EN'"
        v-model:valueData="translationLanguage"
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
