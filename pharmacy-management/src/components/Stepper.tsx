import React from "react";
import { Text } from "./Text";

type StepProps = {
  step: number;
  title: string;
  isActive: boolean;
};
interface Step {
  step: number;
  title: string;
  isActive: boolean;
}

interface StepperListProps {
  steps: Step[];
  customStyle?: string;
}
export const Steper: React.FC<StepProps> = ({ step, title, isActive }) => {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`lg:w-10 lg:h-10 md:w-9 md:h-9 h-8 w-8 flex items-center justify-center rounded-full border-2 lg:text-lg md:text-base text-sm font-bold transition-all 
        ${
          isActive
            ? "border-primary text-primary bg-teal-100"
            : " border-gray-400 text-gray-400 bg-white"
        }`}
      >
        {step}
      </div>
      <Text
        className={`lg:text-[15px] md:text-[13px] text-[11px] font-medium text-wrap ${
          isActive ? "text-primary" : "text-gray-500"
        }`}
      >
        {title}
      </Text>
    </div>
  );
};

export function StepperList({ steps, customStyle }: StepperListProps) {
  return (
    <div
      className={`flex flex-col gap-4 xl:w-[20rem] lg:w-[14rem] md:w-[13rem] w-[12rem] bg-white px-4 py-4 ${customStyle}`}
    >
      {steps.map((step, index) => (
        <div key={index}>
          <Steper
            step={step.step}
            title={step.title}
            isActive={step.isActive}
          />
          {index !== steps.length - 1 && (
            <div
              className={`h-9 w-2 bg-dotted lg:border-l-[3.5px] md:border-l-[3px] border-l-[2.8px]  mb-[-9px] mt-1 border-dotted border-gray-500 lg:ml-5 md:ml-4 ml-3`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
}
