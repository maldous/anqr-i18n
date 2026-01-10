/**
 * Payload Generators Module
 * Generates properly formatted strings for all QR payload types
 * Implements EMVCo QR Code Specification for Merchant-Presented Mode
 * Supports EPC/SEPA, UPI, Swiss QR-bill, and cryptocurrency URIs
 */

import type {
  CryptoHelper,
  EmailHelper,
  EventHelper,
  GeoHelper,
  MeCardHelper,
  SmsHelper,
  TelHelper,
  UrlHelper,
  VCardHelper,
  WifiHelper,
} from '../store/qr-store';

// ============================================
// EMV QR CODE CONSTANTS (EMVCo MPM Specification)
// ============================================

/** EMV QR Tag IDs for Merchant-Presented Mode */
export const EMV_TAGS = {
  // Root level tags
  PAYLOAD_FORMAT_INDICATOR: '00',
  POINT_OF_INITIATION: '01',
  // 02-25: Reserved for Visa, Mastercard, JCB, UnionPay, etc.
  VISA: '02',
  MASTERCARD: '03',
  MASTERCARD_2: '04',
  MASTERCARD_3: '05',
  // 26-51: Merchant Account Information templates
  MERCHANT_ACCOUNT_INFO_START: 26,
  MERCHANT_ACCOUNT_INFO_END: 51,
  // Core merchant data
  MERCHANT_CATEGORY_CODE: '52',
  TRANSACTION_CURRENCY: '53',
  TRANSACTION_AMOUNT: '54',
  TIP_INDICATOR: '55',
  TIP_FIXED: '56',
  TIP_PERCENTAGE: '57',
  COUNTRY_CODE: '58',
  MERCHANT_NAME: '59',
  MERCHANT_CITY: '60',
  POSTAL_CODE: '61',
  ADDITIONAL_DATA: '62',
  CRC: '63',
  // 64: Merchant Information - Language Template
  MERCHANT_INFO_LANGUAGE: '64',
  // 65-79: Reserved for EMVCo
  // 80-99: Unreserved templates
} as const;

/** Point of Initiation Method values */
export const POI_METHOD = {
  STATIC: '11', // Static QR, can be used multiple times
  DYNAMIC: '12', // Dynamic QR, one-time use
} as const;

/** Tip/Convenience Indicator values */
export const TIP_INDICATOR = {
  NOT_SUPPORTED: '00',
  PROMPT_MOBILE: '01', // Mobile app should prompt
  FIXED_VALUE: '02', // Fixed convenience fee
  PERCENTAGE: '03', // Percentage-based fee
} as const;

/** Additional Data Field Template subtags */
export const ADDITIONAL_DATA_TAGS = {
  BILL_NUMBER: '01',
  MOBILE_NUMBER: '02',
  STORE_LABEL: '03',
  LOYALTY_NUMBER: '04',
  REFERENCE_LABEL: '05',
  CUSTOMER_LABEL: '06',
  TERMINAL_LABEL: '07',
  PURPOSE_OF_TRANSACTION: '08',
  ADDITIONAL_CONSUMER_DATA: '09',
  // 10-49: RFU (Reserved for Future Use)
  // 50-99: Payment system specific templates
} as const;

/** Merchant Account Information subtags */
export const MAI_SUBTAGS = {
  GLOBALLY_UNIQUE_ID: '00', // GUI - reverse domain or AID
  // 01-99: Payment network specific
} as const;

/** ISO 4217 Currency Codes (numeric) */
export const ISO_CURRENCY = {
  AUD: '036',
  BRL: '986',
  CNY: '156',
  EUR: '978',
  GBP: '826',
  HKD: '344',
  IDR: '360',
  INR: '356',
  JPY: '392',
  MYR: '458',
  PHP: '608',
  SGD: '702',
  THB: '764',
  TWD: '901',
  USD: '840',
  VND: '704',
} as const;

/** National Payment Scheme GUIs (Globally Unique Identifiers) */
export const PAYMENT_SCHEME_GUI = {
  // Brazil PIX
  PIX: 'br.gov.bcb.pix',
  // Singapore PayNow
  PAYNOW: 'SG.PAYNOW',
  // Thailand PromptPay
  PROMPTPAY_MOBILE: 'A000000677010111',
  PROMPTPAY_TAX_ID: 'A000000677010112',
  PROMPTPAY_EWALLET: 'A000000677010114',
  PROMPTPAY_BILLPAY: 'A000000677010113',
  // Indonesia QRIS
  QRIS: 'ID.CO.QRIS.WWW',
  // Malaysia DuitNow
  DUITNOW: 'MY.COM.DUITNOW',
  // Philippines QR Ph (InstaPay/PESONet)
  QRPH: 'PH.PPMI.P2M',
  // Vietnam VietQR
  VIETQR: 'VN.VIETQR',
  // India BharatQR
  BHARATQR: 'IN.NPCI.BHARATQR',
  // Hong Kong FPS
  HKFPS: 'HK.COM.HKICL',
  // Taiwan TWQR
  TWQR: 'TW.FI.TWQR',
  // Japan JPQR
  JPQR: 'JP.OR.JPQR',
  // Australia AusPayNet
  AUSPAYNET: 'AU.COM.NPPA',
} as const;

// ============================================
// INTERFACES
// ============================================

export interface EPCSepaParams {
  name: string;
  iban: string;
  bic?: string;
  amount?: number;
  reference?: string;
  text?: string;
}

export interface UPIParams {
  pa: string; // payee VPA (Virtual Payment Address)
  pn?: string; // payee name
  am?: number; // amount
  cu?: string; // currency (default INR)
  tn?: string; // transaction note
  tr?: string; // transaction reference ID
  mc?: string; // merchant category code (MCC)
  tid?: string; // terminal ID
  url?: string; // URL for additional info
  mode?: '00' | '01' | '02' | '03' | '04' | '05' | '06'; // transaction mode
  purpose?: string; // purpose code
  orgid?: string; // organization ID
  sign?: string; // digital signature
}

export interface PayNowParams {
  type: 'mobile' | 'uen' | 'nric';
  value: string;
  amount?: number;
  reference?: string;
  editable: boolean;
  expiryDate?: string; // YYYYMMDD format
  merchantName?: string;
  merchantCity?: string;
}

export interface PromptPayParams {
  type: 'mobile' | 'id' | 'ewallet' | 'billpay';
  value: string;
  amount?: number;
  merchantName?: string;
  merchantCity?: string;
  ref1?: string; // Reference 1 (Bill reference)
  ref2?: string; // Reference 2
  ref3?: string; // Reference 3 (Terminal ID)
  mcc?: string; // Merchant Category Code
  countryCode?: string;
}

export interface PIXParams {
  key: string;
  name?: string;
  city?: string;
  amount?: number;
  txid?: string;
  description?: string;
  postalCode?: string;
  url?: string; // URL for additional info or dynamic PIX
}

export interface GS1DigitalLinkParams {
  gtin: string;
  baseUrl?: string;
  lot?: string;
  ser?: string;
  expiry?: string;
}

// ============================================
// EMV QR ADDITIONAL INTERFACES
// ============================================

/** Swiss QR-bill parameters (ISO 20022) */
export interface SwissQRBillParams {
  // Header
  version?: '0200' | '0201'; // Version: 0200 = 2.0, 0201 = 2.1
  coding?: 1; // UTF-8
  // Creditor info
  creditorIBAN: string;
  creditorAddressType: 'S' | 'K'; // S=Structured, K=Combined
  creditorName: string;
  creditorStreet?: string;
  creditorBuildingNumber?: string;
  creditorPostalCode?: string;
  creditorCity?: string;
  creditorCountry: string; // 2-letter ISO
  // Ultimate creditor (optional)
  ultimateCreditorAddressType?: 'S' | 'K';
  ultimateCreditorName?: string;
  ultimateCreditorStreet?: string;
  ultimateCreditorBuildingNumber?: string;
  ultimateCreditorPostalCode?: string;
  ultimateCreditorCity?: string;
  ultimateCreditorCountry?: string;
  // Payment info
  amount?: number;
  currency: 'CHF' | 'EUR';
  // Ultimate debtor (optional, payer info)
  ultimateDebtorAddressType?: 'S' | 'K';
  ultimateDebtorName?: string;
  ultimateDebtorStreet?: string;
  ultimateDebtorBuildingNumber?: string;
  ultimateDebtorPostalCode?: string;
  ultimateDebtorCity?: string;
  ultimateDebtorCountry?: string;
  // Reference
  referenceType: 'QRR' | 'SCOR' | 'NON'; // QR-Reference, Creditor Reference (ISO 11649), None
  reference?: string;
  // Additional info
  unstructuredMessage?: string;
  trailer?: 'EPD'; // End Payment Data
  billInformation?: string; // Structured bill info (Swico)
  alternativeProcedure1?: string;
  alternativeProcedure2?: string;
}

/** Lightning Network BOLT11 invoice parameters */
export interface LightningParams {
  invoice: string; // BOLT11 encoded invoice string
}

