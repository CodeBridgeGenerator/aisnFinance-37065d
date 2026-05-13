import React from "react";
import { render, screen } from "@testing-library/react";

import FaciltyAgreementPage from "../FaciltyAgreementPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders faciltyAgreement page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <FaciltyAgreementPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("faciltyAgreement-datatable")).toBeInTheDocument();
    expect(screen.getByRole("faciltyAgreement-add-button")).toBeInTheDocument();
});
