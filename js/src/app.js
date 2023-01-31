/*
 * Copyright (C) 2019-2023 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import SpeedTest from "./SpeedTest/SpeedTest";
import Settings from "./Settings/Settings";
import LibreSpeedIcon from "./LibreSpeedIcon";

const LibreSpeedPlugin = {
    name: _("LibreSpeed"),
    weight: 65,
    path: "/librespeed",
    pages: [
        {
            path: "/speed-test",
            name: _("Speed Test"),
            component: SpeedTest,
        },
        {
            path: "/settings",
            name: _("Autostart Settings"),
            component: Settings,
        },
    ],
    icon: <LibreSpeedIcon />,
};

ForisPlugins.push(LibreSpeedPlugin);