/** Ethereum EIP-681 transaction request parameters */
export interface EthereumEIP681Params {
  targetAddress: string;
  chainId?: number; // 1 = mainnet, 3 = ropsten, etc.
  functionName?: string; // for contract calls
  value?: string; // amount in wei (use string for big numbers)
  gas?: number;
  gasLimit?: number;
  gasPrice?: string; // in wei
  // ERC-20 token transfer parameters
  tokenAddress?: string; // contract address for ERC-20
  tokenValue?: string; // amount in token's smallest unit
  // Arbitrary function parameters
  functionParams?: Record<string, string>;
}

/** Generic EMV MPM QR parameters */
export interface EMVMPMParams {
  // Required fields
  merchantName: string;
  merchantCity: string;
  countryCode: string; // ISO 3166-1 alpha-2
  currencyCode: string; // ISO 4217 numeric (e.g., '702' for SGD)
  // Optional amount
  amount?: number;
  // Point of initiation
  isStatic?: boolean; // true = static (reusable), false = dynamic (one-time)
  // Merchant info
  mcc?: string; // Merchant Category Code (4 digits)
  postalCode?: string;
  // Tip/Convenience
  tipIndicator?: '01' | '02' | '03'; // prompt, fixed, percentage
  tipFixed?: number;
  tipPercentage?: number;
  // Additional data
  billNumber?: string;
  mobileNumber?: string;
  storeLabel?: string;
  loyaltyNumber?: string;
  referenceLabel?: string;
  customerLabel?: string;
  terminalLabel?: string;
  purposeOfTransaction?: string;
  // Merchant account templates (26-51)
  merchantAccounts?: EMVMerchantAccount[];
}

export interface EMVMerchantAccount {
  tag: number; // 26-51
  gui: string; // Globally Unique Identifier
  data: Array<{ tag: string; value: string }>;
}

/** QRIS (Indonesia) specific parameters */
export interface QRISParams {
  merchantPAN?: string; // Primary Account Number
  merchantID: string;
  merchantCriteria?: '00' | '01' | '02' | '03'; // UMI classification
  merchantName: string;
  merchantCity: string;
  postalCode?: string;
  amount?: number;
  feeType?: 'FIXED' | 'PERCENT';
  feeAmount?: number;
  terminalLabel?: string;
  // NMID - National Merchant ID
  nmid?: string;
}

/** DuitNow (Malaysia) specific parameters */
export interface DuitNowParams {
  proxyType: 'NRIC' | 'MOBILE' | 'PASSPORT' | 'ARMY' | 'BUSINESS' | 'OTHERS';
  proxyValue: string;
  merchantName: string;
  merchantCity?: string;
  amount?: number;
  reference?: string;
}

/** BharatQR (India) specific parameters */
export interface BharatQRParams {
  merchantVPA?: string; // UPI VPA
  merchantPAN?: string; // PAN for card-based
  merchantID?: string;
  merchantName: string;
  merchantCity: string;
  mcc?: string;
  amount?: number;
  gstDetails?: string; // GST breakdown
  invoiceNumber?: string;
  referenceNumber?: string;
  terminalId?: string;
}

/** VietQR specific parameters */
export interface VietQRParams {
  bankBin: string; // Bank identification (NAPAS BIN)
  accountNumber: string;
  accountName?: string;
  amount?: number;
  description?: string;
  serviceCode?: 'QRPUSH' | 'QRIBFTTA' | 'QRIBFTTC'; // Transfer types
}

/** QR Ph (Philippines) specific parameters */
export interface QRPhParams {
  accountNumber: string;
  merchantName: string;
  merchantCity: string;
  amount?: number;
  reference?: string;
}

/** TWQR (Taiwan) specific parameters */
export interface TWQRParams {
  merchantId: string;
  merchantName: string;
  merchantCity?: string;
  amount?: number;
  taxId?: string;
}

/** HKQR (Hong Kong) specific parameters */
export interface HKQRParams {
  fpsId?: string; // FPS ID
  mobileNumber?: string;
  email?: string;
  merchantName: string;
  merchantCity?: string;
  amount?: number;
  reference?: string;
}

/** JPQR (Japan) specific parameters */
export interface JPQRParams {
  storeId: string;
  merchantName: string;
  merchantCity?: string;
  amount?: number;
}

/** AusPayNet/NPP (Australia) specific parameters */
// Per NPP QR Code Standard: Need either PayID OR BSB+AccountNumber for routing
// MerchantName is OPTIONAL - payer sees registered name from NPP lookup during payment
export interface AusPayNetParams {
  payId?: string;
  payIdType?: 'EMAIL' | 'MOBILE' | 'ABN' | 'ORG';
  bsb?: string;
  accountNumber?: string;
  merchantName?: string; // Optional - NPP lookup shows registered name to payer
  merchantCity?: string;
  amount?: number;
  reference?: string;
}

/** PayPal.Me link parameters */
export interface PayPalMeParams {
  username: string;
  amount?: number;
  currencyCode?: string; // ISO 4217 alpha (USD, EUR, etc.)
}

/** Cash App ($cashtag) link parameters */
export interface CashAppParams {
  cashtag: string; // without the $
  amount?: number;
}

export interface BizCardParams {
  firstName?: string;
  lastName?: string;
  title?: string;
  company?: string;
  phone?: string;
  email?: string;
  address?: string;
}

