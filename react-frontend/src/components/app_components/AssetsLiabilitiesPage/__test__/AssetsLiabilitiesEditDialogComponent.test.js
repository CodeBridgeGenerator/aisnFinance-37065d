import React from "react";
import { render, screen } from "@testing-library/react";

import AssetsLiabilitiesEditDialogComponent from "../AssetsLiabilitiesEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders assetsLiabilities edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <AssetsLiabilitiesEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("assetsLiabilities-edit-dialog-component")).toBeInTheDocument();
});
