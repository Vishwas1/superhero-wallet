<template>
  <div class="recent-transactions" :class="{ 'tour-bar': tourStartBar }">
    <div class="header">
      <span class="title">{{ $t('pages.recentTransactions.title') }}</span>
      <router-link to="/transactions" data-cy="view-all-transactions" class="view-all">
        <Activity class="icon" />
      </router-link>
    </div>
    <PendingTxs />
    <div v-if="transactions.latest.length" class="transaction-list">
      <TransactionItem
        v-for="transaction in transactions.latest"
        :key="transaction.hash"
        :transaction="transaction"
      />
    </div>
    <img v-if="loading" :src="icons.AnimatedSpinner" class="spinner" />
    <div v-else-if="!transactions.latest.length && !transactions.pending.length" class="message">
      <p>{{ $t('pages.recentTransactions.noTransactionsFound') }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Activity from '../../../icons/activity.svg?vue-component';
import AnimatedSpinner from '../../../icons/animated-spinner.svg';
import PendingTxs from './PendingTxs';
import TransactionItem from './TransactionItem';

export default {
  components: { PendingTxs, TransactionItem, Activity },
  data() {
    return {
      polling: null,
      loading: true,
      icons: { AnimatedSpinner },
    };
  },
  created() {
    if (this.transactions.latest.length) this.loading = false;
    this.polling = setInterval(() => this.updateTransactions(), 5000);
    this.$once('hook:beforeDestroy', () => clearInterval(this.polling));
  },
  computed: mapState(['tourStartBar', 'transactions']),
  methods: {
    async updateTransactions() {
      this.$store.commit(
        'updateLatestTransactions',
        await this.$store.dispatch('fetchTransactions', {
          limit: 10,
          page: 1,
          recent: true,
        }),
      );
      this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../styles/variables';
@import '../../../styles/typography';

.recent-transactions {
  height: 220px;
  background: $color-bg-3;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;

  .header {
    padding: 8px 16px;
    margin-bottom: 1px;
    background: $color-bg-2;
    border-radius: 0px 0px 4px 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      @extend %face-sans-15-medium;

      color: $color-dark-grey;
      line-height: 24px;
    }

    .view-all {
      width: 24px;
      height: 24px;
      padding: 0;
      cursor: pointer;
      text-decoration: none;

      .icon {
        fill: $color-white;
        opacity: 0.7;
      }

      &:hover .icon {
        opacity: 1;

        path {
          fill: $color-green-hover;
        }
      }
    }
  }

  .transaction-list > div {
    margin-bottom: 1px;
  }

  .message,
  .spinner {
    padding-bottom: 8px;
    flex-grow: 1;
    display: flex;
    align-items: center;
  }

  .message > p {
    padding: 0 64px;

    @extend %face-sans-15-medium;

    color: $color-light-grey;
    line-height: 24px;
    text-align: center;
  }

  .spinner {
    width: 56px;
    height: 56px;
    margin: 0 auto;
  }

  &.tour-bar {
    padding-bottom: 40px;
  }
}
</style>