export interface OTPAuthParams {
  type: 'totp' | 'hotp';
  issuer?: string;
  account?: string;
  secret: string;
  algorithm?: 'SHA1' | 'SHA256' | 'SHA512';
  digits?: number;
  period?: number;
  counter?: number;
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/** Escape special characters for vCard/iCal format */
function escapeValue(value: string): string {
  return value
    .replaceAll('\\', String.raw`\\`)
    .replaceAll(';', String.raw`\;`)
    .replaceAll(',', String.raw`\,`)
    .replaceAll('\n', String.raw`\n`);
}

/** Format date for iCalendar (YYYYMMDD or YYYYMMDDTHHmmss) */
function formatICalDate(dateStr: string, includeTime = true): string {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  if (!includeTime) return `${year}${month}${day}`;

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}${month}${day}T${hours}${minutes}${seconds}`;
}

/**
 * Calculate UTF-8 byte length of a string
 * IMPORTANT: EMV TLV length fields must use UTF-8 byte length, not JS string length
 * JS .length counts UTF-16 code units, not bytes, which breaks for non-ASCII chars
 */
export function utf8ByteLength(str: string): number {
  return new TextEncoder().encode(str).length;
}

/**
 * Calculate CRC16-CCITT (polynomial 0x1021, init 0xFFFF)
 * Used by EMVCo QR codes, PIX, SGQR, PromptPay, etc.
 * IMPORTANT: Per EMVCo spec, CRC must be computed over UTF-8 bytes, not UTF-16 code units
 */
export function crc16CCITT(str: string): string {
  // Convert string to UTF-8 bytes for correct CRC calculation
  const bytes = new TextEncoder().encode(str);
  let crc = 0xffff;
  for (const byte of bytes) {
    crc ^= byte << 8;
    for (let j = 0; j < 8; j++) {
      if (crc & 0x8000) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc <<= 1;
      }
    }
    crc &= 0xffff;
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

// ============================================
// EMV QR TLV ENGINE
// ============================================

/**
 * EMV QR Code Builder class for Merchant-Presented Mode
 * Implements EMVCo QR Code Specification with full TLV support
 */
export class EMVQRBuilder {
  private readonly fields: Map<string, string> = new Map();

  /**
   * Encode a TLV (Tag-Length-Value) field
   * Tag: 2 digits, Length: 2 digits (UTF-8 byte length), Value: variable
   * IMPORTANT: Per EMVCo spec, length is in bytes, not characters
   * @throws Error if value exceeds 99 bytes (EMV TLV length limit)
   */
  static encodeTLV(tag: string, value: string): string {
    if (!value?.length) return '';
    const paddedTag = tag.padStart(2, '0');
    // Use UTF-8 byte length for EMV compliance (not JS string length)
    const byteLength = utf8ByteLength(value);
    // EMV TLV lengths are 2 digits, max 99 bytes
    if (byteLength > 99) {
      throw new Error(
        `EMV TLV value for tag ${paddedTag} exceeds 99 bytes (${byteLength} bytes). ` +
          `Please shorten the value.`
      );
    }
    const length = byteLength.toString().padStart(2, '0');
    return `${paddedTag}${length}${value}`;
  }

  /**
   * Build a nested template (e.g., Merchant Account Info, Additional Data)
   */
  static buildTemplate(fields: Array<{ tag: string; value: string }>): string {
    return fields
      .filter((f) => f.value && f.value.length > 0)
      .map((f) => EMVQRBuilder.encodeTLV(f.tag, f.value))
      .join('');
  }

  /** Set payload format indicator (always "01" per spec) */
  setPayloadFormatIndicator(): this {
    this.fields.set(EMV_TAGS.PAYLOAD_FORMAT_INDICATOR, '01');
    return this;
  }

  /** Set point of initiation (static or dynamic) */
  setPointOfInitiation(isStatic: boolean): this {
    this.fields.set(
      EMV_TAGS.POINT_OF_INITIATION,
      isStatic ? POI_METHOD.STATIC : POI_METHOD.DYNAMIC
    );
    return this;
  }

  /** Add a merchant account information template (tags 26-51) */
  addMerchantAccountInfo(
    tag: number,
    gui: string,
    additionalData: Array<{ tag: string; value: string }> = []
  ): this {
    if (tag < 26 || tag > 51) {
      throw new Error('Merchant account info tag must be 26-51');
    }
    const templateFields = [{ tag: MAI_SUBTAGS.GLOBALLY_UNIQUE_ID, value: gui }, ...additionalData];
    const templateValue = EMVQRBuilder.buildTemplate(templateFields);
    this.fields.set(tag.toString().padStart(2, '0'), templateValue);
    return this;
  }

  /** Set Merchant Category Code (MCC) */
  setMCC(mcc: string): this {
    if (mcc && mcc.length === 4) {
      this.fields.set(EMV_TAGS.MERCHANT_CATEGORY_CODE, mcc);
    }
    return this;
  }

  /** Set transaction currency (ISO 4217 numeric) */
  setTransactionCurrency(currencyCode: string): this {
    this.fields.set(EMV_TAGS.TRANSACTION_CURRENCY, currencyCode.padStart(3, '0'));
    return this;
  }

  /** Set transaction amount
   * @param amount - The transaction amount
   * @param currencyCode - Optional ISO 4217 numeric currency code for proper decimal handling
   */
  setTransactionAmount(amount: number, currencyCode?: string): this {
    if (amount > 0) {
      // ISO 4217 currencies with 0 decimal places (minor unit exponent = 0)
      const zeroDecimalCurrencies = new Set([
        '392', // JPY - Japanese Yen
        '410', // KRW - Korean Won
        '704', // VND - Vietnamese Dong
        '348', // HUF - Hungarian Forint
        '352', // ISK - Icelandic Króna
        '901', // TWD - Taiwan Dollar (often treated as 0 decimals)
        '360', // IDR - Indonesian Rupiah (no coins in circulation)
      ]);

      // Format based on currency's minor unit exponent
      const formattedAmount = zeroDecimalCurrencies.has(currencyCode || '')
        ? Math.round(amount).toString()
        : amount.toFixed(2);

      this.fields.set(EMV_TAGS.TRANSACTION_AMOUNT, formattedAmount);
    }
    return this;
  }

  /** Set tip/convenience indicator and value */
  setTipIndicator(indicator: '01' | '02' | '03', value?: number): this {
    this.fields.set(EMV_TAGS.TIP_INDICATOR, indicator);
    if (indicator === '02' && value !== undefined) {
      this.fields.set(EMV_TAGS.TIP_FIXED, value.toFixed(2));
    } else if (indicator === '03' && value !== undefined) {
      this.fields.set(EMV_TAGS.TIP_PERCENTAGE, value.toString());
    }
    return this;
  }

  /** Set country code (ISO 3166-1 alpha-2) */
  setCountryCode(countryCode: string): this {
    this.fields.set(EMV_TAGS.COUNTRY_CODE, countryCode.toUpperCase().substring(0, 2));
    return this;
  }

  /** Set merchant name (max 25 chars per spec) */
  setMerchantName(name: string): this {
    this.fields.set(EMV_TAGS.MERCHANT_NAME, name.substring(0, 25));
    return this;
  }

  /** Set merchant city (max 15 chars per spec) */
  setMerchantCity(city: string): this {
    this.fields.set(EMV_TAGS.MERCHANT_CITY, city.substring(0, 15));
    return this;
  }

  /** Set postal code */
  setPostalCode(postalCode: string): this {
    if (postalCode) {
      this.fields.set(EMV_TAGS.POSTAL_CODE, postalCode.substring(0, 10));
    }
    return this;
  }

  /** Add additional data field template (tag 62) */
  setAdditionalData(data: {
    billNumber?: string;
    mobileNumber?: string;
    storeLabel?: string;
    loyaltyNumber?: string;
    referenceLabel?: string;
    customerLabel?: string;
    terminalLabel?: string;
    purposeOfTransaction?: string;
    additionalConsumerData?: string;
  }): this {
    const templateFields: Array<{ tag: string; value: string }> = [];
    if (data.billNumber)
      templateFields.push({
        tag: ADDITIONAL_DATA_TAGS.BILL_NUMBER,
        value: data.billNumber.substring(0, 25),
      });
    if (data.mobileNumber)
      templateFields.push({
        tag: ADDITIONAL_DATA_TAGS.MOBILE_NUMBER,
        value: data.mobileNumber.substring(0, 25),
      });
    if (data.storeLabel)
      templateFields.push({
        tag: ADDITIONAL_DATA_TAGS.STORE_LABEL,
        value: data.storeLabel.substring(0, 25),
      });
    if (data.loyaltyNumber)
      templateFields.push({
        tag: ADDITIONAL_DATA_TAGS.LOYALTY_NUMBER,
        value: data.loyaltyNumber.substring(0, 25),
      });
    if (data.referenceLabel)
      templateFields.push({
        tag: ADDITIONAL_DATA_TAGS.REFERENCE_LABEL,
        value: data.referenceLabel.substring(0, 25),
      });
    if (data.customerLabel)
      templateFields.push({
        tag: ADDITIONAL_DATA_TAGS.CUSTOMER_LABEL,
        value: data.customerLabel.substring(0, 25),
      });
    if (data.terminalLabel)
      templateFields.push({
        tag: ADDITIONAL_DATA_TAGS.TERMINAL_LABEL,
        value: data.terminalLabel.substring(0, 25),
      });
    if (data.purposeOfTransaction)
      templateFields.push({
        tag: ADDITIONAL_DATA_TAGS.PURPOSE_OF_TRANSACTION,
        value: data.purposeOfTransaction.substring(0, 25),
      });
    if (data.additionalConsumerData)
      templateFields.push({
        tag: ADDITIONAL_DATA_TAGS.ADDITIONAL_CONSUMER_DATA,
        value: data.additionalConsumerData.substring(0, 3),
      });

    if (templateFields.length > 0) {
      const templateValue = EMVQRBuilder.buildTemplate(templateFields);
      this.fields.set(EMV_TAGS.ADDITIONAL_DATA, templateValue);
    }
    return this;
  }

  /** Set a raw field by tag */
  setField(tag: string, value: string): this {
    if (value && value.length > 0) {
      this.fields.set(tag.padStart(2, '0'), value);
    }
    return this;
  }

  /**
   * Build the final EMV QR code string with CRC
   * Fields are sorted by tag number, CRC (63) is always last
   */
  build(): string {
    // Sort fields by tag number (ascending)
    const sortedTags = Array.from(this.fields.keys()).sort(
      (a, b) => Number.parseInt(a, 10) - Number.parseInt(b, 10)
    );

    // Build payload without CRC
    let payload = '';
    for (const tag of sortedTags) {
      const value = this.fields.get(tag);
      if (value) {
        payload += EMVQRBuilder.encodeTLV(tag, value);
      }
    }

    // Add CRC placeholder (tag 63, length 04)
    payload += '6304';

    // Calculate and append CRC
    const crc = crc16CCITT(payload);
    payload += crc;

    return payload;
  }

  /** Create a new builder instance */
  static create(): EMVQRBuilder {
    return new EMVQRBuilder();
  }
}

/**
 * Parse an EMV QR code string into its component TLV fields
 * IMPORTANT: Uses UTF-8 byte offsets for correct parsing of non-ASCII content
 */
export function parseEMVQR(payload: string): Map<string, string> {
  const fields = new Map<string, string>();
  // Convert to UTF-8 bytes for correct byte-based parsing
  const bytes = new TextEncoder().encode(payload);
  const decoder = new TextDecoder();
  let pos = 0;

  while (pos < bytes.length - 4) {
    // -4 for CRC
    // Tag is 2 ASCII characters (2 bytes) - use subarray for performance (no copy)
    const tag = decoder.decode(bytes.subarray(pos, pos + 2));
    // Length is 2 ASCII digits (2 bytes)
    const lengthStr = decoder.decode(bytes.subarray(pos + 2, pos + 4));
    const length = Number.parseInt(lengthStr, 10);
    if (Number.isNaN(length) || length < 0) {
      break; // Invalid length, stop parsing
    }
    // Value is `length` bytes
    const value = decoder.decode(bytes.subarray(pos + 4, pos + 4 + length));
    fields.set(tag, value);
    pos += 4 + length;
  }

  return fields;
}

/**
 * Validate an EMV QR code CRC
 */
export function validateEMVQRCRC(payload: string): boolean {
  if (payload.length < 8) return false;
  const withoutCRC = payload.substring(0, payload.length - 4);
  const providedCRC = payload.substring(payload.length - 4);
  const calculatedCRC = crc16CCITT(`${withoutCRC}6304`);
  return providedCRC.toUpperCase() === calculatedCRC;
}

// ============================================
// CORE PAYLOAD GENERATORS
// ============================================

/** Generate URL payload with optional UTM parameters */
export function generateUrl(params: UrlHelper): string {
  let url = params.href;

  if (params.forceHttps && url.startsWith('http://')) {
    url = url.replace('http://', 'https://');
  }

  const utmParams = new URLSearchParams();
  if (params.utmSource) utmParams.set('utm_source', params.utmSource);
  if (params.utmMedium) utmParams.set('utm_medium', params.utmMedium);
  if (params.utmCampaign) utmParams.set('utm_campaign', params.utmCampaign);
  if (params.utmTerm) utmParams.set('utm_term', params.utmTerm);
  if (params.utmContent) utmParams.set('utm_content', params.utmContent);

  const paramStr = utmParams.toString();
  if (paramStr) {
    url += url.includes('?') ? '&' : '?';
    url += paramStr;
  }

  return url;
}

/** Generate telephone URI */
export function generateTel(params: TelHelper): string {
  return `tel:${params.number.replaceAll(/\s+/g, '')}`;
}

/** Generate email (mailto) URI */
export function generateEmail(params: EmailHelper): string {
  let mailto = `mailto:${params.to}`;
  const queryParams = new URLSearchParams();

  if (params.subject) queryParams.set('subject', params.subject);
  if (params.body) queryParams.set('body', params.body);

  const paramStr = queryParams.toString();
  if (paramStr) mailto += `?${paramStr}`;

  return mailto;
}

/** Generate SMS URI */
export function generateSms(params: SmsHelper): string {
  let sms = `sms:${params.number}`;
  if (params.body) {
    sms += `?body=${encodeURIComponent(params.body)}`;
  }
  return sms;
}

/** Generate Geo URI */
export function generateGeo(params: GeoHelper): string {
  let geo = `geo:${params.lat},${params.lon}`;
  if (params.query) {
    geo += `?q=${encodeURIComponent(params.query)}`;
  }
  return geo;
}

// ============================================
// WIFI GENERATOR
// ============================================

/** Generate WiFi configuration string */
export function generateWifi(params: WifiHelper): string {
  const escapeWifi = (s: string) => s.replaceAll(/[\\";,:]/g, String.raw`\$&`);

  let wifi = 'WIFI:';
  wifi += `T:${params.auth};`;
  wifi += `S:${escapeWifi(params.ssid)};`;

  if (params.password && params.auth !== 'nopass') {
    wifi += `P:${escapeWifi(params.password)};`;
  }

  if (params.hidden) {
    wifi += 'H:true;';
  }

  // EAP parameters for enterprise WiFi
  if (params.eapIdentity) wifi += `I:${escapeWifi(params.eapIdentity)};`;
  if (params.eapAnonymous) wifi += `A:${escapeWifi(params.eapAnonymous)};`;
  if (params.eapPhase2) wifi += `PH2:${params.eapPhase2};`;

  wifi += ';';
  return wifi;
}

// ============================================
// VCARD GENERATOR
// ============================================

/** Generate vCard string (2.1, 3.0, or 4.0) */
export function generateVCard(params: VCardHelper): string {
  const lines: string[] = [];

  lines.push('BEGIN:VCARD', `VERSION:${params.version}`);

  // Full name (required)
  if (params.fn) {
    lines.push(`FN:${escapeValue(params.fn)}`);
  }

  // Structured name
  if (params.n) {
    lines.push(`N:${escapeValue(params.n)}`);
  } else if (params.fn) {
    // Generate N from FN if not provided
    const parts = params.fn.split(' ');
    if (parts.length >= 2) {
      const lastName = parts.pop() || '';
      const firstName = parts.join(' ');
      lines.push(`N:${escapeValue(lastName)};${escapeValue(firstName)};;;`);
    } else {
      lines.push(`N:${escapeValue(params.fn)};;;;`);
    }
  }

  // Organization
  if (params.org) {
    lines.push(`ORG:${escapeValue(params.org)}`);
  }

  // Title
  if (params.title) {
    lines.push(`TITLE:${escapeValue(params.title)}`);
  }

  // Role
  if (params.role) {
    lines.push(`ROLE:${escapeValue(params.role)}`);
  }

  // Phone numbers
  if (params.tel) {
    for (const tel of params.tel) {
      if (params.version === '4.0') {
        lines.push(`TEL;TYPE=voice:${tel}`);
      } else {
        lines.push(`TEL:${tel}`);
      }
    }
  }

  // Email addresses
  if (params.email) {
    for (const email of params.email) {
      if (params.version === '4.0') {
        lines.push(`EMAIL:${email}`);
      } else {
        lines.push(`EMAIL;TYPE=INTERNET:${email}`);
      }
    }
  }

  // URL
  if (params.url) {
    lines.push(`URL:${params.url}`);
  }

  // Addresses
  if (params.adr) {
    for (const adr of params.adr) {
      lines.push(`ADR:${escapeValue(adr)}`);
    }
  }

  // Birthday
  if (params.bday) {
    lines.push(`BDAY:${params.bday}`);
  }

  // Photo URL
  if (params.photo) {
    if (params.version === '4.0') {
      lines.push(`PHOTO:${params.photo}`);
    } else {
      lines.push(`PHOTO;VALUE=URI:${params.photo}`);
    }
  }

  // Note
  if (params.note) {
    lines.push(`NOTE:${escapeValue(params.note)}`);
  }

  // Instant messaging
  if (params.impp) {
    lines.push(`IMPP:${params.impp}`);
  }

  // UID
  if (params.uid) {
    lines.push(`UID:${params.uid}`);
  }

  lines.push('END:VCARD');

  return lines.join('\n');
}

// ============================================
// MECARD GENERATOR
// ============================================

/** Generate MeCard string (Japanese format, more compact than vCard) */
export function generateMeCard(params: MeCardHelper): string {
  const escapeMeCard = (s: string) => s.replaceAll(/[\\";,:]/g, String.raw`\$&`);

  let mecard = 'MECARD:';

  if (params.n) mecard += `N:${escapeMeCard(params.n)};`;
  if (params.nickname) mecard += `NICKNAME:${escapeMeCard(params.nickname)};`;
  if (params.org) mecard += `ORG:${escapeMeCard(params.org)};`;
  if (params.tel) mecard += `TEL:${params.tel};`;
  if (params.email) mecard += `EMAIL:${params.email};`;
  if (params.url) mecard += `URL:${params.url};`;
  if (params.adr) mecard += `ADR:${escapeMeCard(params.adr)};`;
  if (params.bday) mecard += `BDAY:${params.bday.replaceAll('-', '')};`;
  if (params.note) mecard += `NOTE:${escapeMeCard(params.note)};`;

  mecard += ';';
  return mecard;
}

// ============================================
// BIZCARD GENERATOR
// ============================================

/** Generate BizCard format (older format, simple) */
export function generateBizCard(params: BizCardParams): string {
  const lines: string[] = ['BIZCARD:'];

  // Conditionally add fields
  const fields: string[] = [];
  if (params.firstName) fields.push(`N:${params.firstName}`);
  if (params.lastName) fields.push(`X:${params.lastName}`);
  if (params.title) fields.push(`T:${params.title}`);
  if (params.company) fields.push(`C:${params.company}`);
  if (params.phone) fields.push(`B:${params.phone}`);
  if (params.email) fields.push(`E:${params.email}`);
  if (params.address) fields.push(`A:${params.address}`);

  lines.push(...fields, ';');
  return lines.join(';');
}

// ============================================
// CALENDAR EVENT GENERATOR
// ============================================

/** Generate iCalendar VEVENT string */
export function generateEvent(params: EventHelper): string {
  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//ANQR//QR Code Generator//EN',
    'BEGIN:VEVENT',
  ];

  // Generate UID using crypto for uniqueness
  const uid = `${Date.now()}-${crypto.randomUUID().slice(0, 9)}@anqr`;
  lines.push(`UID:${uid}`);

  // Timestamp
  lines.push(`DTSTAMP:${formatICalDate(new Date().toISOString())}`);

  // Start time
  if (params.start) {
    const startStr = formatICalDate(params.start);
    if (params.tz) {
      lines.push(`DTSTART;TZID=${params.tz}:${startStr}`);
    } else {
      lines.push(`DTSTART:${startStr}`);
    }
  }

  // End time
  if (params.end) {
    const endStr = formatICalDate(params.end);
    if (params.tz) {
      lines.push(`DTEND;TZID=${params.tz}:${endStr}`);
    } else {
      lines.push(`DTEND:${endStr}`);
    }
  }

  // Summary (title)
  if (params.summary) {
    lines.push(`SUMMARY:${escapeValue(params.summary)}`);
  }

  // Description
  if (params.description) {
    lines.push(`DESCRIPTION:${escapeValue(params.description)}`);
  }

  // Location
  if (params.location) {
    lines.push(`LOCATION:${escapeValue(params.location)}`);
  }

  // Recurrence rule
  if (params.rrule) {
    lines.push(`RRULE:${params.rrule}`);
  }

  lines.push('END:VEVENT', 'END:VCALENDAR');

  return lines.join('\n');
}

/** Generate calendar subscription URL (webcal://) */
export function generateCalendarSubscription(url: string): string {
  if (url.startsWith('http://')) {
    return url.replace('http://', 'webcal://');
  }
  if (url.startsWith('https://')) {
    return url.replace('https://', 'webcal://');
  }
  return `webcal://${url}`;
}

