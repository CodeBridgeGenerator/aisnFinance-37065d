import React from "react";
import { render, screen } from "@testing-library/react";

import AssetsLiabilitiesPage from "../AssetsLiabilitiesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders assetsLiabilities page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <AssetsLiabilitiesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("assetsLiabilities-datatable")).toBeInTheDocument();
    expect(screen.getByRole("assetsLiabilities-add-button")).toBeInTheDocument();
});
