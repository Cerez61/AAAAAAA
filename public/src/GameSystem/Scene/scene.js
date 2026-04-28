export class Scene {
  constructor(gameData) {
    this.sceneData = gameData[0];
    this.entityData = gameData[1];
    this.roomsJSON = [];

    this.changeRoom = true;
  }
  async init() {
    await this.fetchRoomsJSON(["rooms.json"]);
  }
  async fetchRoomsJSON(jsonNames) {
    const response = await Promise.all(jsonNames.map((jsonName) => fetch("./src/GameSystem/Scene/Rooms/" + jsonName)));

    const data = await Promise.all(response.map((res) => res.json()));

    this.roomsJSON.push(...data);
  }
  loadRoom(entities) {
    const metaData = this.roomsJSON[0].tutorialRoom.meta;

    this.updateSceneData(metaData.width, metaData.height);

    this.loadEntities(entities);

    this.changeRoom = false;
  }
  loadEntities() {
    for (const entity of this.roomsJSON[0].tutorialRoom.entities) {
      this.updateEntityData(entity);
    }
  }
  updateSceneData(width, height) {
    this.sceneData.width = width;
    this.sceneData.height = height;

    this.sceneData.roomChange = true;
  }
  updateEntityData(entity) {
    this.entityData.entitySceneData.push(entity);
  }
  update() {
    if (this.changeRoom) this.loadRoom();
  }
}
