import React from "react";
import { render, screen } from "@testing-library/react";

import LegalCooridinationCreateDialogComponent from "../LegalCooridinationCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders legalCooridination create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <LegalCooridinationCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("legalCooridination-create-dialog-component")).toBeInTheDocument();
});
