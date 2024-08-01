<script setup>
import componentElementTitle from "../components/element/ElementTitle.vue";
import componentButton from "../components/element/ElementButton.vue";
import componentElementButtonRouterLink from "../components/element/ElementButtonRouterLink.vue";
import componentElementButtonRouterLinkMini from "../components/element/ElementButtonRouterLinkMini.vue";
import componentInputText from "../components/input/InputText.vue";
import componentInputPassword from "../components/input/InputPassword.vue";
</script>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",

      message: "",
    };
  },
  methods: {
    ...mapActions(["login"]),
    async userLogin() {
      try {
        const res = await this.login({
          username: this.username,
          password: this.password,
        });

        this.message = res?.data?.message;

        setTimeout(() => {
          if (res.status == 200) this.$router.push("/account");
        }, 1500);
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
        <componentElementTitle :textName="'Login'" />

        <div class="my-3 p-2 rounded-md text-center">
          {{ message }}
        </div>
        <form
          @submit.prevent="userLogin"
          class="flex flex-col w-3/4 mx-auto gap-3"
        >
          <componentInputText
            :textName="'User Name'"
            :idName="'username'"
            :required="true"
            :placeholder="'Name'"
            v-model:valueData="username"
          />
          <componentInputPassword
            :textName="'Password'"
            :idName="'password'"
            :required="true"
            v-model:valueData="password"
          />

          <div class="flex flex-row gap-3 justify-around mt-4 items-center">
            <span>
              <componentButton :textName="'Login'" />
            </span>
            <span>
              <componentElementButtonRouterLink
                :url="'/auth/register'"
                :textName="'Register'"
              />
            </span>
          </div>
        </form>
        <div class="flex justify-center mt-4">
          <componentElementButtonRouterLinkMini
            :url="'/auth/password-reset'"
            :textName="'Password Reset'"
          />
        </div>
        <div class="flex flex-row gap-3 items-center justify-center"></div>
      </div>
    </div>
  </div>
</template>
