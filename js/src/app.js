/*
 * Copyright (C) 2020-2023 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import LibreSpeed from "./LibreSpeed/LibreSpeed";

const LibreSpeedPlugin = {
    name: _("Librespeed"),
    weight: 100,
    submenuId: "librespeed",
    path: "/librespeed",
    component: LibreSpeed,
    icon: "cube",
};

ForisPlugins.push(LibreSpeedPlugin);
