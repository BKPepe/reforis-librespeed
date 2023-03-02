#  Copyright (C) 2020-2023 CZ.NIC z.s.p.o. (https://www.nic.cz/)
#
#  This is free software, licensed under the GNU General Public License v3.
#  See /LICENSE for more information.

from http import HTTPStatus
from reforis.test_utils import mock_backend_response


@mock_backend_response({"librespeed": {"get_settings": {"key": "value"}}})
def test_get_settings(client):
    response = client.get("/librespeed/api/settings")
    assert response.status_code == HTTPStatus.OK
    assert response.json["key"] == "value"


@mock_backend_response({"librespeed": {"update_settings": {"result": True}}})
def test_post_settings_invalid_json(client):
    response = client.post("/librespeed/api/settings", json=False)
    assert response.status_code == HTTPStatus.BAD_REQUEST
    assert response.json == "Invalid JSON"


@mock_backend_response({"librespeed": {"example_action": {"key": "value"}}})
def test_post_settings_backend_error(client):
    response = client.post(
        "/librespeed/api/settings", json={"autostart_enabled": False}
    )
    assert response.status_code == HTTPStatus.INTERNAL_SERVER_ERROR
    assert response.json == "Cannot update LibreSpeed settings."


@mock_backend_response({"librespeed": {"update_settings": {"result": True}}})
def test_post_settings(client):
    response = client.post(
        "/librespeed/api/settings",
        json={"autostart_enabled": True},
    )
    assert response.status_code == HTTPStatus.OK


@mock_backend_response({"librespeed": {"get_data": {"key": "value"}}})
def test_get_data(client):
    response = client.get("/librespeed/api/data")
    assert response.status_code == HTTPStatus.OK
    assert response.json["key"] == "value"


@mock_backend_response({"librespeed": {"measure": {"key": "value"}}})
def test_post_trigger_measurement(client):
    response = client.post("/librespeed/api/measure")
    assert response.status_code == HTTPStatus.OK
    assert response.json["key"] == "value"
