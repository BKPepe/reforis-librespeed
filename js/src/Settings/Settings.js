/*
 * Copyright (C) 2019-2023 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import { ForisForm } from "foris";
import PropTypes from "prop-types";

import AutostartForm from "./AutostartForm";
import API_URLs from "../API";
import LibreSpeed from "../LibreSpeed";

Settings.propTypes = {
    ws: PropTypes.object.isRequired,
};

export default function Settings({ ws }) {
    return (
        <LibreSpeed>
            <ForisForm
                ws={ws}
                forisConfig={{
                    endpoint: API_URLs.settings,
                    wsModule: "librespeed",
                }}
                prepDataToSubmit={prepDataToSubmit}
                validator={validator}
            >
                <AutostartForm />
            </ForisForm>
        </LibreSpeed>
    );
}

function prepDataToSubmit(data) {
    return data;
}

function validator() {
    return undefined;
}
