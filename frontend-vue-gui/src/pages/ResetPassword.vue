<script setup>
import componentElementTitle from "../components/element/ElementTitle.vue";
import componentButton from "../components/element/ElementButton.vue";
import componentElementButtonRouterLink from "../components/element/ElementButtonRouterLink.vue";
import componentInputEmail from "../components/input/InputEmail.vue";
import componentInputTel from "../components/input/InputTel.vue";
import componentInputText from "../components/input/InputText.vue";
import componentInputPassword from "../components/input/InputPassword.vue";
</script>

<script>
import { mapActions } from "vuex";

export default {
  name: "ResetPassword",
  data() {
    return {
      email: "",
      phone: "",
      verifyCode: "",
      password: "",

      messages: "",
      isResetType: "email",
    };
  },
  methods: {
    ...mapActions(["resetPassword", "resetPasswordUpdate"]),
    async userPasswordReset() {
      try {
        let res = "";
        if (this.isResetType == "email") {
          res = await this.resetPassword({
            data: {
              email: this.email,
            },
          });
        } else if (this.isResetType == "phone") {
          res = await this.resetPassword({
            data: {
              phone: this.phone,
            },
          });
        } else return (this.messages = "Email or phone required");

        this.messages = res?.message || res?.data.message;
      } catch (error) {
        // console.error(`Component "${this.$options.name}" error:`, error); // * debug
        this.messages = ["Server error, please try later."];
      }
    },

    async userPasswordResetUpdate() {
      try {
        let res = "";
        if (this.isResetType == "email") {
          res = await this.resetPasswordUpdate({
            data: {
              email: this.email,
              verifyCode: this.verifyCode,
              password: this.password,
            },
          });
        } else if (this.isResetType == "phone") {
          res = await this.resetPasswordUpdate({
            data: {
              phone: this.phone,
              verifyCode: this.verifyCode,
              password: this.password,
            },
          });
        } else return (this.messages = "Email or phone required");

        this.messages = res?.message || res?.data.message;

        if (res.status == 200)
          setTimeout(() => {
            this.$router.push("/");
          }, 1500);
      } catch (error) {
        // console.error(`Component "${this.$options.name}" error:`, error); // * debug
        this.messages = ["Server error, please try later."];
      }
    },

    emailPhone() {
      this.isResetType == "email"
        ? (this.isResetType = "phone")
        : (this.isResetType = "email");
    },
  },
};
</script>

<template>
  <div
    class="container w-10/12 mx-auto my-3 p-5 text-gray-700 dark:text-gray-400 bg-gray-300 dark:bg-gray-800 rounded-md"
  >
    <componentElementTitle :textName="t('page.resetPassword.title')" />
    <div class="my-3 p-2 rounded-md text-center">
      <ul v-for="(item, index) in messages" :key="index">
        <li>
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="flex flex-row gap-3 justify-around mb-4 items-center">
      <button
        @click="emailPhone"
        class="bg-neutral-200 hover:bg-neutral-400 p-2 rounded-md font-semibold"
      >
        {{ t("page.resetPassword.button.emailPhone") }}
      </button>
    </div>
    <form
      @submit.prevent="userPasswordReset"
      class="flex flex-col w-3/4 mx-auto gap-3"
    >
      <div v-if="isResetType == 'email'">
        <componentInputEmail
          :textName="t('page.resetPassword.input.email')"
          :idName="'email'"
          :required="true"
          :placeholder="'name@example.com'"
          v-model:valueData="email"
        />
      </div>
      <div v-else-if="isResetType == 'phone'">
        <componentInputTel
          :textName="t('page.resetPassword.input.phone')"
          :idName="'phone'"
          :required="true"
          :placeholder="'1 (234) 567-890'"
          v-model:valueData="phone"
        />
      </div>
      <div class="flex flex-row gap-3 justify-around mt-4 items-center">
        <span>
          <componentButton
            :textName="t('page.resetPassword.button.getResetCode')"
          />
        </span>
      </div>
    </form>
    <form
      @submit.prevent="userPasswordResetUpdate"
      class="flex flex-col w-3/4 mx-auto gap-3"
    >
      <componentInputText
        :textName="t('page.resetPassword.input.verifyCode')"
        :idName="'verifyCode'"
        :required="true"
        v-model:valueData="verifyCode"
      />
      <componentInputPassword
        :textName="t('page.resetPassword.input.password')"
        :idName="'password'"
        :required="true"
        v-model:valueData="password"
      />

      <div class="flex flex-row gap-3 justify-around mt-4 items-center">
        <span>
          <componentElementButtonRouterLink
            :url="'../'"
            :textName="t('page.resetPassword.button.back')"
          />
        </span>
        <span>
          <componentButton :textName="t('page.resetPassword.button.reset')" />
        </span>
      </div>
    </form>
  </div>
</template>