// ============================================
// PAYMENT GENERATORS
// ============================================

/**
 * Generate EPC/SEPA payment QR code (EU bank transfer)
 * Follows EPC QR Code Standard Version 2.0
 * Used across SEPA zone (EU + CH, NO, IS, LI, MC, SM)
 */
export function generateEPCSepa(params: EPCSepaParams): string {
  // Service tag, Version (002 = 2.0), Character set (1 = UTF-8), Identification code (SEPA Credit Transfer)
  // BIC (optional for domestic), Beneficiary name (max 70), IBAN
  const lines: string[] = [
    'BCD',
    '002',
    '1',
    'SCT',
    params.bic || '',
    params.name.substring(0, 70),
    params.iban.replaceAll(/\s/g, '').toUpperCase(),
  ];

  // Amount (EUR format with currency prefix)
  if (params.amount !== undefined && params.amount > 0) {
    lines.push(`EUR${params.amount.toFixed(2)}`);
  } else {
    lines.push('');
  }

  // Purpose code (AT-44, optional), Structured reference (max 35), Unstructured remittance info (max 140), Beneficiary to originator info (optional)
  lines.push(
    '',
    params.reference?.substring(0, 35) || '',
    params.text?.substring(0, 140) || '',
    ''
  );

  return lines.join('\n');
}

