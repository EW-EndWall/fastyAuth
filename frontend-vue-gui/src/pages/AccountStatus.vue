<script setup>
import componentElementTitle from "../components/element/ElementTitle.vue";
import componentSelectOption from "../components/input/SelectOption.vue";
import componentButton from "../components/element/ElementButton.vue";
import componentElementButtonRouterLink from "../components/element/ElementButtonRouterLink.vue";
</script>

<script>
import { mapActions } from "vuex";

export default {
  name: "AccountStatus",
  data() {
    return {
      currentAccountStatus: "",
      newAccountStatus: "",

      messages: "",
    };
  },
  mounted() {
    this.userAccountData();
  },
  methods: {
    ...mapActions(["accountData", "accountStatus"]),

    async userAccountData() {
      try {
        const res = await this.accountData({
          data: {
            username: this.getUserName,
            token: this.getToken,
          },
        });

        if (res.status != 200)
          return (this.messages = res?.message || res?.data.message);

        this.currentAccountStatus = res.data.status.accountStatus;
      } catch (error) {
        // console.error(`Component "${this.$options.name}" error:`, error); // * debug
        this.messages = ["Server error, please try later."];
      }
    },

    async userAccountStatus() {
      try {
        const res = await this.accountStatus({
          data: {
            accountStatus: this.newAccountStatus,
          },
        });

        this.messages = res?.message || res?.data.message;

        if (res.status == 200)
          setTimeout(() => {
            this.$router.push(".");
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
    <componentElementTitle :textName="t('page.accountStatus.title')" />

    <div class="my-3 p-2 rounded-md text-center">
      <ul v-for="(item, index) in messages" :key="index">
        <li>
          {{ item }}
        </li>
      </ul>
    </div>

    <form
      @submit.prevent="userAccountStatus"
      class="flex flex-col w-3/4 mx-auto gap-3"
    >
      <componentSelectOption
        :textName="t('page.accountStatus.input.accountStatus')"
        :idName="'account-status'"
        :required="true"
        :placeholder="currentAccountStatus"
        :selectValue="[
          ['active', t('page.accountStatus.list.active')],
          ['passive', t('page.accountStatus.list.passive')],
        ]"
        v-model:valueData="newAccountStatus"
      />

      <div
        class="flex sm:flex-row flex-col gap-3 justify-around mt-4 items-center"
      >
        <componentElementButtonRouterLink
          :url="'./'"
          :textName="t('page.accountStatus.button.back')"
          :class="'w-full block'"
        />
        <componentButton
          :textName="t('page.accountStatus.button.confirm')"
          :class="'w-full block'"
        />
      </div>
    </form>
  </div>
</template>
