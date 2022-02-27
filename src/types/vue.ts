import { Wrapper } from '@vue/test-utils'
import Vue from 'vue'

/**
 * Enhanced type of @vue/test-utils/types.Wrapper
 */
export type WrapperVM<
  Data = Record<string, never>,
  Methods = Record<string, never>,
  Computed = Record<string, never>,
  Props = Record<string, never>
> = Data & Readonly<Methods> & Readonly<Computed> & Props & Wrapper<Vue>
