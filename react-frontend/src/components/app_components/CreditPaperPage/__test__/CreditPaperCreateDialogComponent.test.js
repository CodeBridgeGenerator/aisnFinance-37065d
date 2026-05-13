import React from "react";
import { render, screen } from "@testing-library/react";

import CreditPaperCreateDialogComponent from "../CreditPaperCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders creditPaper create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CreditPaperCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("creditPaper-create-dialog-component")).toBeInTheDocument();
});
