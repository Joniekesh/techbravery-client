import { Input } from "./ui/input";

type PartialInputProps = Pick<
  React.ComponentPropsWithoutRef<"input">,
  "className" | "style"
>;

type Props = {
  value: string;
  onChange(value: string): void;
  size?: number;
  validationPattern?: RegExp;
} & PartialInputProps;

const OtpInput = ({
  size = 6,
  validationPattern = /[0-9]{1}/,
  value,
  onChange,
  className,
  ...restProps
}: Props) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const val = e.target.value;
    if (!validationPattern.test(val) && val !== "") return;

    const valueArr = value.split("");
    valueArr[index] = val;
    onChange(valueArr.join("").slice(0, size));

    if (val) {
      const next = e.target.nextElementSibling as HTMLInputElement | null;
      next?.focus();
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const current = e.currentTarget;

    if (e.key === "ArrowLeft" || e.key === "Backspace") {
      const prev = current.previousElementSibling as HTMLInputElement | null;
      prev?.focus();
      prev?.setSelectionRange(0, 1);
    }

    if (e.key === "ArrowRight") {
      const next = current.nextElementSibling as HTMLInputElement | null;
      next?.focus();
      next?.setSelectionRange(0, 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    onChange(e.clipboardData.getData("text").substring(0, size));
  };

  return (
    <div className="flex gap-2 sm:gap-4 justify-between text-center">
      {Array.from({ length: size }).map((_, index) => (
        <Input
          key={index}
          {...restProps}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern={validationPattern.source}
          maxLength={1}
          value={value.at(index) ?? ""}
          onChange={(e) => handleInputChange(e, index)}
          onKeyUp={handleKeyUp}
          onPaste={handlePaste}
          className="flex-1 min-w-8 max-w-12 py-4  rounded-md border text-center outline-none focus:border-teal-800 font-bold"
        />
      ))}
    </div>
  );
};

export default OtpInput;
