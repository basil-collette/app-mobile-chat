import "./home.style.css";
import { Table, Modal, Input, Button } from "antd";
import { tabEnum } from "../../enum/tabEnum";

export default function homeTemplate(props) {
  return (
    <div className="container">
      <div className="container-grid-button">
        <div className="contBtn">
          <div
            onClick={() => props.TabChange(tabEnum.TAB_USERS)}
            className={`onglets ${
              props.stateOnglets === tabEnum.TAB_USERS ? "active" : ""
            }`}
          >
            Users
          </div>
          <div
            onClick={() => props.TabChange(tabEnum.TAB_ROOMS)}
            className={`onglets ${
              props.stateOnglets === tabEnum.TAB_ROOMS ? "active" : ""
            }`}
          >
            Rooms
          </div>
          <div
            onClick={() => props.TabChange(tabEnum.TAB_PRIVATE_MESSAGES)}
            className={`onglets ${
              props.stateOnglets === tabEnum.TAB_PRIVATE_MESSAGES
                ? "active"
                : ""
            }`}
          >
            Private Messages
          </div>
          <div
            onClick={() => props.TabChange(tabEnum.TAB_ROOM_MESSAGES)}
            className={`onglets ${
              props.stateOnglets === tabEnum.TAB_ROOM_MESSAGES ? "active" : ""
            }`}
          >
            Room Messages
          </div>
        </div>
        <div class="container-grid">
          <div
            className="button"
            onClick={() => props.setIsCreating(true)}
            style={{
              display:
                props.stateOnglets === tabEnum.TAB_ROOMS ? "inline" : "none",
            }}
          >
            <span>Add room</span>
          </div>
          <Table
            columns={props.entityColumns}
            dataSource={props.entityData}
            pagination={{
              pageSize: 10,
            }}
            style={{ background: "white", margin: 0, padding: 0 }}
            size={"middle"}
          ></Table>
          <Modal
            title="Create Room"
            open={props.isCreating}
            onCancel={() => {
              props.setIsCreating(false);
            }}
            onOk={() => props.createEntity()}
            footer={[
              <Button
                key="submit"
                type="primary"
                onClick={() => props.createEntity()}
              >
                Create
              </Button>,
            ]}
          >
            <Input
              value={props.entityEditing?.libelle}
              onChange={(e) =>
                props.updateInput("roomModal", "libelle", e.target.value)
              }
            ></Input>
          </Modal>

          <Modal
            title={
              props.stateOnglets === tabEnum.TAB_USERS
                ? "Edit User"
                : "Edit Salon"
            }
            open={props.isEditing}
            onCancel={() => {
              props.setIsEditing(false);
            }}
            footer={[
              <Button
                key="submit"
                type="primary"
                onClick={() => props.updateEntity(props.stateOnglets)}
              >
                UPDATE
              </Button>,
            ]}
          >
            {props.stateOnglets === tabEnum.TAB_USERS ? (
              <>
                <Input
                  value={props.userModal?.email}
                  onChange={(e) =>
                    props.updateInput("userModal", "email", e.target.value)
                  }
                ></Input>
                <Input
                  value={props.userModal?.nom}
                  onChange={(e) =>
                    props.updateInput("userModal", "nom", e.target.value)
                  }
                ></Input>
                <Input
                  value={props.userModal?.prenom}
                  onChange={(e) =>
                    props.updateInput("userModal", "prenom", e.target.value)
                  }
                ></Input>
              </>
            ) : (
              <Input
                value={props.roomModal?.libelle}
                onChange={(e) =>
                  props.updateInput("roomModal", "libelle", e.target.value)
                }
              ></Input>
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
}
