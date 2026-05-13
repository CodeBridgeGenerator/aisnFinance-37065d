import React from "react";
import { render, screen } from "@testing-library/react";

import AnnualClientReviewsPage from "../AnnualClientReviewsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders annualClientReviews page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <AnnualClientReviewsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("annualClientReviews-datatable")).toBeInTheDocument();
    expect(screen.getByRole("annualClientReviews-add-button")).toBeInTheDocument();
});
