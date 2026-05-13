import React from "react";
import { render, screen } from "@testing-library/react";

import FaciltyAgreementEditDialogComponent from "../FaciltyAgreementEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders faciltyAgreement edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <FaciltyAgreementEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("faciltyAgreement-edit-dialog-component")).toBeInTheDocument();
});
