import React from "react";
import { render, screen } from "@testing-library/react";

import DirectorDecisionPage from "../DirectorDecisionPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders directorDecision page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <DirectorDecisionPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("directorDecision-datatable")).toBeInTheDocument();
    expect(screen.getByRole("directorDecision-add-button")).toBeInTheDocument();
});
