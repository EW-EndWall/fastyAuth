<script setup>
import componentElementTitle from "../components/element/ElementTitle.vue";
import componentButton from "../components/element/ElementButton.vue";
import componentElementButtonRouterLink from "../components/element/ElementButtonRouterLink.vue";
import componentInputText from "../components/input/InputText.vue";
import componentInputPassword from "../components/input/InputPassword.vue";
import componentInputEmail from "../components/input/InputEmail.vue";
import componentInputDate from "../components/input/InputDate.vue";
import componentInputTel from "../components/input/InputTel.vue";
import componentSelectOption from "../components/input/SelectOption.vue";
</script>

<script>
import { mapActions } from "vuex";

export default {
  name: "Register",
  data() {
    return {
      username: "",
      password: "",

      contact: {
        email: "",
        phone: "",
      },
      details: {
        firstName: "",
        lastName: "",
        birthdate: "",
        country: "",
        language: "",
        translationLanguage: "",
      },

      messages: "",
    };
  },
  methods: {
    ...mapActions(["register"]),
    async userRegister() {
      try {
        const res = await this.register({
          data: {
            username: this.username,
            password: this.password,
            contact: {
              email: this.contact.email,
              phone: this.contact.phone,
            },
            details: {
              firstName: this.details.firstName,
              lastName: this.details.lastName,
              birthdate: this.details.birthdate,
              country: this.details.country,
              language: this.details.language,
              translationLanguage: this.details.translationLanguage,
            },
          },
        });

        this.messages = res?.message || res?.data.message;

        if (res.status == 201)
          setTimeout(() => {
            this.$router.push("/");
          }, 1500);
      } catch (error) {
        // console.error(`Component "${this.$options.name}" error:`, error); // * debug
        this.messages = ["Server error, please try laterr."];
      }
    },
  },
};
</script>

<template>
  <div
    class="container w-10/12 mx-auto my-3 p-5 text-gray-700 dark:text-gray-400 bg-gray-300 dark:bg-gray-800 rounded-md"
  >
    <componentElementTitle :textName="t('page.register.title')" />
    <div class="my-3 p-2 rounded-md text-center">
      <ul v-for="(item, index) in messages" :key="index">
        <li>
          {{ item }}
        </li>
      </ul>
    </div>
    <form
      @submit.prevent="userRegister"
      class="flex flex-col w-3/4 mx-auto gap-3"
    >
      <componentInputText
        :textName="t('page.register.input.userName')"
        :idName="'username'"
        :required="true"
        :placeholder="'nick'"
        v-model:valueData="username"
      />
      <componentInputPassword
        :textName="t('page.register.input.password')"
        :required="true"
        v-model:valueData="password"
      />
      <componentInputEmail
        :textName="t('page.register.input.email')"
        :idName="'email'"
        :required="true"
        :placeholder="'name@example.com'"
        v-model:valueData="contact.email"
      />
      <componentInputTel
        :textName="t('page.register.input.phone')"
        :idName="'phone'"
        :required="true"
        :placeholder="'1 (234) 567-890'"
        v-model:valueData="contact.phone"
      />
      <componentInputText
        :textName="t('page.register.input.firstName')"
        :idName="'firstName'"
        :required="true"
        :placeholder="'name'"
        v-model:valueData="details.firstName"
      />
      <componentInputText
        :textName="t('page.register.input.lastName')"
        :idName="'lastName'"
        :required="true"
        :placeholder="'last name'"
        v-model:valueData="details.lastName"
      />
      <componentInputDate
        :textName="t('page.register.input.birthdate')"
        :idName="'birthdate'"
        :required="true"
        :placeholder="'01.01.1111'"
        v-model:valueData="details.birthdate"
      />
      <componentInputText
        :textName="t('page.register.input.country')"
        :idName="'country'"
        :required="true"
        :placeholder="'ABD'"
        v-model:valueData="details.country"
      />
      <componentSelectOption
        :textName="t('page.register.input.language')"
        :idName="'language'"
        :required="true"
        :selectValue="[
          ['EN_en', 'EN'],
          ['TR_tr', 'TR'],
        ]"
        v-model:valueData="details.language"
      />
      <componentSelectOption
        :textName="t('page.register.input.translationLanguage')"
        :idName="'translationLanguage'"
        :required="true"
        :selectValue="[
          ['EN_en', 'EN'],
          ['TR_tr', 'TR'],
        ]"
        v-model:valueData="details.translationLanguage"
      />
      <div class="flex flex-row gap-3 justify-around mt-4 items-center">
        <span>
          <componentButton :textName="t('page.register.button.register')" />
        </span>
        <span>
          <componentElementButtonRouterLink
            :textName="t('page.register.button.login')"
            :url="'/auth/login'"
          />
        </span>
      </div>
    </form>
  </div>
</template>
