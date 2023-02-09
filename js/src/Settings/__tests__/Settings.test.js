/*
 * Copyright (C) 2020-2023 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import { WebSockets } from "foris";
import { render, wait, fireEvent } from "foris/testUtils/customTestRender";
import mockAxios from "jest-mock-axios";

import Settings from "../Settings";

describe("<Settings />", () => {
    let container;
    let asFragment;
    let getByText;
    let firstRender;

    beforeEach(async () => {
        const webSockets = new WebSockets();
        ({ container, asFragment, getByText } = render(
            <Settings ws={webSockets} />
        ));
        mockAxios.mockResponse({
            data: {
                autostart_enabled: false,
            },
        });
        await wait(() => getByText("LibreSpeed"));
        firstRender = asFragment();
    });

    it("Should render component.", () => {
        expect(firstRender).toMatchSnapshot();
    });

    it("Should change form value when enabled.", () => {
        fireEvent.click(getByText("Enable Autostart"));
        fireEvent.click(getByText("Save"));

        expect(mockAxios.post).toBeCalled();
        const data = {
            autostart_enabled: true,
        };
        expect(mockAxios.post).toHaveBeenCalledWith(
            "/reforis/librespeed/api/settings",
            data,
            expect.anything()
        );
    });
});
