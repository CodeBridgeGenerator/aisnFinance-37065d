import React from "react";
import { render, screen } from "@testing-library/react";

import MortageDetailsPage from "../MortageDetailsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders mortageDetails page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MortageDetailsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("mortageDetails-datatable")).toBeInTheDocument();
    expect(screen.getByRole("mortageDetails-add-button")).toBeInTheDocument();
});
