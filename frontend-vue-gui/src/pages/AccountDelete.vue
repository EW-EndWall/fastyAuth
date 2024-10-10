<script setup>
import componentElementTitle from "../components/element/ElementTitle.vue";
import componentInputPassword from "../components/input/InputPassword.vue";
import componentButton from "../components/element/ElementButton.vue";
import componentElementButtonRouterLink from "../components/element/ElementButtonRouterLink.vue";
</script>

<script>
import { mapActions } from "vuex";

export default {
  name: "AccountDelete",
  data() {
    return {
      password: "",

      messages: "",
    };
  },
  methods: {
    ...mapActions(["accountDelete", "logout"]),
    async userAccountDelete() {
      try {
        const res = await this.accountDelete({
          data: {
            password: this.password,
          },
        });

        this.messages = res?.message || res?.data.message;

        if (res.status == 200)
          setTimeout(() => {
            this.logout();
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
    <componentElementTitle :textName="t('page.accountDelete.title')" />

    <div class="my-3 p-2 rounded-md text-center">
      <ul v-for="(item, index) in messages" :key="index">
        <li>
          {{ item }}
        </li>
      </ul>
    </div>

    <form
      @submit.prevent="userAccountDelete"
      class="flex flex-col w-3/4 mx-auto gap-3"
    >
      <componentInputPassword
        :textName="t('page.accountDelete.input.password')"
        :idName="'password'"
        :required="true"
        v-model:valueData="password"
      />
      <div
        class="flex sm:flex-row flex-col gap-3 justify-around mt-4 items-center"
      >
        <componentElementButtonRouterLink
          :url="'./'"
          :textName="'Back'"
          :class="'w-full block'"
        />
        <componentButton
          :textName="t('page.accountDelete.button.confirm')"
          :class="'w-full block'"
        />
      </div>
    </form>
  </div>
</template>
