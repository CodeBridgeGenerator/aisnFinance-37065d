import React from "react";
import { render, screen } from "@testing-library/react";

import FileAdminChecklistPage from "../FileAdminChecklistPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders fileAdminChecklist page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <FileAdminChecklistPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("fileAdminChecklist-datatable")).toBeInTheDocument();
    expect(screen.getByRole("fileAdminChecklist-add-button")).toBeInTheDocument();
});
