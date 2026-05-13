import React from "react";
import { render, screen } from "@testing-library/react";

import RicsValuationCreateDialogComponent from "../RicsValuationCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders ricsValuation create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <RicsValuationCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("ricsValuation-create-dialog-component")).toBeInTheDocument();
});
