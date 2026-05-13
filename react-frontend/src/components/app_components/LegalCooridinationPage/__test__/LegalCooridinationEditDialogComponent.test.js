import React from "react";
import { render, screen } from "@testing-library/react";

import LegalCooridinationEditDialogComponent from "../LegalCooridinationEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders legalCooridination edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <LegalCooridinationEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("legalCooridination-edit-dialog-component")).toBeInTheDocument();
});
