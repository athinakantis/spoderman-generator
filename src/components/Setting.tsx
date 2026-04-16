import { capitalize } from "../utils/utils";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";

type Setting = {
  currentValue: number,
  total: number

}
type SettingProps = {
  label: string
  setting: Setting,
  handleChange: (setting: Setting, newVal: number) => void;
}

export default function Setting({ handleChange, setting, label }: SettingProps) {
  return (
    <div className="flex justify-between w-full">
      <button onClick={() => handleChange(setting, setting.currentValue - 1)}><CaretLeftIcon size={32} /></button>
      <p>{capitalize(label)}</p>
      <button onClick={() => handleChange(setting, setting.currentValue +1)}><CaretRightIcon size={32} /></button>
    </div>
  );
}