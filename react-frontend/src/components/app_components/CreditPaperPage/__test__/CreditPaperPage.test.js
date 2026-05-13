import React from "react";
import { render, screen } from "@testing-library/react";

import CreditPaperPage from "../CreditPaperPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders creditPaper page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CreditPaperPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("creditPaper-datatable")).toBeInTheDocument();
    expect(screen.getByRole("creditPaper-add-button")).toBeInTheDocument();
});
