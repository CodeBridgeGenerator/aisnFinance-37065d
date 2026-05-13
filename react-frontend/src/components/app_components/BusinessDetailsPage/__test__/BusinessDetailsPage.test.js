import React from "react";
import { render, screen } from "@testing-library/react";

import BusinessDetailsPage from "../BusinessDetailsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders businessDetails page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <BusinessDetailsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("businessDetails-datatable")).toBeInTheDocument();
    expect(screen.getByRole("businessDetails-add-button")).toBeInTheDocument();
});
