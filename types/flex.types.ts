import type { VariantProps } from "class-variance-authority";
import type { flexVariants } from "./flex-variants";

export type FlexJustify = VariantProps<typeof flexVariants>["justify"];
export type FlexAlign = VariantProps<typeof flexVariants>["align"];
export type FlexWrap = VariantProps<typeof flexVariants>["wrap"];
export type FlexGap = VariantProps<typeof flexVariants>["gap"];

export interface FlexOwnProps extends VariantProps<typeof flexVariants> {
  width?: string | number;
  height?: string | number;
}
