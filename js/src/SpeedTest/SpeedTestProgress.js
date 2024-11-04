/*
 * Copyright (C) 2019-2023 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import PropTypes from "prop-types";

import "./SpeedTestProgress.css";

SpeedTestProgress.propTypes = {
    isLoading: PropTypes.bool,
};

export default function SpeedTestProgress({ isLoading }) {
    return (
        <div className="progress w-100">
            <div
                id="progressbar"
                className={`progress-bar progress-bar-striped progress-bar-animated ${
                    isLoading ? "progress-bar-width" : ""
                } bg-success text-uppercase`}
                role="progressbar"
                aria-valuenow={isLoading ? "…" : "0"}
                aria-valuemin="0"
                aria-valuemax="100"
            >
                {isLoading && <span>{_("Measuring…")}</span>}
            </div>
        </div>
    );
}
