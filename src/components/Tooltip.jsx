"use client";
import React from "react";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { cn } from "@/lib/utils";

export const Tooltip = React.memo(
  ({
    content,
    children,
    className,
    place = "top",
    delayShow = 150,
    delayHide = 100,
    trigger = "hover",
    variant = "light",
    bgColorClass = " bg-neutral-700!  !text-white ",
  }) => {
    const tooltipId = React.useId();

    return (
      <>
        <span
          data-tooltip-id={tooltipId}
          className="cursor-pointer! p-0!  flex justify-center items-center"
        >
          {children}
        </span>

        <ReactTooltip
          place={place}
          id={tooltipId}
          variant={variant}
          delayShow={delayShow}
          delayHide={delayHide}
          className={cn(
            `rounded-lg! text-[11px]! py-1.5! px-4 z-99999! overflow-hidden`,
            bgColorClass,
            className,
          )}
          openOnClick={trigger === "click"}
          render={() => <div>{content}</div>}
        />
      </>
    );
  },
);
