import { classNames } from "./classNames";

describe("classNames", () => {
  test("returns only base class", () => {
    expect(classNames("btn")).toBe("btn");
  });

  
  test("adds additional classes", () => {
    expect(classNames("btn", {}, ["active", "large"])).toBe(
        "btn active large"
    );
  });

  test("filters falsy additional classes", () => {
    expect(classNames("btn", {}, ["active", undefined])).toBe("btn active");
  });

  test("adds mods with truthy values", () => {
    expect(
        classNames("btn", {
          active: true,
          disabled: false,
        })
    ).toBe("btn active");
  });

  test("treats non-empty strings in mods as truthy", () => {
    expect(
        classNames("btn", {
          active: "yes",
          hidden: "",
        })
    ).toBe("btn active");
  });

  test("combines base, additional and mods", () => {
    expect(
        classNames(
            "btn",
            { active: true, disabled: false },
            ["large"]
        )
    ).toBe("btn large active");
  });
});
