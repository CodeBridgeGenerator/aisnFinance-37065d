import React from "react";
import { render, screen } from "@testing-library/react";

import DealsPage from "../DealsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders deals page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <DealsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("deals-datatable")).toBeInTheDocument();
    expect(screen.getByRole("deals-add-button")).toBeInTheDocument();
});