/**
 * Generate UPI payment URI (India)
 * Follows NPCI UPI Deep Linking Specification
 */
export function generateUPI(params: UPIParams): string {
  const queryParams = new URLSearchParams();

  // Required: Payee VPA
  queryParams.set('pa', params.pa);

  // Optional fields per NPCI spec
  if (params.pn) queryParams.set('pn', params.pn);
  if (params.am !== undefined && params.am > 0) queryParams.set('am', params.am.toFixed(2));
  queryParams.set('cu', params.cu || 'INR');
  if (params.tn) queryParams.set('tn', params.tn.substring(0, 50));
  if (params.tr) queryParams.set('tr', params.tr.substring(0, 35));
  if (params.mc) queryParams.set('mc', params.mc);
  if (params.tid) queryParams.set('tid', params.tid);
  if (params.url) queryParams.set('url', params.url);
  if (params.mode) queryParams.set('mode', params.mode);
  if (params.purpose) queryParams.set('purpose', params.purpose);
  if (params.orgid) queryParams.set('orgid', params.orgid);
  if (params.sign) queryParams.set('sign', params.sign);

  return `upi://pay?${queryParams.toString()}`;
}

/**
 * Generate PayNow QR code (Singapore)
 * Uses EMVCo QR Code Specification with SGQR profile
 */
export function generatePayNow(params: PayNowParams): string {
  const builder = EMVQRBuilder.create()
    .setPayloadFormatIndicator()
    .setPointOfInitiation(!params.amount); // Static if no amount, dynamic if amount specified

  // PayNow proxy type mapping
  const proxyTypeCode = {
    mobile: '0',
    uen: '2',
    nric: '1',
  }[params.type];

  // Build merchant account info (tag 26 for SGQR/PayNow)
  const maiData: Array<{ tag: string; value: string }> = [
    { tag: '01', value: proxyTypeCode },
    { tag: '02', value: params.value },
    { tag: '03', value: params.editable ? '1' : '0' }, // Amount editable flag
  ];
  if (params.expiryDate) {
    maiData.push({ tag: '04', value: params.expiryDate });
  }

  builder.addMerchantAccountInfo(26, PAYMENT_SCHEME_GUI.PAYNOW, maiData);

  // Transaction currency (702 = SGD)
  builder.setTransactionCurrency(ISO_CURRENCY.SGD);

  // Transaction amount
  if (params.amount !== undefined && params.amount > 0) {
    builder.setTransactionAmount(params.amount);
  }

  builder.setCountryCode('SG');

  // Merchant name and city
  if (params.merchantName) {
    builder.setMerchantName(params.merchantName);
  }
  if (params.merchantCity) {
    builder.setMerchantCity(params.merchantCity);
  }

  // Reference in additional data
  if (params.reference) {
    builder.setAdditionalData({ referenceLabel: params.reference });
  }

  return builder.build();
}

/**
 * Generate PromptPay QR code (Thailand)
 * Uses EMVCo QR Code Specification with Bank of Thailand profile
 */
export function generatePromptPay(params: PromptPayParams): string {
  const builder = EMVQRBuilder.create()
    .setPayloadFormatIndicator()
    .setPointOfInitiation(!params.amount);

  // PromptPay AID based on type
  const aidMap = {
    mobile: PAYMENT_SCHEME_GUI.PROMPTPAY_MOBILE,
    id: PAYMENT_SCHEME_GUI.PROMPTPAY_TAX_ID,
    ewallet: PAYMENT_SCHEME_GUI.PROMPTPAY_EWALLET,
    billpay: PAYMENT_SCHEME_GUI.PROMPTPAY_BILLPAY,
  };
  const aid = aidMap[params.type];

  // Format mobile number with country code
  let formattedValue = params.value.replaceAll(/[\s-]/g, '');
  if (params.type === 'mobile' && formattedValue.startsWith('0')) {
    formattedValue = `66${formattedValue.substring(1)}`;
  }

  // Build merchant account info
  const maiData: Array<{ tag: string; value: string }> = [{ tag: '01', value: formattedValue }];

  // Add bill payment references if applicable
  if (params.type === 'billpay') {
    if (params.ref1) maiData.push({ tag: '02', value: params.ref1 });
    if (params.ref2) maiData.push({ tag: '03', value: params.ref2 });
  }

  builder.addMerchantAccountInfo(29, aid, maiData);

  // Additional PromptPay template (tag 30) for bill payment
  if (params.type === 'billpay' && params.ref3) {
    builder.addMerchantAccountInfo(30, PAYMENT_SCHEME_GUI.PROMPTPAY_BILLPAY, [
      { tag: '01', value: params.ref3 },
    ]);
  }

  // MCC
  if (params.mcc) {
    builder.setMCC(params.mcc);
  }

  // Transaction currency (764 = THB)
  builder.setTransactionCurrency(ISO_CURRENCY.THB);

  // Transaction amount
  if (params.amount !== undefined && params.amount > 0) {
    builder.setTransactionAmount(params.amount);
  }

  builder.setCountryCode(params.countryCode || 'TH');

  // Merchant name and city
  if (params.merchantName) {
    builder.setMerchantName(params.merchantName);
  }
  if (params.merchantCity) {
    builder.setMerchantCity(params.merchantCity);
  }

  return builder.build();
}

/**
 * Generate PIX QR code (Brazil)
 * Follows BCB (Central Bank of Brazil) BR Code specification
 */
export function generatePIX(params: PIXParams): string {
  const builder = EMVQRBuilder.create()
    .setPayloadFormatIndicator()
    .setPointOfInitiation(!params.amount); // Static if no amount

  // PIX merchant account info
  const maiData: Array<{ tag: string; value: string }> = [{ tag: '01', value: params.key }];
  if (params.description) {
    maiData.push({ tag: '02', value: params.description.substring(0, 72) });
  }
  if (params.url) {
    maiData.push({ tag: '25', value: params.url });
  }

  builder.addMerchantAccountInfo(26, PAYMENT_SCHEME_GUI.PIX, maiData);

  // Default MCC for PIX (0000 = not applicable)
  builder.setMCC('0000');

  // Transaction currency (986 = BRL)
  builder.setTransactionCurrency(ISO_CURRENCY.BRL);

  // Transaction amount
  if (params.amount !== undefined && params.amount > 0) {
    builder.setTransactionAmount(params.amount);
  }

  builder.setCountryCode('BR');

  // Merchant name and city (required for PIX)
  if (params.name) {
    builder.setMerchantName(params.name);
  }
  if (params.city) {
    builder.setMerchantCity(params.city);
  }
  if (params.postalCode) {
    builder.setPostalCode(params.postalCode);
  }

  // Transaction ID in additional data
  if (params.txid) {
    builder.setAdditionalData({ referenceLabel: params.txid });
  }

  return builder.build();
}

/**
 * Generate Swiss QR-bill payment code
 * Follows SIX Swiss QR-bill Implementation Guidelines
 * Line-based format (not TLV)
 */
