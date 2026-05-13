import React from "react";
import { render, screen } from "@testing-library/react";

import DueDiligenceCreateDialogComponent from "../DueDiligenceCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders dueDiligence create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <DueDiligenceCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("dueDiligence-create-dialog-component")).toBeInTheDocument();
});
