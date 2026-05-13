import React from "react";
import { render, screen } from "@testing-library/react";

import OfferLetterCreateDialogComponent from "../OfferLetterCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders offerLetter create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <OfferLetterCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("offerLetter-create-dialog-component")).toBeInTheDocument();
});
