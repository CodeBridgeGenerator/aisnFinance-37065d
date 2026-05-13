import React from "react";
import { render, screen } from "@testing-library/react";

import DealStageHistoryCreateDialogComponent from "../DealStageHistoryCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders dealStageHistory create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <DealStageHistoryCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("dealStageHistory-create-dialog-component")).toBeInTheDocument();
});
