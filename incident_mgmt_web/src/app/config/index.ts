import { EnumLiteralsOf } from 'common/types';

declare global {
  interface Window {
    REACT_APP_TARGET_ENV?: string;
    REACT_APP_API_URL?: string;
    REACT_APP_MEMBER_ZONE_URL?: string;
    REACT_APP_ORIGINS_WHITELIST?: string[];
    // financialNews iframe
    financialNews?: Window;
  }
}

export type TargetEnvItem = EnumLiteralsOf<typeof TargetEnvItems>;

export const TargetEnvItems = Object.freeze({
  // we need to explicitly cast values to get the proper literal type
  devcloud: 'devcloud' as 'devcloud',
  production: 'production' as 'production',
});

export const TARGET_ENV =
  window.REACT_APP_TARGET_ENV || process.env.REACT_APP_TARGET_ENV || 'production';
export const API_URL = window.REACT_APP_API_URL || process.env.REACT_APP_API_URL;
export const MEMBER_ZONE_URL =
  window.REACT_APP_MEMBER_ZONE_URL || process.env.REACT_APP_MEMBER_ZONE_URL;
export const ORIGINS_WHITELIST =
  window.REACT_APP_ORIGINS_WHITELIST ||
  process.env.REACT_APP_ORIGINS_WHITELIST?.split(',')
    .map((s) => s.trim())
    .filter((s) => s.startsWith('http://') || s.startsWith('https://')) ||
  [];

export const MIN_SPLASH_MS = 1000; //min time to display splash screen
export const EASING_BEZIER = [0.42, 0, 0.58, 1]; // animations curve
export const GENERAL_CONTACT_TEL_NUMBER = '+41 58 888 45 45';
