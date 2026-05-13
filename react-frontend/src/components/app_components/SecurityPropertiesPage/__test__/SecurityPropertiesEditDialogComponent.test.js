import React from "react";
import { render, screen } from "@testing-library/react";

import SecurityPropertiesEditDialogComponent from "../SecurityPropertiesEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders securityProperties edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <SecurityPropertiesEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("securityProperties-edit-dialog-component")).toBeInTheDocument();
});
