import HomeTemplate from "./home.template";
import { React, useState, useEffect } from "react";
import { apiHttpRequest } from "../../services/RequestService";
import { useNavigate } from "react-router-dom";
import * as InputService from "../../services/InputService";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { tabEnum } from "../../enum/tabEnum";
const StoreService = require("../../services/StoreService");

export default function HomeComponent(props) {
  const [state, setState] = useState({
    stateOnglets: tabEnum.TAB_USERS,
    entityData: [],
    entityColumns: [],
    entityEditing: null,
    userModal: { email: "", nom: "", prenom: "" },
    roomModal: { libelle: "" },
    isEditing: false,
    isCreating: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    //Only admin access feature
    let user = JSON.parse(StoreService.retrieveData("user"));
    if (!user.roles.find((role) => role.code === "admin")) {
      navigate("/");
    }
    getEntityData(tabEnum.TAB_USERS);
    return () => {};
  }, []);

  // Change state of tab
  const TabChange = (tabValue) => {
    setState((currentState) => {
      return {
        ...currentState,
        stateOnglets: tabValue,
      };
    });
    getEntityData(tabValue);
  };

  const setIsEditing = (value) => {
    setState((currentState) => {
      return {
        ...currentState,
        isEditing: value,
      };
    });
  };

  const setIsCreating = (value) => {
    setState((currentState) => {
      return {
        ...currentState,
        isCreating: value,
      };
    });
  };

  const createEntity = async () => {
    try {
      let roomCreate = await apiHttpRequest(
        `admin/create/salon`,
        "POST",
        null,
        state.roomModal
      );
      if (roomCreate) {
        getEntityData(tabEnum.TAB_ROOMS);
        Modal.destroyAll();
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  const getEntityData = async (onglet) => {
    let entityData;
    try {
      if (onglet === tabEnum.TAB_USERS) {
        entityData = await apiHttpRequest(
          `admin/getall/user`,
          "GET",
          null,
          null
        );
        entityData.forEach((element) =>
          element.isConnected === true
            ? (element.isConnected = "Connected")
            : (element.isConnected = "Disconnected")
        );
      }

      if (onglet === tabEnum.TAB_ROOMS) {
        entityData = await apiHttpRequest(`salon/getall`, "GET", null, null);
      }

      if (onglet === tabEnum.TAB_PRIVATE_MESSAGES) {
        entityData = await apiHttpRequest(
          `admin/getall/usermessage`,
          "GET",
          null,
          null
        );
      }

      if (onglet === tabEnum.TAB_ROOM_MESSAGES) {
        entityData = await apiHttpRequest(
          `admin/getall/salonmessage`,
          "GET",
          null,
          null
        );
      }

      setState((currentState) => {
        return {
          ...currentState,
          entityData: entityData,
        };
      });

      let columns = [];
      Object.keys(entityData[0]).forEach((value, index) => {
        columns.push({
          title: value,
          dataIndex: value,
          filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
            return (
              <>
                <Input
                  autoFocus
                  placeholder="Filter"
                  value={selectedKeys[0]}
                  onChange={(e) => {
                    setSelectedKeys(e.target.value ? [e.target.value] : []);
                  }}
                  onPressEnter={() => {
                    confirm();
                  }}
                  onBlur={() => {
                    confirm();
                  }}
                ></Input>
                <Button
                  onClick={() => {
                    confirm();
                  }}
                  type={"primary"}
                >
                  Apply
                </Button>
              </>
            );
          },
          filterIcon: () => {
            return <SearchOutlined />;
          },
          onFilter: (value, record) => {
            let objectToArray = Object.values(record);
            return objectToArray[index]
              .toString()
              .toLowerCase()
              .includes(value.toString().toLowerCase());
          },
        });
      });

      columns.push({
        title: "Action",
        render: (record) => {
          return (
            <>
              <EditOutlined
                onClick={() => onEditEntity(record, onglet)}
                style={{
                  color: "black",
                  display:
                    onglet === tabEnum.TAB_USERS || onglet === tabEnum.TAB_ROOMS
                      ? "inline"
                      : "none",
                }}
              />
              <DeleteOutlined
                onClick={() => deleteEntity(record, onglet)}
                style={{ color: "red", marginLeft: "12px" }}
              />
            </>
          );
        },
      });

      setState((currentState) => {
        return {
          ...currentState,
          entityColumns: columns,
        };
      });
    } catch (err) {
      throw new Error(err);
    }
  };

  const onEditEntity = async (record, onglet) => {
    setIsEditing(true);
    let entityModal;
    setState((currentState) => {
      if (onglet === tabEnum.TAB_USERS) {
        entityModal = {
          email: record.email,
          nom: record.nom,
          prenom: record.prenom,
        };
        return {
          ...currentState,
          userModal: entityModal,
          entityEditing: record,
        };
      } else if (onglet === tabEnum.TAB_ROOMS) {
        entityModal = { libelle: record.libelle };
        return {
          ...currentState,
          roomModal: entityModal,
          entityEditing: record,
        };
      }
    });
  };

  const deleteEntity = async (record, onglet) => {
    // Modal confirm
    let objectToArray = Object.entries(record);
    Modal.confirm({
      title: `Are you sure to delete the ${objectToArray[0][0]} : ${objectToArray[0][1]} ?`,
      closable: true,
      footer: [
        <Button
          danger={true}
          key="submit"
          type={"primary"}
          onClick={() => confirmed()}
        >
          Delete
        </Button>,
      ],
    });
    // Delete Action on BDD
    let confirmed = async () => {
      let entityData;
      try {
        if (onglet === tabEnum.TAB_USERS) {
          entityData = await apiHttpRequest(
            `admin/delete/user/${record.idUser}`,
            "DELETE",
            null,
            null
          );
        }
        if (onglet === tabEnum.TAB_ROOMS) {
          entityData = await apiHttpRequest(
            `admin/delete/salon/${record.idSalon}`,
            "DELETE",
            null,
            null
          );
        }
        if (onglet === tabEnum.TAB_PRIVATE_MESSAGES) {
          entityData = await apiHttpRequest(
            `admin/delete/usermessage/${record.idUserMessageUser}`,
            "DELETE",
            null,
            null
          );
        }
        if (onglet === tabEnum.TAB_ROOM_MESSAGES) {
          entityData = await apiHttpRequest(
            `admin/delete/salonmessage/${record.idUserMessageSalon}`,
            "DELETE",
            null,
            null
          );
        }
        if (entityData) {
          getEntityData(onglet);
          Modal.destroyAll();
        }
      } catch (err) {
        console.log(err);
      }
    };
  };

  const updateEntity = async (onglet) => {
    try {
      let entityUpdate;
      if (onglet === tabEnum.TAB_USERS) {
        entityUpdate = await apiHttpRequest(
          `user/auth/${state.entityEditing.idUser}/update`,
          "PUT",
          null,
          state.userModal
        );
      } else if (onglet === tabEnum.TAB_ROOMS) {
        entityUpdate = await apiHttpRequest(
          `admin/update/salon/${state.entityEditing.idSalon}`,
          "PUT",
          null,
          state.roomModal
        );
      }
      if (entityUpdate) {
        getEntityData(onglet);
        setIsEditing(false);
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  const updateInput = (modal, inputName, value) => {
    try {
      setState((currentState) => {
        if (modal === "roomModal") {
          return {
            ...currentState,
            roomModal: InputService.setInputStates(
              state.roomModal,
              inputName,
              value
            ),
          };
        } else if (modal === "userModal") {
          return {
            ...currentState,
            userModal: InputService.setInputStates(
              state.userModal,
              inputName,
              value
            ),
          };
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <HomeTemplate
      entityData={state.entityData}
      entityColumns={state.entityColumns}
      setIsEditing={setIsEditing}
      isEditing={state.isEditing}
      updateEntity={updateEntity}
      userModal={state.userModal}
      roomModal={state.roomModal}
      updateInput={updateInput}
      TabChange={TabChange}
      stateOnglets={state.stateOnglets}
      isCreating={state.isCreating}
      setIsCreating={setIsCreating}
      createEntity={createEntity}
    />
  );
}
