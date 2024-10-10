<script setup>
import componentElementTitle from "../components/element/ElementTitle.vue";
import componentButton from "../components/element/ElementButton.vue";
import componentElementButtonRouterLink from "../components/element/ElementButtonRouterLink.vue";
import componentElementButtonRouterLinkMini from "../components/element/ElementButtonRouterLinkMini.vue";
import componentInputText from "../components/input/InputText.vue";
import componentInputPassword from "../components/input/InputPassword.vue";
import componentInputCheckbox from "../components/input/InputCheckbox.vue";
</script>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      rememberMe: false,

      messages: "",
    };
  },
  methods: {
    ...mapActions(["login"]),
    async userLogin() {
      try {
        const res = await this.login({
          data: {
            username: this.username,
            password: this.password,
            rememberMe: this.rememberMe,
          },
        });

        this.messages = res?.message || res?.data.message;

        if (res.status == 200)
          setTimeout(() => {
            this.$router.push("/account");
          }, 1500);
      } catch (error) {
        // console.error(`Component "${this.$options.name}" error:`, error); // * debug
        this.messages = ["Server error, please try later."];
      }
    },
  },
};
</script>

<template>
  <div
    class="container w-10/12 mx-auto my-3 p-5 text-gray-700 dark:text-gray-400 bg-gray-300 dark:bg-gray-800 rounded-md"
  >
    <div class="grid grid-cols-1 sm:grid-cols-5 gap-3">
      <div class="sm:col-span-3 flex justify-center items-center">
        <div>
          <img
            src="/src/assets/logo/login-logo-bg.svg"
            alt="logo"
            class="w-full h-full3 m-auto"
          />
        </div>
      </div>
      <div class="sm:col-span-2 my-auto">
        <componentElementTitle :textName="t('page.login.title')" />

        <div class="my-3 p-2 rounded-md text-center">
          <ul v-for="(item, index) in messages" :key="index">
            <li>
              {{ item }}
            </li>
          </ul>
        </div>
        <form
          @submit.prevent="userLogin"
          class="flex flex-col w-3/4 mx-auto gap-3"
        >
          <componentInputText
            :textName="t('page.login.input.userName')"
            :idName="'username'"
            :required="true"
            :placeholder="'Name'"
            v-model:valueData="username"
          />
          <componentInputPassword
            :textName="t('page.login.input.password')"
            :idName="'password'"
            :required="true"
            v-model:valueData="password"
          />
          <componentInputCheckbox
            :textName="t('page.login.input.rememberMe')"
            :idName="'rememberme'"
            :placeholder="rememberMe"
            v-model:valueData="rememberMe"
          />

          <div class="flex flex-row gap-3 justify-around mt-4 items-center">
            <span>
              <componentButton :textName="t('page.login.button.login')" />
            </span>
            <span>
              <componentElementButtonRouterLink
                :textName="t('page.login.button.register')"
                :url="'/auth/register'"
              />
            </span>
          </div>
        </form>
        <div class="flex justify-center mt-4">
          <componentElementButtonRouterLinkMini
            :textName="t('page.login.button.passwordReset')"
            :url="'/auth/reset-password'"
          />
        </div>
        <div class="flex flex-row gap-3 items-center justify-center"></div>
      </div>
    </div>
  </div>
</template>
