import * as React from "react";
import { cn } from "@/lib/utils";
import { flexVariants } from "../../types/flex-variants";
import type { FlexOwnProps } from "../../types/flex.types";

export interface FlexRowProps
  extends React.ComponentProps<"div">,
    FlexOwnProps {}

function FlexRow({
  className,
  justify,
  align,
  wrap,
  gap,
  width,
  height,
  style,
  ...props
}: FlexRowProps) {
  return (
    <div
      data-slot="flex-row"
      className={cn(flexVariants({ justify, align, wrap, gap }), "flex-row", className)}
      style={{ width, height, ...style }}
      {...props}
    />
  );
}

export { FlexRow };
