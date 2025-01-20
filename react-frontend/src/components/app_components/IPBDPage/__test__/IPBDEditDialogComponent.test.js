import React from "react";
import { render, screen } from "@testing-library/react";

import IPBDEditDialogComponent from "../IPBDEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders iPBD edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <IPBDEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("iPBD-edit-dialog-component")).toBeInTheDocument();
});