export function generateSwissQRBill(params: SwissQRBillParams): string {
  // Header: QR Type, Version, Coding (1 = UTF-8)
  const lines: string[] = ['SPC', params.version || '0200', '1'];

  // Creditor information
  lines.push(
    params.creditorIBAN.replaceAll(/\s/g, '').toUpperCase(),
    params.creditorAddressType,
    params.creditorName.substring(0, 70),
    ...(params.creditorAddressType === 'S'
      ? [
          params.creditorStreet?.substring(0, 70) || '',
          params.creditorBuildingNumber?.substring(0, 16) || '',
          params.creditorPostalCode?.substring(0, 16) || '',
          params.creditorCity?.substring(0, 35) || '',
        ]
      : [
          // Combined address (K): Address line 1, Address line 2, empty, empty
          params.creditorStreet?.substring(0, 70) || '',
          params.creditorCity?.substring(0, 70) || '',
          '',
          '',
        ]),
    params.creditorCountry.toUpperCase()
  );

  // Ultimate Creditor (optional - usually empty)
  lines.push(
    params.ultimateCreditorAddressType || '',
    params.ultimateCreditorName?.substring(0, 70) || '',
    ...(params.ultimateCreditorAddressType === 'S'
      ? [
          params.ultimateCreditorStreet?.substring(0, 70) || '',
          params.ultimateCreditorBuildingNumber?.substring(0, 16) || '',
          params.ultimateCreditorPostalCode?.substring(0, 16) || '',
          params.ultimateCreditorCity?.substring(0, 35) || '',
        ]
      : [
          params.ultimateCreditorStreet?.substring(0, 70) || '',
          params.ultimateCreditorCity?.substring(0, 70) || '',
          '',
          '',
        ]),
    params.ultimateCreditorCountry?.toUpperCase() || ''
  );

  // Payment amount
  if (params.amount !== undefined && params.amount > 0) {
    lines.push(params.amount.toFixed(2));
  } else {
    lines.push('');
  }
  lines.push(params.currency);

  // Ultimate Debtor (payer - optional)
  lines.push(
    params.ultimateDebtorAddressType || '',
    params.ultimateDebtorName?.substring(0, 70) || '',
    ...(params.ultimateDebtorAddressType === 'S'
      ? [
          params.ultimateDebtorStreet?.substring(0, 70) || '',
          params.ultimateDebtorBuildingNumber?.substring(0, 16) || '',
          params.ultimateDebtorPostalCode?.substring(0, 16) || '',
          params.ultimateDebtorCity?.substring(0, 35) || '',
        ]
      : [
          params.ultimateDebtorStreet?.substring(0, 70) || '',
          params.ultimateDebtorCity?.substring(0, 70) || '',
          '',
          '',
        ]),
    params.ultimateDebtorCountry?.toUpperCase() || ''
  );

  // Reference and Additional information
  lines.push(
    params.referenceType,
    params.reference?.substring(0, 27) || '',
    params.unstructuredMessage?.substring(0, 140) || '',
    params.trailer || 'EPD',
    params.billInformation?.substring(0, 140) || ''
  );

  // Alternative procedures
  if (params.alternativeProcedure1) {
    lines.push(params.alternativeProcedure1.substring(0, 100));
  }
  if (params.alternativeProcedure2) {
    lines.push(params.alternativeProcedure2.substring(0, 100));
  }

  return lines.join('\n');
}

/**
 * Generate Lightning Network invoice URI (BOLT11)
 */
export function generateLightning(params: LightningParams): string {
  // BOLT11 invoice is already encoded, just prepend protocol
  const invoice = params.invoice.toLowerCase().replace(/^lightning:/i, '');
  return `lightning:${invoice}`;
}

/**
 * Generate Ethereum transaction request URI (EIP-681)
 * Format: ethereum:target_address[@chain_id][/function_name]?[parameters]
 */
export function generateEthereumEIP681(params: EthereumEIP681Params): string {
  let uri = 'ethereum:';

  // For ERC-20 token transfers, use the token contract address
  if (params.tokenAddress) {
    uri += params.tokenAddress;
    // Add chain_id if specified
    if (params.chainId && params.chainId !== 1) {
      uri += `@${params.chainId}`;
    }
    // ERC-20 transfer function
    uri += '/transfer';

    const queryParams = new URLSearchParams();
    queryParams.set('address', params.targetAddress);
    if (params.tokenValue) {
      queryParams.set('uint256', params.tokenValue);
    }
    if (params.gas) queryParams.set('gas', params.gas.toString());
    if (params.gasLimit) queryParams.set('gasLimit', params.gasLimit.toString());
    if (params.gasPrice) queryParams.set('gasPrice', params.gasPrice);

    uri += `?${queryParams.toString()}`;
  } else {
    // Native ETH transfer
    uri += params.targetAddress;

    // Add chain_id if not mainnet
    if (params.chainId && params.chainId !== 1) {
      uri += `@${params.chainId}`;
    }

    // Add function name if specified (for contract calls)
    if (params.functionName) {
      uri += `/${params.functionName}`;
    }

    const queryParams = new URLSearchParams();
    if (params.value) queryParams.set('value', params.value);
    if (params.gas) queryParams.set('gas', params.gas.toString());
    if (params.gasLimit) queryParams.set('gasLimit', params.gasLimit.toString());
    if (params.gasPrice) queryParams.set('gasPrice', params.gasPrice);

    // Add arbitrary function parameters
    if (params.functionParams) {
      for (const [key, value] of Object.entries(params.functionParams)) {
        queryParams.set(key, value);
      }
    }

    const paramStr = queryParams.toString();
    if (paramStr) {
      uri += `?${paramStr}`;
    }
  }

  return uri;
}

/**
 * Generate cryptocurrency payment URI (BIP-21 for Bitcoin, etc.)
 */
export function generateCrypto(params: CryptoHelper): string {
  const scheme = params.type.toLowerCase();
  let uri = `${scheme}:${params.address}`;

  const queryParams = new URLSearchParams();
  if (params.amount !== undefined && params.amount > 0) {
    queryParams.set('amount', params.amount.toString());
  }
  if (params.label) {
    queryParams.set('label', params.label);
  }
  // BIP-21 also supports message parameter
  // queryParams.set('message', '...') if needed

  const paramStr = queryParams.toString();
  if (paramStr) {
    uri += `?${paramStr}`;
  }

  return uri;
}

/**
 * Generate PayPal.Me payment link
 */
export function generatePayPalMe(params: PayPalMeParams): string {
  let url = `https://paypal.me/${params.username}`;

  if (params.amount !== undefined && params.amount > 0) {
    url += `/${params.amount.toFixed(2)}`;
    if (params.currencyCode) {
      url += params.currencyCode.toUpperCase();
    }
  }

  return url;
}

/**
 * Generate Cash App ($cashtag) payment link
 */
export function generateCashApp(params: CashAppParams): string {
  // Remove $ if present
  const cashtag = params.cashtag.replace(/^\$/, '');
  let url = `https://cash.app/$${cashtag}`;

  if (params.amount !== undefined && params.amount > 0) {
    url += `/${params.amount.toFixed(2)}`;
  }

  return url;
}

// ============================================
// NATIONAL EMV PAYMENT SCHEME GENERATORS
// ============================================

/**
 * Generate QRIS QR code (Indonesia)
 * Quick Response Code Indonesian Standard
 */
export function generateQRIS(params: QRISParams): string {
  const builder = EMVQRBuilder.create()
    .setPayloadFormatIndicator()
    .setPointOfInitiation(!params.amount);

  // QRIS merchant account (tag 26)
  const maiData: Array<{ tag: string; value: string }> = [{ tag: '01', value: params.merchantID }];
  if (params.merchantCriteria) {
    maiData.push({ tag: '02', value: params.merchantCriteria });
  }
  if (params.nmid) {
    maiData.push({ tag: '03', value: params.nmid });
  }

  builder.addMerchantAccountInfo(26, PAYMENT_SCHEME_GUI.QRIS, maiData);

  // Additional QRIS template (tag 51) for cross-border
  if (params.merchantPAN) {
    builder.addMerchantAccountInfo(51, 'ID.CO.QRIS.WWW', [
      { tag: '01', value: params.merchantPAN },
    ]);
  }

  builder.setTransactionCurrency(ISO_CURRENCY.IDR);

  if (params.amount !== undefined && params.amount > 0) {
    builder.setTransactionAmount(params.amount, ISO_CURRENCY.IDR);
  }

  // Fee/Tip indicator
  if (params.feeType === 'FIXED' && params.feeAmount) {
    builder.setTipIndicator('02', params.feeAmount);
  } else if (params.feeType === 'PERCENT' && params.feeAmount) {
    builder.setTipIndicator('03', params.feeAmount);
  }

  builder.setCountryCode('ID');
  builder.setMerchantName(params.merchantName);
  builder.setMerchantCity(params.merchantCity);

  if (params.postalCode) {
    builder.setPostalCode(params.postalCode);
  }

  if (params.terminalLabel) {
    builder.setAdditionalData({ terminalLabel: params.terminalLabel });
  }

  return builder.build();
}

/**
 * Generate DuitNow QR code (Malaysia)
 */
