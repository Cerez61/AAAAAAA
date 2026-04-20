export class Scene {
  constructor(gameData) {
    this.sceneData = gameData;
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

    this.changeGlobalData(metaData.width, metaData.height);

    this.loadEntities(entities);

    this.changeRoom = false;
  }
  loadEntities(entities) {
    const player = entities[0];
    const texture = entities[1];
    const enemy = entities[2];

    for (const entity of this.roomsJSON[0].tutorialRoom.entities) {
      if (entity.type == "PLAYER") {
        player.x = entity.position[0];
        player.y = entity.position[1];
        player.z = entity.position[2];
      } else if (entity.type == "TEXTURE") {
        texture.loadAsset(entity);
      } else if (entity.type == "ENEMY") {
        enemy.loadEnemy(entity);
      }
    }
    texture.initAssetsArray();
  }
  changeGlobalData(width, height) {
    this.sceneData.width = width;
    this.sceneData.height = height;
  }
  update(entities) {
    if (this.changeRoom) this.loadRoom(entities);
  }
}
