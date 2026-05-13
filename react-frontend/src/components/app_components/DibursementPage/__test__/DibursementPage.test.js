import React from "react";
import { render, screen } from "@testing-library/react";

import DibursementPage from "../DibursementPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders dibursement page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <DibursementPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("dibursement-datatable")).toBeInTheDocument();
    expect(screen.getByRole("dibursement-add-button")).toBeInTheDocument();
});
