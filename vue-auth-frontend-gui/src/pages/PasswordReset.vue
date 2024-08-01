<script setup>
import componentElementTitle from "../components/element/ElementTitle.vue";
import componentButton from "../components/element/ElementButton.vue";
import componentElementButtonRouterLink from "../components/element/ElementButtonRouterLink.vue";
import componentInputEmail from "../components/input/InputEmail.vue";
import componentInputTel from "../components/input/InputTel.vue";
</script>

<script>
import { mapActions } from "vuex";

export default {
  name: "PasswordSettings",
  data() {
    return {
      email: "",
      phone: "",

      message: "",
      isResetType: "email",
    };
  },
  methods: {
    ...mapActions(["passwordReset"]),
    async userPasswordReset() {
      try {
        if (this.email != "") {
          const res = await this.passwordReset({
            email: this.email,
          });
        } else if (this.phone != "") {
          const res = await this.passwordReset({
            phone: this.phone,
          });
        } else {
          this.message = "Email or phone required";
          return;
        }

        this.message = res?.data?.message;

        setTimeout(() => {
          if (res.status == 200) this.$router.push("/");
        }, 1500);
      } catch (error) {
        // console.error("Registration error:", error); // * debug
        this.message = "Server error, please try later.";
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
    <componentElementTitle :textName="'Password Reset'" />
    <div class="my-3 p-2 rounded-md text-center">
      {{ message }}
    </div>
    <div class="flex flex-row gap-3 justify-around mb-4 items-center">
      <button
        @click="emailPhone"
        class="bg-neutral-200 hover:bg-neutral-400 p-2 rounded-md font-semibold"
      >
        Email / Phone
      </button>
    </div>
    <form
      @submit.prevent="userPasswordReset"
      class="flex flex-col w-3/4 mx-auto gap-3"
    >
      <div v-if="isResetType == 'email'">
        <componentInputEmail
          :textName="'Email'"
          :idName="'email'"
          :required="true"
          :placeholder="'name@example.com'"
          v-model:valueData="email"
        />
      </div>
      <div v-else-if="isResetType == 'phone'">
        <componentInputTel
          :textName="'Phone'"
          :idName="'phone'"
          :required="true"
          :placeholder="'1 (234) 567-890'"
          v-model:valueData="phone"
        />
      </div>
      <div class="flex flex-row gap-3 justify-around mt-4 items-center">
        <span>
          <componentElementButtonRouterLink :url="'../'" :textName="'Back'" />
        </span>
        <span>
          <componentButton :textName="'Reset'" />
        </span>
      </div>
    </form>
  </div>
</template>
