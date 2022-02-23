/**
 * `any` that should be fix
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FixMeAny = any

/**
 * For cast. No need to fix it.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CastAny = any

/**
 * for exhaustive check
 */
export const assertNever = (x: never): never => {
  throw new Error(
    `Unexpected value (\`${JSON.stringify(x)}\`). Should have been never.`
  )
}
