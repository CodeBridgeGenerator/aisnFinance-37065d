import React from "react";
import { render, screen } from "@testing-library/react";

import DueDiligenceEditDialogComponent from "../DueDiligenceEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders dueDiligence edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <DueDiligenceEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("dueDiligence-edit-dialog-component")).toBeInTheDocument();
});
