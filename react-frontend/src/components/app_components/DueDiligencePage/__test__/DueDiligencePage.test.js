import React from "react";
import { render, screen } from "@testing-library/react";

import DueDiligencePage from "../DueDiligencePage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders dueDiligence page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <DueDiligencePage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("dueDiligence-datatable")).toBeInTheDocument();
    expect(screen.getByRole("dueDiligence-add-button")).toBeInTheDocument();
});
