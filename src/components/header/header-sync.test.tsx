import { render, screen } from "@testing-library/react";
import { HeaderSync } from "./header-sync";
import { featureFlags } from "hexis/app/flags";

describe.skip("the sync button", () => {
  beforeEach(() => {
    featureFlags.triggerBasedSync = true;
  });

  it("makes an action when clicked", () => {
    const spy = jest.spyOn(console, "log");
    render(<HeaderSync />);

    const syncButton = screen.getByLabelText("Sync");

    expect(syncButton).toBeDefined();
    syncButton.click();
    expect(spy).toHaveBeenCalledWith("clicked!");
  });
});
