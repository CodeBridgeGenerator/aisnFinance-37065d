import React from "react";
import { render, screen } from "@testing-library/react";

import CompletitionStatementEditDialogComponent from "../CompletitionStatementEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders completitionStatement edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CompletitionStatementEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("completitionStatement-edit-dialog-component")).toBeInTheDocument();
});
