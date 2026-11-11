
import * as React from "react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

function Accordion(props: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-surface-border", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group flex flex-1 items-center justify-between gap-4 p-5 text-left font-display text-base font-normal text-headline transition-colors hover:text-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-mint sm:p-6 sm:text-lg",
          className
        )}
        {...props}
      >
        {children}
        <span
          aria-hidden="true"
          className="inline-flex shrink-0 rounded-full border border-white/[0.08] bg-surface/50 p-2 text-mutedtext transition-all duration-300 group-hover:border-mint/40 group-hover:text-mint group-data-[state=open]:rotate-90 group-data-[state=open]:border-mint group-data-[state=open]:bg-mint group-data-[state=open]:text-background"
        >
          <Plus className="size-3.5 group-data-[state=open]:hidden" />
          <Minus className="hidden size-3.5 group-data-[state=open]:block" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("px-5 pb-6 pt-4 sm:px-6", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
