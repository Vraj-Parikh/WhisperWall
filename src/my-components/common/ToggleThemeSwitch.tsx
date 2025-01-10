"use client";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
const ToggleThemeSwitch = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="flex items-center space-x-2">
      <Switch
        checked={isChecked}
        onCheckedChange={(checked) => setIsChecked(checked)}
      />
    </div>
  );
};

export default ToggleThemeSwitch;