export function generateDuitNow(params: DuitNowParams): string {
  const builder = EMVQRBuilder.create()
    .setPayloadFormatIndicator()
    .setPointOfInitiation(!params.amount);

  // Proxy type mapping
  const proxyTypeMap: Record<string, string> = {
    NRIC: '01',
    MOBILE: '02',
    PASSPORT: '03',
    ARMY: '04',
    BUSINESS: '05',
    OTHERS: '99',
  };

  const maiData: Array<{ tag: string; value: string }> = [
    { tag: '01', value: proxyTypeMap[params.proxyType] },
    { tag: '02', value: params.proxyValue },
  ];

  builder.addMerchantAccountInfo(26, PAYMENT_SCHEME_GUI.DUITNOW, maiData);

  builder.setTransactionCurrency(ISO_CURRENCY.MYR);

  if (params.amount !== undefined && params.amount > 0) {
    builder.setTransactionAmount(params.amount);
  }

  builder.setCountryCode('MY');
  builder.setMerchantName(params.merchantName);

  if (params.merchantCity) {
    builder.setMerchantCity(params.merchantCity);
  }

  if (params.reference) {
    builder.setAdditionalData({ referenceLabel: params.reference });
  }

  return builder.build();
}

/**
 * Generate BharatQR code (India)
 * Unified QR for card + UPI payments
 */
export function generateBharatQR(params: BharatQRParams): string {
  const builder = EMVQRBuilder.create()
    .setPayloadFormatIndicator()
    .setPointOfInitiation(!params.amount);

  // BharatQR merchant account (can include both UPI VPA and card PAN)
  const maiData: Array<{ tag: string; value: string }> = [];

  if (params.merchantVPA) {
    maiData.push({ tag: '01', value: params.merchantVPA });
  }
  if (params.merchantPAN) {
    maiData.push({ tag: '02', value: params.merchantPAN });
  }
  if (params.merchantID) {
    maiData.push({ tag: '03', value: params.merchantID });
  }

  builder.addMerchantAccountInfo(26, PAYMENT_SCHEME_GUI.BHARATQR, maiData);

  if (params.mcc) {
    builder.setMCC(params.mcc);
  }

  builder.setTransactionCurrency(ISO_CURRENCY.INR);

  if (params.amount !== undefined && params.amount > 0) {
    builder.setTransactionAmount(params.amount);
  }

  builder.setCountryCode('IN');
  builder.setMerchantName(params.merchantName);
  builder.setMerchantCity(params.merchantCity);

  // Additional data for BharatQR
  const additionalData: Record<string, string> = {};
  if (params.referenceNumber) additionalData.referenceLabel = params.referenceNumber;
  if (params.terminalId) additionalData.terminalLabel = params.terminalId;
  if (Object.keys(additionalData).length > 0) {
    builder.setAdditionalData(additionalData);
  }

  return builder.build();
}

/**
 * Generate VietQR code (Vietnam)
 */
export function generateVietQR(params: VietQRParams): string {
  const builder = EMVQRBuilder.create()
    .setPayloadFormatIndicator()
    .setPointOfInitiation(!params.amount);

  // VietQR uses bank BIN + account structure
  const maiData: Array<{ tag: string; value: string }> = [
    { tag: '01', value: params.bankBin },
    { tag: '02', value: params.accountNumber },
  ];
  if (params.serviceCode) {
    maiData.push({ tag: '03', value: params.serviceCode });
  }

  builder.addMerchantAccountInfo(38, PAYMENT_SCHEME_GUI.VIETQR, maiData);

  builder.setTransactionCurrency(ISO_CURRENCY.VND);

  if (params.amount !== undefined && params.amount > 0) {
    builder.setTransactionAmount(params.amount, ISO_CURRENCY.VND);
  }

  builder.setCountryCode('VN');

  if (params.accountName) {
    builder.setMerchantName(params.accountName);
  }

  if (params.description) {
    builder.setAdditionalData({ purposeOfTransaction: params.description });
  }

  return builder.build();
}

/**
 * Generate QR Ph code (Philippines)
 */
export function generateQRPh(params: QRPhParams): string {
  const builder = EMVQRBuilder.create()
    .setPayloadFormatIndicator()
    .setPointOfInitiation(!params.amount);

  builder.addMerchantAccountInfo(26, PAYMENT_SCHEME_GUI.QRPH, [
    { tag: '01', value: params.accountNumber },
  ]);

  builder.setTransactionCurrency(ISO_CURRENCY.PHP);

  if (params.amount !== undefined && params.amount > 0) {
    builder.setTransactionAmount(params.amount);
  }

  builder.setCountryCode('PH');
  builder.setMerchantName(params.merchantName);
  builder.setMerchantCity(params.merchantCity);

  if (params.reference) {
    builder.setAdditionalData({ referenceLabel: params.reference });
  }

  return builder.build();
}

/**
 * Generate TWQR code (Taiwan)
 */
export function generateTWQR(params: TWQRParams): string {
  const builder = EMVQRBuilder.create()
    .setPayloadFormatIndicator()
    .setPointOfInitiation(!params.amount);

  const maiData: Array<{ tag: string; value: string }> = [{ tag: '01', value: params.merchantId }];
  if (params.taxId) {
    maiData.push({ tag: '02', value: params.taxId });
  }

  builder.addMerchantAccountInfo(26, PAYMENT_SCHEME_GUI.TWQR, maiData);

  builder.setTransactionCurrency(ISO_CURRENCY.TWD);

  if (params.amount !== undefined && params.amount > 0) {
    builder.setTransactionAmount(params.amount, ISO_CURRENCY.TWD);
  }

  builder.setCountryCode('TW');
  builder.setMerchantName(params.merchantName);

  if (params.merchantCity) {
    builder.setMerchantCity(params.merchantCity);
  }

  return builder.build();
}

/**
 * Generate HKQR / FPS QR code (Hong Kong)
 */
export function generateHKQR(params: HKQRParams): string {
  const builder = EMVQRBuilder.create()
    .setPayloadFormatIndicator()
    .setPointOfInitiation(!params.amount);

  // FPS supports multiple proxy types
  const maiData: Array<{ tag: string; value: string }> = [];
  if (params.fpsId) {
    maiData.push({ tag: '01', value: params.fpsId });
  }
  if (params.mobileNumber) {
    maiData.push({ tag: '02', value: params.mobileNumber });
  }
  if (params.email) {
    maiData.push({ tag: '03', value: params.email });
  }

  builder.addMerchantAccountInfo(26, PAYMENT_SCHEME_GUI.HKFPS, maiData);

  builder.setTransactionCurrency(ISO_CURRENCY.HKD);

  if (params.amount !== undefined && params.amount > 0) {
    builder.setTransactionAmount(params.amount);
  }

  builder.setCountryCode('HK');
  builder.setMerchantName(params.merchantName);

  if (params.merchantCity) {
    builder.setMerchantCity(params.merchantCity);
  }

  if (params.reference) {
    builder.setAdditionalData({ referenceLabel: params.reference });
  }

  return builder.build();
}

/**
 * Generate JPQR code (Japan)
 */
export function generateJPQR(params: JPQRParams): string {
  const builder = EMVQRBuilder.create()
    .setPayloadFormatIndicator()
    .setPointOfInitiation(!params.amount);

  builder.addMerchantAccountInfo(26, PAYMENT_SCHEME_GUI.JPQR, [
    { tag: '01', value: params.storeId },
  ]);

  builder.setTransactionCurrency(ISO_CURRENCY.JPY);

  if (params.amount !== undefined && params.amount > 0) {
    builder.setTransactionAmount(params.amount, ISO_CURRENCY.JPY);
  }

  builder.setCountryCode('JP');
  builder.setMerchantName(params.merchantName);

  if (params.merchantCity) {
    builder.setMerchantCity(params.merchantCity);
  }

  return builder.build();
}

/**
 * Generate AusPayNet/NPP PayID QR code (Australia)
 * Per NPP QR Code Standard: Need either PayID OR BSB+AccountNumber for routing
 * MerchantName is OPTIONAL - payer sees registered name from NPP lookup during payment
 */
export function generateAusPayNet(params: AusPayNetParams): string {
  const builder = EMVQRBuilder.create()
    .setPayloadFormatIndicator()
    .setPointOfInitiation(!params.amount);

  const maiData: Array<{ tag: string; value: string }> = [];

  // PayID with type
  if (params.payId && params.payIdType) {
    maiData.push({ tag: '01', value: params.payIdType });
    maiData.push({ tag: '02', value: params.payId });
  }

  // Traditional BSB + Account
  if (params.bsb && params.accountNumber) {
    maiData.push({ tag: '03', value: params.bsb });
    maiData.push({ tag: '04', value: params.accountNumber });
  }

  builder.addMerchantAccountInfo(26, PAYMENT_SCHEME_GUI.AUSPAYNET, maiData);

  builder.setTransactionCurrency(ISO_CURRENCY.AUD);

  if (params.amount !== undefined && params.amount > 0) {
    builder.setTransactionAmount(params.amount);
  }

  builder.setCountryCode('AU');

  // MerchantName is optional - if provided, include it; otherwise NPP lookup shows registered name
  if (params.merchantName) {
    builder.setMerchantName(params.merchantName);
  }

  if (params.merchantCity) {
    builder.setMerchantCity(params.merchantCity);
  }

  if (params.reference) {
    builder.setAdditionalData({ referenceLabel: params.reference });
  }

  return builder.build();
}

