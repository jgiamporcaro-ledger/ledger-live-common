import { BigNumber } from "bignumber.js";
import type { Account, AccountLike } from "../../types/account";
import type {
  AccountRawLike,
  AccountRaw,
  Operation,
  Transaction,
  CryptoCurrency,
  TokenCurrency,
  TransactionRaw,
} from "../../types";
import { Transaction } from "ethereumjs-tx";
export type Exchange = {
  fromParentAccount: Account | null | undefined;
  fromAccount: AccountLike;
  toParentAccount: Account | null | undefined;
  toAccount: AccountLike;
};
export type ExchangeRaw = {
  fromParentAccount: AccountRaw | null | undefined;
  fromAccount: AccountRawLike;
  toParentAccount: AccountRaw | null | undefined;
  toAccount: AccountRawLike;
};
export type ExchangeRate = {
  rate: BigNumber;
  // NB Raw rate, for display
  magnitudeAwareRate: BigNumber;
  // NB rate between satoshi units
  payoutNetworkFees?: BigNumber;
  // Only for float
  toAmount: BigNumber;
  // There's a delta somewhere between from times rate and the api.
  rateId?: string;
  provider: string;
  tradeMethod: "fixed" | "float";
  error?: Error;
  providerURL?: string | null | undefined;
};
export type TradeMethod = "fixed" | "float";
export type ExchangeRateRaw = {
  rate: string;
  magnitudeAwareRate: string;
  payoutNetworkFees?: string;
  toAmount: string;
  rateId?: string;
  provider: string;
  tradeMethod: TradeMethod;
  error?: string;
  providerURL?: string | null | undefined;
};
export type AvailableProvider = {
  provider: string;
  supportedCurrencies: string[];
};
export type GetExchangeRates = (
  arg0: Exchange,
  arg1: Transaction
) => Promise<ExchangeRate[]>;
export type GetProviders = () => Promise<AvailableProvider[]>;
export type InitSwapResult = {
  transaction: Transaction;
  swapId: string;
};
type ValidSwapStatus =
  | "pending"
  | "onhold"
  | "expired"
  | "finished"
  | "refunded";
export type SwapStatusRequest = {
  provider: string;
  swapId: string;
};
export type SwapStatus = {
  provider: string;
  swapId: string;
  status: ValidSwapStatus;
};
export type GetStatus = (arg0: SwapStatusRequest) => Promise<SwapStatus>;
export type UpdateAccountSwapStatus = (
  arg0: Account
) => Promise<Account | null | undefined>;
export type GetMultipleStatus = (
  arg0: SwapStatusRequest[]
) => Promise<SwapStatus[]>;
export type SwapRequestEvent =
  | {
      type: "init-swap-requested";
      amountExpectedTo?: string;
      estimatedFees: BigNumber;
    }
  | {
      type: "init-swap-error";
      error: Error;
    }
  | {
      type: "init-swap-result";
      initSwapResult: InitSwapResult;
    };
export type SwapHistorySection = {
  day: Date;
  data: MappedSwapOperation[];
};
export type MappedSwapOperation = {
  fromAccount: AccountLike;
  fromParentAccount?: Account;
  toAccount: AccountLike;
  toParentAccount?: Account;
  toExists: boolean;
  operation: Operation;
  provider: string;
  swapId: string;
  status: string;
  fromAmount: BigNumber;
  toAmount: BigNumber;
};
export type SwapOperation = {
  provider: string;
  swapId: string;
  status: string;
  receiverAccountId: string;
  tokenId?: string;
  operationId: string;
  fromAmount: BigNumber;
  toAmount: BigNumber;
};
export type SwapOperationRaw = {
  provider: string;
  swapId: string;
  status: string;
  receiverAccountId: string;
  tokenId?: string;
  operationId: string;
  fromAmount: string;
  toAmount: string;
};
export type SwapState = {
  // NB fromAccount and fromParentAccount and amount come from `useBridgeTransaction`
  useAllAmount?: boolean;
  loadingRates?: boolean;
  isTimerVisible?: boolean;
  error?: Error | null | undefined;
  fromCurrency?: (CryptoCurrency | TokenCurrency) | null | undefined;
  toCurrency?: (CryptoCurrency | TokenCurrency) | null | undefined;
  toAccount?: AccountLike | null | undefined;
  toParentAccount?: Account | null | undefined;
  ratesExpiration?: Date | null | undefined;
  exchangeRate?: ExchangeRate | null | undefined;
  withExpiration?: boolean;
};

export type SwapTransaction = Transaction & {
  tag?: number;
  memoValue?: string;
  memoType?: string;
};

export type InitSwapInput = {
  exchange: Exchange;
  exchangeRate: ExchangeRate;
  transaction: SwapTransaction;
  deviceId: string;
};
export type InitSwapInputRaw = {
  exchange: ExchangeRaw;
  exchangeRate: ExchangeRateRaw;
  transaction: TransactionRaw;
  deviceId: string;
};