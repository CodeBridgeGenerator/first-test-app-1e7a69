import React from "react";
import { render, screen } from "@testing-library/react";

import IPBDCreateDialogComponent from "../IPBDCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders iPBD create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <IPBDCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("iPBD-create-dialog-component")).toBeInTheDocument();
});
