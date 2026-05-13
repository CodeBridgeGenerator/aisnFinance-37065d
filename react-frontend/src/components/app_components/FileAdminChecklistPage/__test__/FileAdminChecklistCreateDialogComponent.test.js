import React from "react";
import { render, screen } from "@testing-library/react";

import FileAdminChecklistCreateDialogComponent from "../FileAdminChecklistCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders fileAdminChecklist create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <FileAdminChecklistCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("fileAdminChecklist-create-dialog-component")).toBeInTheDocument();
});
