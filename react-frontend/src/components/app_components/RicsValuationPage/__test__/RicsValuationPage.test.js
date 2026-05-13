import React from "react";
import { render, screen } from "@testing-library/react";

import RicsValuationPage from "../RicsValuationPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders ricsValuation page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <RicsValuationPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("ricsValuation-datatable")).toBeInTheDocument();
    expect(screen.getByRole("ricsValuation-add-button")).toBeInTheDocument();
});
