<script setup>
import componentElementTitle from "../components/element/ElementTitle.vue";
import componentElementButtonRouterLink from "../components/element/ElementButtonRouterLink.vue";
</script>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Account",
  data() {
    return {
      username: "",
      userId: "",
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
      status: {
        accountStatus: "",
        systemStatus: "",
      },
      createdAt: "",
      verify: {
        emailVerified: "",
        phoneVerified: "",
      },

      messages: "",
    };
  },
  computed: {
    ...mapGetters(["getUserName", "getToken"]),
  },
  mounted() {
    this.userAccountData();
  },
  methods: {
    ...mapActions(["accountData"]),

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

        this.userId = res.data.userId;
        this.username = res.data.username;

        this.contact.email = res.data.contact.email;
        this.contact.phone = res.data.contact.phone;

        this.details.firstName = res.data.details.firstName;
        this.details.lastName = res.data.details.lastName;
        this.details.birthdate = res.data.details.birthdate;
        this.details.country = res.data.details.country;
        this.details.language = res.data.details.language.slice(0, 2);
        this.details.translationLanguage =
          res.data.details.translationLanguage.slice(0, 2);

        this.status.accountStatus = res.data.status.accountStatus;
        this.status.systemStatus = res.data.status.systemStatus;

        this.verify.emailVerified =
          res.data.verify.verificationType.emailVerified;
        this.verify.phoneVerified =
          res.data.verify.verificationType.phoneVerified;

        this.createdAt = res.data.createdAt;
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
    <componentElementTitle :textName="t('page.account.title')" />
    <div class="my-3 p-2 rounded-md text-center">
      <ul v-for="(item, index) in messages" :key="index">
        <li>
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="flex flex-col w-3/4 mx-auto gap-3">
      <div
        class="flex sm:flex-row flex-col justify-between gap-2 sm:border-0 border-y-2 p-2"
      >
        <span> {{ t("page.account.list.userId") }} </span>
        <span>{{ userId }}</span>
      </div>
      <div
        class="flex sm:flex-row flex-col justify-between gap-2 sm:border-0 border-y-2 p-2"
      >
        <span> {{ t("page.account.list.userName") }} </span>
        <span>{{ username }}</span>
      </div>
      <div
        class="flex sm:flex-row flex-col justify-between gap-2 sm:border-0 border-y-2 p-2"
      >
        <span> {{ t("page.account.list.email") }} </span>
        <span>{{ contact.email }}</span>
      </div>
      <div
        class="flex sm:flex-row flex-col justify-between gap-2 sm:border-0 border-y-2 p-2"
      >
        <span> {{ t("page.account.list.phone") }} </span>
        <span>{{ contact.phone }}</span>
      </div>
      <div
        class="flex sm:flex-row flex-col justify-between gap-2 sm:border-0 border-y-2 p-2"
      >
        <span> {{ t("page.account.list.firstName") }} </span>
        <span>{{ details.firstName }}</span>
      </div>
      <div
        class="flex sm:flex-row flex-col justify-between gap-2 sm:border-0 border-y-2 p-2"
      >
        <span> {{ t("page.account.list.lastName") }} </span>
        <span>{{ details.lastName }}</span>
      </div>
      <div
        class="flex sm:flex-row flex-col justify-between gap-2 sm:border-0 border-y-2 p-2"
      >
        <span> {{ t("page.account.list.birthdate") }} </span>
        <span>{{ details.birthdate }}</span>
      </div>
      <div
        class="flex sm:flex-row flex-col justify-between gap-2 sm:border-0 border-y-2 p-2"
      >
        <span> {{ t("page.account.list.country") }} </span>
        <span>{{ details.country }}</span>
      </div>
      <div
        class="flex sm:flex-row flex-col justify-between gap-2 sm:border-0 border-y-2 p-2"
      >
        <span> {{ t("page.account.list.language") }} </span>
        <span>{{ details.language }}</span>
      </div>
      <div
        class="flex sm:flex-row flex-col justify-between gap-2 sm:border-0 border-y-2 p-2"
      >
        <span> {{ t("page.account.list.translationLanguage") }} </span>
        <span>{{ details.translationLanguage }}</span>
      </div>
      <div
        class="flex sm:flex-row flex-col justify-between gap-2 sm:border-0 border-y-2 p-2"
      >
        <span> {{ t("page.account.list.accountStatus") }} </span>
        <span>{{ status.accountStatus }}</span>
      </div>
      <div
        class="flex sm:flex-row flex-col justify-between gap-2 sm:border-0 border-y-2 p-2"
      >
        <span> {{ t("page.account.list.accountSystemStatus") }} </span>
        <span>{{ status.systemStatus }}</span>
      </div>
      <div
        class="flex sm:flex-row flex-col justify-between gap-2 sm:border-0 border-y-2 p-2"
      >
        <span> {{ t("page.account.list.accountCreated") }} </span>
        <span>{{ createdAt }}</span>
      </div>

      <componentElementButtonRouterLink
        :url="'/account/verify'"
        :textName="t('page.account.button.accountVerify')"
        :class="'w-full block'"
        v-if="!verify.emailVerified || !verify.phoneVerified"
      />

      <div
        class="flex sm:flex-row flex-col gap-3 justify-around mt-4 items-center"
      >
        <componentElementButtonRouterLink
          :url="'/account/settings'"
          :textName="t('page.account.button.accountSettings')"
          :class="'w-full block'"
        />
        <componentElementButtonRouterLink
          :url="'/account/password'"
          :textName="t('page.account.button.passwordSettings')"
          :class="'w-full block'"
        />
        <componentElementButtonRouterLink
          :url="'/account/status'"
          :textName="t('page.account.button.statusSettings')"
          :class="'w-full block'"
        />
        <componentElementButtonRouterLink
          :url="'/account/delete'"
          :textName="t('page.account.button.accountDelete')"
          :class="'w-full block'"
        />
      </div>
    </div>
  </div>
</template>
