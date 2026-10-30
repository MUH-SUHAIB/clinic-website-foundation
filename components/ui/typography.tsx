import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { BidiText } from "./bidi-text";
import { cn } from "@/lib/utils";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const headingStyles: Record<HeadingLevel, string> = {
  h1: "text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight",
  h2: "text-3xl md:text-4xl font-semibold leading-tight tracking-tight",
  h3: "text-2xl md:text-3xl font-semibold leading-snug",
  h4: "text-xl md:text-2xl font-semibold leading-snug",
  h5: "text-lg md:text-xl font-medium leading-snug",
  h6: "text-sm md:text-base font-medium uppercase tracking-wide text-muted-foreground",
};

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level: HeadingLevel;
  as?: HeadingLevel;
  children: ReactNode;
}

export function Heading({ level, as, className, children, ...props }: HeadingProps) {
  const Tag = (as ?? level) as ElementType;
  return (
    <Tag className={cn(headingStyles[level], "text-foreground", className)} {...props}>
      {typeof children === "string" ? <BidiText>{children}</BidiText> : children}
    </Tag>
  );
}

type TextVariant = "body" | "small" | "caption";

const textStyles: Record<TextVariant, string> = {
  body: "text-base leading-relaxed text-foreground",
  small: "text-sm leading-relaxed text-muted-foreground",
  caption: "text-xs uppercase tracking-wide text-muted-foreground",
};

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  variant?: TextVariant;
  as?: ElementType;
  children: ReactNode;
}

export function Text({ variant = "body", as: Tag = "p", className, children, ...props }: TextProps) {
  return (
    <Tag className={cn(textStyles[variant], className)} {...props}>
      {typeof children === "string" ? <BidiText>{children}</BidiText> : children}
    </Tag>
  );
}