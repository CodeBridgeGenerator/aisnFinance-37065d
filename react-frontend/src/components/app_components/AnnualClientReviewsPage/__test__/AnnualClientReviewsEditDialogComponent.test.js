import React from "react";
import { render, screen } from "@testing-library/react";

import AnnualClientReviewsEditDialogComponent from "../AnnualClientReviewsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders annualClientReviews edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <AnnualClientReviewsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("annualClientReviews-edit-dialog-component")).toBeInTheDocument();
});
