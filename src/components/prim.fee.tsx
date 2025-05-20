import React, { useState, useEffect, useRef } from 'react';

import { Input } from "./ui/input"

import { cn } from '../lib/utils'

interface CalLineDescriptionProps {
  title: string;
  description?: string;
  bold?: boolean;
  className?: string;
}

const CalLineDescription = (props: CalLineDescriptionProps) => {
  const { title, description, bold=false, className } = props;
  return <div className={cn("flex flex-col mt-1", bold && "font-medium", className)}>
    <span className="">{title}</span>
    {description && <span className={cn("text-xs text-primary-500", bold && "font-medium")}>{description}</span>}
  </div>
}

interface CalLineFlexProps {
  children: React.ReactNode;
}
const CalLineFlex = (props: CalLineFlexProps) => {
  const { children } = props;
  return <div className="flex justify-between items-start">
    {children}
  </div>
}

interface CalLinePriceDisplayProps {
  price: number;
  className?: string;
  decimal?: number;
  bold?: boolean;
}
const CalLinePriceDisplay = (props: CalLinePriceDisplayProps) => {
  const { price, className, decimal=0, bold=false } = props;
  return <div className={cn("text-right mt-1", bold && "font-medium",className)}>
      <span className="pr-3 text-base md:text-sm">{price.toFixed(decimal)}</span>
      <span className="px-3 text-sm">THB</span>
  </div>
}

interface CalLinePriceInputProps {
  value?: number | string;
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}
const CalLinePriceInput = (props: CalLinePriceInputProps) => {
  const { value, onChange, className } = props;

  return <div className="flex">
    <Input
      value={value}
      onChange={onChange}
      className="w-24 text-right rounded-r-none"
    />
    <div className="bg-white border border-l-0 rounded-r-md px-3 py-2 text-sm">THB</div>
  </div>
}

export {
  CalLineDescription as Description,
  CalLineFlex as Flex,
  CalLinePriceDisplay as PriceDisplay,
  CalLinePriceInput as PriceInput,
}