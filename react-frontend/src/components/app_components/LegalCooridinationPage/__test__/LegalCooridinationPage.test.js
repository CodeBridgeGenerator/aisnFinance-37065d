import React from "react";
import { render, screen } from "@testing-library/react";

import LegalCooridinationPage from "../LegalCooridinationPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders legalCooridination page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <LegalCooridinationPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("legalCooridination-datatable")).toBeInTheDocument();
    expect(screen.getByRole("legalCooridination-add-button")).toBeInTheDocument();
});
