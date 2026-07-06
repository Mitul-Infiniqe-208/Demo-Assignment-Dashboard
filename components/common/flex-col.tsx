import * as React from "react";
import { cn } from "@/lib/utils";
import { flexVariants } from "../../types/flex-variants";
import type { FlexOwnProps } from "../../types/flex-types";

export interface FlexColProps
  extends React.ComponentProps<"div">,
    FlexOwnProps {}

function FlexCol({
  className,
  justify,
  align,
  wrap,
  gap,
  width,
  height,
  style,
  ...props
}: FlexColProps) {
  return (
    <div
      data-slot="flex-col"
      className={cn(flexVariants({ justify, align, wrap, gap }), "flex-col", className)}
      style={{ width, height, ...style }}
      {...props}
    />
  );
}

export { FlexCol };
