/*
 * Copyright (C) 2020-2023 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import mockAxios from "jest-mock-axios";
import { render } from "foris/testUtils/customTestRender";

import LibreSpeed from "../LibreSpeed";

describe("<LibreSpeed />", () => {
    it("should render component", () => {
        const { getByText } = render(<LibreSpeed />);
        expect(getByText("Librespeed")).toBeDefined();
        expect(mockAxios.get).toBeCalledWith(
            "/reforis/librespeed/api/example",
            expect.anything()
        );
    });
});
