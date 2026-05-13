import React from "react";
import { render, screen } from "@testing-library/react";

import DealStageHistoryPage from "../DealStageHistoryPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders dealStageHistory page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <DealStageHistoryPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("dealStageHistory-datatable")).toBeInTheDocument();
    expect(screen.getByRole("dealStageHistory-add-button")).toBeInTheDocument();
});
