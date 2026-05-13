import React from "react";
import { render, screen } from "@testing-library/react";

import DealStageHistoryEditDialogComponent from "../DealStageHistoryEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders dealStageHistory edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <DealStageHistoryEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("dealStageHistory-edit-dialog-component")).toBeInTheDocument();
});
