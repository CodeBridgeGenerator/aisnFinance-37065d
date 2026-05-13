import React from "react";
import { render, screen } from "@testing-library/react";

import DirectorDecisionCreateDialogComponent from "../DirectorDecisionCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders directorDecision create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <DirectorDecisionCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("directorDecision-create-dialog-component")).toBeInTheDocument();
});
