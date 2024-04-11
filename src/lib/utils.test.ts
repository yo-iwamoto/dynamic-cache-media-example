import { cn } from "./utils";

describe("cn", () => {
  it("スペース区切りで引数を結合すること", () => {
    expect(cn("a", "b", "c")).toBe("a b c");
  });

  it.each([
    { args: ["text-blue-500", "text-red-500"], expected: "text-red-500" },
    { args: ["bg-blue-500", "bg-red-500"], expected: "bg-red-500" },
    { args: ["w-24", "w-32"], expected: "w-32" },
  ])(
    "衝突する Tailwind CSS のクラス名が後勝ちで解決されること: $args",
    ({ args, expected }) => {
      expect(cn(...args)).toBe(expected);
    },
  );

  it("falsy な値は無視されること", () => {
    expect(cn("a", false, null, 0, undefined)).toBe("a");
  });

  it("オブジェクト形式で渡されたクラス名が結合されること", () => {
    expect(
      cn({
        "class-a": true,
        "class-b": true,
        "class-c": true,
      }),
    ).toBe("class-a class-b class-c");
  });

  it("オブジェクト形式で渡した時、value が falsy な key は無視されること", () => {
    expect(
      cn({
        "class-a": true,
        "class-b": false,
        "class-c": null,
        "class-d": 0,
        "class-e": undefined,
      }),
    ).toBe("class-a");
  });
});
