<script setup>
import componentElementTitle from "../components/element/ElementTitle.vue";
import componentSelectOption from "../components/input/SelectOption.vue";
import componentInputText from "../components/input/InputText.vue";
import componentButton from "../components/element/ElementButton.vue";
import componentElementButtonRouterLink from "../components/element/ElementButtonRouterLink.vue";
</script>

<script>
import { mapActions } from "vuex";

export default {
  name: "AccountVerify",
  data() {
    return {
      getCodeType: "",
      verifyCode: "",

      messages: "",
      selectList: [],
    };
  },
  mounted() {
    this.userAccountData();
  },
  methods: {
    ...mapActions(["accountData", "accountVerify", "accountVerifyCode"]),

    async getCode() {
      try {
        const res = await this.accountVerify({
          data: {
            verificationType: this.getCodeType,
          },
        });

        this.messages = res?.message || res?.data.message;
      } catch (error) {
        // console.error(`Component "${this.$options.name}" error:`, error); // * debug
        this.messages = ["Server error, please try later."];
      }
    },

    async userVerifyCode() {
      try {
        const res = await this.accountVerifyCode({
          data: {
            verifyCode: this.verifyCode,
          },
        });

        this.messages = res?.message || res?.data.message;
      } catch (error) {
        // console.error(`Component "${this.$options.name}" error:`, error); // * debug
        this.messages = ["Server error, please try later."];
      }
    },

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

        if (!res.data.verify.verificationType.emailVerified)
          this.selectList.push([
            "email",
            this.t("page.accountVerify.list.email"),
          ]);
        if (!res.data.verify.verificationType.phoneVerified)
          this.selectList.push([
            "phone",
            this.t("page.accountVerify.list.phone"),
          ]);

        if (
          res.data.verify.verificationType.emailVerified &&
          res.data.verify.verificationType.phoneVerified
        )
          this.$router.push(".");
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
    <componentElementTitle :textName="t('page.accountVerify.title')" />

    <div class="my-3 p-2 rounded-md text-center">
      <ul v-for="(item, index) in messages" :key="index">
        <li>
          {{ item }}
        </li>
      </ul>
    </div>

    <form @submit.prevent="getCode" class="flex flex-col w-3/4 mx-auto gap-3">
      <componentSelectOption
        :textName="t('page.accountVerify.input.verifyType')"
        :idName="'verify-type'"
        :selectValue="selectList"
        v-model:valueData="getCodeType"
      />

      <div
        class="flex sm:flex-row flex-col gap-3 justify-around mt-4 items-center"
      >
        <componentButton
          :textName="t('page.accountVerify.input.verifyType')"
          :class="'w-full block'"
        />
      </div>
    </form>
    <br />
    <form
      @submit.prevent="userVerifyCode"
      class="flex flex-col w-3/4 mx-auto gap-3"
    >
      <componentInputText
        :textName="t('page.accountVerify.input.verifyCode')"
        :idName="'verify-code'"
        :required="true"
        :placeholder="'123456'"
        v-model:valueData="verifyCode"
      />

      <div
        class="flex sm:flex-row flex-col gap-3 justify-around mt-4 items-center"
      >
        <componentElementButtonRouterLink
          :url="'./'"
          :textName="t('page.accountVerify.button.back')"
          :class="'w-full block'"
        />
        <componentButton
          :textName="t('page.accountVerify.button.confirm')"
          :class="'w-full block'"
        />
      </div>
    </form>
  </div>
</template>
