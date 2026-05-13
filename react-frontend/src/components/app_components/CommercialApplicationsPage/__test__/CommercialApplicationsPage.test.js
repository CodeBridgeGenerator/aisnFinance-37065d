import React from "react";
import { render, screen } from "@testing-library/react";

import CommercialApplicationsPage from "../CommercialApplicationsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders commercialApplications page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CommercialApplicationsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("commercialApplications-datatable")).toBeInTheDocument();
    expect(screen.getByRole("commercialApplications-add-button")).toBeInTheDocument();
});
