<script setup>
import componentElementTitle from "../components/element/ElementTitle.vue";
import componentInputPassword from "../components/input/InputPassword.vue";
import componentButton from "../components/element/ElementButton.vue";
import componentElementButtonRouterLink from "../components/element/ElementButtonRouterLink.vue";
</script>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "PasswordEdit",
  data() {
    return {
      password: "",
      newPassword: "",

      messages: "",
    };
  },
  methods: {
    ...mapActions(["passwordEdit"]),
    async userPasswordEdit() {
      try {
        const res = await this.passwordEdit({
          data: {
            password: this.password,
            newPassword: this.newPassword,
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
    <componentElementTitle :textName="t('page.passwordSettings.title')" />

    <div class="my-3 p-2 rounded-md text-center">
      <ul v-for="(item, index) in messages" :key="index">
        <li>
          {{ item }}
        </li>
      </ul>
    </div>

    <form
      @submit.prevent="userPasswordEdit"
      class="flex flex-col w-3/4 mx-auto gap-3"
    >
      <componentInputPassword
        :textName="t('page.passwordSettings.input.password')"
        :idName="'password'"
        :required="true"
        v-model:valueData="password"
      />
      <componentInputPassword
        :textName="t('page.passwordSettings.input.newPassword')"
        :idName="'newPassword'"
        :required="true"
        v-model:valueData="newPassword"
      />
      <div
        class="flex sm:flex-row flex-col gap-3 justify-around mt-4 items-center"
      >
        <componentElementButtonRouterLink
          :url="'./'"
          :textName="t('page.passwordSettings.button.back')"
          :class="'w-full block'"
        />
        <componentButton
          :textName="t('page.passwordSettings.button.save')"
          :class="'w-full block'"
        />
      </div>
    </form>
  </div>
</template>
