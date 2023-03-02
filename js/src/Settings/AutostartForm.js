/*
 * Copyright (C) 2020-2023 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import { Switch } from "foris";
import PropTypes from "prop-types";

AutostartForm.propTypes = {
    formData: PropTypes.shape({
        autostart_enabled: PropTypes.bool,
    }).isRequired,
    setFormValue: PropTypes.func.isRequired,
};

AutostartForm.defaultProps = {
    formData: {
        autostart_enabled: false,
    },
    setFormValue: () => {},
};

export default function AutostartForm({ formData, setFormValue }) {
    return (
        <>
            <h2>{_("Autostart Settings")}</h2>
            <p>
                {_(
                    "Here you can enable Autostart. The measurement will occur once daily, and the time is picked randomly during the night hours."
                )}
            </p>
            <Switch
                label={_("Enable Autostart")}
                checked={formData.autostart_enabled}
                onChange={setFormValue((value) => ({
                    autostart_enabled: { $set: value },
                }))}
            />
        </>
    );
}
