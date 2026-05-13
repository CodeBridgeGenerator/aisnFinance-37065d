import React from "react";
import { render, screen } from "@testing-library/react";

import SecurityPropertiesCreateDialogComponent from "../SecurityPropertiesCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders securityProperties create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <SecurityPropertiesCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("securityProperties-create-dialog-component")).toBeInTheDocument();
});
