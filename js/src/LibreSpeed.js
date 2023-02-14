/*
 * Copyright (C) 2020-2023 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import PropTypes from "prop-types";

LibreSpeed.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

export default function LibreSpeed({ children }) {
    return (
        <>
            <h1>LibreSpeed</h1>
            <p>
                {_(
                    "LibreSpeed measures your internet parameters like upload, download, and response time."
                )}
            </p>
            {children}
        </>
    );
}
