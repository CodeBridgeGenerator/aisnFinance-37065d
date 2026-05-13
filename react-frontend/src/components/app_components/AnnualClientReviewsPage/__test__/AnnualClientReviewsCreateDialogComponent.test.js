import React from "react";
import { render, screen } from "@testing-library/react";

import AnnualClientReviewsCreateDialogComponent from "../AnnualClientReviewsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders annualClientReviews create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <AnnualClientReviewsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("annualClientReviews-create-dialog-component")).toBeInTheDocument();
});
