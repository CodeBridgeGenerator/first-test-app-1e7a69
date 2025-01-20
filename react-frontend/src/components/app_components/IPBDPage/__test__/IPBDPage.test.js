import React from "react";
import { render, screen } from "@testing-library/react";

import IPBDPage from "../IPBDPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders iPBD page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <IPBDPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("iPBD-datatable")).toBeInTheDocument();
    expect(screen.getByRole("iPBD-add-button")).toBeInTheDocument();
});
