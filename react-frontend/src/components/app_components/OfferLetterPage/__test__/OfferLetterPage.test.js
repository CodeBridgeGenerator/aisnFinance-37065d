import React from "react";
import { render, screen } from "@testing-library/react";

import OfferLetterPage from "../OfferLetterPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders offerLetter page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <OfferLetterPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("offerLetter-datatable")).toBeInTheDocument();
    expect(screen.getByRole("offerLetter-add-button")).toBeInTheDocument();
});
