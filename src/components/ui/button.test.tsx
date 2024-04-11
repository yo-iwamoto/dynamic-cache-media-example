import { render } from "@testing-library/react";
import { Button } from "./button";

describe("button", () => {
  it("renders unchanged", () => {
    const { asFragment } = render(<Button />);

    expect(asFragment()).toMatchSnapshot();
  });
});