/**
 * Generate a generic EMV MPM QR code
 * Use this for custom EMV-based payment schemes
 */
export function generateEMVMPM(params: EMVMPMParams): string {
  const builder = EMVQRBuilder.create()
    .setPayloadFormatIndicator()
    .setPointOfInitiation(params.isStatic ?? true);

  // Add merchant accounts
  if (params.merchantAccounts) {
    for (const account of params.merchantAccounts) {
      builder.addMerchantAccountInfo(account.tag, account.gui, account.data);
    }
  }

  if (params.mcc) {
    builder.setMCC(params.mcc);
  }

  builder.setTransactionCurrency(params.currencyCode);

  if (params.amount !== undefined && params.amount > 0) {
    builder.setTransactionAmount(params.amount, params.currencyCode);
  }

  if (params.tipIndicator) {
    let tipValue: number | undefined;
    if (params.tipIndicator === '02') {
      tipValue = params.tipFixed;
    } else if (params.tipIndicator === '03') {
      tipValue = params.tipPercentage;
    }
    builder.setTipIndicator(params.tipIndicator, tipValue);
  }

  builder.setCountryCode(params.countryCode);
  builder.setMerchantName(params.merchantName);
  builder.setMerchantCity(params.merchantCity);

  if (params.postalCode) {
    builder.setPostalCode(params.postalCode);
  }

  // Additional data
  const additionalData: Record<string, string> = {};
  if (params.billNumber) additionalData.billNumber = params.billNumber;
  if (params.mobileNumber) additionalData.mobileNumber = params.mobileNumber;
  if (params.storeLabel) additionalData.storeLabel = params.storeLabel;
  if (params.loyaltyNumber) additionalData.loyaltyNumber = params.loyaltyNumber;
  if (params.referenceLabel) additionalData.referenceLabel = params.referenceLabel;
  if (params.customerLabel) additionalData.customerLabel = params.customerLabel;
  if (params.terminalLabel) additionalData.terminalLabel = params.terminalLabel;
  if (params.purposeOfTransaction)
    additionalData.purposeOfTransaction = params.purposeOfTransaction;

  if (Object.keys(additionalData).length > 0) {
    builder.setAdditionalData(additionalData);
  }

  return builder.build();
}

// ============================================
// ENTERPRISE/INDUSTRIAL GENERATORS
// ============================================

/** Generate GS1 Digital Link URI */
export function generateGS1DigitalLink(params: GS1DigitalLinkParams): string {
  const baseUrl = params.baseUrl || 'https://id.gs1.org';
  let uri = `${baseUrl}/01/${params.gtin}`;

  const pathSegments: string[] = [];
  if (params.lot) pathSegments.push(`10/${params.lot}`);
  if (params.ser) pathSegments.push(`21/${params.ser}`);
  if (params.expiry) pathSegments.push(`17/${params.expiry}`);

  if (pathSegments.length > 0) {
    uri += `/${pathSegments.join('/')}`;
  }

  return uri;
}

/** Generate OTPAuth URI (TOTP/HOTP) */
export function generateOTPAuth(params: OTPAuthParams): string {
  const type = params.type || 'totp';
  const label =
    params.issuer && params.account
      ? `${encodeURIComponent(params.issuer)}:${encodeURIComponent(params.account)}`
      : encodeURIComponent(params.account || 'user');

  const uri = `otpauth://${type}/${label}`;

  const queryParams = new URLSearchParams();
  queryParams.set('secret', params.secret);

  if (params.issuer) queryParams.set('issuer', params.issuer);
  if (params.algorithm && params.algorithm !== 'SHA1') {
    queryParams.set('algorithm', params.algorithm);
  }
  if (params.digits && params.digits !== 6) {
    queryParams.set('digits', params.digits.toString());
  }
  if (type === 'totp' && params.period && params.period !== 30) {
    queryParams.set('period', params.period.toString());
  }
  if (type === 'hotp' && params.counter !== undefined) {
    queryParams.set('counter', params.counter.toString());
  }

  return `${uri}?${queryParams.toString()}`;
}

// ============================================
// SOCIAL/MESSAGING GENERATORS
// ============================================

/** Generate social profile deep link */
export function generateSocialProfile(platform: string, username: string): string {
  const platformLinks: Record<string, (u: string) => string> = {
    twitter: (u) => `https://twitter.com/${u}`,
    x: (u) => `https://x.com/${u}`,
    instagram: (u) => `https://instagram.com/${u}`,
    facebook: (u) => `https://facebook.com/${u}`,
    linkedin: (u) => `https://linkedin.com/in/${u}`,
    github: (u) => `https://github.com/${u}`,
    youtube: (u) => `https://youtube.com/@${u}`,
    tiktok: (u) => `https://tiktok.com/@${u}`,
    snapchat: (u) => `https://snapchat.com/add/${u}`,
    pinterest: (u) => `https://pinterest.com/${u}`,
    reddit: (u) => `https://reddit.com/u/${u}`,
    discord: (u) => `https://discord.gg/${u}`,
    twitch: (u) => `https://twitch.tv/${u}`,
  };

  const generator = platformLinks[platform.toLowerCase()];
  if (generator) {
    return generator(username);
  }

  return `https://${platform}.com/${username}`;
}

/** Generate messaging app deep link */
export function generateMessagingLink(
  platform: string,
  identifier: string,
  message?: string
): string {
  switch (platform.toLowerCase()) {
    case 'whatsapp': {
      let url = `https://wa.me/${identifier.replaceAll(/\D/g, '')}`;
      if (message) url += `?text=${encodeURIComponent(message)}`;
      return url;
    }
    case 'telegram': {
      let url = `https://t.me/${identifier}`;
      if (message) url += `?text=${encodeURIComponent(message)}`;
      return url;
    }
    case 'signal':
      return `https://signal.me/#p/${identifier}`;
    case 'viber':
      return `viber://chat?number=${identifier.replaceAll(/\D/g, '')}`;
    case 'line':
      return `https://line.me/ti/p/${identifier}`;
    case 'skype':
      return `skype:${identifier}?chat`;
    default:
      return identifier;
  }
}

/** Generate app deep link (Android intent or iOS universal link) */
export function generateAppDeepLink(
  platform: 'android' | 'ios' | 'universal',
  params: {
    scheme?: string;
    host?: string;
    path?: string;
    package?: string;
    fallbackUrl?: string;
  }
): string {
  if (platform === 'android' && params.package) {
    // Android intent URL
    let intent = `intent://${params.host || ''}${params.path || ''}#Intent;`;
    if (params.scheme) intent += `scheme=${params.scheme};`;
    intent += `package=${params.package};`;
    if (params.fallbackUrl) {
      intent += `S.browser_fallback_url=${encodeURIComponent(params.fallbackUrl)};`;
    }
    intent += 'end';
    return intent;
  }

  // iOS/Universal link
  if (params.scheme) {
    return `${params.scheme}://${params.host || ''}${params.path || ''}`;
  }

  return `https://${params.host || ''}${params.path || ''}`;
}

// ============================================
// EXPORT ALL
// ============================================

export const PayloadGenerators = {
  // Core
  url: generateUrl,
  tel: generateTel,
  email: generateEmail,
  sms: generateSms,
  geo: generateGeo,
  wifi: generateWifi,

  // Contact
  vcard: generateVCard,
  mecard: generateMeCard,
  bizcard: generateBizCard,

  // Calendar
  event: generateEvent,
  calendarSubscription: generateCalendarSubscription,

  // Payments - EU/International
  epcSepa: generateEPCSepa,
  swissQRBill: generateSwissQRBill,

  // Payments - Asia-Pacific
  upi: generateUPI,
  bharatqr: generateBharatQR,
  paynow: generatePayNow,
  promptpay: generatePromptPay,
  pix: generatePIX,
  qris: generateQRIS,
  duitnow: generateDuitNow,
  vietqr: generateVietQR,
  qrph: generateQRPh,
  twqr: generateTWQR,
  hkqr: generateHKQR,
  jpqr: generateJPQR,
  auspaynet: generateAusPayNet,

  // Payments - Crypto
  crypto: generateCrypto,
  lightning: generateLightning,
  ethereumEIP681: generateEthereumEIP681,

  // Payments - Links
  paypalme: generatePayPalMe,
  cashapp: generateCashApp,

  // Generic EMV
  emvmpm: generateEMVMPM,

  // Enterprise
  gs1DigitalLink: generateGS1DigitalLink,
  otpauth: generateOTPAuth,

  // Social/Messaging
  socialProfile: generateSocialProfile,
  messagingLink: generateMessagingLink,
  appDeepLink: generateAppDeepLink,
};

export default PayloadGenerators;
