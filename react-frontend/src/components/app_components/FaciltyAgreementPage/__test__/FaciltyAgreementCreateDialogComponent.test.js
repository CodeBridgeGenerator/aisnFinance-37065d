import React from "react";
import { render, screen } from "@testing-library/react";

import FaciltyAgreementCreateDialogComponent from "../FaciltyAgreementCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders faciltyAgreement create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <FaciltyAgreementCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("faciltyAgreement-create-dialog-component")).toBeInTheDocument();
});
