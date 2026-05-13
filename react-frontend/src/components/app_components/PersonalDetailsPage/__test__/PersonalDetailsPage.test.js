import React from "react";
import { render, screen } from "@testing-library/react";

import PersonalDetailsPage from "../PersonalDetailsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders personalDetails page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PersonalDetailsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("personalDetails-datatable")).toBeInTheDocument();
    expect(screen.getByRole("personalDetails-add-button")).toBeInTheDocument();
});
