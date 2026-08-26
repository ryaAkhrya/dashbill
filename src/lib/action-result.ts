/** Standardized return type for all Server Actions */
export type ActionResult<T = null> =
  | { success: true; data: T }
  | { success: false; error: string };
