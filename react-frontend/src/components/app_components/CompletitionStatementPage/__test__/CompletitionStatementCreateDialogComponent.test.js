import React from "react";
import { render, screen } from "@testing-library/react";

import CompletitionStatementCreateDialogComponent from "../CompletitionStatementCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders completitionStatement create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CompletitionStatementCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("completitionStatement-create-dialog-component")).toBeInTheDocument();
});
