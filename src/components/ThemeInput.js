import { useTheme } from "src/hooks";

export default function ThemeInput({
  reactHookFormObj,
  label = "label",
  name = "label",
  type = "text",
  placeholder = "input value.",
  value = "",
  errors,
}) {
  const { theme, getMatchedThemeData } = useTheme();
  const { inputStyles } = getMatchedThemeData();
  const roundStyle = theme.rounded ? "rounded-md" : "";

  return (
    <label className="flex flex-col mb-2 text-gray-500">
      <span className="text-xs mb-0.5">{label}</span>
      <input
        {...reactHookFormObj}
        className={`w-full p-2 text-base border  focus:outline-none focus:border-transparent focus:ring-2 ${inputStyles} ${roundStyle}`}
        placeholder={placeholder}
        type={type}
        defaultValue={value}
      />
      {errors[name] && (
        <span className="mt-1 text-xs text-red-500">
          <i className="mr-2 fa-light fa-triangle-exclamation"></i>
          {errors[name].message}
        </span>
      )}
    </label>
  );
}
